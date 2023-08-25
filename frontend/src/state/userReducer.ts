import type { User } from '../interfaces/user.interface';

export type UserLoggedInAction = {
  type: 'user/userLoggedIn';
  payload: User;
};

export type UserLoggedOutAction = {
  type: 'user/userLoggedOut';
};

export type UserAction = UserLoggedInAction | UserLoggedOutAction;

export const userReducer = (
  state: User | undefined = undefined,
  action: UserAction,
) => {
  switch (action.type) {
    case 'user/userLoggedIn':
      return { ...action.payload };
    case 'user/userLoggedOut':
      return undefined;
    default:
      return state;
  }
};
