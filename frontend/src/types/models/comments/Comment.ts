import { Dayjs } from "dayjs"
import { User } from "../auth/User"
import { Video } from "../videos/Video"

export interface Comment {
    id: string
    text: string
    createdAt: Dayjs
    videoId: string
    video: Video
    user: User
}

