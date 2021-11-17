import React from 'react';
import s from './main.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Main = ({profile, status, updateStatus, isOwner, savePhoto, userId}) => {
    return (
        <main className={s.content}>
            <ProfileInfo savePhoto={savePhoto} isOwner={isOwner} profile={profile} status={status} updateStatus={updateStatus} userId={userId}/>
            <MyPostsContainer />
        </main>
    );                                                                                                                      
}                                                   

export default Main;

                                                                                                                