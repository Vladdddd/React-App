import { AppStateType } from "../redux-store";

export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const selectPhotos = (state: AppStateType) => {
    return state.profilePage.profile?.photos
}

export const selectStatus = (state: AppStateType) => {
    return state.profilePage.status
}
