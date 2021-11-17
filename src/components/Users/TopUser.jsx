import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';

let TopUser = ({ user }) => {
    let lvl = 1;
    if(user.status) {
        lvl += user.status.length;
    }
    if(user.photos.small || user.photos.large) {
        lvl += 15;
    }
    /* Дублирование кода, нужно убрать*/
    return <div>
        {lvl > 16 ?
            <div className={s.topUser}>
                <NavLink to={'/profile/' + user.id}>
                    <img alt="" src={user.photos.small != null ? user.photos.small : "http://www.kutchguide.in/wp-content/uploads/2018/02/pict-customer-male-ivr-people-vector-stencils-library.png-diagram-flowchart-example.png"} 
                         className={s.topPhoto} />
                </NavLink>
                <div className={s.topInfo}>
                    <div className={s.topName}>{user.name}</div>
                    <div className={s.lastActivity}>lvl {lvl}</div>
                </div>

            </div>
            :
            <div></div>
        }
    </div>
}



export default TopUser;