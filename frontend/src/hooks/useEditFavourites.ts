import { useDispatch } from 'react-redux';
import { httpClient } from '../common/http/http-client';
import type {
  FavouriteAddedAction,
  FavouriteRemovedAction,
} from '../state/favouriteReducer';
import { useUser } from './useUser';

export const useEditFavourites = () => {
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();

  const addToFavourites = (id: string, name: string) => {
    const action: FavouriteAddedAction = {
      type: 'favourites/favouriteAdded',
      payload: { id, name },
    };
    dispatch(action);
    if (isSignedIn) {
      httpClient.patch('favourites', { action: 'add', id });
    }
  };

  const removeFromFavourites = (id: string, name: string) => {
    const action: FavouriteRemovedAction = {
      type: 'favourites/favouriteRemoved',
      payload: { id, name },
    };
    dispatch(action);
    if (isSignedIn) {
      httpClient.patch('favourites', { action: 'remove', id });
    }
  };

  return {
    addToFavourites,
    removeFromFavourites,
  };
};
