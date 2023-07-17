import { RecipeStore } from '../../../../src/recipes/recipestore.service';
import { Recipe } from '../../../../src/recipes/documents/recipe.document';

class MockRecipeStore {
  private recipeCollection: Recipe[] = [];

  async addRecipe(r: Recipe): Promise<Recipe> {
    this.recipeCollection.push(r);
    return Promise.resolve(r);
  }

  async getAll(): Promise<Recipe[]> {
    return Promise.resolve(this.recipeCollection);
  }
}

export default {
  classToMock: RecipeStore,
  mock: MockRecipeStore,
};
