import {
    LogoutOutlined,
    UserOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons"
import { Avatar, Button, Layout, Tooltip } from "antd"
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite"
import { authStore } from "@/store/auth"
import { UploadVideoModal } from "../../Home/UploadVideoModal"
import { useState } from "react"

function HeaderComponent() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const user = authStore.user

    return (
        <Layout.Header className={styles["header"]}>
            <UploadVideoModal isOpen={isModalOpen} setOpen={setModalOpen} />
            <div className={styles["logo"]}>MyTube</div>
            <Tooltip title="Add a new video">
                <Button
                    shape="circle"
                    className={styles["add-video"]}
                    icon={<VideoCameraAddOutlined />}
                    onClick={() => setModalOpen(true)}
                />
            </Tooltip>
            <div>
                Signed in as <b>{user?.nickname}</b>{" "}
                <Avatar icon={<UserOutlined />} style={{ marginLeft: "4px" }} />
            </div>

            <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={() => authStore.signout()}
            >
                Sign out
            </Button>
        </Layout.Header>
    )
}

const Header = observer(HeaderComponent)
export default Header

