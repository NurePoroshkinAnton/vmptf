import { message } from "antd"
import { makeAutoObservable, reaction, runInAction } from "mobx"
import { VideoService } from "@/api/videos/VideoService"
import { Video } from "@/types/models/videos/Video"
import { GetAllPaginatedDto } from "@/types/common/GetAllPaginatedDto"

export const VIDEOS_PER_PAGE = 6
class VideoStore {
    constructor() {
        makeAutoObservable(this)
    }

    videos: Video[] = []
    isLoading = false
    needsUpdate = false
    page: number = 1
    perPage: number = VIDEOS_PER_PAGE
    total: number = -1

    get hasMore() {
        return !(this.total !== -1 && this.videos.length === this.total)
    }

    async fetchVideos(
        pagination: GetAllPaginatedDto,
        overwrite: boolean = false
    ) {
        if ((this.isLoading || !this.hasMore) && !overwrite) {
            return
        }

        this.isLoading = true

        try {
            const { items: videos, total } = await VideoService.getAll(
                pagination
            )
            this.setPagination(pagination)
            runInAction(() => {
                if (overwrite) {
                    this.videos = videos
                } else {
                    this.videos.push(...videos)
                }
                this.total = total
            })
        } catch (error) {
            message.error("An error occured while fetcing videos")
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    setPagination({ page, perPage }: GetAllPaginatedDto) {
        this.page = page
        this.perPage = perPage
    }

    invalidate() {
        this.needsUpdate = true
    }
}

export const videoStore = new VideoStore()

reaction(
    () => ({
        needsUpdate: videoStore.needsUpdate,
    }),
    async ({ needsUpdate }) => {
        if (needsUpdate) {
            await videoStore.fetchVideos(
                {
                    page: 1,
                    perPage: videoStore.perPage,
                },
                true
            )
            runInAction(() => (videoStore.needsUpdate = false))
        }
    }
)

