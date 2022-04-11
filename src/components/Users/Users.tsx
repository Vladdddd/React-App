import React, { useEffect } from 'react';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import TopUser from './TopUser';
import UsersSearchForm  from './UsersSearchForm';
import { FilterType, follow, requestUsers, unfollow } from '../../redux/users/users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users/users-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import queryString from 'query-string'

type PropsType = {}

type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
}

export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter
        let actualFriend = parsed.friend === 'null' ? null : parsed.friend === "true" ? true : false

        if(parsed.page) actualPage = Number(parsed.page)
        if(parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if(parsed.friend) actualFilter = {...actualFilter, friend: actualFriend}



        dispatch(requestUsers(actualPage, pageSize, actualFilter))
        //React Hook useEffect has a missing dependency
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
        
        //React Hook useEffect has a missing dependency
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const requestFollow = (userId: number) => {
        dispatch(follow(userId))
    }

    const requestUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }


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
                            unfollow={requestUnfollow}
                            follow={requestFollow}
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