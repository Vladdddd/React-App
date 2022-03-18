import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { stopSubmit } from "redux-form";
import { InferActionsTypes, BaseThunkType } from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    isMe: false,
    captchaUrl: null as string | null //if null, then captcha is not required
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            };
        }
        case 'SN/AUTH/IS_ME': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state;
    }
}


export const actions = {
    setAuthUserDataAC: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth }
    } as const),
    setIsMe: (isMe: boolean) => ({ type: 'SN/AUTH/IS_ME', payload: { isMe } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const)
}


export const getAuth = (): ThunkType => async (dispatch) => {
    let data = await authAPI.getAuth();
    if (data.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = data.data;
        dispatch(actions.setAuthUserDataAC(id, email, login, true));
    }

}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuth());
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const logout = (email?: string, password?: string, rememberMe?: boolean): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserDataAC(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));


}

export default authReducer;


/*Types*/

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export type ThunkType = BaseThunkType<ActionsType>

