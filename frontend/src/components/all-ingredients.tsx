import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { map, pluck } from 'ramda';
import { useIngredients } from '../hooks/useIngredients';
import { useCabinet } from '../hooks/useCabinet';
import type { Ingredient } from '../interfaces/ingredient.interface';

export function AllIngredients() {
  const { isLoading, ingredients } = useIngredients();
  const {
    ingredients: cabinetIngredients,
    addToIngredients,
    removeFromIngredients,
  } = useCabinet();
  const ingredientIdSet = new Set(pluck('id', cabinetIngredients));

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
            {map(({ id, name }: Ingredient) => {
              const isInCabinet = ingredientIdSet.has(id);
              const variant = isInCabinet ? 'filled' : 'outlined';
              const handler = isInCabinet
                ? removeFromIngredients
                : addToIngredients;
              return (
                <Chip
                  onClick={() => handler(id, name)}
                  variant={variant}
                  label={name}
                />
              );
            }, ingredients)}
          </Box>
        </>
      )}
    </Stack>
  );
}
