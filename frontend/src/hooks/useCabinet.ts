import {
  useQuery,
} from 'react-query'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { always, prop} from 'ramda'
import type { ApplicationState } from '../state/reducer'
import { httpClient } from '../common/http/http-client'
import type { ResolvedCabinet } from '../interfaces/resolved-cabinet.interface'

export const useCabinet = () => {
  const dispatch = useDispatch()
  const { favourites, ingredients } =
    useSelector<ApplicationState, ResolvedCabinet>(prop('cabinet'))

  const fetchCabinet = async () => {
    const { data } = await httpClient.get<ResolvedCabinet>('/cabinet')
    return data
  }

  const onSuccess = (cabinet: ResolvedCabinet) => {
    dispatch({ type: 'cabinet/cabinetResolved', payload: cabinet })
  }

  const { isLoading } = useQuery('cabinet', fetchCabinet, {
    onSuccess,
    onError: always(undefined),
    retry: false,
  })

  const addToFavourites = (id: string, name: string) => {
    dispatch({ type: 'cabinet/favouriteAdded', payload: { id, name }})
    httpClient.patch('cabinet/favourites', { action: 'add', id })
  }

  const removeFromFavourites = (id: string, name: string) => {
    dispatch({ type: 'cabinet/favouriteRemoved', payload: { id, name } })
    httpClient.patch('cabinet/favourites', { action: 'remove', id })
  }

  const addToIngredients = (id: number, name: string) => {
    dispatch({ type: 'cabinet/ingredientAdded', payload: { id, name }})
    httpClient.patch('cabinet/ingredients', { action: 'add', id })
  }

  const removeFromIngredients = (id: number, name: string) => {
    dispatch({ type: 'cabinet/ingredientRemoved', payload: { id, name } })
    httpClient.patch('cabinet/ingredients', { action: 'remove', id })
  }

  return {
    isLoading,
    favourites,
    addToFavourites,
    removeFromFavourites,
    ingredients,
    addToIngredients,
    removeFromIngredients,
  }
}
