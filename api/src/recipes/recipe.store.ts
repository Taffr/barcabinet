import { Injectable } from '@nestjs/common';
import { Ingredient, Recipe } from '@prisma/client';
import { map, prop } from 'ramda';
import { PrismaService } from '../prisma/prisma.service';
import { Maybe } from '../util/Maybe';
import { ResolvedRecipe } from './interfaces/resolved-recipe.interface';

type RecipeWithDosages = Recipe & { dosages: { ingredient: Ingredient }[] };

@Injectable()
export class RecipeStore {
  constructor(readonly prisma: PrismaService) {}
  private readonly FULL_RECIPE_QUERY = {
    select: {
      id: true,
      name: true,
      garnish: true,
      preparation: true,
      dosages: {
        select: {
          ingredient: true,
        },
      },
    },
  };

  private mapToResolvedRecipe(full: RecipeWithDosages): ResolvedRecipe {
    const { id, name, garnish, preparation, dosages } = full;

    return {
      id,
      name,
      garnish,
      preparation,
      ingredients: map(prop('ingredient'), dosages),
    };
  }

  async getAll(): Promise<ResolvedRecipe[]> {
    const ret: RecipeWithDosages[] = await this.prisma.recipe.findMany(
      this.FULL_RECIPE_QUERY,
    );
    return map(this.mapToResolvedRecipe, ret);
  }

  async findById(recipeId: number): Promise<Maybe<ResolvedRecipe>> {
    const res = await this.prisma.recipe.findUnique({
      ...this.FULL_RECIPE_QUERY,
      where: { id: recipeId },
    });
    return Maybe.of(res).map(this.mapToResolvedRecipe);
  }

  async findByIds(recipeIds: number[]): Promise<ResolvedRecipe[]> {
    return map(
      this.mapToResolvedRecipe,
      await this.prisma.recipe.findMany({
        ...this.FULL_RECIPE_QUERY,
        where: {
          id: {
            in: recipeIds,
          },
        },
      }),
    );
  }

  getContainingIngredientId(ingredientId: number): Promise<Recipe[]> {
    return this.getContainingIngredientIds([ingredientId]);
  }

  async getContainingIngredientIds(ingredientIds: number[]): Promise<Recipe[]> {
    return map(
      this.mapToResolvedRecipe,
      await this.prisma.recipe.findMany({
        select: {
          id: true,
          name: true,
          garnish: true,
          preparation: true,
          dosages: {
            select: {
              ingredient: true,
            },
          },
        },
        where: {
          dosages: {
            some: {
              ingredientId: {
                in: ingredientIds,
              },
            },
          },
        },
      }),
    );
  }

  getAllIngredients(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }
}
