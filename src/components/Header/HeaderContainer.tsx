import React from 'react';
import { connect } from 'react-redux';
import Header, { DispatchPropsType, MapPropsType } from './Header';
import { getAuth, logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';


class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.getAuth();
    }

    render() {
        return (
            <Header {...this.props} logout={this.props.logout}/>
        );
    }

}
let mapStateToProps = (state: AppStateType): MapPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { getAuth, logout })(HeaderContainer);
