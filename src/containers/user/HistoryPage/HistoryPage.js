import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./HistoryPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getUserPosts } from '../../../services/post.service';
import { getHistory } from '../../../services/history.service';
 import PostCard from "../../../components/Post/PostCard/PostCard"
class History extends Component {
    state = {
        posts: []
    }

    componentDidMount = async () => {
        const { data: {posts} } = await getUserPosts(this.props.username);
        let data = await getHistory(this.props.username);
    
        this.setState({ posts });
        console.log(data.data)
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
