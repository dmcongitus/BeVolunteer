import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PostCardMore from '../../../components/Post/PostCardMore/PostCardMore'
import { getSpecificPost } from '../../../services/post.service';

class PostPage extends Component {
    state = {
        post: undefined
    }

    componentDidMount = async () => {
        let { postId } = this.props.match.params;
        try {
            const { data } = await getSpecificPost(postId);
            this.setState({ post: data });
        } catch {
            this.setState({ post: false });
        }
    }

    render() {
        if (this.state.post === false) {
            return <Redirect to="/404"/>
        }

        if (this.state.post !== undefined) {
          
        return (
            <PostCardMore {...this.state.post.post}/>
        );
        }

        return null;
    }
}

export default PostPage;