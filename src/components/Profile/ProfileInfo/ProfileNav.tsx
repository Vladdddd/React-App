import React from 'react';
import s from './ProfileInfo.module.css';
import cn from 'classnames';

type PropsType = {
    userId: string
}

const ProfileNav: React.FC<PropsType> = ({ userId }) => {
    return (
        <div className={s.profileNav}>
            <div className={cn(s.borderNav, s.firstBorder)}></div>
            <div className={cn(s.navImg, s.testNav)} >
                <img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-256.png" alt=""/>
            </div>

            <div className={s.borderNav}></div>
            <div className={s.navImg}>
                <img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/25.Camera-Front-256.png" alt="" />
            </div>

            <div className={s.borderNav}></div>
            <div className={s.navImg} >
                <img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/15.Pencil-256.png" alt="" />
            </div>

            <div className={s.borderNav}></div>
            <div className={s.navImg}>
                <img className={s.imgNav} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/10.Folder-256.png" alt="" />
            </div>


            <div className={cn(s.borderNav, s.lastBorder)}></div>

        </div>
    )
}

export default ProfileNav;