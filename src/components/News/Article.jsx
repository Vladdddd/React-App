import React from 'react';
import s from './news.module.css';
import art from '../../assets/images/new-forest-art.jpg';

const Article = (props) => {
    return (
        <div className={s.article}>
            <div className={s.caption}>
                <div className={s.time}>
                    <p>{props.time}</p>
                </div>

                <div className={s.articleButtons}>
                    <button className={s.report}>Report</button>
                    <button className={s.reply}>Reply</button>
                    {/*<button className={s.boost}>Boost</button> */}
                </div>
            </div>

            <div className={s.post}>
                <div className={s.profileNews}>
                    <div className={s.img}>
                        <img src="https://www.portal.chat/img/avatar.svg" alt=""/>
                        <p>{/* Lvl */}</p>
                    </div>

                    <h2 className={s.userName}>{props.name}</h2>
                    <h2 className={s.position}>{props.role}</h2>
                </div>
                <div className={s.info}>
                    <p>
                        {props.news}
                    </p>
                    {props.photo ? <img src={props.photo} alt=""/> : <img src={art} alt=""/>}
                </div>
            </div>
        </div>
    );
}

export default Article;