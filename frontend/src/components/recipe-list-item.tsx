import { Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { map } from 'ramda';
import type { Recipe } from '../interfaces/recipe.interface';
import type { Ingredient } from '../interfaces/ingredient.interface';
import { IngredientChip } from './ingredient-chip';
import { useFavourites } from '../hooks/useFavourites';
import { useEditFavourites } from '../hooks/useEditFavourites';

export const RecipeListItem = ({
  id,
  name,
  ingredients,
  preparation,
}: Recipe) => {
  const { isInFavourites } = useFavourites();
  const { addToFavourites, removeFromFavourites } = useEditFavourites();

  const isFavourite = isInFavourites(id);
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
              <IngredientChip ingredient={i} />
            ),
            ingredients,
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
