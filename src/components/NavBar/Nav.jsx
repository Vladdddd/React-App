import React from 'react';
import s from './nav.module.css';
import { NavLink } from "react-router-dom";


const Nav = (props) => {
    let state = props.sidebar;
    let friendElement = state.friends.map((p) => { return (p.name + ' '); });
    
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={s.item} >
                <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="">News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="">Video</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="">Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="">Settings</NavLink>
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
