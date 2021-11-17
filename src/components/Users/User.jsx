import React from 'react';
import s from './Users.module.css';
import { NavLink } from "react-router-dom";

let User = ({ user, followingInProgress, unfollow, follow }) => {
    
    let lvl = 1;
    if(user.status) {
        lvl += user.status.length;
    }
    if(user.photos.small || user.photos.large) {
        lvl += 15;
    }

    return <div>

        <div className={s.user}>
            <div className={s.info}>
                <NavLink to={'/profile/' + user.id + '/me'}>
                    <img src={user.photos.small != null ? user.photos.small : "https://pbs.twimg.com/media/DiHYZjOVAAA95Yc.jpg"} className={s.forPhoto} alt=""/>
                </NavLink>

                <div className={s.userInfo}>
                    <span>
                        <div className={s.userName}>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{user.country}</div>
                        <div className={s.lastActivity}>lvl {lvl}</div>
                    </span>
                </div>
            </div>


            <div className={s.buttons}>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id);
                    }}>Follow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id);

                    }}>Unfollow</button>}
            </div>
        </div>

    </div>
}



export default User