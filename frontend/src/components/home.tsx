import {
  Stack,
  Typography,
} from '@mui/material'
import {
  useSelector
} from 'react-redux'
import {
  Link,
} from 'react-router-dom'
import { prop } from 'ramda'

type User = { name: string, id: string }

export function Home () {
  const user = useSelector(prop('user')) as User | undefined
  return (
    <Stack spacing={ 5 }>
      <Typography variant="h1">
        Welcome to barcabi.net { user?.name || '' }
      </Typography>
      <Typography variant="h2">
        <Stack spacing={ 5 }>
          <Link to='/recipes'> View all recipes  </Link>
          <Link to='/ingredients'> View all ingredients  </Link>
          <Link to='/login'> Login </Link>
        </Stack>
      </Typography>
    </Stack>
  )
}
