import React from 'react';
import s from './Users.module.css';
import { NavLink } from "react-router-dom";


let User = ({ user, followingInProgress, unfollow, follow }) => {
    return <div>

        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ?  user.photos.small : "https://pbs.twimg.com/media/DiHYZjOVAAA95Yc.jpg"} className={s.forPhoto} />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id);

                    }}>Follow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id);

                    }}>Unfollow</button>}

            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{user.country}</div>
            </span>
        </span>
    </div>
}



export default User