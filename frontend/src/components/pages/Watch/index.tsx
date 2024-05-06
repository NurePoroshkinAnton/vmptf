import { VideoService } from "@/api/videos/VideoService"
import { commentsStore } from "@/store/comments"
import { Video } from "@/types/models/videos/Video"
import { getUploadSrc } from "@/utils/getUploadSrc"
import { CloudOutlined } from "@ant-design/icons"
import { Button, Divider, Spin, message } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommentsList from "./CommentsList"
import styles from "./styles.module.scss"

type RouteParams = {
    id: string
}

export default function WatchPage() {
    const [video, setVideo] = useState<Video | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        if (!id) {
            return
        }

        if (!video) {
            setLoading(true)

            VideoService.getById(id)
                .then((video) => {
                    setVideo(video)
                })
                .catch(() =>
                    message.error("An error occured while loading video")
                )
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [id, video])

    useEffect(() => {
        if (!id) {
            return
        }

        commentsStore.setVideoId(id)
    }, [id])

    if (loading || !video) {
        return <Spin spinning fullscreen />
    }

    function handleShareClick() {
        navigator.clipboard.writeText(window.location.href)
        message.success("Link copied to the clipboard")
    }

    return (
        <div className={styles["video-block"]}>
            <video
                className={styles["video"]}
                src={getUploadSrc(video.fileId, video.user.id)}
                controls
            />
            <div className={styles["title"]}>{video.title}</div>
            <div className={styles["actions"]}>
                <div className={styles["views-count"]}>
                    Uploaded by <b>{video.user.nickname}</b>
                </div>
                <Button
                    shape="round"
                    icon={<CloudOutlined />}
                    onClick={handleShareClick}
                >
                    Share
                </Button>
            </div>
            <Divider />
            <CommentsList />
        </div>
    )
}

