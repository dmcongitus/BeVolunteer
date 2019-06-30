import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./HistoryPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getUserPosts } from '../../../services/post.service';
import { getHistory } from '../../../services/history.service';
import PostCard from "../../../components/Post/PostCard/PostCard"
import { withLocalize, Translate } from "react-localize-redux";
import historyPageTranslations from './translation.json';
import { withRouter } from "react-router";

class History extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(historyPageTranslations);
    }

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
        const t = <Translate id="historyPage.title">LỊCH SỬ HOẠT ĐỘNG</Translate>
        return (
            <PageLayout title={t}>
                {this.state.posts.map((post) => <PostCard key={post.id} {...post}></PostCard>)}
            </PageLayout>
        );
    }
}

const mapStateToProps = ({ auth: { user: {username} } }) => ({ username });

// export default connect(mapStateToProps)(History);

export default withRouter(
    connect(
        mapStateToProps
    )(withLocalize(History))
);
  
