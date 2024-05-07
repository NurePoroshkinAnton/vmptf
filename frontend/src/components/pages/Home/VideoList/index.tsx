import { observer } from "mobx-react-lite"
import VideoCard from "./VideoCard"
import styles from "./styles.module.scss"
import { videoStore } from "@/store/videos"
import { Empty } from "antd"
import { useEffect } from "react"
import VideoCardLoader from "./VideoCardLoader"
import Intersector from "@/components/utils/Intersector"

function VideoListComponent() {
    const videos = videoStore.videos
    const isLoading = videoStore.isLoading

    useEffect(() => {
        if (videos.length === 0) {
            videoStore.fetchVideos({
                page: videoStore.page,
                perPage: videoStore.perPage,
            })
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
            <Intersector
                callback={() =>
                    videoStore.fetchVideos({
                        page: videoStore.page + 1,
                        perPage: videoStore.perPage,
                    })
                }
            />
        </div>
    )
}

const VideoList = observer(VideoListComponent)
export default VideoList

