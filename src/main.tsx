import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginScreen from '@/screen/Login/index.tsx'
import PrivateRoute from './components/PrivateRoute/index.tsx'
import RootScreen from '@/screen/Root/index.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import './globals.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootScreen />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <App />
          </PrivateRoute>
        ),
      },
      { path: '/login', element: <LoginScreen /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
