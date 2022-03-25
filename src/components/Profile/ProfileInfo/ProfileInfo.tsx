import React, { ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import art from '../../../assets/images/second-profile-art.jpg';
import cn from 'classnames';
import ProfileNav from './ProfileNav';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { savePhoto, updateStatus } from '../../../redux/profile-reducer';


const ProfileInfo: React.FC = (props) => {

    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const isOwner = useSelector((state: AppStateType) => state.auth.isMe)
    const userId = useSelector((state: AppStateType) => state.auth.userId)

    const dispatch = useDispatch()

    const updateStatusDispatch = (status: string) => {
        dispatch(updateStatus(status))
    }

    const savePhotoDispatch = (photo: File) => {
        dispatch(savePhoto(photo))
    }

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhotoDispatch(e.target.files[0]);
        }
    }

    return (
        <div className={s.profileContent}>
            <div className={s.background}>
                <div className={s.images}>
                    <img className={s.art} src={art} alt=""/>
                    <img className={cn({[s.greenBorder]: profile.lookingForAJob}, s.pic, {[s.redBorder]: !profile.lookingForAJob})}
                        src={profile.photos.small != null ? profile.photos.small : "https://pbs.twimg.com/media/DiHYZjOVAAA95Yc.jpg" } alt=""/>
                    <div className={s.changePhoto}>
                        {isOwner && <input className={s.file} type={"file"} onChange={onMainPhotoSelected} />}
                    </div>

                    {isOwner && <img className={s.changePhotoPic} src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/25.Camera-Front-256.png" alt=""/>}
                </div>

                <div className={s.description}>
                    <div className={s.stats}>
                        <div className={s.stat}>
                            <h1>100</h1>
                            <p>posts</p>
                        </div>
        
                        <div className={s.stat}>
                            <h1>190</h1>
                            <p>subs</p>
                        </div>
                        
                        <div className={s.stat}>
                            <img src="https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png" alt=""/>
                            <p>Country</p>
                        </div>
                    </div>
                    <div className={s.name}>
                        <h1>{profile.fullName}({profile.userId})</h1>
                        <h2>{profile.aboutMe}</h2>
                    </div>
                    <div className={s.links}>
                        <div>
                            <img src="https://cdn4.iconfinder.com/data/icons/social-media-free-13/32/Github_social_media_logo-512.png" alt=""/>
                            <p>{profile.contacts.github ? profile.contacts.github : "GitHub"}</p>
                        </div>
                        <div>
                            <img src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Facebook_glyph_svg-512.png" alt=""/>
                            <p>{profile.contacts.facebook ? profile.contacts.github : "Facebook"}</p>
                        </div>
                        <div>
                            <img src="https://cdn4.iconfinder.com/data/icons/miu-black-social-2/60/twitter-512.png" alt=""/>
                            <p>{profile.contacts.twitter ? profile.contacts.github : "Twitter"}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={s.mainInfo}>
                <br />
                <ProfileStatusWithHooks updateStatus={updateStatusDispatch} status={status} isOwner={isOwner}/>
                <br />
            </div>

            <ProfileNav userId={userId}/>
        </div>
    );
}

export default ProfileInfo;