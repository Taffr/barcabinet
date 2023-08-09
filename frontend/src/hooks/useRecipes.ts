import {
  useState,
} from 'react'
import {
  useQuery,
} from 'react-query'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { httpClient } from '../common/http/http-client'
import {
  isEmpty,
  prop,
} from 'ramda'
import type { Recipe } from '../interfaces/recipe.interface'

export const useRecipes = () => {
  const cachedRecipes: Recipe[] = useSelector(prop('recipes')) || []
  const dispatch = useDispatch()
  const [ recipes, setRecipes ] = useState(cachedRecipes)

  const fetchRecipes = async () => {
    if (!isEmpty(recipes)) {
      return recipes
    }
    const { data } = await httpClient.get<Recipe[]>('/recipes')
    return data
  }

  const onSuccess = (recipes: Recipe[]) => {
    dispatch({ type: 'recipes/recipesFetched', payload: recipes })
    setRecipes(recipes)
  }

  const { isLoading } = useQuery('recipes', fetchRecipes, {
    onSuccess,
    onError: console.error,
  })

  return { isLoading, recipes }
}
