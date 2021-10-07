import React, { Component, Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import { Route } from 'react-router-dom';
import NavContainer from './components/NavBar/NavContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader';
import store from './redux/redux-store';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));



class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <NavContainer />
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader />}>
                        <Switch>
                            <Route exact path='/dialogs' render={() => <DialogsContainer />} />
                            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                            <Route path='/users' render={() => <UsersContainer />} />
                            <Route path='/login' render={() => <Login />} />
                        </Switch>
                    </Suspense>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

let SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;