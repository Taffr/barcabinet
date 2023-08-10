import { Reducer } from 'redux';
import type { Ingredient } from '../interfaces/ingredient.interface';

export const ingredientReducer: Reducer = (
  state: Ingredient[] | undefined = undefined,
  action,
) => {
  switch (action.type) {
    case 'ingredients/ingredientsFetched':
      return action.payload;
    default:
      return state;
  }
};
