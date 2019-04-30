import React, { Component } from 'react';

import { getSpecificPost } from '../../../services/post.service';

class PostPage extends Component {
    state = {
        post: undefined
    }

    componentDidMount = async () => {
        let { postId } = this.props.match.params;
        const { data } = await getSpecificPost(postId);
        this.setState({ post: data });
    }

    render() {
        return (
            <div>{this.state.post && JSON.stringify(this.state.post)} </div>
        );
    }
}

export default PostPage;