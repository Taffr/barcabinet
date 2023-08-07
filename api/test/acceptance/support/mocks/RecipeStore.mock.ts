import { any, filter, head } from 'ramda';
import { Recipe } from '../../../../src/recipes/documents/recipe.document';
import { Maybe } from '../../../../src/util/Maybe';
import { IRecipeStore } from '../../../../src/recipes/interfaces/recipe.store.interface';
import { RecipeStore } from '../../../../src/recipes/recipe.store';

class MockRecipeStore implements IRecipeStore {
  private recipeCollection: Recipe[] = [];

  add(r: Recipe): Promise<string> {
    this.recipeCollection.push(r);
    return Promise.resolve(r.id);
  }

  getAll(): Promise<Recipe[]> {
    return Promise.resolve(this.recipeCollection);
  }

  async findById(recipeId: string): Promise<Maybe<Recipe>> {
    return Maybe.of(head(await this.findByIds([recipeId])));
  }

  findByIds(recipeIds: string[]): Promise<Recipe[]> {
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
