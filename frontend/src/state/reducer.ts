import { Reducer } from 'redux'
import { userReducer } from './userReducer'
import { recipeReducer } from './recipeReducer'
import { ingredientReducer } from './ingredientReducer'
import type { User } from '../interfaces/user.interface'
import type { Recipe } from '../interfaces/recipe.interface'
import type { Ingredient } from '../interfaces/ingredient.interface'

interface ApplicationState {
  user?: User,
  ingredients?: Ingredient[],
  recipes?: Recipe[],
}

export const rootReducer: Reducer = (
  state: ApplicationState = {},
  action,
) => {
  return {
    user: userReducer(state.user, action),
    ingredients: ingredientReducer(state.ingredients, action),
    recipes: recipeReducer(state.recipes, action),
  }
}

