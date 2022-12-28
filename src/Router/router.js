import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../components/Pages/Home/Home";
import Main from "../Main/Main";
import Signup from '../components/Signup/Signup';
import Media from "../components/Pages/Media/Media";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/media',
                element: <Media></Media>,
                loader: () => fetch('http://localhost:5000/posts')
            },
        ]
    }
])

export default router;