import React from 'react';
import Article from './Article';
import s from './news.module.css';
import DailyTop from './DailyTop';

const News = ({news, topNews}) => {
    
    let article = news.map(n => <Article name={n.name} news={n.news} key={n.id} role={n.role} time={n.time} photo={n.photo}/>);
    let top = topNews.map(t => <DailyTop name={t.name} caption={t.caption} key={t.id} time={t.time}/>);
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

export default News;
