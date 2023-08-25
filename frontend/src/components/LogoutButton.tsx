import { Box, ListItemButton, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { isSignedIn, logout } = useUser();

  if (!isSignedIn) {
    return <> </>
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box>
      <ListItemButton
        sx={{ display: 'flex', justifyContent: 'center', m: 2 }}
        onClick={handleLogout}
      >
        <ListItemIcon sx={{ ml: 3.5 }}>
          <Logout />
        </ListItemIcon>
      </ListItemButton>
    </Box>
  );
};
