import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { pluck, prop } from 'ramda';
import type { ApplicationState } from '../state/reducer';
import type {
  Favourite,
  FavouritesFetchedAction,
} from '../state/favouriteReducer';

import type { Recipe } from '../interfaces/recipe.interface';
import { httpClient } from '../common/http/http-client';
import { useUser } from './useUser';

export const useFavourites = () => {
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();
  const favourites = useSelector<ApplicationState, Favourite[]>(
    prop('favourites'),
  );

  const fetchFavourites = async () => {
    if (!isSignedIn) {
      return favourites;
    }
    const { data } = await httpClient.get<Recipe[]>('/favourites');
    return data;
  };

  const onSuccess = (favourites: Recipe[]) => {
    const action: FavouritesFetchedAction = {
      type: 'favourites/favouritesFetched',
      payload: favourites,
    };
    dispatch(action);
  };

  const { isLoading } = useQuery('favourites', fetchFavourites, {
    onSuccess,
    onError: console.error,
    retry: false,
  });

  const idSet = new Set(pluck('id', favourites));
  const isInFavourites = (id: string) => idSet.has(id);

  return {
    isLoading,
    favourites,
    isInFavourites,
  };
};
