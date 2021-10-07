import React from 'react';
import Main from './Main';
import { connect } from 'react-redux';
import {getProfile, getStatus, updateStatus} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = this.props.authorizedUserId;           
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }
    
    render () {
        return (
            <Main {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        );
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})  

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus})
    
)(ProfileContainer);