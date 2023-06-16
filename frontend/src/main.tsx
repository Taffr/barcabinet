import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { AllIngredients } from './components/all-ingredients.tsx'
import { AllRecipes } from './components/all-recipes.tsx'
import App from './App.tsx'
import { ErrorPage } from './error-page.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/recipes',
        element: <AllRecipes />
      },
      {
        path: '/ingredients',
        element: <AllIngredients />
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
