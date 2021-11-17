import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY" : "b22929d0-6191-4cc8-a93a-e7d861fc9d24"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then (response => {
            return response.data;
        });
    },

    deleteFollow(id = 2) {
        return instance.delete(`follow/` + id)
        .then (response => {
            return response.data;
        });
    },

    postFollow(id = 2) {
        return instance.post(`follow/` + id)
        .then (response => {
            return response.data;
        });
    },
    /*
    getProfile(userId = 2) {
        console.warn('Please use ProfileAPI');
        return profileAPI.getProfile(userId);
    }*/

    getProfile(userId) {
        return instance.get(`profile/` + userId)
        .then (response => {
            return response.data;
        });
    }
}

export const profileAPI = { 
    getProfile(userId) {
        return instance.get(`profile/` + userId)
        .then (response => {
            return response.data;
        });
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
        .then (response => {
            return response.data;
        })
    },

    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
        .then (response => {
            return response.data;
        })
    },

    savePhoto(photo) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo`, formData, {headers: {'Content-Type' : 'multipart/form-data'}})
        .then (response => {
            return response.data;
        })
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
        .then (response => {
            return response.data;
        });
        
    },

    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
        .then (response => {
            return response.data;
        });
    },

    logout() {
        return instance.delete(`auth/login`)
        .then (response => {
            return response.data;
        });
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
        .then (response => {
            return response.data;
        });
        
    }
}