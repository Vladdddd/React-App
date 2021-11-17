//import React from 'react';
import { connect } from 'react-redux';
import News from './News';


let mapStateToProps = (state) => {
    return{
        news: state.news.news,
        topNews: state.news.topNews
    }
}

const NewsContainer = connect(mapStateToProps, {})(News);

export default NewsContainer;