import {
  useSelector
} from 'react-redux'
import { prop } from 'ramda'
import type { User } from '../interfaces/user.interface'


type useUserReturn =
  { isLoggedIn: true, user: User } | { isLoggedIn: false, user: undefined }

export const useUser = (): useUserReturn => {
  const user = useSelector(prop('user')) as User | undefined

  const isLoggedIn = user !== undefined

  if (isLoggedIn) {
    return {
      user,
      isLoggedIn,
    }
  }

  return {
    user: undefined,
    isLoggedIn
  }
}
