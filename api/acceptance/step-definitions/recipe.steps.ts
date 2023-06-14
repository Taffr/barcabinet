import { DataTable, When, Then } from '@cucumber/cucumber'
import { assert } from 'chai'
import { pluck, forEach } from 'ramda'
import { Recipe } from '../../src/types/recipe.js'
import { TestWorld } from '../support/test-world.js'
import { queryGetAllRecipes } from '../../src/queries/recipes/query-get-all-recipes.js'

When('I get all recipes', function (this: TestWorld) {
  return this.runQuery(queryGetAllRecipes, {})
})

Then('I then the following recipes are included in the result', async function (this: TestWorld, dataTable: DataTable) {
  const expectedIngredientNames = pluck('name', dataTable.hashes())
  const actualNames = new Set(pluck('name', await this.result() as Recipe[]))
  forEach((n: string) => assert.isTrue(actualNames.has(n), `Result did not contain ${n}`), expectedIngredientNames)
})
