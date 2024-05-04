import { User } from "@/types/models/auth/User"
import { SigninDto } from "@/types/models/auth/dto/SigninDto"
import { SignupDto } from "@/types/models/auth/dto/SignupDto"
import axios from "axios"

export class AuthService {
    private static axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
        withCredentials: true,
    })

    static async signin(dto: SigninDto): Promise<void> {
        await this.axiosInstance.post("signin", dto)
    }

    static async signup(dto: SignupDto): Promise<void> {
        await this.axiosInstance.post("signup", dto)
    }

    static async getProfile(): Promise<User> {
        const resp = await this.axiosInstance.get<User>("profile")
        return resp.data
    }
}

