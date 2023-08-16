import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from '@mui/material';
import { useState } from 'react';
import type { BaseSyntheticEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';

export enum SORT_MODES {
  NO_SORT,
  NUM_ING_OWNED_ASC,
  NUM_ING_OWNED_DESC,
  NUM_ING_ASC,
  NUM_ING_DESC,
}

type Values<T> = T[keyof T];
export type SortMode = Values<typeof SORT_MODES>;

export const RecipeFilterControls = (props: {
  onFavouriteFilterToggled: (isSwitched: boolean) => void;
  onIngredientFilterToggled: (isSwitched: boolean) => void;
  onSortingModeChanged: (mode: SortMode) => void;
}) => {
  const {
    onFavouriteFilterToggled,
    onIngredientFilterToggled,
    onSortingModeChanged,
  } = props;
  const [sortingValue, setSortingValue] = useState<SortMode>(
    SORT_MODES.NO_SORT,
  );

  const handleOnlyFavourites = (e: BaseSyntheticEvent) =>
    onFavouriteFilterToggled(e.target.checked);

  const handleToggleExcludeIngredients = (e: BaseSyntheticEvent) =>
    onIngredientFilterToggled(e.target.checked);

  const handleSortingChanged = (e: SelectChangeEvent) => {
    const mode: SortMode = Number(e.target.value);
    setSortingValue(mode);
    onSortingModeChanged(mode);
  };

  return (
    <Stack direction="row" spacing={12} justifyContent="center">
      <FormControl>
        <InputLabel id="sorting-select-label-id">Sort By</InputLabel>
        <Select
          id="sorting-select"
          sx={{ width: '14vw' }}
          labelId="sorting-select-label-id"
          label="Sort By"
          value={
            sortingValue === SORT_MODES.NO_SORT ? '' : String(sortingValue)
          }
          onChange={handleSortingChanged}
        >
          <MenuItem value={SORT_MODES.NO_SORT}>
            <em> None </em>
          </MenuItem>
          <MenuItem value={SORT_MODES.NUM_ING_OWNED_ASC}>
            # Ingredients owned, ascending
          </MenuItem>
          <MenuItem value={SORT_MODES.NUM_ING_OWNED_DESC}>
            # Ingredients owned, descending
          </MenuItem>
          <MenuItem value={SORT_MODES.NUM_ING_ASC}>
            # Ingredients, ascending
          </MenuItem>
          <MenuItem value={SORT_MODES.NUM_ING_DESC}>
            # Ingredients, descending
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
