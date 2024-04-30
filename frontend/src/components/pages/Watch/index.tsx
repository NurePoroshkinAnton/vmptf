import { Button, Divider } from "antd"
import styles from "./styles.module.scss"
import { CloudOutlined, DislikeOutlined, LikeOutlined } from "@ant-design/icons"
import CommentsList from "./CommentsList"
import AddCommnet from "./AddComment"

export default function WatchPage() {
    return (
        <div className={styles["video-block"]}>
            <div className={styles["video"]}></div>
            <div className={styles["title"]}>
                Rick Astley - Never Gonna Give You Up (Official Music Video)
            </div>
            <div className={styles["actions"]}>
                <div className={styles["views-count"]}>
                    Uploaded by <b>Rick Astley</b> · 1.5B views
                </div>
                <Button shape="round" icon={<LikeOutlined />}>
                    17M
                </Button>
                <Button shape="round" icon={<DislikeOutlined />}>
                    -1
                </Button>
                <Button shape="round" icon={<CloudOutlined />}>
                    Share
                </Button>
            </div>
            <Divider />
            <AddCommnet />
            <CommentsList />
        </div>
    )
}

