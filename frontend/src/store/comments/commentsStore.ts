import { CommentsService } from "@/api/comments/CommentService"
import { Comment } from "@/types/models/comments/Comment"
import { dayjs } from "@/utils/dayjs"
import { message } from "antd"
import { autorun, makeAutoObservable, reaction, runInAction } from "mobx"

class CommentsStore {
    constructor() {
        makeAutoObservable(this)
    }

    comments: Comment[] = []
    videoId: string | null = null
    isLoading = false
    needsUpdate = false

    async fetchComments() {
        if (!this.videoId) {
            return
        }

        this.isLoading = true

        try {
            let comments = await CommentsService.getAll(this.videoId)
            comments = comments.map((comment) => ({
                ...comment,
                createdAt: dayjs(comment.createdAt),
            }))
            runInAction(() => {
                this.comments = comments
            })
        } catch (error) {
            message.error("An error occured while fetcing comments")
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    invalidate() {
        this.needsUpdate = true
    }

    setVideoId(videoId: string) {
        this.videoId = videoId
    }
}

export const commentsStore = new CommentsStore()

reaction(
    () => ({
        needsUpdate: commentsStore.needsUpdate,
    }),
    async ({ needsUpdate }) => {
        if (needsUpdate) {
            await commentsStore.fetchComments()
            commentsStore.needsUpdate = false
        }
    }
)

autorun(() => {
    if (commentsStore.videoId) {
        commentsStore.fetchComments()
    }
})

