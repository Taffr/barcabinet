import { Query } from '../../rest/query.js'
import { Recipe } from '../../types/recipe.js'
import { recipeCollection } from '../../db/collections/recipe-collection.js'

const queryGetAllRecipes: Query<unknown, Recipe[]> = {
  statusCode: 200,
  route: '/recipes',
  runQuery: () => recipeCollection.find()
}

export default queryGetAllRecipes

