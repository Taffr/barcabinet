import { Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { map, pluck } from 'ramda';
import type { Recipe } from '../interfaces/recipe.interface';
import type { Ingredient } from '../interfaces/ingredient.interface';
import { IngredientChip } from './ingredient-chip';
import { useCabinet } from '../hooks/useCabinet';

export const RecipeListItem = ({
  id,
  name,
  ingredients,
  preparation,
}: Recipe) => {
  const { favourites, removeFromFavourites, addToFavourites } = useCabinet();
  const favouriteIdSet = new Set(pluck('id', favourites));
  const isFavourite = favouriteIdSet.has(id);
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
          {map(
            (i: Ingredient) => (
              <IngredientChip {...i} />
            ),
            ingredients,
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
