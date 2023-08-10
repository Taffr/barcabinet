import { Reducer } from 'redux';
import type { User } from '../interfaces/user.interface';

export type UserState = User | undefined;

export const userReducer: Reducer = (state: UserState = undefined, action) => {
  switch (action.type) {
    case 'user/userLoggedIn':
      return { ...action.payload };
    default:
      return state;
  }
};
