import { Dayjs } from "dayjs"
import { User } from "../auth/User"

export interface Video {
    id: string
    title: string
    createdAt: Dayjs
    fileId: string
    previewId: string
    user: User
}

