import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import EventDetailCard from '../../../../components/admin/EventPage/EventDetailCard/EventDetailCard';
import { getSpecificEvent } from '../../../../services/event.service';

class EventDetail extends Component {
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
           
            return (
                <EventDetailCard {...this.state.event.event}/>
            );
        }

        return null;
    }
}

export default EventDetail;