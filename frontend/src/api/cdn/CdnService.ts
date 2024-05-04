import axios from "axios"

export class CdnService {
    private static axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/cdn`,
        withCredentials: true,
    })

    static async remove(id: string): Promise<void> {
        await this.axiosInstance.delete(`/${id}`)
    }
}

