import {
  useEffect,
  useState,
} from 'react'
import {
  compose,
  prop,
} from 'ramda'
import axios from 'axios'
import type { Ingredient } from '../interfaces/ingredient.interface'

type UseIngredientsReturn = { isLoading: boolean, ingredients: Ingredient[] }
export const useIngredients = (): UseIngredientsReturn => {
  const [ ingredients, setIngredients ] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BARCABINET_API_URL}/recipes/ingredients`)
      .then(compose(setIngredients, prop('data')))
      .catch(console.error)
  }, [])

  return { isLoading: ingredients.length === 0, ingredients }
}

