//import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import News from './News';


let mapStateToProps = (state: AppStateType) => {
    return{
        news: state.news.news,
        topNews: state.news.topNews
    }
}

const NewsContainer = connect(mapStateToProps, {})(News);

export default NewsContainer;