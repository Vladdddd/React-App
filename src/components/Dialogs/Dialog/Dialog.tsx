import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from "react-router-dom";

type PropsType = {
    name: string | undefined
    id: number
}

const Dialog: React.FC<PropsType> = (props) => {
	let path = "/dialogs/" + props.id;

	return (
		<div className={s.dialog + ' ' + s.active}>
			<NavLink to={path}>{props.name}</NavLink>
		</div>
	);
}

export default Dialog;