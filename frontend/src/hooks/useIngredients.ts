import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { isEmpty, prop } from 'ramda';
import { httpClient } from '../common/http/http-client';
import type { Ingredient } from '../interfaces/ingredient.interface';

export const useIngredients = () => {
  const dispatch = useDispatch();
  const cachedIngredients: Ingredient[] =
    useSelector(prop('ingredients')) || [];
  const [ingredients, setIngredients] = useState(cachedIngredients);

  const fetchIngredients = async () => {
    if (!isEmpty(ingredients)) {
      return ingredients;
    }
    const { data } = await httpClient.get<Ingredient[]>('/recipes/ingredients');
    return data;
  };

  const onSuccess = (ingredients: Ingredient[]) => {
    dispatch({ type: 'ingredients/ingredientsFetched', payload: ingredients });
    setIngredients(ingredients);
  };

  const { isLoading } = useQuery('ingredients', fetchIngredients, {
    onSuccess,
    onError: console.error,
  });

  return { isLoading, ingredients };
};
