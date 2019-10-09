import React, {Component} from 'react';
import {connect} from 'react-redux';
import './bootstrap.css'
import './style.css'


class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: '',
            inputFocus: false,
            inputIsEmpty: false,
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
    }

    handleSubmit() {
        if (this.state.author && this.state.text) {
            const id = Math.random().toString(36).substr(2, 10);
            this.props.addPost(id, this.state.author, this.state.text);
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

    handleInputFocus() {
        this.setState({inputFocus: true});
        this.setState({inputIsEmpty: false});
    }

    render() {
        const inputText = this.state.inputFocus &&
                <input
                    className="container"
                    type="text"
                    placeholder="Some Text"
                    value={this.state.text}
                    onFocus={this.handleInputFocus}
                    onChange={this.handleTextChange}/>
        const addBtn = this.state.inputFocus &&
            <button
                className="btn btn-primary rounded-right"
                type="button"
                onClick={this.handleSubmit}>
                Add post</button>
        const inputIsEmptyError = this.state.inputIsEmpty && <div className= "error">Заполните все поля</div>
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    className="container"
                    type="text"
                    placeholder="Name"
                    value={this.state.author}
                    onFocus={this.handleInputFocus}
                    onChange={this.handleAuthorChange}/>
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
        addPost: (id, author, text) => {
            dispatch({type: 'AddPost', id: id, authorPost: author, textPost: text})
        }
    })
)(AddPost);