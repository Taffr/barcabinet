import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { prop } from 'ramda';
import { httpClient } from '../common/http/http-client';
import type { User } from '../interfaces/user.interface';
import type { UserLoggedInAction } from '../state/userReducer';

export const useUser = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');
  const user = useSelector(prop('user'));
  const [ isSignedIn, setIsSignedIn ] = useState(false);

  const fetchUser = async () => {
    if (!token) {
      return undefined;
    }

    const { data } = await httpClient.get<User>('/profile');
    return data;
  };

  const onSuccess = (user: User | undefined) => {
    if (!user) {
      setIsSignedIn(false);
      return;
    }
    const action: UserLoggedInAction = { type: 'user/userLoggedIn', payload: user };
    dispatch(action);
    setIsSignedIn(true);
  };

  const onError = () => {
    localStorage.removeItem('access_token');
    setIsSignedIn(false);
  };

  const { isLoading } = useQuery('profile', fetchUser, {
    onSuccess,
    onError,
    retry: false,
  });

  return { user, isLoading, isSignedIn };
};
