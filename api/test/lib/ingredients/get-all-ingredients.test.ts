import { assert } from 'chai'
import { factory } from '../../../src/lib/ingredients/getAllIngredients.js'
import { RecipeCollection }
  from '../../../src/db/collections/recipe-collection.js'
import { Ingredient } from '../../../src/types/ingredient.js'
import { ObjectId } from 'mongodb'

describe('getAllIngredients', () => {
  const noRecipesStub: RecipeCollection = {
    find: () => {
      return Promise.resolve([])
    }
  }

  const recipesStub: RecipeCollection = {
    find: () => {
      return Promise.resolve([
        {
          _id: new ObjectId(),
          name: 'foo',
          description: 'a',
          ingredients: [
            { id: 0, name: 'Whisky' },
            { id: 1, name: 'Vodka' },
            { id: 2, name: 'Gin' },
          ]
        },
        {
          _id: new ObjectId(),
          name: 'bar',
          description: 'a',
          ingredients: [
            { id: 4, name: 'Ginger Beer' },
            { id: 1, name: 'Vodka' },
          ]
        }
      ])
    }
  }

  it('handles no recipes', async () => {
    const subject = factory(noRecipesStub)
    const result = await subject()
    const expected: Ingredient[] = []
    assert.deepEqual(result, expected)
  })

  it('handles several recipes', async () => {
    const subject = factory(recipesStub)
    const result = await subject()
    const expected: Ingredient[] = [
      { id: 0, name: 'Whisky' },
      { id: 1, name: 'Vodka' },
      { id: 2, name: 'Gin' },
      { id: 4, name: 'Ginger Beer' },
    ]
    assert.sameDeepMembers(result, expected)
  })
})
