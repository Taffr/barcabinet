import {
  useState,
} from 'react'
import {
  useDispatch
} from 'react-redux'
import {
  useNavigate
} from 'react-router-dom'
import axios, { AxiosError, AxiosResponse } from 'axios'
import {
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { isEmpty } from 'ramda'
import type { User } from '../interfaces/user.interface'

const ERRORS = {
  UNAUTHORIZED: 401,
}

export function Login () {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ isSigningIn, setIsSigningIn ] = useState(false)
  const [ nameError, setNameError ]  = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLoginFail = (error: AxiosError) => {
    const { response } = error
    setIsSigningIn(false)
    switch(response?.status) {
      case ERRORS.UNAUTHORIZED:
        setMessage('Username does not exist, or password is wrong')
        break
      default:
        setMessage('Server error, please try again later')
    }
  }

  const handleLoginSuccess = ({ data }: AxiosResponse) => {
    const { access_token } = data
    localStorage.setItem('access_token', access_token)
    axios.get(`${import.meta.env.VITE_BARCABINET_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    .then(({ data }: AxiosResponse<User>) => {
      dispatch({ type: 'user/userLoggedIn', payload: data })
      navigate('/')
    })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    let anyError = false

    if (isEmpty(username)) {
      setNameError(true)
      anyError = true
    }

    if (isEmpty(password)) {
      setPasswordError(true)
      anyError = true
    }

    if (anyError) return

    setIsSigningIn(true)
    setMessage('Signing in ...')
    axios.post(`${import.meta.env.VITE_BARCABINET_API_URL}/auth/login`, {
      username,
      password,
    })
    .then(handleLoginSuccess)
    .catch(handleLoginFail)
  }

  return (
    <Stack spacing={ 5 } alignItems='center'>
      <Typography variant="h3">
        Login to manage your cabinet
      </Typography>
      <form onSubmit={ handleSubmit }>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Username"
            error={ nameError }
            onChange={(e) => {
              setUsername(e.target.value)
              setNameError(false)
            }}
          />
          <TextField
            label="Password"
            type="password"
            error={ passwordError }
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordError(false)
            }}
          />
        </Stack>
        <Stack alignItems='right'>
          <Button type="submit">
            Submit
          </Button>
         </Stack>
      </form>
      <Typography>
       { message }
      </Typography>
      { isSigningIn && <LinearProgress color="inherit"/> }
    </Stack>
  )
}


