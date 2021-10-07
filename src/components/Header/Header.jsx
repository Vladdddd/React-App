import React from 'react';
import  s from './header.module.css';
import { NavLink } from "react-router-dom";


const Header = (props) => {
	return (
		<header className = {s.header}>
        	<img src = "https://cdn1.iconfinder.com/data/icons/business-management-set-4/256/132-256.png"/>
        <div className={s.loginBlock}>
            {props.isAuth 
                ? <span>{props.login}<button onClick={props.logout}>Logout</button></span> 
                : <NavLink to="/login"><span>Login</span></NavLink>} 
        </div>
        </header>
    );
}

export default Header;

