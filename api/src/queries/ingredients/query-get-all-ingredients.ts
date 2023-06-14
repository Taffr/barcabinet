import type { Query } from '../../rest/query.js'
import type { Ingredient } from '../../types/ingredient.js'
import { getAllIngredients } from '../../lib/ingredients/getAllIngredients.js'

const queryGetAllIngredients: Query<any, Ingredient[]> = {
  statusCode: 200,
  route: '/ingredients',
  runQuery: getAllIngredients,
}

export default queryGetAllIngredients
