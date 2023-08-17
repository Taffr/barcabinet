import { Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { map } from 'ramda';
import type { Recipe } from '../interfaces/recipe.interface';
import type { Ingredient } from '../interfaces/ingredient.interface';
import { IngredientChip } from './ingredient-chip';
import { useFavourites } from '../hooks/useFavourites';
import { useEditFavourites } from '../hooks/useEditFavourites';
import { useNavigate } from 'react-router-dom';

export const RecipeListItem = ({
  id,
  name,
  ingredients,
  preparation,
}: Recipe) => {
  const navigate = useNavigate();
  const { isInFavourites } = useFavourites();
  const { addToFavourites, removeFromFavourites } = useEditFavourites();

  const navigateToRecipeView = () => navigate(`/recipe/${id}`);

  const isFavourite = isInFavourites(id);
  const handler = isFavourite ? removeFromFavourites : addToFavourites;
  const icon = isFavourite ? <Favorite /> : <FavoriteBorder />;

  return (
    <Card variant="outlined" onClick={navigateToRecipeView}>
      <Stack spacing={2} m={2}>
        <Stack direction="row" justifyContent="center">
          <Typography variant="h2">{name}</Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handler(id, name);
            }}
          >
            {icon}
          </IconButton>
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
