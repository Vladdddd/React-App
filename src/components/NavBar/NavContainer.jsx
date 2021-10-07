import { connect } from 'react-redux';
import Nav from './Nav';



let mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar
    }
}


let mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default NavContainer;
