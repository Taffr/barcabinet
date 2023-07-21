import { Reducer } from 'redux'
import type { Recipe } from '../interfaces/recipe.interface'

export const recipeReducer: Reducer = (
  state: Recipe[] | undefined = undefined,
  action
) => {
  switch(action.type) {
    case 'recipes/recipesFetched':
      return action.payload
    default:
      return state
  }
}

