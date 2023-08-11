import { Injectable, Inject } from '@nestjs/common';
import { Recipe } from './documents/recipe.document';
import { CollectionReference } from '@google-cloud/firestore';
import { any, filter, head, isEmpty } from 'ramda';
import { Maybe } from '../util/Maybe';
import { IRecipeStore } from './interfaces/recipe.store.interface';

@Injectable()
export class RecipeStore implements IRecipeStore {
  constructor(
    @Inject(Recipe.collectionName)
    private recipeCollection: CollectionReference<Recipe>,
  ) {}

  async add(r: Recipe): Promise<string> {
    const ref = await this.recipeCollection.add(r);
    return ref.id;
  }

  getAll() {
    return this.recipeCollection
      .get()
      .then((ss) => ss.docs.map((d) => d.data()));
  }

  findById(recipeId) {
    return this.recipeCollection
      .where('id', '==', recipeId)
      .get()
      .then((ss) => ss.docs.map((d) => d.data()))
      .then((docs) => Maybe.of(head(docs)));
  }

  findByIds(recipeIds) {
    if (isEmpty(recipeIds)) {
      return Promise.resolve([]);
    }
    return this.getAll().then((all) =>
      all.filter((r) => recipeIds.includes(r.id)),
    );
  }

  getContainingIngredientId(ingredientId) {
    return this.getContainingIngredientIds([ingredientId]);
  }

  getContainingIngredientIds(ingredientIds) {
    const idsToFind = new Set(ingredientIds);
    return this.getAll().then(
      filter(({ ingredients }) =>
        any(({ id }) => idsToFind.has(id), ingredients),
      ),
    );
  }
}
