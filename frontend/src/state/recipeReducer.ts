import { Reducer } from 'redux';
import type { Recipe } from '../interfaces/recipe.interface';

export type RecipeFetchedAction = {
  type: 'recipes/recipesFetched';
  payload: Recipe[];
};
export type RecipeAction = RecipeFetchedAction;

export const recipeReducer: Reducer = (state: Recipe[] = [], action) => {
  switch (action.type) {
    case 'recipes/recipesFetched':
      return action.payload;
    default:
      return state;
  }
};
