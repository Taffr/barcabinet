import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AllIngredients } from './components/all-ingredients.tsx';
import { AllRecipes } from './components/all-recipes.tsx';
import { Home } from './components/home.tsx';
import { Login } from './components/login.tsx';
import { Register } from './components/register.tsx';
import App from './App.tsx';
import { ErrorPage } from './error-page.tsx';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
