import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import Friend from './Friend';
import s from './friends.module.css';

const Friends: React.FC = () => {
    const friends = useSelector((state: AppStateType) => state.profilePage.temporarilyForFriends)

    return (
        <div className={s.friends}>
            {friends?.map((friend, index) => <Friend friend={friend} key={index}/>)}
        </div>
    );
}

export default Friends;