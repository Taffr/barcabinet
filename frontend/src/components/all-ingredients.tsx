import { useState, useEffect } from 'react'
import { map } from 'ramda'
import { 
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'


const IngredientGridItem = (i: { name: string, id: number } ) => (
  <Grid item>
    <Chip label={ i.name } />
  </Grid> 
)

export function AllIngredients () {
 const [ ingredients, setIngredients ] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/ingredients')
      .then((r) => r.json())
      .then(setIngredients)
      .catch(console.error)
  }, [])
  
  return (
    <Stack spacing={ 5 }>
      {
        ingredients.length === 0 && <LinearProgress color="inherit"/>
      }
      { ingredients.length !== 0 && (
        <>
          <Typography variant="h1">
            Ingredients
          </Typography>
          <Grid container spacing={ 2 } >
            { map(IngredientGridItem, ingredients) }
          </Grid>
        </>
      )}
    </Stack>
  )
}
