import React from 'react';
import s from './main.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Main = ({profile, status, updateStatus}) => {
    return (
        <main className={s.content}>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </main>
    );
}

export default Main;
