import React, { Component } from "react";
import { Link } from "react-router-dom";
import List from "../../../../components/admin/EventPage/List/List";
import "./EventList.css";
import moment from 'moment';

import { getEvents } from '../../../../services/event.service';
import MoreVerticalButtonEvents from '../../../MoreVerticalButton/MoreVerticalButtonEvents';

class HomePage extends Component {
	state = {
		events: []
	}

	componentDidMount = () => {
		getEvents(0).then(({ data: { events } }) => this.setState({events})).catch((e) => console.log(e));
	}

	onStatusEventChanged = (statusEvent) => {
		getEvents(statusEvent).then(({ data: { events } }) => this.setState({events})).catch((e) => console.log(e));
	}

	render() {
		console.log("AAAAAAAAAAAAAAA");
		console.log(this.state.events);
		var a = moment(this.state.events.starttime).format('YYYY-MM-DD');
		console.log(a);
		return (
			<div className="side-body" style={{ position: 'relative' , minHeight: '84vh'}}>
				<h2 className="title-side-body" style={{ textTransform: 'uppercase' }}>
					<div className= "title-text">
						DANH SÁCH SỰ KIỆN
					</div>
				</h2>
				<div style={{ position: "absolute", right: '1.25rem', top: '1rem', zIndex: 1000 }}>
					{<MoreVerticalButtonEvents onStatusEventChanged={this.onStatusEventChanged} />}
				</div>
				<List events={this.state.events}></List>
			</div>
		);
	}
}

export default HomePage;
