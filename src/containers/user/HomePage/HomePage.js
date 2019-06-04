import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/user/Post/PostCard/PostCard";
import NewPost from "../../../components/user/Post/NewPost/NewPost";
import "./HomePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getPosts } from "../../../services/post.service";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class HomePage extends Component {
  state = {
    posts: []
  };

  componentDidMount = () => {
    getPosts(0)
      .then(({ data: { posts } }) => this.setState({ posts }))
      .catch(e => console.log(e));
  };

  onPostTypeChanged = postType => {
    getPosts(postType)
      .then(({ data: { posts } }) => this.setState({ posts }))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <PageLayout
        title="news"
        hasMoreButton
        onPostTypeChanged={this.onPostTypeChanged}
      >
        {this.props.permission === "USER" && (
          <NewPost style={{ zIndex: 50, position: "relative" }} />
        )}
        {this.state.posts.map((post) => <Post key={post.id} {...post}></Post>)}
   
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp }
  }
}) => ({ name, permission, exp });

export default withRouter(connect(mapStateToProps)(HomePage));
