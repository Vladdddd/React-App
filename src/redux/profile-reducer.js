import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';
const SET_FULLNES = 'SET_FULLNES';


let initialState = {
    posts: [
        { id: 1, mess: 'Hello, new user. I love you', name: 'Griforii', age: 54 },
        { id: 2, mess: 'Hey, bro', name: 'Artemon', age: 21 }
    ],
    newPostText: 'it-genius',
    profile: null,
    fullnes: 0,
    status: '',
    temporarilyForFriends: 'Andrii'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
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
        case UPDATE_NEW_POST_TEXT: {

            return {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }

        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} 
            }
        }

        case SET_FULLNES: {
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

export const setStatus = (status) => ({type: SET_STATUS,status})

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})

export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO, photos})

export const setFullnes = (profile) => ({type: SET_FULLNES})


//thunks

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);

    dispatch(setStatus(data));

}


export const updateStatus = (status) => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)

        if (data.resultCode === 0)
            dispatch(setStatus(status));
    }
    catch(error) {
        
    }
    
}

export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.savePhoto(file); // Отправляем фото на сервер

    if (data.resultCode === 0)
        dispatch(savePhotoSuccess(data.data.photos));
}


export const getProfile = (userId) => async (dispatch) => {
    let data = await usersAPI.getProfile(userId);
    
    dispatch(setUserProfile(data));
}


export default profileReducer;