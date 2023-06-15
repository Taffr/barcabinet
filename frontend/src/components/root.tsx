import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  Link,
  Outlet,
} from 'react-router-dom'
import {
  Box,
  Button,
  Drawer,
  IconButton,
  CssBaseline,
} from '@mui/material'
import {
  ThemeProvider,
  createTheme,
  useTheme,
} from '@mui/material/styles'
import {
  Brightness4,
  Brightness7,
} from '@mui/icons-material'
import { map, always } from 'ramda'

const ColorModeContext = createContext({ toggleColorMode: () => { always('something') } } )

const RouterButton = ({ name, link }: { name: string, link: string }) => (
  <Button>
    <Link to={ link }> { name } </Link>
  </Button>
)

const routes = [
  { name: 'Recipes', link: '/recipes' },
  { name: 'Ingredients', link: '/ingredients' },
]

const BarCabinet = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box>
      <Drawer variant="persistent" open>
        { map(RouterButton, routes) }
        <IconButton onClick={ colorMode.toggleColorMode } color="inherit">
          { theme.palette.mode == 'dark' ? <Brightness7 /> : <Brightness4 /> } 
        </IconButton>
      </Drawer>
      <Outlet />
    </Box>
  ) 
}
  
export function Root () {
  const [ mode, setMode ] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), [])

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
      })
    }
    return createTheme({ palette: { mode }})
  }, [ mode ])

  return (
    <ColorModeContext.Provider value={ colorMode }>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BarCabinet /> 
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
