import React from 'react';
import s from './Users.module.css';
//import userPhoto from '../../assets/images/user.jpg';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import TopUser from './TopUser';


let Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let index = 1; index <= pagesCount; index++) {
        pages.push(index);
    }
    //console.log(users);


    return <div className={s.allUserContent}>
        <div className={s.allUsers}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount} pageSize={pageSize} />
            {
                users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow} 
                    getProfile={props.getProfile}
                    profile={props.profile}
                    key={u.id}/>)
            }
        </div>

        <div className={s.topUsers}>
            <h2>TOP USERS</h2>
            {
                users.map(u => <TopUser user={u} key={u.id}/>)
            }
        </div>

    </div>
}


export default Users