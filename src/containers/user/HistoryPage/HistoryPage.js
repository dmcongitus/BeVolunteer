import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import HistoryCard from "../../../components/user/HistoryCard/HistoryCard";
import "./HistoryPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getMyPosts } from '../../../services/me.service';

class History extends Component {
    state = {
        posts: []
    }

    componentDidMount = async () => {
        const { data: {posts} } = await getMyPosts(this.props.id);
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

const mapStateToProps = ({ auth: { user: {id} } }) => ({ id });

export default connect(mapStateToProps)(History);
