import {
  append,
  equals,
  includes,
  map,
  pick,
  reject,
} from 'ramda';
import { Recipe } from '../interfaces/recipe.interface';

export type Favourite = Pick<Recipe, 'name' | 'id'>;
export type FavouritesFetchedAction = {
  type: 'favourites/favouritesFetched';
  payload: Recipe[];
};

export type FavouriteAddedAction = {
  type: 'favourites/favouriteAdded';
  payload: Favourite;
};

export type FavouriteRemovedAction = {
  type: 'favourites/favouriteRemoved';
  payload: Favourite;
};

export type FavouriteAction =
  | FavouritesFetchedAction
  | FavouriteAddedAction
  | FavouriteRemovedAction;

export const favouriteReducer = (
  state: Favourite[] = [],
  action: FavouriteAction,
) => {
  switch (action.type) {
    case 'favourites/favouritesFetched': {
      const picked = map(pick(['id', 'name']), action.payload);
      return picked;
    }
    case 'favourites/favouriteAdded': {
      const alreadyInFavourites = includes(action.payload, state);
      const withAdded = alreadyInFavourites
        ? state
        : append(action.payload, state);
      return withAdded;
    }
    case 'favourites/favouriteRemoved':
      return reject(equals(action.payload), state);
    default:
      return state;
  }
};
