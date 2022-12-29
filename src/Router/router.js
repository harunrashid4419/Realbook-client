import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../components/Pages/Home/Home";
import Main from "../Main/Main";
import Signup from '../components/Signup/Signup';
import Media from "../components/Pages/Media/Media";
import Details from "../components/Pages/Details/Details";
import PrivateRoutes from "./PrivateRoutes";
import About from "../components/Pages/About/About";
import TopRetedDetails from "../components/Pages/TopRetedDetails/TopRetedDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
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
            {
                path: '/post/:id',
                element: <PrivateRoutes><Details></Details></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/posts/${params.id}`)
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/details/:id',
                element: <PrivateRoutes><TopRetedDetails></TopRetedDetails></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/topPost/${params.id}`)
            },
        ]
    }
])

export default router;