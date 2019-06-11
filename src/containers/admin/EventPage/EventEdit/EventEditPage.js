import React, { Component } from "react";
import EventEdit from '../../../../components/EventPage/EditEvent/EditEvent';
import "./EventEditPage.css";
import { Redirect } from 'react-router-dom';
import { getSpecificEvent } from '../../../../services/event.service';

class EventEditPage extends Component {
	state = {
        event: undefined
    }

    componentDidMount = async () => {
        let { eventId } = this.props.match.params;
        try {
            const { data } = await getSpecificEvent(eventId);
            this.setState({ event: data });
        } catch {
            this.setState({ event: false });
        }
	}
	  
	render() {

		if (this.state.event === false) {
            return <Redirect to="/404"/>
		}

		if (this.state.event !== undefined) {
            console.log(this.state.event);
            return (
                <EventEdit {...this.state.event.event}/>
            );
		}
		return null;
  	}
}

export default EventEditPage;