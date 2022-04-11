import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {    
}

export const Profile: React.FC<PropsType> = () => {
    return (
        <main>
            <ProfileInfo />
            <MyPostsContainer />
        </main>
    );                                                                                                                      
}                                                   

                                                                                                                