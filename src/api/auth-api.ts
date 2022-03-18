import { instance, ResponseType, ResultCodeForCaptcha, ResultCodesEnum } from './api';

type GetAuthDataType = {
    id: number
    email: string
    login: string
}

type LoginDataType = {
    userId: number
}


export const authAPI = {
    getAuth() {
        return instance.get<ResponseType<GetAuthDataType>>(`auth/me`)
            .then(response => {
                return response.data;
            });

    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginDataType, ResultCodeForCaptcha | ResultCodesEnum>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => {
                return response.data;
            });
    },

    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(response => {
                return response.data;
            });
    }
}