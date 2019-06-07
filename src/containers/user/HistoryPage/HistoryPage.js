import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import HistoryCard from "../../../components/user/HistoryCard/HistoryCard";
import "./HistoryPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getUserPosts } from '../../../services/post.service';

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
              {this.state.posts.map((post) => <HistoryCard key={post.id} {...post}></HistoryCard>)}
          </PageLayout>
      );
  }
}

const mapStateToProps = ({ auth: { user: {username} } }) => ({ username });

export default connect(mapStateToProps)(History);
