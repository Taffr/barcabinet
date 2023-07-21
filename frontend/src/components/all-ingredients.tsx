import {
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { map } from 'ramda'
import { useIngredients } from '../hooks/useIngredients'
import type { Ingredient } from '../interfaces/ingredient.interface'

const IngredientGridItem = (i: Ingredient) =>
  <Grid item>
    <Chip label={ i.name } />
  </Grid>

export function AllIngredients () {
  const { isLoading, ingredients } = useIngredients()
  return (
    <Stack spacing={ 5 }>
      {
        isLoading &&
          <Stack spacing={ 5 }>
            <LinearProgress color="inherit"/>
            <Typography>
              Loading ingredients...
            </Typography>
          </Stack>
      }
      { !isLoading &&
        <>
          <Typography variant="h1">
            Ingredients
          </Typography>
          <Grid container spacing={ 2 } >
            { map(IngredientGridItem, ingredients) }
          </Grid>
        </>
      }
    </Stack>
  )
}
