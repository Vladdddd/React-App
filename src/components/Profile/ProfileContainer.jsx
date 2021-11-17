import React from 'react';
import Main from './Main';
import { connect } from 'react-redux';
import {getProfile, getStatus, updateStatus, savePhoto} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { setIsMe } from '../../redux/auth-reducer';


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        
        if(!userId) {
            userId = this.props.authorizedUserId;  
            if(!userId) {
                this.props.history.push("/login");
            }                   
        }

        if(userId === this.props.authorizedUserId) {
            this.props.setIsMe(true);
        }
        else {
            this.props.setIsMe(false);
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
       this.refreshProfile();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.userId !== prevProps.match.params.userId)
        this.refreshProfile();
    }

    render () {
        return (
            <Main {...this.props} isOwner={this.props.isMe} 
                    profile={this.props.profile} 
                    status={this.props.status} 
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                    userId={this.props.match.params.userId}/>
        );
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
    isMe: state.auth.isMe
})  

export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, setIsMe}),
    withRouter,
    withAuthRedirect   
)(ProfileContainer);