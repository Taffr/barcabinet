import {
  Card,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import {
  useEffect,
  useState
} from 'react'
import { map } from 'ramda'

type Ingredient = { name: string, id: number }
type Recipe = {
  _id: string,
  name: string,
  preparation: string,
  ingredients: Ingredient[],
}

const RecipeListItem = (recipe: Recipe) => {
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
    { map(({ name }) =>
      <Chip label={ name } variant="outlined" />
      , ingredients)
    }
        </Stack>
      </Stack>
    </Card>
  )
}

export function AllRecipes () {
  const [ recipes, setRecipes ] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BARCABINET_API_URL}/recipes`)
      .then((r) => r.json())
      .then(setRecipes)
      .catch(console.error)
  }, [])

  return (
    <Stack spacing={ 5 }>
      {
        recipes.length === 0 &&
          <Stack spacing={ 5 }>
            <LinearProgress color="inherit"/>
            <Typography>
              Loading recipes...
            </Typography>
          </Stack>
      }
      { recipes.length !== 0 &&
        <>
          <Typography variant="h1">
            Recipes
          </Typography>
          <Stack spacing={ 2 } >
            { map(RecipeListItem, recipes) }
          </Stack>
        </>
      }
    </Stack>
  )
}
