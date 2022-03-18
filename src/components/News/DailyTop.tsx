import React from 'react';
import { TopNewsType } from '../../types/types';
import s from './news.module.css';

const DailyTop: React.FC<TopNewsType> = (props) => {
    return (
        <div className={s.dailyTop}>
            <h1 className={s.captionTop}>{props.caption}</h1>

            <div className={s.someInfo}>
                <img src="https://www.svgrepo.com/show/70698/avatar.svg" alt=""/>
                <h3>{props.name}</h3>
                <p>{props.time}</p>
            </div>
        </div>
    );
}

export default DailyTop;