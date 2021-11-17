import { connect } from 'react-redux';
import { addPostActionCreator, setFullnes} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        fullnes: state.profilePage.fullnes
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPostActionCreator, setFullnes})(MyPosts);

export default MyPostsContainer;
