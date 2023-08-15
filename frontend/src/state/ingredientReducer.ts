import type { Ingredient } from '../interfaces/ingredient.interface';

export type IngredientFetchedAction = {
  type: 'ingredients/ingredientsFetched';
  payload: Ingredient[];
};

export type IngredientAction = IngredientFetchedAction;
export const ingredientReducer = (
  state: Ingredient[] = [],
  action: IngredientAction,
) => {
  switch (action.type) {
    case 'ingredients/ingredientsFetched':
      return action.payload;
    default:
      return state;
  }
};
