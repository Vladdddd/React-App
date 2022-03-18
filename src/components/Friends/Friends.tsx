import React from 'react';
import Friend from './Friend';
import  s from './friends.module.css';

type PropsType = {
    friends: string
}

const Friends: React.FC<PropsType> = (props) => {
    return (
        <div className={s.friends}>
            <Friend />
        </div>
    );
}

export default Friends;