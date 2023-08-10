import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { map } from 'ramda';
import { useIngredients } from '../hooks/useIngredients';
import { IngredientChip } from './ingredient-chip';

export function AllIngredients() {
  const { isLoading, ingredients } = useIngredients();

  return (
    <Stack spacing={5}>
      {isLoading && (
        <Stack spacing={5}>
          <LinearProgress color="inherit" />
          <Typography>Loading ingredients...</Typography>
        </Stack>
      )}
      {!isLoading && (
        <>
          <Typography variant="h1">Ingredients</Typography>
          <Box
            gap={1}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {map(
              (i) => (
                <IngredientChip {...i} />
              ),
              ingredients,
            )}
          </Box>
        </>
      )}
    </Stack>
  );
}
