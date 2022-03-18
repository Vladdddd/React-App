import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getProfile, getStatus, updateStatus, savePhoto} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { actions } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps } from 'react-router';

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void 
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
    setIsMe: (isMe: boolean) => void
} 

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        
        if(!userId) {
            userId = this.props.authorizedUserId;  
            if(!userId) {
                this.props.history.push("/login");
            }                   
        }
        if(!userId) {
            console.error("ID should exists in query params or in state ('authorizedUserId')");
        }
        
        if(userId === this.props.authorizedUserId) {
            this.props.setIsMe(true);
        }
        else {
            this.props.setIsMe(false);
        }
        
        this.props.getProfile(userId as number);
        this.props.getStatus(userId as number);
    }
    componentDidMount() {
       this.refreshProfile();
    }
    
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId)
        this.refreshProfile();
    }

    render () {
        return (
            <Profile {...this.props} isOwner={this.props.isMe} 
                    profile={this.props.profile} 
                    status={this.props.status} 
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                    userId={this.props.match.params.userId}/>
        );
    }

}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
    isMe: state.auth.isMe
})  

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, setIsMe: actions.setIsMe}),
    withRouter,
    withAuthRedirect   
)(ProfileContainer);