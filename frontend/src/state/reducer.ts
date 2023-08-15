import { userReducer } from './userReducer';
import { recipeReducer } from './recipeReducer';
import { ingredientReducer } from './ingredientReducer';
import { cabinetReducer } from './cabinetReducer';
import { favouriteReducer } from './favouriteReducer';
import type { User } from '../interfaces/user.interface';
import type { Recipe } from '../interfaces/recipe.interface';
import type { Ingredient } from '../interfaces/ingredient.interface';
import type { Favourite, FavouriteAction } from './favouriteReducer';
import type { CabinetAction, CabinetEntry } from './cabinetReducer';
import type { IngredientAction } from './ingredientReducer';
import type { RecipeAction } from './recipeReducer';

export interface ApplicationState {
  user?: User;
  ingredients: Ingredient[];
  recipes: Recipe[];
  favourites: Favourite[];
  cabinet: CabinetEntry[];
}

const initialApplicationState: ApplicationState = {
  ingredients: [],
  recipes: [],
  favourites: [],
  cabinet: [],
};

type BarcabinetAction = FavouriteAction &
  CabinetAction &
  IngredientAction &
  RecipeAction;

export const rootReducer = (
  state = initialApplicationState,
  action: BarcabinetAction,
) => {
  return {
    user: userReducer(state.user, action),
    ingredients: ingredientReducer(state.ingredients, action),
    recipes: recipeReducer(state.recipes, action),
    favourites: favouriteReducer(state.favourites, action),
    cabinet: cabinetReducer(state.cabinet, action),
  };
};
