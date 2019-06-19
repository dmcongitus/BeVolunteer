import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import EventCardMore from "../../../components/Post/PostCardMore/EventCardMore";
import { getSpecificEvents } from "../../../services/post.service";
import { joinEvent, unjoinEvent } from "../../../services/event.service";
import {Notification} from "element-react"
class PostPage extends Component {
  state = {
    event: undefined
  };
  joinToEvent = async id => {
   
    if(this.state.event.volunteers.length === this.state.event.numVolunteers){
      Notification.error({
        title: 'Error',
        message: 'Số lượng nguời đã đạt giới hạn '
      });
    }
    else  await joinEvent(id);
    let { eventId } = this.props.match.params;
    try {
      const { data } = await getSpecificEvents(eventId);
    
      await this.setState({ event: data.event });
      
    } catch {
      this.setState({ event: false });
    }
  };
  unjoinEvent = async id => {
    await unjoinEvent(id);
    let { eventId } = this.props.match.params;
    try {
      const { data } = await getSpecificEvents(eventId);
    
      await this.setState({ event: data.event });
      
    } catch {
      this.setState({ event: false });
    }
  };
  componentDidMount = async () => {
    
    let { eventId } = this.props.match.params;
    try {
      const { data } = await getSpecificEvents(eventId);
      const test = await getSpecificEvents("5cfe68ad40ccee2fd2c85541")
      console.log(test)
      await this.setState({ event: data.event });
      
    } catch {
      this.setState({ event: false });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.match.params.eventId != prevProps.match.params.eventId) {
      try {
        const { data } = await getSpecificEvents(this.props.match.params.eventId);
        
        await this.setState({ event: data.event });
        
      } catch {
        this.setState({ event: false });
      }
    }
  }

  render() {
    if (this.state.event === false) {
      return <Redirect to="/404" />;
    }
   
    if (this.state.event !== undefined) {
      return <EventCardMore {...this.state.event} joinToEvent = {this.joinToEvent} unjoinEvent = {this.unjoinEvent}/>;
    }

    return null;
  }
}

export default PostPage;
