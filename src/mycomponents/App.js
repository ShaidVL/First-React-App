import React, {Component} from 'react';
import './bootstrap.css'

import AddPost from './AddPost';
import PostsRender from './PostsRender'

class App extends Component{
    render() {
        return(
            <div className="container">
                <AddPost/>
                <PostsRender/>
            </div>
        );
    }


}

export default App;