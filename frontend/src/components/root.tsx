import { Box, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { map } from 'ramda';
import { ToggleThemeButton } from './ToggleThemeButton';
import { LogoutButton } from './LogoutButton';

type RouteInfo = { name: string; link: string };

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

const routes: RouteInfo[] = [
  { name: 'HOME', link: '/' },
  { name: 'RECIPES', link: '/recipes' },
  { name: 'INGREDIENTS', link: '/ingredients' },
];

export const Root = () => {
  return (
    <>
      <Box>
        <Drawer variant="persistent" open>
          <List>
            {map(RouterButtonWithDivider, routes)}
            <ToggleThemeButton />
            <LogoutButton />
          </List>
        </Drawer>
      </Box>
      <Outlet />
    </>
  );
};
