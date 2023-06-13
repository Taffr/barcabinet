import type { Query } from '../../rest/query.js'
import type { Ingredient } from '../../types/ingredient.js'
import { recipeCollection } from '../../db/collections/recipe-collection.js'

const queryGetAllIngredients: Query<string, Ingredient[]> = {
  statusCode: 200,
  route: '/ingredients',
  runQuery: recipeCollection.find,
}

export { queryGetAllIngredients }
