import { recipeCollection, RecipeCollection } from '../../db/collections/recipe-collection.js'
import { Ingredient } from '../../types/ingredient.js'
import { chain, prop, uniq } from 'ramda'

export function factory (recipeCollection: RecipeCollection) {
  return function getAllIngredients (): Promise<Ingredient[]> {
    return recipeCollection.find()
      .then(chain(prop('ingredients')))
      .then(uniq)
  }
}
export const getAllIngredients = factory(recipeCollection)
