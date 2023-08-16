import { useState } from 'react';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { IngredientCloud } from './ingredient-cloud';

export function AllIngredients() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Stack spacing={4}>
      <Typography variant="h2"> Ingredients </Typography>
      <TextField
        variant="standard"
        placeholder="Filter by name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FilterList />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IngredientCloud nameFilter={searchTerm} />
    </Stack>
  );
}
