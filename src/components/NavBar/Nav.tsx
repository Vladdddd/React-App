import React, { useState } from 'react';
import Sider from 'antd/lib/layout/Sider';
import Menu from 'antd/lib/menu';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
    UserOutlined,
    LaptopOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom';

type PropsType = {}

const Nav: React.FC = (props) => {
    let [collapsed, setCollapsed] = useState(false)
    const onCollapse = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Sider className="site-layout-background" collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                    <Menu.Item key="1"><Link to={"/profile"}>Profile</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/chat">Chat</Link></Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                    <Menu.Item key="4"><Link to="/users">Users</Link></Menu.Item>
                </SubMenu>

                <SubMenu key="sub3" icon={<LaptopOutlined />} title="Other">
                    <Menu.Item key="5"><Link to="/news">News</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/info">Info</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );

}

export default Nav;
