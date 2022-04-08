import React from 'react';
import s from './friends.module.css';

type PropsType = {
    friend: string
}

const Friend: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={s.friend}>
                {props.friend}
            </div>
            <div className={s.friend}>
                {props.friend}
            </div>
            <div className={s.friend}>
                {props.friend}
            </div>
        </div>
    );
}

export default Friend;