import React from 'react';
import  s from './header.module.css';
import { NavLink } from "react-router-dom";
import { ThunkType } from '../../redux/auth-reducer';


export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    getAuth: () => void
    logout: () => ThunkType | Promise<void>
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
	return (
		<header className = {s.header}>
        	<img src = "https://cdn1.iconfinder.com/data/icons/social-media-vol-3-1/24/_spotify-512.png" alt=""/>
        <div className={s.loginBlock}>
            {props.isAuth 
                ? <span>{props.login}<button className={s.logButton} onClick={props.logout}>Logout</button></span> 
                : <NavLink to="/login"><span>Login</span></NavLink>} 
        </div>
        </header>
    );
}

export default Header;
