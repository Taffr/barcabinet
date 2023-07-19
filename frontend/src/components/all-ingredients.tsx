import {
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import {
  useEffect,
  useState,
} from 'react'
import { map } from 'ramda'

const IngredientGridItem = (i: { name: string, id: number } ) =>
  <Grid item>
    <Chip label={ i.name } />
  </Grid>


export function AllIngredients () {
 const [ ingredients, setIngredients ] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BARCABINET_API_URL}/recipes/ingredients`)
      .then((r) => r.json())
      .then(setIngredients)
      .catch(console.error)
  }, [])

  return (
    <Stack spacing={ 5 }>
      {
        ingredients.length === 0 &&
          <Stack spacing={ 5 }>
            <LinearProgress color="inherit"/>
            <Typography>
              Loading ingredients...
            </Typography>
          </Stack>
      }
      { ingredients.length !== 0 &&
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
