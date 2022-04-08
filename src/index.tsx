import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSApp from './components/App/App';
import * as serviceWorker from './serviceWorker';


//Здесь происходит рендер основного("первого") компонента
//Создание Virtual DOM
ReactDOM.render(
   <SamuraiJSApp/>, document.getElementById('root')
);

















// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/* homepage
https://github.com/Vladdddd/social-network.git
*/