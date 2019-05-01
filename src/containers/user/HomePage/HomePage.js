import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/user/Post/PostList/Post";
import NewPost from '../../../components/user/NewPost/NewPost'
import "./HomePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getPosts } from '../../../services/post.service';

class HomePage extends Component {
    state = {
        posts: []
    }

    componentDidMount = () => {
        getPosts(0).then(({ data: { posts } }) => this.setState({posts})).catch((e) => console.log(e));
    }

    onPostTypeChanged = (postType) => {
        getPosts(postType).then(({ data: { posts } }) => this.setState({posts})).catch((e) => console.log(e));
    }

    render() {
        return (
            <PageLayout title="news" hasMoreButton onPostTypeChanged={this.onPostTypeChanged}>
                <NewPost style={{zIndex: 50, position: "relative"}}></NewPost>
                <Post posts={this.state.posts}></Post>
            </PageLayout>
        );
    }
}

export default HomePage;
