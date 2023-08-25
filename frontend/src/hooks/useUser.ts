import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { prop } from 'ramda';
import { httpClient } from '../common/http/http-client';
import type { User } from '../interfaces/user.interface';
import type { UserLoggedInAction } from '../state/userReducer';
import type { ApplicationState } from '../state/reducer';

export const useUser = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');
  const user = useSelector<ApplicationState, User | undefined>(prop('user'));

  const fetchUser = async () => {
    if (!token) {
      return undefined;
    }

    const { data } = await httpClient.get<User>('/profile');
    return data;
  };

  const onSuccess = (user: User | undefined) => {
    if (!user) {
      return;
    }
    const action: UserLoggedInAction = {
      type: 'user/userLoggedIn',
      payload: user,
    };
    dispatch(action);
  };

  const onError = () => {
    localStorage.removeItem('access_token');
  };

  const { isLoading } = useQuery('profile', fetchUser, {
    onSuccess,
    onError,
    retry: false,
  });

  return { user, isLoading, isSignedIn: user !== undefined };
};
