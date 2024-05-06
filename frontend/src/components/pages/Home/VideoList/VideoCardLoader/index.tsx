import { Skeleton } from "antd"
import styles from "./styles.module.scss"

export default function VideoCardLoader() {
    return (
        <div>
            <Skeleton.Node active className={styles["loader-video"]} />
            <Skeleton active paragraph={{ rows: 0 }} />
        </div>
    )
}

