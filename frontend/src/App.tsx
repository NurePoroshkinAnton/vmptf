import { App as AntdApp, ConfigProvider } from "antd"
import { Outlet } from "react-router-dom"

export default function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#4d5075",
                },
            }}
        >
            <AntdApp style={{ height: "100%" }}>
                <Outlet />
            </AntdApp>
        </ConfigProvider>
    )
}

