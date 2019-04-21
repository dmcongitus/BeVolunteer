import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/user/Post/PostList/Post";
import NewPost from '../../../components/user/NewPost/NewPost'
import "./HomePage.css";

class HomePage extends Component {
  render() {
    return (
      <div className="widget-sidebar">
        <h2 className="title-widget-sidebar"># NEWS</h2>
        <NewPost></NewPost>
        <Post></Post>
      </div>
    );
  }
}

export default HomePage;
