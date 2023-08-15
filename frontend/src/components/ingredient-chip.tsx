import { useCabinet } from '../hooks/useCabinet';
import { useEditCabinet } from '../hooks/useEditCabinet';
import type { Ingredient } from '../interfaces/ingredient.interface';
import { Chip } from '@mui/material';

export const IngredientChip = ({ name, id }: Ingredient) => {
  const { isInCabinet } = useCabinet();
  const { addToCabinet, removeFromCabinet } = useEditCabinet();
  const inCabinet = isInCabinet(id);
  const variant = inCabinet ? 'filled' : 'outlined';
  const color = inCabinet ? 'success' : 'default';
  const handler = inCabinet ? removeFromCabinet : addToCabinet;

  return (
    <Chip
      onClick={() => handler(id)}
      variant={variant}
      label={name}
      color={color}
    />
  );
};
