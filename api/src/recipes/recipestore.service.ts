import { Injectable, Inject } from '@nestjs/common';
import { Recipe } from './documents/recipe.document';
import { CollectionReference } from '@google-cloud/firestore';

@Injectable()
export class RecipeStore {
  constructor(
    @Inject(Recipe.collectionName)
    private recipeCollection: CollectionReference<Recipe>,
  ) {}

  async getAll(): Promise<Recipe[]> {
    const snapshot = await this.recipeCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async containingIngredient(ingredientId: number): Promise<Recipe[]> {
    const allRecipes = await this.getAll();
    return allRecipes.filter(({ ingredients }) =>
      ingredients.some(({ id }) => ingredientId === id),
    );
  }
}
