import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router"
import EventDetailCardAdminUnitMod from '../../../components/EventPage/EventDetailCard/EventDetailCard';
// import EventDetailCardUser from '../../../components/EventPage/user/EventDetailCard/EventDetailCard';
// import EventDetailCardOrg from '../../../components/EventPage/org/EventDetailCard/EventDetailCard';

import { getSpecificEvent } from '../../../services/event.service';

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

            // if(this.props.permission === 'USER')
            // {
            //     return (
            //         <EventDetailCardUser {...this.state.event.event}/>
            //     );
            // }
            if(this.props.permission === 'UNIT_ADMIN'){
                return (
                    <EventDetailCardAdminUnitMod {...this.state.event.event}/>
                );
            }
            // else if(this.props.permission === 'ORG'){
            //     return (
            //         <EventDetailCardOrg {...this.state.event.event}/>
            //     );
            // }
        }

        return null;
    }
}
const mapStateToProps = ({ auth: { user: { permission } } }) => ({  permission });

export default withRouter(connect(mapStateToProps)(EventDetail));