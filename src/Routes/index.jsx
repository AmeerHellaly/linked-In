import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from '../layouts/HomeLayout'
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
import ProfileUserLayout from "../layouts/ProfileUserLayout";
import Dashboard from "../admin/Dashboard";
export const router=createBrowserRouter([
    {
        path:'/',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/home',
        element:<HomeLayout/>
    },
    {
        path:'/profile',
        element:<ProfileLayout/>
    },
    {
        path:'/profile-user',
        element:<ProfileUserLayout/>
    },
    {
        path:'/connections',
        element:<ConnectionLayout/>
    },
    {
        path:'dashboard',
        element:<Dashboard/>
    },
])