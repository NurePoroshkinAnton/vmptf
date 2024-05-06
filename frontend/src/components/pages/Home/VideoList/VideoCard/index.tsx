import { Video } from "@/types/models/videos/Video"
import styles from "./styles.module.scss"
import { getUploadSrc } from "@/utils/getUploadSrc"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { getCreatedAtCaption } from "@/utils/getCreatedAtCaption"

interface VideoCardProps {
    video: Video
}

function VideoCardComponent({ video }: VideoCardProps) {
    const navigate = useNavigate()

    const createdAtCaption = getCreatedAtCaption(video.createdAt)

    return (
        <div
            className={styles["card-wrapper"]}
            onClick={() => navigate(`/watch/${video.id}`)}
        >
            <img
                className={styles["preview"]}
                src={getUploadSrc(video.previewId, video.user.id)}
            />
            <div className={styles["title"]}>{video.title}</div>
            <div className={styles["stats"]}>
                <div>{createdAtCaption}</div>
                <div>
                    <b>{video.user.nickname}</b>
                </div>
            </div>
        </div>
    )
}

const VideoCard = observer(VideoCardComponent)
export default VideoCard

