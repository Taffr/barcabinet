import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Typography variant="h1">Loading ...</Typography>;
  }

  return (
    <Stack spacing={5}>
      <Typography variant="h1">
        Welcome to barcabi.net {user ? user.name : ''}
      </Typography>
      <Typography variant="h2">
        <Stack spacing={5}>
          <Link to="/recipes"> View all recipes </Link>
          <Link to="/ingredients"> View all ingredients </Link>
          {!user && <Link to="/login"> Login </Link>}
          {!user && <Link to="/register"> Register </Link>}
        </Stack>
      </Typography>
    </Stack>
  );
}
