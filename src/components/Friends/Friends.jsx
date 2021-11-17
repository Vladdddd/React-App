import React from 'react';
import Friend from './Friend';
import  s from './friends.module.css';

const Friends = (props) => {
    return (
        <div className={s.friends}>
            <Friend />
        </div>
    );
}

export default Friends;