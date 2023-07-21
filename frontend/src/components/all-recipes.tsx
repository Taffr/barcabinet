import {
  Card,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { map } from 'ramda'
import { useRecipes } from '../hooks/useRecipes'
import type { Recipe } from '../interfaces/recipe.interface'

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
  const { isLoading, recipes } = useRecipes()
  return (
    <Stack spacing={ 5 }>
      {
        isLoading &&
          <Stack spacing={ 5 }>
            <LinearProgress color="inherit"/>
            <Typography>
              Loading recipes...
            </Typography>
          </Stack>
      }
      { !isLoading &&
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
