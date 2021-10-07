import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.jpg';
import Paginator from '../common/Paginator/Paginator';
import User from './User';


let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let index = 1; index <= pagesCount; index++) {
        pages.push(index);
    }

   

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
                    totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        {
            users.map(u => <User user={u} 
                            followingInProgress={props.followingInProgress}
                            unfollow={props.unfollow}
                            follow={props.follow}/> )
        }
    </div>
}


export default Users