import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

let mapStateToPropsRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type PropsType = ReturnType<typeof mapStateToPropsRedirect>

type DispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<PropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props


        if (!isAuth) return <Redirect to={"/login"} />
        return <WrappedComponent {...restProps as unknown as WCP} />
    }

    let ConnectedAuthRedirectComponent = connect<PropsType, DispatchPropsType, {WCP: any}, AppStateType>(
        mapStateToPropsRedirect, {})(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}