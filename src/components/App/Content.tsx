import React, { Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Login } from '../Login/Login'
import Preloader from '../common/preloader/preloader'
import { News } from '../News/News'
import Info from '../Info/Info'
import { UsersPage } from '../Users/UsersContainer'
import { ProfilePage } from '../Profile/ProfileContainer'
import { Content } from 'antd/lib/layout/layout';
import DialogsContainer from '../Dialogs/DialogsContainer';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';

//const DialogsContainer = React.lazy(() => import('../Dialogs/DialogsContainer'))
//const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ChatPage = React.lazy(() =>
  import('../../pages/Chat/ChatPage')
    .then(({ ChatPage }) => ({ default: ChatPage })),
);

type PropsType = {}

export const ContentApp: React.FC = (props) => {
    return (
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <div>
                <Suspense fallback={<Preloader />}>
                    <Switch>
                        <Route exact path='/' render={() => <div>Hello user!</div>} />
                        <Route exact path='/dialogs' render={() => <DialogsContainer />} />
                        <Route path='/profile/:userId?' render={() => <ProfilePage />} />
                        <Route path='/users' render={() => <UsersPage />} />
                        <Route path='/login' render={() => <Login />} />
                        <Route path='/news' render={() => <News />} />
                        <Route path='/info' render={() => <Info />} />
                        <Route path='/chat' render={() => <ChatPage />} />
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
    );

}
