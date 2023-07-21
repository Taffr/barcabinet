import {
  Stack,
  Typography,
} from '@mui/material'
import {
  Link,
} from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export function Home () {
  const { user, isLoggedIn } = useUser()
  return (
    <Stack spacing={ 5 }>
      <Typography variant="h1">
        Welcome to barcabi.net { isLoggedIn ? user.name : '' }
      </Typography>
      <Typography variant="h2">
        <Stack spacing={ 5 }>
          <Link to='/recipes'> View all recipes  </Link>
          <Link to='/ingredients'> View all ingredients  </Link>
          { !isLoggedIn && <Link to='/login'> Login </Link> }
        </Stack>
      </Typography>
    </Stack>
  )
}
