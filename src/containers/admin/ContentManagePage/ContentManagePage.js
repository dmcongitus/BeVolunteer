import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/admin/HistoryCard/HistoryCard";
import "./ContentManagePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getPosts } from "../../../services/post.service";
class ContentManagePage extends Component {
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
      <PageLayout title="Quản lý bài viết">
        <div>
          {this.state.posts.map(post => (
            <HistoryCard key={post.id} {...post} />
          ))}
        </div>
      </PageLayout>
    );
  }
}

export default ContentManagePage;
