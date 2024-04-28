import { Layout } from "antd"
import Header from "./Header"
import Content from "./Content"

export default function MainLayout() {
    return (
        <Layout style={{ height: "100%" }}>
            <Header />
            <Content />
        </Layout>
    )
}

