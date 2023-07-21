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
import axios from 'axios'
import {
  isEmpty,
  prop,
} from 'ramda'
import type { Recipe } from '../interfaces/recipe.interface'

export const useRecipes = () => {
  const cachedRecipes = useSelector<Recipe[] | undefined>(prop('recipes'))
  const dispatch = useDispatch()
  const [ recipes, setRecipes ] = useState(cachedRecipes || [])

  const fetchRecipes = async () => {
    if (!isEmpty(recipes)) {
      return recipes
    }
    const { data } = await axios.get<Recipe[]>(
      `${import.meta.env.VITE_BARCABINET_API_URL}/recipes`
    )
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
