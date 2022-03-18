import React from 'react';
import s from './friends.module.css';

type PropsType = {}

const Friend: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={s.friend}>

            </div>
            <div className={s.friend}>

            </div>
            <div className={s.friend}>

            </div>
        </div>
    );
}

export default Friend;