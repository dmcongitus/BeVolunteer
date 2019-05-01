import React, { Component } from "react";
import NewEvent from '../../../../components/admin/EventPage/NewEvent/NewEvent';
import "./CreateEvent.css";
import PageLayout from "../../../../layouts/PageLayout/PageLayout";

class CreateEvent extends Component {
  	render() {
		return (
			<PageLayout title="event">
				<NewEvent></NewEvent>
			</PageLayout>
		);
  	}
}

export default CreateEvent;