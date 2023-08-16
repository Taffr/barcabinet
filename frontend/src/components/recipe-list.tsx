import { LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import {
  add,
  any,
  count,
  curry,
  flip,
  identity,
  map,
  pluck,
  reduce,
  sort,
  take,
} from 'ramda';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeListItem } from './recipe-list-item';
import { RecipeFilterControls, SORT_MODES } from './recipe-filter-controls';
import { useCabinet } from '../hooks/useCabinet';
import { useFavourites } from '../hooks/useFavourites';
import type { Recipe } from '../interfaces/recipe.interface';
import type { Ingredient } from '../interfaces/ingredient.interface';
import type { SortMode } from './recipe-filter-controls';

type RecipeFilters = {
  excludeNonFavourites: boolean;
  excludeNotInCabinet: boolean;
};

const INITIAL_RECIPE_LIMIT = 20;
const ON_SCROLL_RECIPE_INC = 5;
const increaseRecipesShown = add(ON_SCROLL_RECIPE_INC);

type ReducerState = {
  filters: RecipeFilters;
  sorter: (recipes: Recipe[]) => Recipe[];
};

type ExcludeFilterAction = {
  type: 'excludeNotInCabinet';
  isToggled: boolean;
};

type ExcludeNonFavouriteFilterAction = {
  type: 'excludeNonFavourites';
  isToggled: boolean;
};

type SortingOptionAction = {
  type: 'sortModeChanged';
  mode: SortMode;
};

type FilterAction =
  | ExcludeFilterAction
  | ExcludeNonFavouriteFilterAction
  | SortingOptionAction;

const numIngComparator = (a: Recipe, b: Recipe) =>
  a.ingredients.length - b.ingredients.length;

export const RecipeList = () => {
  const [showNumberRecipes, setShowNumberRecipes] =
    useState(INITIAL_RECIPE_LIMIT);
  const { isLoading, recipes } = useRecipes();
  const { isInCabinet } = useCabinet();
  const { isInFavourites } = useFavourites();

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const numInCabinetComparator = (
    { ingredients: aIngredients }: Recipe,
    { ingredients: bIngredients }: Recipe,
  ) => {
    const countInCabinet = count(({ id }: Ingredient) => isInCabinet(id));
    return (
      aIngredients.length -
      countInCabinet(aIngredients) -
      (bIngredients.length - countInCabinet(bIngredients))
    );
  };

  const sorterFactory = (mode: SortMode): ((recipes: Recipe[]) => Recipe[]) => {
    switch (mode) {
      case SORT_MODES.NUM_ING_ASC:
        return sort(flip(numIngComparator));
      case SORT_MODES.NUM_ING_DESC:
        return sort(numIngComparator);
      case SORT_MODES.NUM_ING_OWNED_DESC:
        return sort(flip(numInCabinetComparator));
      case SORT_MODES.NUM_ING_OWNED_ASC:
        return sort(numInCabinetComparator);
      default:
        return identity;
    }
  };

  const onScroll = () => {
    const { innerHeight: windowHeight, scrollY: scrollPosition } = window;
    const {
      documentElement: { scrollHeight: documentHeight },
    } = document;
    const distanceToBottom = documentHeight - (scrollPosition + windowHeight);

    if (distanceToBottom === 0) {
      setShowNumberRecipes(increaseRecipesShown);
    }
  };

  const initialState: ReducerState = {
    filters: { excludeNotInCabinet: false, excludeNonFavourites: false },
    sorter: sorterFactory(SORT_MODES.NO_SORT),
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

  const recipeFilterReducer = (
    state: ReducerState,
    action: FilterAction,
  ): ReducerState => {
    const { filters, sorter } = state;
    switch (action.type) {
      case 'excludeNotInCabinet': {
        const newFilters = {
          ...filters,
          excludeNotInCabinet: action.isToggled,
        };
        return { filters: newFilters, sorter };
      }
      case 'excludeNonFavourites': {
        const newFilters = {
          ...filters,
          excludeNonFavourites: action.isToggled,
        };
        return { filters: newFilters, sorter };
      }
      case 'sortModeChanged':
        return { filters, sorter: sorterFactory(action.mode) };
    }
  };

  const [{ sorter, filters }, dispatch] = useReducer(
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

  const sortedAndFiltered = sorter(applyFilters(filters, recipes));

  return (
    <Stack spacing={2}>
      <RecipeFilterControls
        onSortingModeChanged={(mode) =>
          dispatch({ type: 'sortModeChanged', mode })
        }
        onIngredientFilterToggled={(b) =>
          dispatch({ type: 'excludeNotInCabinet', isToggled: b })
        }
        onFavouriteFilterToggled={(b) =>
          dispatch({ type: 'excludeNonFavourites', isToggled: b })
        }
      />

      {sortedAndFiltered.length === 0 && (
        <Stack spacing={2}>
          <Typography variant="h3"> No matches </Typography>
          <Typography variant="subtitle1"> Try reseting the filter </Typography>
        </Stack>
      )}
      {map(
        (r: Recipe) => (
          <RecipeListItem {...r} />
        ),
        take(showNumberRecipes, sortedAndFiltered),
      )}
    </Stack>
  );
};
