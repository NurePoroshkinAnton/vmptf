import { authStore } from "@/store/auth"
import { Spin } from "antd"
import { observer } from "mobx-react-lite"
import { Navigate } from "react-router-dom"

function ProtectedRouteComponent({ children }: { children: JSX.Element }) {
    if (!authStore.isReady) {
        return <Spin spinning size="large" />
    }

    if (!authStore.user) {
        return <Navigate to="/auth/signin" replace />
    }

    return children
}

const ProtectedRoute = observer(ProtectedRouteComponent)
export default ProtectedRoute

