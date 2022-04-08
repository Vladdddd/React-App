import Breadcrumb from 'antd/lib/breadcrumb';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type PropsType = {}

const BreadcrumbApp: React.FC = (props) => {

    const breadcrumbNameMap = {
        '/profile': 'Profile',
        '/dialogs': 'Dialogs',
        '/chat': 'Chat',
        '/users': 'Users',
        '/news': 'News',
        '/info': 'Info',
    };

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url as keyof typeof breadcrumbNameMap] }</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <Breadcrumb style={{ margin: '15px 0 10px' }}>{breadcrumbItems}</Breadcrumb>
    );

}

export default BreadcrumbApp;