import { any, filter } from 'ramda';
import { RecipeStore } from '../../../../src/recipes/recipestore.service';
import { Recipe } from '../../../../src/recipes/documents/recipe.document';

class MockRecipeStore {
  private recipeCollection: Recipe[] = [];

  addRecipe(r: Recipe): Promise<Recipe> {
    this.recipeCollection.push(r);
    return Promise.resolve(r);
  }

  getAll(): Promise<Recipe[]> {
    return Promise.resolve(this.recipeCollection);
  }

  getByIds(recipeIds: string[]): Promise<Recipe[]> {
    return Promise.resolve(
      filter(({ id }) => recipeIds.includes(id), this.recipeCollection),
    );
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

export default {
  classToMock: RecipeStore,
  mock: MockRecipeStore,
};
