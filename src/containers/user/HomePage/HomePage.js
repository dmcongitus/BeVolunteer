import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/user/Post/PostList/Post";
import NewPost from '../../../components/user/NewPost/NewPost'
import "./HomePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";

class HomePage extends Component {
  render() {
    return (
      <PageLayout title="news">
        <NewPost></NewPost>
        <Post></Post>
        </PageLayout>
    );
  }
}

export default HomePage;
