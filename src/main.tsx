import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from '@/components/PrivateRoute/index.tsx'
import ProjectDetail from '@/screen/ProjectDetail/index.tsx'
import NewProjectScreen from '@/screen/NewProject/index.tsx'
import ProjectEditScreen from '@/screen/ProjectEdit'
import UploadImageScreen from '@/screen/UploadImage'
import LoginScreen from '@/screen/Login/index.tsx'
import RootScreen from '@/screen/Root/index.tsx'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import React from 'react'
import '@/globals.css'

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
      {
        path: '/projects/new',
        element: (
          <PrivateRoute>
            <NewProjectScreen />
          </PrivateRoute>
        ),
      },
      {
        path: '/projects/:id',
        element: (
          <PrivateRoute>
            <ProjectDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/projects/:id/edit',
        element: (
          <PrivateRoute>
            <ProjectEditScreen />
          </PrivateRoute>
        ),
      },
      {
        path: '/upload',
        element: (
          <PrivateRoute>
            <UploadImageScreen />
          </PrivateRoute>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
