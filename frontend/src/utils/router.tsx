import { Navigate, createBrowserRouter } from "react-router-dom"
import AuthLayout from "../components/pages/auth/AuthLayout"
import Signin from "@/components/pages/auth/Signin"
import App from "@/App"
import Signup from "@/components/pages/auth/Signup"
import MainLayout from "@/components/pages/MainLayout"

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainLayout />,
            },
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="signin" replace />,
                    },
                    {
                        path: "signin",
                        element: <Signin />,
                    },
                    {
                        path: "signup",
                        element: <Signup />,
                    },
                ],
            },
        ],
    },
])

