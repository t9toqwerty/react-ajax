import React, {Component} from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            selectedPostId: null
        };
        this.postSelectedHandler = this.postSelectedHandler.bind(this);
    }

    postSelectedHandler(id) {
        console.log(id);
        this.setState({
            selectedPostId: id
        });
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {...post, author: "Max"};
                });

                this.setState({
                    posts: updatedPosts
                });
            }).catch(function (error) {
            // handle error
            console.log(error);
        }).finally(function () {
            // always executed
        });
    }

    render() {
        const posts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.id}
                    author={post.author}
                    title={post.title}
                    clicked={() => this.postSelectedHandler(post.id)}
                />
            );
        });

        return (
            <div>
                <section className="Posts">{posts}</section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;
