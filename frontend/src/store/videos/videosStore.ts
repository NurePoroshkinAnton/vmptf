import { message } from "antd"
import { makeAutoObservable, reaction, runInAction } from "mobx"
import { VideoService } from "@/api/videos/VideoService"
import { Video } from "@/types/models/videos/Video"

class VideoStore {
    constructor() {
        makeAutoObservable(this)
    }

    videos: Video[] = []
    isLoading = false
    needsUpdate = false

    async fetchVideos() {
        this.isLoading = true

        await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))

        try {
            const videos = await VideoService.getAll()
            runInAction(() => {
                this.videos = videos
            })
        } catch (error) {
            message.error("An error occured while fetcing videos")
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
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
            await videoStore.fetchVideos()
            videoStore.needsUpdate = false
        }
    }
)

