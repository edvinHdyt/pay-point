import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './assets/css/index.css'
import Category from './pages/Category.jsx'
import AddCategory from './pages/AddCategory.jsx'
import Product from './pages/Products.jsx'
import Payment from './pages/Payment.jsx'
import Profile from './pages/Profile.jsx'

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
        element: <Category />,
      },
      {
        path: "category/add-category",
        element: <AddCategory />
      },
      {
        path: 'product',
        element: <Product />
      },
      {
        path: 'product/payment',
        element: <Payment />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)