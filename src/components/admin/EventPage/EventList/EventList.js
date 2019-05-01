import React, { Component } from "react";
import { Link } from "react-router-dom";
import List from "../../../../components/admin/EventPage/List/List";
import "./EventList.css";
import { getPosts } from '../../../../services/post.service';
import MoreVerticalButtonEvents from '../../../MoreVerticalButton/MoreVerticalButtonEvents';

class HomePage extends Component {
	state = {
		posts: []
	}

	componentDidMount = () => {
		getPosts(0).then(({ data: { posts } }) => this.setState({posts})).catch((e) => console.log(e));
	}

	onPostTypeChanged = (postType) => {
		getPosts(postType).then(({ data: { posts } }) => this.setState({posts})).catch((e) => console.log(e));
	}

	render() {
		return (
			<div className="side-body" style={{ position: 'relative' , minHeight: '84vh'}}>
				<h2 className="title-side-body" style={{ textTransform: 'uppercase' }}>
					<div className= "title-text">
						DANH SÁCH SỰ KIỆN
					</div>
				</h2>
				<div style={{ position: "absolute", right: '1.25rem', top: '1rem', zIndex: 1000 }}>
					{<MoreVerticalButtonEvents onPostTypeChanged={this.onPostTypeChanged} />}
				</div>
				<List events={this.state.posts}></List>
			</div>
		);
	}
}

export default HomePage;
