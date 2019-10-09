import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './mycomponents/App';

const initialState = {
    Posts: [],
}

const feed = (state = initialState, action) => {
    switch (action.type) {
        case 'AddPost':
            const post = {
                id: action.id,
                title: action.authorPost,
                text: action.textPost,
                like: 0,
                dislike: 0,
                showInputComments: false,
                comments: [],
            };
            return {...state, Posts: [...state.Posts, post]};
        case 'RemovePost':
            const removePost = state.Posts.filter(post => post.id !== action.id);
            return {...state, Posts: removePost};
        case 'AddLike':
            const changedAddLikePosts = state.Posts.map(post => post.id === action.id ? {...post, like: post.like + 1} : post);
            return {...state, Posts: changedAddLikePosts};
        case 'Dislike':
            const changedDislikePosts = state.Posts.map(post => post.id === action.id ? {...post, dislike: post.dislike - 1} : post);
            return {...state, Posts: changedDislikePosts};
        case 'AddComment':
            const comment = {
                id: action.id,
                title: action.authorComment,
                text: action.textComment,
                show: false,
            };
            const changedCommentPosts = state.Posts.map(post => post.id === action.initialId ? {...post, comments: [...post.comments, comment]} : post);
            return {...state, Posts: changedCommentPosts};
        case 'ShowComments':
            const changedShowCommentsPosts = state.Posts.map(post => post.id === action.id ? {...post, showInputComments: !post.showInputComments} : post);
            return {...state, Posts: changedShowCommentsPosts};
        default:
            return state;

    }
}

const store = createStore(feed, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);