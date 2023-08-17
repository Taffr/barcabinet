import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './state/store';
import { ErrorPage } from './error-page';
import { Root } from './components/root';
import { Login } from './components/login';
import { Register } from './components/register';
import { Home } from './components/home';
import { AllIngredients } from './components/all-ingredients';
import { AllRecipes } from './components/all-recipes';
import { RecipeView } from './components/recipe-view';
import { useMemo, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from './contexts/ColorMode.context';
import { darkThemeFactory, lightThemeFactory } from './themes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/recipes',
        element: <AllRecipes />,
      },
      {
        path: '/ingredients',
        element: <AllIngredients />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/recipe/:id',
        element: <RecipeView />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

function App() {
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
      return darkThemeFactory();
    }
    return lightThemeFactory();
  }, [mode]);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
