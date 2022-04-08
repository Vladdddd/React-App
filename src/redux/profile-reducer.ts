import { ResultCodesEnum } from "../api/api"
import { profileAPI } from "../api/profile-api"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
    posts: [
        { id: 1, mess: 'Hello, new user. I love you', name: 'Griforii', age: 54 },
        { id: 2, mess: 'Hey, bro', name: 'Artemon', age: 21 }
    ] as Array<PostType>,

    newPostText: 'it-genius',
    profile: null as unknown as ProfileType,
    fullnes: 0,
    status: '',
    temporarilyForFriends: ['Andrii']
};


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                mess: action.newPostText,
                name: 'user',
                age: 18
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case 'SN/PROFILE/UPDATE-NEW-POST-TEXT': {

            return {
                ...state,
                newPostText: action.newText
            };
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }

        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }

        case 'SN/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }

        case 'SN/PROFILE/SAVE_PHOTO': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        case 'SN/PROFILE/SET_FULLNES': {
            let fullnesCounter = 0;
            let profile = state.profile;
            if(profile && profile.photos) {
                if(profile.photos.small || profile.photos.large) {
                    fullnesCounter += 10;
                }
                if(state.status) {
                    fullnesCounter += 10;
                }
            }

            return {
                ...state,
                fullnes: fullnesCounter
            }
        }

        default:
            return state;
    }
}

export const actions = {
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS',status} as const),
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    updateNewPostTextActionCreator: (text: string) => ({type: 'SN/PROFILE/UPDATE-NEW-POST-TEXT', newText: text} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO', photos} as const),
    setFullnes: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_FULLNES'} as const)
}

//thunks


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);

    dispatch(actions.setStatus(data));

}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)

        if (data.resultCode === ResultCodesEnum.Success)
            dispatch(actions.setStatus(status));
    }
    catch(error) {
        
    }
    
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file); // Отправляем фото на сервер

    if (data.resultCode === 0)
        dispatch(actions.savePhotoSuccess(data.data.photos));
}


export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    
    dispatch(actions.setUserProfile(data));
}


export default profileReducer;

/* Types */

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, Promise<void>>