import { createCollection } from '../create-collection.js'
import { dbFind } from '../methods/db-find.js'
import type { Recipe } from '../../types/recipe.js'
import type {
  Filter,
  FindOptions,
} from 'mongodb'

export type RecipeCollection = {
  find(query?: Filter<Recipe>, opts?: FindOptions<Recipe>): Promise<Recipe[]>
}

export const recipeCollection = createCollection<RecipeCollection>('recipes', {
  find: dbFind
})
