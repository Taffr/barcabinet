import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ErrorPage } from './error-page.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import { AllRecipes } from './components/all-recipes.tsx'
import { AllIngredients } from './components/all-ingredients.tsx'

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
