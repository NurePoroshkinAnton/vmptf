import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"

export default function Content() {
    return (
        <Layout.Content className={styles["content"]}>
            <Outlet />
        </Layout.Content>
    )
}

