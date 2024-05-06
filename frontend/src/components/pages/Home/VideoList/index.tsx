import { observer } from "mobx-react-lite"
import VideoCard from "./VideoCard"
import styles from "./styles.module.scss"
import { videoStore } from "@/store/videos"
import { Empty } from "antd"
import { useEffect } from "react"
import VideoCardLoader from "./VideoCardLoader"

function VideoListComponent() {
    const videos = videoStore.videos
    const isLoading = videoStore.isLoading

    useEffect(() => {
        if (videos.length === 0) {
            videoStore.fetchVideos()
        }
    }, [])

    if (!isLoading && videos.length === 0) {
        return <Empty />
    }

    const loaders = new Array(6)
        .fill(1)
        .map((_, index) => <VideoCardLoader key={index} />)

    return (
        <div className={styles["video-list"]}>
            {videos.map((video) => (
                <VideoCard video={video} key={video.id} />
            ))}
            {isLoading && loaders}
        </div>
    )
}

const VideoList = observer(VideoListComponent)
export default VideoList

