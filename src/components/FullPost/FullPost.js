import React, {Component} from "react";

import "./FullPost.css";
import axios from "axios";

class FullPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPost: null
        };
        this.deletePostHandler = this.deletePostHandler.bind(this);
    }
    
    deletePostHandler() {
        axios.delete("/posts/" + this.props.id)
            .then(response => {
                console.log(response);
            }).catch(function (error) {
            // handle error
            console.log(error);
        }).finally(function () {
            // always executed
        });
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id && prevProps.id !== this.props.id) {
            axios.get("/posts/" + this.props.id)
                .then(response => {
                    console.log(response);
                    this.setState({
                        loadedPost: response.data
                    });
                }).catch(function (error) {
                // handle error
                console.log(error);
            }).finally(function () {
                // always executed
            });
        }
    }
    
    render() {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        
        if (this.props.id) {
            post = <p style={{textAlign: "center"}}>Loading...</p>;
        }
        
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;
