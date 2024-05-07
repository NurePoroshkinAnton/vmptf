import { GetAllPaginatedDto } from "@/types/common/GetAllPaginatedDto"
import { PaginationRepsonse } from "@/types/common/PaginationResponse"
import { Video } from "@/types/models/videos/Video"
import { UploadVideoDto } from "@/types/models/videos/dto/UploadVideoDto"
import { timeout } from "@/utils/timeout"
import axios from "axios"
import dayjs from "dayjs"

export class VideoService {
    private static axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/videos`,
        withCredentials: true,
    })

    static async upload(dto: UploadVideoDto) {
        await this.axiosInstance.post("", dto)
    }

    static async getAll({ page, perPage }: GetAllPaginatedDto) {
        await timeout(2000)

        const resp = await this.axiosInstance.get<PaginationRepsonse<Video>>(
            "",
            {
                params: {
                    page,
                    perPage,
                },
            }
        )
        const { items, total } = resp.data

        const videos = items.map((video) => ({
            ...video,
            createdAt: dayjs(video.createdAt),
        }))

        return {
            items: videos,
            total,
        }
    }

    static async getById(id: string) {
        await timeout(2000)

        const resp = await this.axiosInstance.get<Video>(`/${id}`)
        return resp.data
    }
}

