import { DataTable, Given, When, Then } from '@cucumber/cucumber';
import * as request from 'supertest';
import { AcceptanceWorld } from '../support/world';
import { RecipeStore } from '../../../src/recipes/recipestore.service';
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
          return { id, name: namePart };
        });

      const recipe: Recipe = {
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
  await this.handleResponse(request(this.app.getHttpServer()).get(route));
});

Then('I get recipes with the following names', function (dataTable: DataTable) {
  const expectedNames = dataTable.hashes().map((h) => h.name);
  const resultNames = this.response.body.map(({ name }) => name);
  assert.deepEqual(expectedNames, resultNames);
});
