import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getAuth, logout } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getAuth();
        
    }

    

    render() {
        return (
            <Header {...this.props} logout={this.props.logout}/>
        );
    }

}
let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, { getAuth, logout })(HeaderContainer);
