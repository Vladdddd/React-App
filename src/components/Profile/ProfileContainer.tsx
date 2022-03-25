import React, { useEffect } from 'react'
import { Profile } from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getStatus } from '../../redux/profile-reducer'
import { actions } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { Redirect, useHistory, useRouteMatch } from 'react-router'

type MatchType = {
    isExact: boolean
    params: {
        userId: string
    }
    path: string
    url: string
}


export const ProfilePage: React.FC = (props) => {
    let history: any = useHistory()
    let match: MatchType = useRouteMatch()

    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch() 
    
    const setIsMeDispatch = (isMe: boolean) => {
        dispatch(actions.setIsMe(isMe))
    }

    const getProfileDispatch = (userId: number) => {
        dispatch(getProfile(userId))
    }

    const getStatusDispatch = (userId: number) => {
        dispatch(getStatus(userId))
    }

    const refreshProfile = () => {
        let userId: number | null = +match.params.userId

        if(!userId) {
            userId = authorizedUserId
            if(!userId) {
                history.push("/login")
            }                   
        }
        if(!userId) {
            console.error("ID should exists in query params or in state ('authorizedUserId')");
        }
        
        if(userId === authorizedUserId) {
            setIsMeDispatch(true);
        }
        else {
            setIsMeDispatch(false);
        }
        
        getProfileDispatch(userId as number);
        getStatusDispatch(userId as number);
    }

    useEffect(() => {
        refreshProfile()
        //React Hook useEffect has a missing dependency
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        refreshProfile()
        //React Hook useEffect has a missing dependency
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.userId])

    if (!isAuth) return <Redirect to={"/login"} />
    
    return (
        <Profile />
    );
}
