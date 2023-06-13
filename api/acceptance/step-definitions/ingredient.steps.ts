import { After, When, Then, setWorldConstructor } from '@cucumber/cucumber'
import { TestWorld } from '../support/test-world.js'
import { queryGetAllIngredients } from '../../src/queries/ingredients/query-get-all-ingredients.js'
import { Ingredient } from '../../src/types/ingredient.js'
import { assert } from 'chai'
import { MongoConnection } from '../../src/db/mongo-connection.js'

setWorldConstructor(TestWorld)

When('I get all ingredients', function(this: TestWorld) {
  return this.runQuery(queryGetAllIngredients, {})
})

Then('I get a non-empty answer', async function(this: TestWorld) {
  const response = await this.result() as Ingredient[]
  assert.isTrue(response.length > 0)
})

After(async () => await MongoConnection.getInstance().disconnect())
