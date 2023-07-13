import {
  Stack,
  Typography,
} from '@mui/material'

import {
  Link,
} from 'react-router-dom'
export function Home () {
  return (
    <Stack spacing={ 5 }>
      <Typography variant="h1">
        Welcome to barcabi.net
      </Typography>
      <Typography variant="h2">
        <Stack spacing={ 5 }>
          <Link to='/recipes'> View all recipes  </Link>
          <Link to='/ingredients'> View all ingredients  </Link>
        </Stack>
      </Typography>
    </Stack>

  )
}
