import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/user/Post/PostList/Post";
import NewEvent from '../../../components/admin/EventPage/NewEvent';
import "./EventPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";

class EventPage extends Component {
  	render() {
		return (
			<PageLayout title="event">
				<NewEvent></NewEvent>
			</PageLayout>
		);
  	}
}

export default EventPage;