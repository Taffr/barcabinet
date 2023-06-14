import { createCollection } from '../create-collection.js'
import { dbFind } from '../methods/db-find.js'
import type { Recipe } from '../../types/recipe.js'

export type RecipeCollection = {
  find(query?: any, projection?: any): Promise<Recipe[]>
}

export const recipeCollection = createCollection<RecipeCollection>('recipes', {
  find: dbFind
})
