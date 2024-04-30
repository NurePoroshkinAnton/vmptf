import {
    CheckOutlined,
    CloseOutlined,
    CommentOutlined,
} from "@ant-design/icons"
import { Avatar, Button, Input } from "antd"
import styles from "./styles.module.scss"

export default function AddCommnet() {
    return (
        <div className={styles["add-comment-wrapper"]}>
            <Avatar icon={<CommentOutlined />} />
            <Input variant="borderless" placeholder="Add a comment..." />
            <Button icon={<CheckOutlined />} shape="circle" />
            <Button icon={<CloseOutlined />} shape="circle" />
        </div>
    )
}

