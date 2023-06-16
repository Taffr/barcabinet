import Button from '@mui/material/Button'
import { inc } from 'ramda'
import { useState } from 'react'

const NICE_NUMBER = 69
const INIT_COUNT = 0

export function TestComponent () {
  const [ count, setCount ] = useState(INIT_COUNT)
  return (
    <div>
      <Button
        variant='contained'
        onClick={ () => setCount(inc)}
      >
      Count: { count }
      </Button>
      { count === NICE_NUMBER && <h1> Nice </h1> }
    </div>
  )
}
