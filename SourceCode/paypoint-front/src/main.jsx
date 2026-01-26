import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './assets/css/index.css'
import Category from './pages/Category.jsx'

const router = createBrowserRouter ([
 {
   path: '/',
   element: <MainLayout/>,
   children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: "Dashboard",
        element: <Dashboard />
      },
      {
        path: "category",
        element: <Category />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)