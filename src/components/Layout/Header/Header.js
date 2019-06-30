import React from "react";
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";

import logo from "../../../images/volunteer.png";
import logoText from "../../../images/volunteerText.png";
import * as authActions from "../../../actions/auth.action";
import "./Header.css";

import { withLocalize, Translate } from "react-localize-redux";
import headerTranslations from './translation.json';

import {
	Button,
	Row,
	Popover,
	UncontrolledPopover,
	PopoverHeader,
	PopoverBody
} from "reactstrap";

import LanguageToggler from "../../LanguageToggler/LanguageToggler";

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: false,
			searchText: ""
		};
		this.props.addTranslation(headerTranslations);
	}
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	toggle() {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		});
	}

	log_out = () => {
		authActions.logOutUser();
		window.location.reload();
	};
	render() {
		const { notifications } = this.props;

		const search = <Translate id="header.search">Tìm kiếm</Translate>;

		return (
			<div>
				
				<nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark ">
					<img src={logo} alt="Logo" style={{ height: "5rem" }} />
					<img src={logoText} style={{ height: "5rem" }} />

				
				
					<form className="form-inline my-2 my-lg-0">
						<input
						className="form-control mr-sm-2"
						type="text"
						placeholder={`${search}`}
						aria-label="Search"
						name="searchText"
						onChange={this.onChange}
						/>
						<Link to={`/searchPage/${this.state.searchText}`}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							<i className="fas fa-search mr-1"></i>
							{search}
						</button>
						</Link>
					</form>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto" />
						<LanguageToggler />
						<ul className="navbar-nav ">
						<NavLink activeStyle={{ color: "green" }} className="nav-link" to="/">

							<span className="nav-link">
								<i className="fa fa-home" />
								
								<Translate id="header.homepage">Trang chủ</Translate>
								</span>

						</NavLink>
						<button
							className="nav-item active"
							style={{ all: "unset" }}
							id="PopoverFocus"
						>
							<a className="nav-link">
								<i className="fa fa-bell">
								<span className="badge badge-info">11</span>
								</i>
								<Translate id="header.noti">Thông báo</Translate>

							</a>
						</button>

						<UncontrolledPopover
							trigger="focus"
							placement="bottom"
							target="PopoverFocus"
						>
							<PopoverHeader><Translate id="header.noti">Thông báo</Translate></PopoverHeader>
							<PopoverBody className="notifi-header">
								<div className="item-center">
								<div>
									<img
										className="img-user-postCard rounded-circle"
										src="https://lolstatic-a.akamaihd.net/site/mount-targon/079694fdf251b5e7de788d9ab439d401d31ae160/img/champions/pantheon/pantheon-hero-mobile.jpg"
										alt="UserAvatar"
										style={{ width: "30px", height: "30px" }}
									/>
								</div>
								<div className="ml-2">
									<Translate id="header.text1">Sự kiện </Translate><b> Xuân tình nguyện</b> <Translate id="header.text2">đã bắt đầu</Translate>
								</div>
								</div>
							</PopoverBody>
							{console.log(notifications)}
							{notifications.map((notif) => (
								<div>{notif.isRead.toString()}</div>
							))}
						</UncontrolledPopover>

						<li className="nav-item active" onClick={this.log_out}>
							<a className="nav-link">
								<i className="fa fa-sign-out" />
								<Translate id="header.logout">Đăng xuất</Translate>
							</a>
						</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = ({ 
  	notifBoard: { notifications } }) => ({ notifications });

export default withRouter(
  connect(
	mapStateToProps,
	)(withLocalize(Header))
);
