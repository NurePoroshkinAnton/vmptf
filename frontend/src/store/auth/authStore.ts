import { User } from "@/types/models/auth/User"
import { autorun, makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"

import { AuthService } from "@/api/auth/AuthService"
import { SigninDto } from "@/types/models/auth/dto/SigninDto"
import { SignupDto } from "@/types/models/auth/dto/SignupDto"
import { AxiosError } from "axios"

class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }

    user: User | null = null
    isLoading = false
    isReady = false

    async signin(dto: SigninDto) {
        try {
            this.isLoading = true

            await AuthService.signin(dto)
            const profile = await AuthService.getProfile()

            runInAction(() => {
                this.user = profile
            })
        } catch (error) {
            message.error(
                "An error occured while signing-in. Please, try again later"
            )
        } finally {
            this.isLoading = false
        }
    }

    async signup(dto: SignupDto) {
        try {
            this.isLoading = true

            await AuthService.signup(dto)
            const profile = await AuthService.getProfile()

            runInAction(() => {
                this.user = profile
            })
        } catch (error) {
            message.error(
                "An error occured while signing-up. Please, try again later"
            )
        } finally {
            this.isLoading = false
        }
    }

    async hydrateAuth() {
        try {
            this.isLoading = true
            const profile = await AuthService.getProfile()
            runInAction(() => {
                this.user = profile
            })
        } catch (error) {
            const statusCode = (error as AxiosError).response?.status
            if (statusCode !== 401) {
                message.error(
                    "An error occured while loading your profile. Please, try again later"
                )
            }
        } finally {
            runInAction(() => {
                this.isLoading = false
                this.isReady = true
            })
        }
    }

    signout() {
        this.user = null
    }
}

export const authStore = new AuthStore()

autorun(() => {
    if (!authStore.isReady) {
        authStore.hydrateAuth()
    }
})

