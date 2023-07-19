import { userReducer } from './userReducer'
import { Reducer } from 'redux'

interface ApplicationState {
  user?: { name: string, id: string },
}

export const rootReducer: Reducer = (
  state: ApplicationState= {},
  action,
) => {
  return {
    user: userReducer(state.user, action),
  }
}

