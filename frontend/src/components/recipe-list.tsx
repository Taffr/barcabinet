import { LinearProgress, Stack, Typography } from '@mui/material';
import { useReducer } from 'react';
import { any, curry, reduce, map, pluck } from 'ramda';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeListItem } from './recipe-list-item';
import { RecipeFilterControls } from './recipe-filter-controls';
import { useCabinet } from '../hooks/useCabinet';
import { useFavourites } from '../hooks/useFavourites';
import type { Recipe } from '../interfaces/recipe.interface';

type RecipeFilters = {
  excludeNonFavourites: boolean;
  excludeNotInCabinet: boolean;
};

type ReducerState = { filteredRecipes: Recipe[]; filters: RecipeFilters };

type ExcludeFilterAction = {
  type: 'excludeNotInCabinet';
  isToggled: boolean;
};

type ExcludeNonFavouriteFilterAction = {
  type: 'excludeNonFavourites';
  isToggled: boolean;
};
type FilterAction = ExcludeFilterAction | ExcludeNonFavouriteFilterAction;

export const RecipeList = () => {
  const { isLoading, recipes } = useRecipes();
  const { isInCabinet } = useCabinet();
  const { isInFavourites } = useFavourites();
  const initialState: ReducerState = {
    filteredRecipes: recipes,
    filters: { excludeNotInCabinet: false, excludeNonFavourites: false },
  };

  const applyFilters = curry((filters: RecipeFilters, current: Recipe[]) => {
    return reduce(
      (acc: Recipe[], recipe: Recipe) => {
        const { id, ingredients } = recipe;
        if (filters.excludeNonFavourites && !isInFavourites(id)) {
          return acc;
        }
        if (
          filters.excludeNotInCabinet &&
          !any(isInCabinet, pluck('id', ingredients))
        ) {
          return acc;
        }
        acc.push(recipe);
        return acc;
      },
      [] as Recipe[],
      current,
    );
  });

  const recipeFilterReducer = (state: ReducerState, action: FilterAction) => {
    const { filteredRecipes, filters } = state;
    const { type, isToggled } = action;
    switch (type) {
      case 'excludeNotInCabinet': {
        const newFilters = { ...filters, excludeNotInCabinet: isToggled };
        const applyNewFilters = applyFilters(newFilters);
        const applied = isToggled
          ? applyNewFilters(filteredRecipes)
          : applyNewFilters(recipes);
        return { filteredRecipes: applied, filters: newFilters };
      }
      case 'excludeNonFavourites': {
        const newFilters = { ...filters, excludeNonFavourites: isToggled };
        const applyNewFilters = applyFilters(newFilters);
        const applied = isToggled
          ? applyNewFilters(filteredRecipes)
          : applyNewFilters(recipes);
        return { filteredRecipes: applied, filters: newFilters };
      }
    }
  };

  const [{ filteredRecipes }, dispatch] = useReducer(
    recipeFilterReducer,
    initialState,
  );

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <LinearProgress color="inherit" />
        <Typography>Loading recipes...</Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <RecipeFilterControls
        onIngredientFilterToggled={(b) =>
          dispatch({ type: 'excludeNotInCabinet', isToggled: b })
        }
        onFavouriteFilterToggled={(b) =>
          dispatch({ type: 'excludeNonFavourites', isToggled: b })
        }
      />
      {map(
        (r) => (
          <RecipeListItem {...r} />
        ),
        filteredRecipes,
      )}
    </Stack>
  );
};
