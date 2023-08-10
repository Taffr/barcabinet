import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import {
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { isEmpty, mergeLeft } from 'ramda';
import { httpClient } from '../common/http/http-client';
import { requestAuthorizationInterceptorFactory } from '../common/http/request-interceptors';

const ERRORS = {
  CONFLICT: 409,
};

export function Register() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({
    username: false,
    nameError: '',
    password: false,
  });
  const [message, setMessage] = useState('');
  const [isSigningIn, setSigningIn] = useState(false);

  const handleRegisterFailure = (error: AxiosError) => {
    setSigningIn(false);
    setMessage('');

    const { response } = error;
    switch (response?.status) {
      case ERRORS.CONFLICT:
        console.log('setting set errors');
        setErrors(
          mergeLeft({ username: true, nameError: 'Name already in use' }),
        );
        break;
      default:
        setMessage('Server error, please try again later');
    }
  };

  const handleRegisterSuccess = (username: string, password: string) => () => {
    setMessage('Signing you in ...');
    httpClient
      .post('/auth/login', {
        username,
        password,
      })
      .then(({ data }: AxiosResponse) => {
        const { access_token } = data;
        localStorage.setItem('access_token', access_token);

        httpClient.interceptors.request.use(
          requestAuthorizationInterceptorFactory(access_token),
        );
        navigate('/');
      });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { username, password } = userInfo;
    const errorAccumulator = {
      username: false,
      nameError: '',
      password: false,
    };

    if (isEmpty(username)) {
      errorAccumulator.username = true;
      errorAccumulator.nameError = 'Name cannot be empty';
    }

    if (isEmpty(password)) {
      errorAccumulator.password = true;
    }

    setErrors(mergeLeft(errorAccumulator));
    if (errorAccumulator.username || errorAccumulator.password) return;

    setSigningIn(true);
    setMessage('Registering ...');
    httpClient
      .post('/register', {
        name: username,
        password,
      })
      .then(handleRegisterSuccess(username, password))
      .catch(handleRegisterFailure);
  };

  return (
    <Stack spacing={5} alignItems="center">
      <Typography variant="h3">Register your account</Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Username"
            error={errors.username}
            helperText={errors.username ? errors.nameError : ''}
            onChange={(e) =>
              setUserInfo(mergeLeft({ username: e.target.value }))
            }
          />
          <TextField
            label="Password"
            type="password"
            error={errors.password}
            helperText={errors.password ? 'Password cannot be empty' : ''}
            onChange={(e) =>
              setUserInfo(mergeLeft({ password: e.target.value }))
            }
          />
        </Stack>
        <Stack alignItems="right">
          <Button type="submit" disabled={isSigningIn}>
            Submit
          </Button>
        </Stack>
      </form>
      <Typography>{message}</Typography>
      {isSigningIn && <LinearProgress color="inherit" />}
    </Stack>
  );
}
