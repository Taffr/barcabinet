import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { prop } from 'ramda'
import { httpClient } from '../common/http/http-client'
import type { User } from '../interfaces/user.interface'

type useUserReturn = {
  isLoading: boolean,
  user: User | undefined
}

export const useUser = (): useUserReturn => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('access_token')
  const cachedUser = useSelector(prop('user'))
  const [ user, setUser ] = useState<User | undefined>(cachedUser)

  const fetchUser = async () => {
    if (user !== undefined) {
     return user
    }
    if (!token) {
      return undefined
    }
    const { data } = await httpClient.get<User>('/profile')
    return data
  }

  const onSuccess = (user: User | undefined) => {
    if (user !== undefined) {
      dispatch({ type: 'user/userLoggedIn', payload: user })
    }
    setUser(user)
  }

  const onError = () => {
    setUser(undefined)
    localStorage.removeItem('access_token')
  }

  const { isLoading } = useQuery('profile', fetchUser, {
    onSuccess,
    onError,
    retry: 0,
  })

  return { user, isLoading }
}
