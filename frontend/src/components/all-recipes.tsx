import { useState, useEffect } from 'react'
import { map } from 'ramda'
import { 
  Card,
  LinearProgress,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

const RecipeListItem = (recipe: { _id: string, name: string, preparation: string, ingredients: { name: string, id: number }[] }) => {
  const { name, ingredients, preparation } = recipe
  return (
    <Card variant="outlined">
      <Stack spacing={2} m={2}>
        <Typography variant="h2" >
          { name } 
        </Typography>
        <Divider />
        <Typography>
          { preparation }
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={ 2 }
        >
          { map(({ name }) => <Chip label={ name } variant="outlined" />, ingredients)}
        </Stack>
      </Stack>
    </Card>
  )
}

export function AllRecipes () {
  const [ recipes, setRecipes ] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((r: Response) => r.json())
      .then((json) => setRecipes(json))
      .catch((e) => {
          console.error(e)
      })
  }, [])
  
  return (
    <Stack spacing={ 5 }>
      <Typography variant="h1">
        Recipes
      </Typography>
      {
        recipes.length === 0 && <LinearProgress color="inherit"/>
      }
      { recipes.length !== 0 && (
        <Stack spacing={ 2 } >
          { map(RecipeListItem, recipes) }
        </Stack>
      )}
    </Stack>
  )
}
