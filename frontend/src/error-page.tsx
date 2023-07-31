import { Button, Stack } from '@mui/material'
import { useRouteError } from 'react-router-dom'
import { Link } from 'react-router-dom'

type RouteError = { status: number, statusText?: string, message?: string }
export function ErrorPage () {
  const error = useRouteError() as RouteError
  return (
    <div id="error-page">
      <Stack spacing={2}>
        <h1> You must have been lead astray.</h1>
        <p> Sorry for the inconvenince. :( </p>
        <h2>
          <i> { error.status } </i>
        </h2>
        <p>
          <i> { error.statusText || error.message } </i>
        </p>
        <Button>
          <Link to="/"> Go back home </Link>
        </Button>
      </Stack>
    </div>
  )


}
