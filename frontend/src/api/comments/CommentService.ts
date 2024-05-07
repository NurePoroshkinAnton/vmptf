import { Comment } from "@/types/models/comments/Comment"
import { CreateCommentDto } from "@/types/models/comments/dto/CreateCommentDto"
import { UpdateCommentDto } from "@/types/models/comments/dto/UpdateCommentDto"
import { timeout } from "@/utils/timeout"
import axios from "axios"

export class CommentsService {
    private static axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/comments`,
        withCredentials: true,
    })

    static async create(dto: CreateCommentDto) {
        await this.axiosInstance.post("", dto)
    }

    static async getAll(videoId: string) {
        await timeout(2000)

        const resp = await this.axiosInstance.get<Comment[]>("", {
            params: {
                videoId,
            },
        })

        return resp.data
    }

    static async update(id: string, dto: UpdateCommentDto) {
        const resp = await this.axiosInstance.patch<Comment>(`/${id}`, dto)
        return resp.data
    }

    static async remove(id: string) {
        await this.axiosInstance.delete(`/${id}`)
    }
}

