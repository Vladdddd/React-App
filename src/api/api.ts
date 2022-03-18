import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY" : "b22929d0-6191-4cc8-a93a-e7d861fc9d24"
    }
})

export enum ResultCodesEnum {
    Success = 0, 
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}