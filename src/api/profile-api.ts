import { PhotosType, ProfileType } from '../types/types';
import {instance, ResponseType} from './api';

type SavePhotoDataType = {
    photos: PhotosType
}

export const profileAPI = { 
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
        .then (response => {
            return response.data;
        });
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
        .then (response => {
            return response.data;
        })
    },

    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status})
        .then (response => {
            return response.data;
        })
    },

    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put<ResponseType<SavePhotoDataType>>(`profile/photo`, formData, {headers: {'Content-Type' : 'multipart/form-data'}})
        .then (response => {
            return response.data;
        })
    }
}