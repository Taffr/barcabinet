import { DataTable, Then, When, setWorldConstructor } from '@cucumber/cucumber'
import { TestWorld } from '../support/test-world.js'
import queryGetAllIngredients
  from '../../src/queries/ingredients/query-get-all-ingredients.js'
import { Ingredient } from '../../src/types/ingredient.js'
import { assert } from 'chai'
import { forEach, pluck } from 'ramda'
setWorldConstructor(TestWorld)

When('I get all ingredients', function (this: TestWorld) {
  return this.runQuery(queryGetAllIngredients, {})
})

Then('I get a non-empty answer', async function (this: TestWorld) {
  const response = await this.result() as Ingredient[]
  assert.isTrue(response.length > 0)
})

Then('the following ingredients are included in the result',
  async function (this: TestWorld, dataTable: DataTable) {
    const expectedIngredientNames = pluck('name', dataTable.hashes())
    const actualNames =
      new Set(pluck('name', await this.result() as Ingredient[]))
    forEach((n: string) =>
      assert.isTrue(actualNames.has(n), `Result did not contain ${n}`)
      , expectedIngredientNames)
  })

