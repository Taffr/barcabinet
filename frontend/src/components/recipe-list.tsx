import { LinearProgress, List, Stack, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { add, any, curry, map, pluck, reduce, take } from 'ramda';
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

const INITIAL_RECIPE_LIMIT = 20;
const ON_SCROLL_RECIPE_INC = 5;

const increaseRecipesShown = add(ON_SCROLL_RECIPE_INC);
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
  const [ showNumberRecipes, setShowNumberRecipes ] = useState(INITIAL_RECIPE_LIMIT);
  const { isLoading, recipes } = useRecipes();
  const { isInCabinet } = useCabinet();
  const { isInFavourites } = useFavourites();

  const onScroll = () => {
    const {
      innerHeight: windowHeight,
      scrollY: scrollPosition,
    } = window;
    const { documentElement: { scrollHeight: documentHeight } } = document;
    const distanceToBottom = documentHeight - (scrollPosition + windowHeight);

    if (distanceToBottom === 0) {
      setShowNumberRecipes(increaseRecipesShown);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
          (r: Recipe) => (
            <RecipeListItem {...r} />
          ),
          take(showNumberRecipes, filteredRecipes),
        )}
    </Stack>
  );
};
