import { Outlet, Link } from 'react-router-dom'
import {
  Button,
  Drawer,
  Box,
} from '@mui/material'
import { map } from 'ramda'

const RouterButton = ({ name, link }: { name: string, link: string }) => (
  <Button>
    <Link to={ link }> { name } </Link>
  </Button>
)

const routes = [
  { name: 'Recipes', link: '/recipes' },
  { name: 'Ingredients', link: '/ingredients' },
]

export function Root () {
  return (
    <Box>
      <Drawer variant="permanent" open>
        { map(RouterButton, routes) }
      </Drawer>
      <Outlet />
    </Box>
  )
}
