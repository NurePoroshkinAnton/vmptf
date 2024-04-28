import { Typography } from "antd"
import styles from "./styles.module.scss"
import VideoList from "./VideoList"

export default function HomePage() {
    return (
        <div className={styles["home-wrapper"]}>
            <Typography.Title className={styles["page-title"]}>
                Expore these videos
            </Typography.Title>
            <VideoList />
        </div>
    )
}

