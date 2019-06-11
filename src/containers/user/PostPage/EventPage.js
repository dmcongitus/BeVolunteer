import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import EventCardMore from "../../../components/Post/PostCardMore/EventCardMore";
import { getSpecificEvents } from "../../../services/post.service";

class PostPage extends Component {
  state = {
    event: undefined
  };

  componentDidMount = async () => {
    
    let { postId } = this.props.match.params;
    console.log(postId);
    try {
      const { data } = await getSpecificEvents(postId);
    
      await this.setState({ event: data.event });
      
    } catch {
      this.setState({ event: false });
    }
  };

  render() {
    if (this.state.event === false) {
      return <Redirect to="/404" />;
    }
   
    if (this.state.event !== undefined) {
      return <EventCardMore {...this.state.event} />;
    }

    return null;
  }
}

export default PostPage;
