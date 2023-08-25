import { Controller, Inject, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IRecipeStore } from './interfaces/recipe.store.interface';
import { RecipeStore } from './recipe.store';
import { Ingredient } from './interfaces/ingredient.interface';
@Controller('recipes')
export class RecipeController {
  constructor(
    @Inject(RecipeStore)
    private readonly recipeStore: IRecipeStore,
  ) {}

  @Get()
  async getAll() {
    return this.recipeStore.getAll();
  }

  @Get('ingredient/:id')
  async containingIngredient(@Param('id', ParseIntPipe) id: number) {
    return this.recipeStore.getContainingIngredientId(id);
  }

  @Get('ingredients')
  async allIngredients(): Promise<Ingredient[]> {
    const allRecipes = await this.recipeStore.getAll();
    const allIngredients = allRecipes.flatMap(({ ingredients }) => ingredients);
    const idSet = new Set<number>();
    const uniqueIngredients = allIngredients.filter(({ id }) => {
      if (idSet.has(id)) {
        return false;
      }
      idSet.add(id);
      return true;
    });
    return uniqueIngredients;
  }
}
