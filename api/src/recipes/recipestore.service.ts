import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../schemas/recipe.schema';

@Injectable()
export class RecipeStore {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async getAll() {
    return this.recipeModel.find().exec();
  }

  async containingIngredient(ingredientId: number) {
    const allRecipes = await this.recipeModel.find().exec();
    const containingIngredient = allRecipes.filter(({ ingredients }) =>
      ingredients.some(({ id }) => id === ingredientId),
    );
    return containingIngredient;
  }
}
