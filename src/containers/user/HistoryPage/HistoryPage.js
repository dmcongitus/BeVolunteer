import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import HistoryCard from "../../../components/user/HistoryCard/HistoryCard";
import "./HistoryPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getUserPosts } from '../../../services/post.service';
 import PostCard from "../../../components/Post/PostCard/PostCard"
class History extends Component {
    state = {
        posts: []
    }

    componentDidMount = async () => {
        const { data: {posts} } = await getUserPosts(this.props.username);
        console.log(posts);
        this.setState({ posts });
    }

  render() {
      return (
          <PageLayout title="Lịch sử họat động">
              {this.state.posts.map((post) => <PostCard key={post.id} {...post}></PostCard>)}
          </PageLayout>
      );
  }
}

const mapStateToProps = ({ auth: { user: {username} } }) => ({ username });

export default connect(mapStateToProps)(History);
