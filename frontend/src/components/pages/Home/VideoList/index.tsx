import VideoCard from "./VideoCard"
import styles from "./styles.module.scss"

const mockVieoCards: {}[] = [{}, {}, {}, {}]

export default function VideoList() {
    return (
        <div className={styles["video-list"]}>
            {mockVieoCards.map((item) => (
                <VideoCard />
            ))}
        </div>
    )
}

