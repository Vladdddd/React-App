import { UserType } from '../types/types';
import {GetItemsType, instance, ResponseType} from './api';



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100, term = '', friend: null | boolean = null) {
        let termQuery = '';
        if(term !== '') {
            termQuery = `&term=${term}`;
        }

        return instance.get<GetItemsType<UserType>>
        (`users?page=${currentPage}&count=${pageSize}` + termQuery + (friend === null ? '' : `&friend=${friend}`))
        .then (response => {
            return response.data;
        });
    },

    deleteFollow(id = 2) {
        return instance.delete<ResponseType>(`follow/` + id)
        .then (response => {
            return response.data;
        });
    },

    postFollow(id = 2) {
        return instance.post<ResponseType>(`follow/` + id)
        .then (response => {
            return response.data;
        });
    }
}