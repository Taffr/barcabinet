import { pluck } from 'ramda';
import { useCabinet } from '../hooks/useCabinet';
import type { Ingredient } from '../interfaces/ingredient.interface';
import { Chip } from '@mui/material';

export const IngredientChip = ({ name, id }: Ingredient) => {
  const { ingredients, removeFromIngredients, addToIngredients } = useCabinet();

  const ingrentIdSet = new Set(pluck('id', ingredients));
  const isInCabinet = ingrentIdSet.has(id);
  const variant = isInCabinet ? 'filled' : 'outlined';
  const color = isInCabinet ? 'success' : 'default';
  const handler = isInCabinet ? removeFromIngredients : addToIngredients;

  return (
    <Chip
      onClick={() => handler(id, name)}
      variant={variant}
      label={name}
      color={color}
    />
  );
};
