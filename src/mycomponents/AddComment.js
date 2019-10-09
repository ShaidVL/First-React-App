import React, {Component} from 'react';
import {connect} from 'react-redux';

import './bootstrap.css'
import './style.css'


class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: '',
            inputIsEmpty: false,
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);;
        this.handleInputFocus = this.handleInputFocus.bind(this);
    }

    handleSubmit() {
        if (this.state.author && this.state.text) {
            const id = Math.random().toString(36).substr(2, 10);
            this.props.addComment(this.props.initialId, id, this.state.author, this.state.text);
            this.setState({author: ''});
            this.setState({text: ''});
        } else {
            this.setState({inputIsEmpty: true});
        }
    }

    handleAuthorChange(event) {
        this.setState({author: event.target.value});
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleInputFocus(){
        this.setState({inputIsEmpty: false});
    }

    render() {
        const inputAuthor = <input
            className="container"
            type="text"
            placeholder="Name"
            value={this.state.author}
            onFocus={this.handleInputFocus}
            onChange={this.handleAuthorChange}/>;

        const inputText = <input
            className="container"
            type="text"
            placeholder="Some Text"
            value={this.state.text}
            onFocus={this.handleInputFocus}
            onChange={this.handleTextChange}/>;

        const addBtn = <button
            className="container btn btn-primary"
            type="button"
            onClick={this.handleSubmit}>
            Add comment</button>;

        const inputIsEmptyError = this.state.inputIsEmpty && <div>Fill in all the fields</div>;

        return (
            <form onSubmit={this.handleSubmit}>
                {inputAuthor}
                {inputText}
                {addBtn}
                {inputIsEmptyError}
            </form>
        );
    }


}

export default connect(
    null,
    dispatch => ({
        addComment: (initialId, id, author, text) => {
            dispatch({type: 'AddComment', initialId: initialId, id: id, authorComment: author, textComment: text})
        }
    })
)(AddComment);