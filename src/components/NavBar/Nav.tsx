import React, { useState } from 'react';
import Sider from 'antd/lib/layout/Sider';
import Menu from 'antd/lib/menu';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
    UserOutlined,
    LaptopOutlined
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom';
import { PathsType } from '../App/App';

type PropsType = {
    paths: PathsType
}

const Nav: React.FC<PropsType> = ({paths}) => {
    let [collapsed, setCollapsed] = useState(false)
    const onCollapse = () => {
        setCollapsed(!collapsed)
    };

    const path = useLocation().pathname

    const menu = [
        paths.profile + paths.dialogs + paths.chat + '/',
        paths.users + '/',
        paths.news + paths.info + '/'
    ]

    let defaultValue = menu[0]
    for(let i = 0; i < menu.length; i++) {
        if(menu[i].split('/').indexOf(path.slice(1)) !== -1) {
            defaultValue = menu[i]
        }
    }

    return (
        <Sider className="site-layout-background" collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu
                mode="inline"
                defaultSelectedKeys={[path]}
                defaultOpenKeys={[defaultValue]}
                style={{ height: '100%' }}
            >
                <SubMenu key={menu[0]} icon={<UserOutlined />} title="My Profile">
                    <Menu.Item key={paths.profile}><Link to={paths.profile}>Profile</Link></Menu.Item>
                    <Menu.Item key={paths.dialogs}><Link to={paths.dialogs}>Dialogs</Link></Menu.Item>
                    <Menu.Item key={paths.chat}><Link to={paths.chat}>Chat</Link></Menu.Item>
                </SubMenu>

                <SubMenu key={menu[1]} icon={<LaptopOutlined />} title="Users">
                    <Menu.Item key={paths.users}><Link to={paths.users}>Users</Link></Menu.Item>
                </SubMenu>

                <SubMenu key={menu[2]} icon={<LaptopOutlined />} title="Other">
                    <Menu.Item key={paths.news}><Link to={paths.news}>News</Link></Menu.Item>
                    <Menu.Item key={paths.info}><Link to={paths.info}>Info</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );

}

export default Nav;
