import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { FriendType } from '../../types/types';
import Nav from './Nav';

type MapPropsType = {
    userId: number | null
    sidebar: {
        friends: Array<FriendType>
    }
}

let mapStateToProps = (state: AppStateType): MapPropsType => {
    return {
        sidebar: state.sidebar,
        userId: state.auth.userId
    }
}


const NavContainer = connect<MapPropsType, {}, {}, AppStateType>(mapStateToProps, {})(Nav);

export default NavContainer;
