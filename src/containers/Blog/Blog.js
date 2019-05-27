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
            selectedPostId: null,
            error: false
        };
        this.postSelectedHandler = this.postSelectedHandler.bind(this);
    }
    
    postSelectedHandler(id) {
        this.setState({
            selectedPostId: id
        });
    }
    
    componentDidMount() {
        axios.get("/posts")
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {...post, author: "Max"};
                });
                
                this.setState({
                    posts: updatedPosts
                });
            }).catch((error) => {
            this.setState({
                error: true
            });
        }).finally(function () {
            // always executed
        });
    }
    
    render() {
        let posts = <p style={{textAlign: 'center'}}> Something Went Wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        author={post.author}
                        title={post.title}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                );
            });
        }
        
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
