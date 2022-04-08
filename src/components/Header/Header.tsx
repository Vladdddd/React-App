import React from 'react';
import { Link } from "react-router-dom";
import { logout } from '../../redux/auth-reducer';
import s from './header.module.css'

import { Header } from 'antd/lib/layout/layout';
import { Col, Row } from 'antd/lib/grid';
import Menu from 'antd/lib/menu';

import Avatar from 'antd/lib/avatar';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectLogin } from '../../redux/auth-selectors';
import Button from 'antd/lib/button';

export const HeaderComponent: React.FC = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="header" style={{backgroundColor: "white"}}>
            <div className="logo"/>
            <Row>
                <Col span={22} >
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Users</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={2}>
                    <Avatar shape="square" icon={<UserOutlined />} alt={login ? login : ''}/>
                    <div className={s.loginBlock}>
                        {isAuth
                            ? <Button onClick={logoutCallback}>Logout</Button>
                            : <Link to="/login"><Button>Login</Button></Link>}
                    </div>
                </Col>
            </Row>
        </Header>
    );
}

