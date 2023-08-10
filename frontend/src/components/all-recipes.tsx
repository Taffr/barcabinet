import {
  Card,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { map, pluck } from 'ramda';
import { useRecipes } from '../hooks/useRecipes';
import { useCabinet } from '../hooks/useCabinet';
import type { Recipe } from '../interfaces/recipe.interface';
import type { Ingredient } from '../interfaces/ingredient.interface';

export function AllRecipes() {
  const { isLoading: isLoadingRecipes, recipes } = useRecipes();

  const {
    addToFavourites,
    addToIngredients,
    favourites,
    ingredients,
    isLoading: isLoadingCabinet,
    removeFromFavourites,
    removeFromIngredients,
  } = useCabinet();

  const favouriteIdSet = new Set(pluck('id', favourites));
  const ingredientIdSet = new Set(pluck('id', ingredients));

  const RecipeListItem = (recipe: Recipe) => {
    const isFavourite = favouriteIdSet.has(recipe.id);
    const { id, name, ingredients, preparation } = recipe;
    const handler = isFavourite ? removeFromFavourites : addToFavourites;
    const icon = isFavourite ? <Favorite /> : <FavoriteBorder />;

    return (
      <Card variant="outlined">
        <Stack spacing={2} m={2}>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h2">{name}</Typography>
            <IconButton onClick={() => handler(id, name)}>{icon}</IconButton>
          </Stack>
          <Divider />
          <Typography>{preparation}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            {map(({ name, id }: Ingredient) => {
              const inCabinet = ingredientIdSet.has(id);
              const ingredientHandler = inCabinet
                ? removeFromIngredients
                : addToIngredients;
              const variant = inCabinet ? 'filled' : 'outlined';
              return (
                <Chip
                  variant={variant}
                  label={name}
                  onClick={() => ingredientHandler(id, name)}
                />
              );
            }, ingredients)}
          </Stack>
        </Stack>
      </Card>
    );
  };

  const isLoading = isLoadingRecipes || isLoadingCabinet;

  return (
    <Stack spacing={5}>
      {isLoading && (
        <Stack spacing={5}>
          <LinearProgress color="inherit" />
          <Typography>Loading recipes...</Typography>
        </Stack>
      )}
      {!isLoading && (
        <>
          <Typography variant="h1">Recipes</Typography>
          <Stack spacing={2}>{map(RecipeListItem, recipes)}</Stack>
        </>
      )}
    </Stack>
  );
}
