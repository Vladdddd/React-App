import { connect } from 'react-redux';
import Friends from './Friends';


const mapStateToProps = (state) => {
    return{
        friends: state.profilePage.temporarilyForFriends
    }
}

const FriendsContainer = connect(mapStateToProps, {})(Friends);

export default FriendsContainer;