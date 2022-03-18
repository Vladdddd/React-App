import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import Friends from './Friends';

type MapPropsType = {
    friends: string
}

const mapStateToProps = (state: AppStateType): MapPropsType => {
    return{
        friends: state.profilePage.temporarilyForFriends
    }
}

const FriendsContainer = connect(mapStateToProps, {})(Friends);

export default FriendsContainer;