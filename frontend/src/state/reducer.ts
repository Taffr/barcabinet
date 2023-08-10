import { AnyAction, Reducer } from 'redux';
import { userReducer } from './userReducer';
import { recipeReducer } from './recipeReducer';
import { ingredientReducer } from './ingredientReducer';
import { cabinetReducer } from './cabinetReducer';
import type { User } from '../interfaces/user.interface';
import type { Recipe } from '../interfaces/recipe.interface';
import type { Ingredient } from '../interfaces/ingredient.interface';
import type { ResolvedCabinet } from '../interfaces/resolved-cabinet.interface';

export interface ApplicationState {
  user?: User;
  ingredients: Ingredient[];
  recipes: Recipe[];
  cabinet: ResolvedCabinet;
}
const initialApplicationState: ApplicationState = {
  ingredients: [],
  recipes: [],
  cabinet: {
    favourites: [],
    ingredients: [],
  },
};

export const rootReducer: Reducer = (
  state = initialApplicationState,
  action: AnyAction,
) => {
  return {
    user: userReducer(state.user, action),
    ingredients: ingredientReducer(state.ingredients, action),
    recipes: recipeReducer(state.recipes, action),
    cabinet: cabinetReducer(state.cabinet, action),
  };
};
