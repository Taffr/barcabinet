import { LinearProgress, Stack, Typography } from '@mui/material';
import { map } from 'ramda';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeListItem } from './recipe-list-item';

export function AllRecipes() {
  const { isLoading, recipes } = useRecipes();
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
          <Stack spacing={2}>
            {map(
              (r) => (
                <RecipeListItem {...r} />
              ),
              recipes,
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}
