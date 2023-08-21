import { DataTable, Then } from '@cucumber/cucumber';
import { pluck, prop } from 'ramda';
import { AcceptanceWorld } from '../support/world';
import { assert } from 'chai';
import { Ingredient } from '@prisma/client';
import { ResolvedRecipe } from '../../../src/recipes/interfaces/resolved-recipe.interface';

Then(
  'I get recipes including the following',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedNames = dataTable.hashes().map((h) => h.name);
    const recipes: ResolvedRecipe[] = this.response.body;

    recipes.forEach((r) => {
      assert.hasAllKeys(r, [
        'name',
        'ingredients',
        'id',
        'garnish',
        'preparation',
      ]);
    });

    const resultNames = recipes.map(prop('name'));
    assert.includeDeepMembers(resultNames, expectedNames);
  },
);

Then(
  'I get ingredients including the following',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedIngredients: string[] = dataTable.hashes().map(prop('name'));
    const resultIngredients: Ingredient[] = this.response.body;
    assert.includeDeepMembers(
      pluck('name', resultIngredients),
      expectedIngredients,
    );
  },
);
