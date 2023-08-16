import {
  Box,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from '@mui/material';
import { BaseSyntheticEvent } from 'react';

export const RecipeFilterControls = (props: {
  onFavouriteFilterToggled: (isSwitched: boolean) => void;
  onIngredientFilterToggled: (isSwitched: boolean) => void;
}) => {
  const { onFavouriteFilterToggled, onIngredientFilterToggled } = props;

  const handleOnlyFavourites = (e: BaseSyntheticEvent) =>
    onFavouriteFilterToggled(e.target.checked);

  const handleToggleExcludeIngredients = (e: BaseSyntheticEvent) =>
    onIngredientFilterToggled(e.target.checked);

  return (
    <Box display="flex" justifyContent="right" justifyItems="center">
      <Stack direction="row" alignItems="center" spacing={10}>
        <Select value={10} label="Sort By">
          <MenuItem> # Ingredients owned </MenuItem>
          <MenuItem> # Ingredients (ascending) </MenuItem>
          <MenuItem> # Ingredients (descending) </MenuItem>
        </Select>
        <FormControlLabel
          control={<Switch onChange={handleOnlyFavourites} />}
          label="Include only favourites"
        />
        <FormControlLabel
          control={<Switch onChange={handleToggleExcludeIngredients} />}
          label="Include only with selected ingredients"
        />
      </Stack>
    </Box>
  );
};
