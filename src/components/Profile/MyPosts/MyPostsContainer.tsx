import { connect } from 'react-redux';
import { actions} from '../../../redux/profile/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPostsMemo, { DispatchPropsType, MapPropsType } from './MyPosts';

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        fullnes: state.profilePage.fullnes
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator, 
    setFullnes: actions.setFullnes
})(MyPostsMemo);

export default MyPostsContainer;

