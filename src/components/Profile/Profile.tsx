import React from 'react';
import { ProfileType } from '../../types/types';
import s from './profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    userId: string

    savePhoto: (photo: File) => void
    updateStatus: (status: string) => void
}

const Main: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, userId}) => {
    return (
        <main className={s.content}>
            <ProfileInfo savePhoto={savePhoto} isOwner={isOwner} profile={profile} status={status} updateStatus={updateStatus} userId={userId}/>
            <MyPostsContainer />
        </main>
    );                                                                                                                      
}                                                   

export default Main;

                                                                                                                