import Breadcrumb from 'antd/lib/breadcrumb';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PathsType } from './App';

type PropsType = {
    paths: PathsType
}

const BreadcrumbApp: React.FC<PropsType> = ({paths}) => {
    //refactor path object copy!
    const breadcrumbElements = {
        [paths.profile]: 'Profile',
        [paths.dialogs]: 'Dialogs',
        [paths.chat]: 'Chat',
        [paths.users]: 'Users',
        [paths.news]: 'News',
        [paths.info]: 'Info',
        [paths.login]: 'Login'
    }

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbElements[url as keyof typeof breadcrumbElements] }</Link>
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