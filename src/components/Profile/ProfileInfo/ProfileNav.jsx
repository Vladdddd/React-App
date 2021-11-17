import React from 'react';
import s from './ProfileInfo.module.css';
import cn from 'classnames';
import { NavLink } from "react-router-dom";

const ProfileNav = ({ userId }) => {
    return (
        <div className={s.profileNav}>
            <div className={cn(s.borderNav, s.firstBorder)}></div>
            <div className={cn(s.navImg, s.testNav)} >
                <NavLink to={"/profile/" + userId + "/me"} activeClassName={s.active}><img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-256.png" alt=""/></NavLink>
            </div>

            <div className={s.borderNav}></div>
            <div className={s.navImg}>
                <NavLink to={"/profile/" + userId + "/photos"} activeClassName={s.active}><img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/25.Camera-Front-256.png" alt="" /></NavLink>
            </div>

            <div className={s.borderNav}></div>
            <div className={s.navImg} >
                <NavLink to={"/profile/" + userId + "/edit"} activeClassName={s.active}><img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/15.Pencil-256.png" alt="" /></NavLink>
            </div>

            <div className={s.borderNav}></div>
            <div className={s.navImg}>
                <NavLink to={"/profile/" + userId + "/archieve"} activeClassName={s.active}><img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/10.Folder-256.png" alt="" /></NavLink>
            </div>


            <div className={cn(s.borderNav, s.lastBorder)}></div>

        </div>
    )
}

export default ProfileNav;