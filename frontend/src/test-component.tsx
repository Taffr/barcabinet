import { useState } from 'react'
import Button from '@mui/material/Button'
import { inc } from 'ramda'

export function TestComponent () {
  const [ count, setCount ] = useState(0)

  return (
    <div>
      <Button
        variant='contained'
        onClick={ () => setCount(inc)}
      >
      Count: { count } 
      </Button>
      { count === 69 && <h1> Nice </h1> }
    </div>
  )
} 
