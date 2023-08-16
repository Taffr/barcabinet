import { useEffect, useState } from 'react';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { map } from 'ramda';
import { IngredientChip } from './ingredient-chip';
import { useIngredients } from '../hooks/useIngredients';
import type { Ingredient } from '../interfaces/ingredient.interface';

export const IngredientCloud = (props: { nameFilter: string }) => {
  const { nameFilter } = props;
  const { isLoading, ingredients } = useIngredients();
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

  useEffect(() => {
    setFilteredIngredients(
      ingredients.filter(({ name }) =>
        name.toLowerCase().includes(nameFilter.toLowerCase()),
      ),
    );
  }, [ingredients, nameFilter]);

  if (isLoading) {
    return (
      <Stack spacing={5}>
        <LinearProgress color="inherit" />
        <Typography>Loading ingredients...</Typography>
      </Stack>
    );
  }

  return (
    <Box gap={1} display="flex" flexWrap="wrap" justifyContent="center">
      {map(
        (i: Ingredient) => (
          <IngredientChip ingredient={i} highlight={nameFilter} />
        ),
        filteredIngredients,
      )}
    </Box>
  );
};
