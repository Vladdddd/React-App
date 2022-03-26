import React, { Component, Suspense } from 'react'
import './App.css'
import 'antd/dist/antd.css';

import { Provider } from 'react-redux'
import { BrowserRouter, Link, NavLink, Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import store, { AppStateType } from './redux/redux-store'

import { Login } from './components/Login/Login'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader'
import NavContainer from './components/NavBar/NavContainer'
import NewsContainer from './components/News/NewsContainer'
import FriendsContainer from './components/Friends/FriendsContainer'
import Info from './components/Info/Info'
import { UsersPage } from './components/Users/UsersContainer'
import { ProfilePage } from './components/Profile/ProfileContainer'
import { HeaderComponent } from './components/Header/Header'

import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import Menu from 'antd/lib/menu';
import Breadcrumb from 'antd/lib/breadcrumb';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
    UserOutlined,
    LaptopOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import Result from 'antd/lib/result';



//React lazy - ленивая загрузка, компоненты загружаются по мере необходимости
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
//const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

//Классовый компонент App, который оборачивается компонентами AppContainer SamuraiJSApp
class App extends Component<StatePropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {//"Ловим" необработанные ошибки
        alert("Some error occured");
    }
    componentDidMount() {// Вызывается когда компонент вмонтирован
        this.props.initializeApp(); //Инициализируем приложение
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);//???
    }
    componentWillUnmount() { // Здесь мы очищаем мусор, оставленный side-effect'ом(window.add...)
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);//???
    }

    state = {
        collapsed: false,
    };

    onCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        } //Если приложение не инициализировано, возвращаем компонент Preloader
        //Условие нужно для того, чтобы показать загрузку до того, как будет инициализировано приложение. До того как данные придут из сервера 


        return (
            <>
            <Layout>
                <HeaderComponent />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '10px 0 5px' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background">
                        <Sider className="site-layout-background" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                                    <Menu.Item key="1"><Link to={"/profile"}>Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                                    <Menu.Item key="5"><Link to="/users">Users</Link></Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub3" icon={<LaptopOutlined />} title="Other">
                                    <Menu.Item key="6"><Link to="/news">News</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/info">Info</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <div>
                                <Suspense fallback={<Preloader />}>
                                    <Switch>
                                        <Route exact path='/' render={() => <div>Hello user!</div>} />
                                        <Route exact path='/dialogs' render={() => <DialogsContainer />} />
                                        <Route path='/profile/:userId?' render={() => <ProfilePage />} />
                                        <Route path='/users' render={() => <UsersPage />} />
                                        <Route path='/login' render={() => <Login />} />
                                        <Route path='/news' render={() => <NewsContainer />} />
                                        <Route path='/info' render={() => <Info />} />
                                        <Route path='*' render={() => <Result
                                            status="404"
                                            title="404"
                                            subTitle="Sorry, the page you visited does not exist."
                                            extra={<Button type="primary"><Link to={"/profile"}>Back Home</Link></Button>}
                                        />} />
                                    </Switch>
                                </Suspense>
                            </div>
                        </Content>
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

let AppContainer = compose<React.ComponentType>(//???compose компонирует обработчики. Срабатывают снизу вверх
    withRouter, //High order component, который дает возможность получить доступ к трём объектам
    connect(mapStateToProps, { initializeApp })//connect создаёт контейнерный компонент, в который передает state & dispatch 
)(App);

let SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>{/* Засовывает в контекст store, который потом могут использовать контейнерные компоненты, которые находятся ниже в дереве компонент */}
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;