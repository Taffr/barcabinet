import {
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import {
  compose,
  prop,
} from 'ramda'
import type { Recipe } from '../interfaces/recipe.interface'

type UseRecipesReturn = { isLoading: boolean, recipes: Recipe[] }

export const useRecipes = (): UseRecipesReturn => {
  const [ recipes, setRecipes ] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BARCABINET_API_URL}/recipes`)
      .then(compose(setRecipes, prop('data')))
      .catch(console.error)
  }, [])

  return { isLoading: recipes.length === 0, recipes }
}
