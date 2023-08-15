import { useDispatch } from 'react-redux';
import { httpClient } from '../common/http/http-client';
import type {
  CabinetEntryAddedAction,
  CabinetEntryRemovedAction,
} from '../state/cabinetReducer';
import { useUser } from './useUser';

export const useEditCabinet = () => {
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();

  const addToCabinet = (id: number) => {
    const action: CabinetEntryAddedAction = {
      type: 'cabinet/cabinetEntryAdded',
      payload: id,
    };
    dispatch(action);
    if (isSignedIn) {
      httpClient.patch('cabinet', { action: 'add', id });
    }
  };

  const removeFromCabinet = (id: number) => {
    const action: CabinetEntryRemovedAction = {
      type: 'cabinet/cabinetEntryRemoved',
      payload: id,
    };
    dispatch(action);
    if (isSignedIn) {
      httpClient.patch('cabinet', { action: 'remove', id });
    }
  };

  return {
    addToCabinet,
    removeFromCabinet,
  };
};
