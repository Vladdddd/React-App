import React from 'react';
import s from './profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {    
}

export const Profile: React.FC<PropsType> = () => {



    return (
        <main className={s.content}>
            <ProfileInfo />
            <MyPostsContainer />
        </main>
    );                                                                                                                      
}                                                   

                                                                                                                