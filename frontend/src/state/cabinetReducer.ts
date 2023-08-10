import { AnyAction, Reducer } from 'redux';
import { append, equals, includes, reject } from 'ramda';
import type { ResolvedCabinet } from '../interfaces/resolved-cabinet.interface';

export const cabinetReducer: Reducer = (
  state: ResolvedCabinet = { favourites: [], ingredients: [] },
  action: AnyAction,
) => {
  switch (action.type) {
    case 'cabinet/cabinetResolved': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'cabinet/favouriteAdded': {
      const currentFavourites = state.favourites;
      const alreadyInFavourites = includes(action.payload, currentFavourites);
      const withAdded = alreadyInFavourites
        ? currentFavourites
        : append(action.payload, currentFavourites);

      return {
        ...state,
        favourites: withAdded,
      };
    }
    case 'cabinet/favouriteRemoved': {
      const currentFavourites = state.favourites;
      return {
        ...state,
        favourites: reject(equals(action.payload), currentFavourites),
      };
    }
    case 'cabinet/ingredientAdded': {
      const currentIngredients = state.ingredients;
      const alreadyInIngredients = includes(action.payload, currentIngredients);
      const withAdded = alreadyInIngredients
        ? currentIngredients
        : append(action.payload, currentIngredients);

      return {
        ...state,
        ingredients: withAdded,
      };
    }
    case 'cabinet/ingredientRemoved': {
      const currentingredients = state.ingredients;
      return {
        ...state,
        ingredients: reject(equals(action.payload), currentingredients),
      };
    }
    default:
      return state;
  }
};
