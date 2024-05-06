import { observer } from "mobx-react-lite"
import VideoCard from "./VideoCard"
import styles from "./styles.module.scss"
import { videoStore } from "@/store/videos"
import { Empty, Spin } from "antd"
import { useEffect } from "react"

function VideoListComponent() {
    const videos = videoStore.videos
    const isLoading = videoStore.isLoading

    useEffect(() => {
        if (videos.length === 0) {
            videoStore.fetchVideos()
        }
    }, [])

    if (isLoading) {
        return <Spin spinning fullscreen />
    }

    if (videos.length === 0) {
        return <Empty />
    }

    return (
        <div className={styles["video-list"]}>
            {videos.map((video) => (
                <VideoCard video={video} key={video.id} />
            ))}
        </div>
    )
}

const VideoList = observer(VideoListComponent)
export default VideoList

