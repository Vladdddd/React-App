import React from 'react';
import s from './nav.module.css';
import { NavLink } from "react-router-dom";
import { FriendType } from '../../types/types';

type PropsType = {
    userId: number | null
    sidebar: {
        friends: Array<FriendType>
    }
}

const Nav: React.FC<PropsType> = ({userId, ...props}) => {
    let state = props.sidebar;
    let friendElement = state.friends.map((p: { name: string; }) => { return (p.name + ' '); });

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink exact to={"/profile"} activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={s.item} >
                <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/news" activeClassName={s.active}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/info" activeClassName={s.active}>Info</NavLink>
            </div>
            
            <div className={s.item}>
                <NavLink to="">Friends</NavLink>
                <div className={s.friends}>
                    {friendElement}
                </div>
            </div>

            
        </nav>
    );

}

export default Nav;
