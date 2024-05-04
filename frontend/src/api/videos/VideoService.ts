import { UploadVideoDto } from "@/types/models/videos/dto/UploadVideoDto"
import axios from "axios"

export class VideoService {
    private static axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/videos`,
        withCredentials: true,
    })

    static async upload(dto: UploadVideoDto) {
        await this.axiosInstance.post("", dto)
    }
}

