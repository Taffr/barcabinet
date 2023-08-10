import { Brightness2Outlined, LightModeOutlined } from '@mui/icons-material';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { always, map } from 'ramda';

type RouteInfo = { name: string; link: string };

const ColorModeContext = createContext({
  toggleColorMode: () => {
    always('something');
  },
});

const RouterButtonWithDivider = ({ name, link }: RouteInfo) => (
  <Link to={link}>
    <ListItemButton
      sx={{ display: 'flex', justifyContent: 'left', m: 2 }}
      divider={true}
    >
      <ListItemText primary={name} />
    </ListItemButton>
  </Link>
);
const ThemeButton = () => {
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

const routes: RouteInfo[] = [
  { name: 'HOME', link: '/' },
  { name: 'RECIPES', link: '/recipes' },
  { name: 'INGREDIENTS', link: '/ingredients' },
];

const BarCabinet = () => {
  return (
    <>
      <Box>
        <Drawer variant="persistent" open>
          <List>
            {map(RouterButtonWithDivider, routes)}
            <ThemeButton />
          </List>
        </Drawer>
      </Box>
      <Outlet />
    </>
  );
};

export function Root() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          return prevMode === 'light' ? 'dark' : 'light';
        });
      },
    }),
    [],
  );

  const theme = useMemo(() => {
    if (mode === 'dark') {
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#ce93d8',
          },
          background: {
            default: '#121212',
            paper: '#121212',
          },
        },
      });
    }
    return createTheme({ palette: { mode } });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BarCabinet />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
