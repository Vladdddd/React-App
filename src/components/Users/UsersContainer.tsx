import { useSelector } from 'react-redux';
import React from 'react';
import Preloader from '../common/preloader/preloader';
import { getIsFetching } from '../../redux/users-selectors';
import { Users } from './Users';

type UsersPagePropsType = {}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {/*<h2>{this.props.pageTitle}</h2>*/}
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}

