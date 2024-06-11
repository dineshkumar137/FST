import React from 'react'
import App from './App.jsx'
import  ReactDOM  from 'react-dom/client';
import './index.css'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Post from './Posthouse.jsx';
import Search from './Serachhouse.jsx';
import { UserProvider } from './UserContext.jsx';
import { createBrowserRouter , RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  [
    {
      path:"/",
      Component : App
    },
    {
      path:"/login",
      Component : Login
    },
    {
      path:"/register",
      Component : Register
    },
    {
      path:"/SouthernRentalspost",
      Component : Post
    },
    {
      path:"/SouthernRentalsSearch",
      Component:Search
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>,
)
