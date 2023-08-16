import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';

const SORTING_VALUES = {
  NO_SORT: '',
  NUM_ING_OWNED: 0,
  NUM_ING_ASC: 1,
  NUM_ING_DESC: 2,
} as const;

export const RecipeFilterControls = (props: {
  onFavouriteFilterToggled: (isSwitched: boolean) => void;
  onIngredientFilterToggled: (isSwitched: boolean) => void;
}) => {
  const { onFavouriteFilterToggled, onIngredientFilterToggled } = props;
  const [sortingValue, setSortingValue] = useState<number | string>(
    SORTING_VALUES.NO_SORT,
  );

  const handleOnlyFavourites = (e: BaseSyntheticEvent) =>
    onFavouriteFilterToggled(e.target.checked);

  const handleToggleExcludeIngredients = (e: BaseSyntheticEvent) =>
    onIngredientFilterToggled(e.target.checked);

  return (
    <Stack direction="row" spacing={12} justifyContent="center">
      <FormControl>
        <InputLabel id="sorting-select-label-id">Sort By</InputLabel>
        <Select
          id="sorting-select"
          sx={{ width: '14vw' }}
          labelId="sorting-select-label-id"
          label="Sort By"
          value={sortingValue}
          onChange={(e) => setSortingValue(e.target.value)}
        >
          <MenuItem value={SORTING_VALUES.NO_SORT}>
            {' '}
            <em> None </em>{' '}
          </MenuItem>
          <MenuItem value={SORTING_VALUES.NUM_ING_OWNED}>
            {' '}
            # Ingredients owned{' '}
          </MenuItem>
          <MenuItem value={SORTING_VALUES.NUM_ING_ASC}>
            {' '}
            # Ingredients (ascending){' '}
          </MenuItem>
          <MenuItem value={SORTING_VALUES.NUM_ING_DESC}>
            {' '}
            # Ingredients (descending){' '}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Switch onChange={handleOnlyFavourites} />}
        label="Include only favourites"
      />
      <FormControlLabel
        control={<Switch onChange={handleToggleExcludeIngredients} />}
        label="Include only with selected ingredients"
      />
    </Stack>
  );
};
