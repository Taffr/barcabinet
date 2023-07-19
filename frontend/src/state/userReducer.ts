import { Reducer } from 'redux'
type UserState = { name: string } | undefined

export const userReducer: Reducer = (
  state: UserState = undefined,
  action
) => {
  switch(action.type) {
    case 'user/userLoggedIn':
      return { ...state, ... action.payload }
    default:
      return state
  }
}

