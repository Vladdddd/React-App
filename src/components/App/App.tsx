import React, { Component } from 'react'
import './App.css'
import 'antd/dist/antd.css';

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import store, { AppStateType } from '../../redux/redux-store'

import { initializeApp } from '../../redux/app-reducer'
import Preloader from '../common/preloader/preloader'
import { HeaderComponent } from '../Header/Header'

import Layout from 'antd/lib/layout'
import { Content, Footer } from 'antd/lib/layout/layout'

import Nav from '../NavBar/Nav';
import { ContentApp } from './Content';
import BreadcrumbApp from './Breadcrumb';


type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}


class App extends Component<StatePropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert("Some error occured");
    }
    componentDidMount() {
        this.props.initializeApp(); 
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }
    componentWillUnmount() { 
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        } 

        return (
            <>
            <Layout>
                <HeaderComponent />
                <Content style={{ padding: '0 50px' }}>
                    <BreadcrumbApp />
                    <Layout className="site-layout-background">
                        <Nav />
                        <ContentApp />
                    </Layout>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Social Network ©2020 Created by V. L.</Footer>
            </>
        );
    }

}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter, 
    connect(mapStateToProps, { initializeApp }) 
)(App);

let SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;