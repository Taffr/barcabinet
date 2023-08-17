import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { map } from 'ramda';
import { ErrorPage } from '../error-page';
import { useRecipe } from '../hooks/useRecipe';
import { IngredientChip } from './ingredient-chip';
import type { Ingredient } from '../interfaces/ingredient.interface';
export const RecipeView = () => {
  const { id } = useParams<string>();
  const {
    isLoading,
    recipe,
    isFavourited,
    removeFromFavourites,
    addToFavourites,
  } = useRecipe(id);

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <LinearProgress color="inherit" />
        <Typography>Loading recipe...</Typography>
      </Stack>
    );
  }

  if (!recipe) {
    return <ErrorPage />;
  }

  const { name, ingredients, preparation, garnish } = recipe;
  const handler = isFavourited ? removeFromFavourites : addToFavourites;
  const icon = isFavourited ? <Favorite /> : <FavoriteBorder />;

  return (
    <Stack spacing={5}>
      <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
        <Typography variant="h1">{name}</Typography>
        <IconButton onClick={handler}>{icon}</IconButton>
      </Box>
      <Divider />
      <Box display="flex" flexDirection="column" alignItems="center">
        <List>
          {map(
            (i: Ingredient) => (
              <ListItem divider>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={4}
                >
                  <IngredientChip ingredient={i} />
                  <Box
                    display="flex"
                    flexDirection="row-reverse"
                    justifyContent="flex-end"
                  >
                    <Divider orientation="vertical" />
                    <Typography>
                      {i.dosage} {i.unit}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ),
            ingredients,
          )}
        </List>
        <Box padding={4}>
          <Typography variant="body1">{preparation}</Typography>
        </Box>
        <Typography variant="body2">
          {garnish && `Garnish with ${garnish}`}
        </Typography>
      </Box>
    </Stack>
  );
};
