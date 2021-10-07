import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
const ProfileInfo = ({profile, status, updateStatus}) => {
    if(!profile) {
        return <Preloader />
    }

    return (
        <div className={s.profileContent}>
            <div className={s.background}>
                <img src="https://cdn.wallpapersafari.com/63/10/szT7VY.jpg" />
            </div>
            <div className={s.description}>
                <img src={profile.photos.small != null ? profile.photos.small : "https://pbs.twimg.com/media/DiHYZjOVAAA95Yc.jpg"}/>
                <div><span>About me:</span> {profile.aboutMe}</div>
                <div><span>Full name:</span> {profile.fullName}</div>
                <div><span>Id:</span> {profile.userId}</div>
            </div>
            <br />
            <ProfileStatusWithHooks updateStatus={updateStatus} status={status}/>
            <br />
        </div>
    );
}

export default ProfileInfo;