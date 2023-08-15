import { useCabinet } from '../hooks/useCabinet';
import { useEditCabinet } from '../hooks/useEditCabinet';
import type { Ingredient } from '../interfaces/ingredient.interface';
import { Chip } from '@mui/material';
import { HighlightedTypography } from './HighlightedTypograhy';

export const IngredientChip = (props: {
  ingredient: Ingredient;
  highlight?: string;
}) => {
  const {
    ingredient: { id, name },
    highlight = '',
  } = props;
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
      label={<HighlightedTypography text={name} highlight={highlight} />}
      color={color}
    />
  );
};
