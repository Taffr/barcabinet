import { DataTable, Given, When, Then } from '@cucumber/cucumber';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';
import { RecipeStore } from '../../../src/recipes/recipe.store';
import { Recipe } from '../../../src/recipes/documents/recipe.document';
import { Ingredient } from '../../../src/recipes/interfaces/ingredient.interface';
import { assert } from 'chai';

Given(
  'the following recipes exists',
  async function (this: AcceptanceWorld, dataTable: DataTable) {
    const hashes = dataTable.hashes();
    const recipesToInsert = hashes.map((r) => {
      const ingredientsRaw = r.ingredients;
      const parsedIngredients: Ingredient[] = ingredientsRaw
        .split('), ')
        .map((rawIngredient) => {
          const [idPart, namePart] = rawIngredient.split(', ');
          const id = Number(idPart.match(/\d+/)[0]);
          const name = namePart.match(/[A-z-åäö+\s*]+/)[0];
          return { id, name };
        });

      const recipe: Recipe = {
        id: r.id,
        name: r.name,
        ingredients: parsedIngredients,
        ...(r.garnish && { garnish: r.garnish }),
        preparation: r.preparation,
      };
      return recipe;
    });
    const recipeStore: RecipeStore = this.app.get(RecipeStore);
    return Promise.all(recipesToInsert.map((r) => recipeStore.addRecipe(r)));
  },
);

When('I GET {string}', async function (this: AcceptanceWorld, route: string) {
  await this.handleResponse(
    request(this.app.getHttpServer())
      .get(route)
      .set('Authorization', `Bearer ${this.token}`),
  );
});

Then(
  'I get recipes with the following names',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedNames = dataTable.hashes().map((h) => h.name);
    const resultNames = this.response.body.map(({ name }) => name);
    assert.deepEqual(expectedNames, resultNames);
  },
);

Then(
  'I get the following ingredients',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedIngredients: Ingredient[] = dataTable
      .hashes()
      .map((ingRaw) => {
        return { id: Number(ingRaw.id), name: ingRaw.name };
      });

    const resultIngredients = this.response.body;
    assert.deepEqual(expectedIngredients, resultIngredients);
  },
);
