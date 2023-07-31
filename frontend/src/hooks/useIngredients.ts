import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { prop } from 'ramda'
import axios from 'axios'
import type { Ingredient } from '../interfaces/ingredient.interface'

export const useIngredients = () => {
  const dispatch = useDispatch()
  const cachedIngredients: Ingredient[] = useSelector(prop('ingredients')) || []
  const [ ingredients, setIngredients ] = useState(cachedIngredients)

  const fetchIngredients = async () => {
    const { data } = await axios.get<Ingredient[]>(
      `${import.meta.env.VITE_BARCABINET_API_URL}/recipes/ingredients`
    )
    return data
  }

  const onSuccess = (ingredients: Ingredient[]) => {
    dispatch({ type: 'ingredient/ingredientsFetched', payload: ingredients })
    setIngredients(ingredients)
  }

  const { isLoading } = useQuery('ingredients', fetchIngredients, {
    onSuccess,
    onError: console.error,
  })

  return { isLoading, ingredients }
}

