import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../components/Pages/Home/Home";
import Main from "../Main/Main";

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
            }
        ]
    }
])

export default router;