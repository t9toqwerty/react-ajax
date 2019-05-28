import React, {Component} from "react";
import "./Blog.css";
import {NavLink, Route} from 'react-router-dom'
import Posts from "../Posts/Posts";
import NewPost from "../NewPost/NewPost";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to={'/'} exact={true}>Home</NavLink></li>
                            <li><NavLink to={'/new-post'} exact={true}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path={'/'} exact={true} component={Posts}/>
                <Route path={'/new-post'} exact={true} component={NewPost}/>
            </div>
        );
    }
}

export default Blog;
