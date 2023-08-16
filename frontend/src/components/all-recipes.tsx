import { Stack, Typography } from '@mui/material';
import { RecipeList } from './recipe-list';
export function AllRecipes() {
  return (
    <Stack spacing={5}>
      <Typography variant="h1">Recipes</Typography>
      <RecipeList />
    </Stack>
  );
}
