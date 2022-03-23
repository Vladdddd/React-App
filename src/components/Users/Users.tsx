import React from 'react';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import TopUser from './TopUser';
import { UserType } from '../../types/types';
import UsersSearchForm  from './UsersSearchForm';
import { FilterType } from '../../redux/users-reducer';

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>

    onPageChanged: (pageNumber: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = ({
    currentPage, totalUsersCount, pageSize, onPageChanged,
    users, followingInProgress, unfollow, follow, onFilterChanged
}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let index = 1; index <= pagesCount; index++) {
        pages.push(index);
    }
    //console.log(users);


    return (
        <div>

            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            
            <div className={s.allUserContent}>



                <div className={s.allUsers}>

                    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                        totalItemsCount={totalUsersCount} pageSize={pageSize} />

                    {
                        users.map(u => <User user={u}
                            followingInProgress={followingInProgress}
                            unfollow={unfollow}
                            follow={follow}
                            key={u.id} />)
                    }

                </div>

                <div className={s.topUsers}>

                    <h2>TOP USERS</h2>
                    {
                        users.map(u => <TopUser user={u} key={u.id} />)
                    }

                </div>

            </div>
        </div>
    )
}



export default Users