import React, { Component, Suspense } from 'react'
import './App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import { Route } from 'react-router-dom'
import NavContainer from './components/NavBar/NavContainer'
import { Login } from './components/Login/Login'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader'
import store, { AppStateType } from './redux/redux-store'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import NewsContainer from './components/News/NewsContainer'
import FriendsContainer from './components/Friends/FriendsContainer'
import Info from './components/Info/Info'
import { UsersPage } from './components/Users/UsersContainer'
import { ProfilePage } from './components/Profile/ProfileContainer'

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


    render() {
        if (!this.props.initialized) {
            return <Preloader />
        } //Если приложение не инициализировано, возвращаем компонент Preloader
        //Условие нужно для того, чтобы показать загрузку до того, как будет инициализировано приложение. До того как данные придут из сервера 

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <NavContainer />
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader />}>{/* Suspense нужен чтобы показать Preloader, во время задержки при получении данных  */}
                        <Switch>{/* Switch проходит по всем роутам и сравнивает path с текущим url */} 
                            <Route exact path='/' render={() => <div>Hello user!</div>} />
                            <Route exact path='/dialogs' render={() => <DialogsContainer />} />
                            <Route path='/profile/:userId?' render={() => <ProfilePage />} />
                            <Route path='/users' render={() => <UsersPage />} />
                            <Route path='/login' render={() => <Login />} />
                            <Route path='/news' render={() => <NewsContainer />} />
                            <Route path='/info' render={() => <Info />} />
                            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                        </Switch>
                    </Suspense>
                </div>
                <FriendsContainer />
            </div>
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