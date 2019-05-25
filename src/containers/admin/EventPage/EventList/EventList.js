import React, { Component } from "react";
import { Link } from "react-router-dom";
import List from '../../../../components/admin/EventPage/EventList/EventList';
import "./EventList.css";
import PageLayout from "../../../../layouts/PageLayout/PageLayout";

class EventList extends Component {
  	render() {
		return (
			<PageLayout title="event">
				<List></List>
			</PageLayout>
		);
  	}
}

export default EventList;