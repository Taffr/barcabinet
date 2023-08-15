import type { User } from '../interfaces/user.interface';

export type UserLoggedInAction = {
  type: 'user/userLoggedIn',
  payload: User,
};

export type UserAction = UserLoggedInAction;
export const userReducer = (
  state: User | undefined = undefined,
  action: UserAction,
) => {
  switch (action.type) {
    case 'user/userLoggedIn':
      return { ...action.payload };
    default:
      return state;
  }
};
