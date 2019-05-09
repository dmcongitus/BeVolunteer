import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../images/volunteer.png";
import logoText from "../../../images/volunteerText.png";
import * as authActions from "../../../actions/auth.action";
import "./Header.css";
import { Button,Row, Popover, PopoverHeader, PopoverBody } from "reactstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

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
    return (
      <div>
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark ">
          <img src={logo} alt="Logo" height="80" />
          <img src={logoText} height="80" />

          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
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
            <ul className="navbar-nav ">
              <NavLink activeStyle={{ color: "white" }} to="/">
                <li className="nav-item active">
                  <a className="nav-link">
                    <i className="fa fa-home" />
                    Home
                  </a>
                </li>
              </NavLink>
              <li className="nav-item active" id="Popover1">
                <a className="nav-link">
                  <i className="fa fa-bell">
                    <span className="badge badge-info">11</span>
                  </i>
                  Thông báo
                </a>
              </li>
              <Popover
                placement="bottom"
                isOpen={this.state.popoverOpen}
                target="Popover1"
                toggle={this.toggle}
                
              
              >
                <PopoverHeader>Thông báo</PopoverHeader>
                <PopoverBody className = "notifi-header">
                 
         
            <div className="item-center">
              <div >
                <img
                  className="img-user-postCard rounded-circle"
                  src="https://lolstatic-a.akamaihd.net/site/mount-targon/079694fdf251b5e7de788d9ab439d401d31ae160/img/champions/pantheon/pantheon-hero-mobile.jpg"
                  alt="UserAvatar"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className="ml-2">
                Sự kiện  <b>Xuân tình nguyện</b> đã bắt đầu
              </div>
            </div>
        
                </PopoverBody>
                <PopoverBody className = "notifi-header">
                 
         
            <div className="item-center">
              <div >
                <img
                  className="img-user-postCard rounded-circle"
                  src="https://lolstatic-a.akamaihd.net/site/mount-targon/079694fdf251b5e7de788d9ab439d401d31ae160/img/champions/pantheon/pantheon-hero-mobile.jpg"
                  alt="UserAvatar"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className="ml-2">
                tài khoản đã được  <b>Xác thực</b>
              </div>
            </div>
        
                </PopoverBody>
                <PopoverBody className = "notifi-header">
                 
         
                 <div className="item-center">
                   <div >
                     <img
                       className="img-user-postCard rounded-circle"
                       src="https://lolstatic-a.akamaihd.net/site/mount-targon/079694fdf251b5e7de788d9ab439d401d31ae160/img/champions/pantheon/pantheon-hero-mobile.jpg"
                       alt="UserAvatar"
                       style={{ width: "30px", height: "30px" }}
                     />
                   </div>
                   <div className="ml-2">
                     Sự kiện  <b>Xuân tình nguyện</b> đã bắt đầu
                   </div>
                 </div>
             
                     </PopoverBody>
              </Popover>

              <li className="nav-item active" onClick={this.log_out}>
                <a className="nav-link">
                  <i className="fa fa-sign-out" />
                  Logout
                  <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
