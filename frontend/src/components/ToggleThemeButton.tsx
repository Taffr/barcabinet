import { Brightness2Outlined, LightModeOutlined } from '@mui/icons-material';
import { Box, ListItemButton, ListItemIcon } from '@mui/material';
import { ColorModeContext } from '../contexts/ColorMode.context';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';

export const ToggleThemeButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const currentMode = theme.palette.mode;
  const icon =
    currentMode == 'dark' ? <LightModeOutlined /> : <Brightness2Outlined />;

  return (
    <Box>
      <ListItemButton
        sx={{ display: 'flex', justifyContent: 'center', m: 2 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        <ListItemIcon sx={{ ml: 2, mt: 2.5, transform: 'rotate(45deg)' }}>
          {icon}
        </ListItemIcon>
      </ListItemButton>
    </Box>
  );
};
