import { useRouteError } from 'react-router-dom'
import Stack from '@mui/material/Stack'

export function ErrorPage () {
  const error = useRouteError() as { status: number, statusText?: string, message?: string }
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
      </Stack>
    </div>
  )


}
