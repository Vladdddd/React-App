import React from 'react';
import s from './../Dialogs.module.css';

type PropsType = {
    mess: string | undefined
    time: string | undefined
}

const Message: React.FC<PropsType> = (props) => {
	return (
		<div className={s.message}>
			{props.mess}
		</div>
	);
}

export default Message;