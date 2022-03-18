export type PostType = {
    id: number
    mess: string
    name: string
    age: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string 
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: string
    lookingForAJobDescription: string 
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    country: string
    followed: boolean
}

export type NewsType = {
    id?: number
    name: string
    news: string
    role: string
    time: string
    photo: null | string
}

export type TopNewsType = {
    id?: number
    name: string
    caption: string
    time: string
}

export type FriendType = {
    id: number
    name: string
    country: string
    age: number
}
