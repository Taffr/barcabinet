import { find, propEq } from 'ramda';

import { useFavourites } from './useFavourites';
import { useEditFavourites } from './useEditFavourites';
import { useRecipes } from './useRecipes';

export const useRecipe = (id: string | undefined) => {
  const { isLoading, recipes } = useRecipes();
  const { isInFavourites } = useFavourites();
  const editor = useEditFavourites();
  const recipe = find(propEq(id, 'id'), recipes);
  const isFavourited = id ? isInFavourites(id) : false;

  const addToFavourites = (): void => {
    if (recipe) {
      editor.addToFavourites(recipe.id, recipe.name);
    }
  };

  const removeFromFavourites = (): void => {
    if (recipe) {
      editor.removeFromFavourites(recipe.id, recipe.name);
    }
  };

  return {
    isLoading,
    recipe,
    isFavourited,
    addToFavourites,
    removeFromFavourites,
  };
};
