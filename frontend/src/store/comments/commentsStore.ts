import { CommentsService } from "@/api/comments/CommentService"
import { GetAllPaginatedDto } from "@/types/common/GetAllPaginatedDto"
import { Comment } from "@/types/models/comments/Comment"
import { GetAllVideosDto } from "@/types/models/comments/dto/GetAllCommentsDto"
import { dayjs } from "@/utils/dayjs"
import { message } from "antd"
import { makeAutoObservable, reaction, runInAction } from "mobx"

const COMMENTS_PER_PAGE = 10
class CommentsStore {
    constructor() {
        makeAutoObservable(this)
    }

    comments: Comment[] = []
    videoId: string | null = null
    isLoading = false
    needsUpdate = false
    page: number = 1
    perPage: number = COMMENTS_PER_PAGE
    total: number = -1

    get hasMore() {
        return !(this.total !== -1 && this.comments.length === this.total)
    }

    setPagination({ page, perPage }: GetAllPaginatedDto) {
        this.page = page
        this.perPage = perPage
    }

    async fetchComments(query: GetAllVideosDto, overwrite: boolean = false) {
        if ((this.isLoading || !this.hasMore) && !overwrite) {
            return
        }

        this.isLoading = true

        try {
            const { items, total } = await CommentsService.getAll(query)

            const comments = items.map((comment) => ({
                ...comment,
                createdAt: dayjs(comment.createdAt),
            }))

            this.setPagination({ page: query.page, perPage: query.perPage })
            runInAction(() => {
                if (overwrite) {
                    this.comments = comments
                } else {
                    this.comments.push(...comments)
                }
                this.total = total
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
        if (!commentsStore.videoId) {
            return
        }

        if (needsUpdate) {
            await commentsStore.fetchComments(
                {
                    page: commentsStore.page,
                    perPage: commentsStore.perPage,
                    videoId: commentsStore.videoId,
                },
                true
            )
            runInAction(() => {
                commentsStore.needsUpdate = false
            })
        }
    }
)

reaction(
    () => ({
        videoId: commentsStore.videoId,
    }),
    (next, prev) => {
        if (!next.videoId) {
            console.log("early return")
            return
        }

        commentsStore.fetchComments(
            {
                page: commentsStore.page,
                perPage: commentsStore.perPage,
                videoId: next.videoId,
            },
            true
        )
    }
)

