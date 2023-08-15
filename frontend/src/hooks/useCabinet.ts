import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { pluck, prop } from 'ramda';
import { useUser } from './useUser';
import { httpClient } from '../common/http/http-client';
import type { CabinetFetchedAction } from '../state/cabinetReducer';
import type { ApplicationState } from '../state/reducer';
import type { Ingredient } from '../interfaces/ingredient.interface';

export const useCabinet = () => {
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();
  const cabinet = useSelector<ApplicationState, number[]>(prop('cabinet'));

  const fetchCabinet = async (): Promise<number[]> => {
    if(!isSignedIn) {
      return cabinet;
    }
    const { data } = await httpClient.get<Pick<Ingredient, 'name' | 'id'>[]>('/cabinet');
    return pluck('id', data);
  };

  const onSuccess = (cabinet: number[]) => {
    const action: CabinetFetchedAction = {
      type: 'cabinet/cabinetFetched',
      payload: cabinet,
    };
    dispatch(action);
  };

  const { isLoading } = useQuery('cabinet', fetchCabinet, {
    onSuccess,
    onError: console.error,
    retry: false,
  });

  const idSet = new Set(cabinet);
  const isInCabinet = (id: number) => idSet.has(id);

  return {
    isLoading,
    cabinet,
    isInCabinet,
  };
};
