import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError, AxiosResponse } from 'axios';
import { httpClient } from '../common/http/http-client';
import { requestAuthorizationInterceptorFactory } from '../common/http/request-interceptors';
import {
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { isEmpty, mergeLeft } from 'ramda';

const ERRORS = {
  UNAUTHORIZED: 401,
};

export function Login() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: false, password: false });
  const [message, setMessage] = useState('');
  const [isSigningIn, setSigningIn] = useState(false);

  const handleLoginFail = (error: AxiosError) => {
    const { response } = error;
    switch (response?.status) {
      case ERRORS.UNAUTHORIZED:
        setMessage('Username does not exist, or password is wrong');
        break;
      default:
        setMessage('Server error, please try again');
    }
    setSigningIn(false);
  };

  const handleLoginSuccess = ({ data }: AxiosResponse) => {
    const { access_token } = data;
    localStorage.setItem('access_token', access_token);

    httpClient.interceptors.request.use(
      requestAuthorizationInterceptorFactory(access_token),
    );
    navigate('/');
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { username, password } = userInfo;
    const errorAccumulator = { username: false, password: false };

    if (isEmpty(username)) {
      errorAccumulator.username = true;
    }

    if (isEmpty(password)) {
      errorAccumulator.password = true;
    }

    setErrors(errorAccumulator);
    if (errorAccumulator.username || errorAccumulator.password) return;

    setSigningIn(true);
    setMessage('Signing in ...');
    httpClient
      .post('/auth/login', {
        username: userInfo.username,
        password: userInfo.password,
      })
      .then(handleLoginSuccess)
      .catch(handleLoginFail);
  };

  return (
    <Stack spacing={5} alignItems="center">
      <Typography variant="h3">Login to manage your cabinet</Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Username"
            error={errors.username}
            helperText={errors.username ? 'Name cannot be empty' : ''}
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
