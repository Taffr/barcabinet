import { Injectable, Inject } from '@nestjs/common';
import { Recipe } from './documents/recipe.document';
import { CollectionReference } from '@google-cloud/firestore';
import { any, filter } from 'ramda';

@Injectable()
export class RecipeStore {
  constructor(
    @Inject(Recipe.collectionName)
    private recipeCollection: CollectionReference<Recipe>,
  ) {}

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  async addRecipe(r: Recipe) {
    throw new Error('Not implemented!');
  }

  async getAll(): Promise<Recipe[]> {
    const snapshot = await this.recipeCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  getByIds(recipeIds: string[]): Promise<Recipe[]> {
    return this.recipeCollection
      .where('id', 'in', recipeIds)
      .get()
      .then((ss) => ss.docs.map((d) => d.data()));
  }

  getContainingIngredientId(ingredientId: number) {
    return this.getContainingIngredientIds([ingredientId]);
  }

  getContainingIngredientIds(ingredientIds: number[]): Promise<Recipe[]> {
    const idsToFind = new Set(ingredientIds);
    return this.getAll().then(
      filter(({ ingredients }) =>
        any(({ id }) => idsToFind.has(id), ingredients),
      ),
    );
  }
}
