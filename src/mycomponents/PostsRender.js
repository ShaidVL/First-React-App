import React, {Component} from 'react';
import {connect} from "react-redux";
import AddComment from './AddComment'
import './style.css'
import './bootstrap.css'

class PostsRender extends Component {
    handleDislike(event) {
        this.props.dislike(event.target.id);
    }

    handleLike(event) {
        this.props.addLike(event.target.id);
    }

    handleRemove(event) {
        this.props.removePost(event.target.id);
    }

    handleShowCommentsInput(event) {
        this.props.showPostComments(event.target.id);
    }

    render() {
        if (this.props.state.Posts.length === 0) return null;
        const PostsList = this.props.state.Posts;
        const showPosts = PostsList.map(post =>
            <div className="border rounded">
            <li key={post.id}>
                <div className="exit-row row">
                    <h3 className="col-10">{post.title}</h3>
                    <div className="col-2">
                        <button
                            id={post.id}
                            className="exit-btn btn btn-danger"
                            type="button"
                            onClick={this.handleRemove.bind(this)}
                        >X
                        </button>
                    </div>
                </div>
                <p>{post.text}</p>
                <div className="row row-like">
                    <div>{post.like}
                        <button
                            id={post.id}
                            className="like-dislike"
                            type="button"
                            onClick={this.handleLike.bind(this)}>Like
                        </button>
                    </div>
                    <div>{post.dislike}
                        <button
                            id={post.id}
                            className="like-dislike"
                            type="button"
                            onClick={this.handleDislike.bind(this)}>Dislike
                        </button>
                    </div>
                </div>
                <button
                    id={post.id}
                    className=""
                    type="button"
                    onClick={this.handleShowCommentsInput.bind(this)}>Show
                </button>


                <ul>
                    {post.comments.map(
                        comment => <li className="border" key={comment.id}>
                            <h4>{comment.title}</h4>
                            <p>{comment.text}</p></li>)}
                </ul>
                {PostsList.find(elem => elem.id === post.id).showInputComments && <AddComment initialId={post.id}/>}
            </li>
        </div>);
        return (
            <ul>
                {showPosts}
            </ul>
        );
    }


}

export default connect(
    state => ({state: state}),
    dispatch => ({
        removePost: (id) => {
            dispatch({type: 'RemovePost', id: id})

        },
        addLike: (id) => {
            dispatch({type: 'AddLike', id: id})

        },
        dislike: (id) => {
            dispatch({type: 'Dislike', id: id})

        },
        showPostComments: (id) => {
            dispatch({type: 'ShowComments', id: id})

        },
    })
)(PostsRender);