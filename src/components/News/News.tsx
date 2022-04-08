import React from 'react';
import Article from './Article';
import s from './news.module.css';
import DailyTop from './DailyTop';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {}

export const News: React.FC<PropsType> = (props) => {
    
    const news = useSelector((state: AppStateType) => state.news.news) 
    const topNews = useSelector((state: AppStateType) => state.news.topNews)

    let article = news.map(n => <Article key={n.id} name={n.name} news={n.news} role={n.role} time={n.time} photo={n.photo}/>);
    let top = topNews.map((t, index) => <DailyTop key={index+10} name={t.name} caption={t.caption} time={t.time}/>);

    return (
        <div className={s.news}>
            <div className={s.mainNews}>
                {article}
            </div>

            <div className={s.topNews}>
                <h1 className={s.hTop}>Daily Top</h1>
                {top}
            </div>
        </div>
    );
}
