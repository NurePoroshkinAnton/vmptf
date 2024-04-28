import {
    LogoutOutlined,
    UserOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons"
import { Avatar, Button, Layout, Tooltip } from "antd"
import styles from "./styles.module.scss"

export default function Header() {
    return (
        <Layout.Header className={styles["header"]}>
            <div className={styles["logo"]}>MyTube</div>
            <Tooltip title="Add a new video">
                <Button
                    shape="circle"
                    className={styles["add-video"]}
                    icon={<VideoCameraAddOutlined />}
                />
            </Tooltip>
            <div>
                Signed in as <b>Anton Poroshkin</b>{" "}
                <Avatar icon={<UserOutlined />} style={{ marginLeft: "4px" }} />
            </div>

            <Button type="primary" icon={<LogoutOutlined />}>
                Sign out
            </Button>
        </Layout.Header>
    )
}

