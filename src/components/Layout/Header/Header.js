import React from "react";
<<<<<<< .merge_file_a09080
import { NavLink } from "react-router-dom";
=======
import { NavLink, Link } from "react-router-dom";
>>>>>>> .merge_file_a02156
import logo from "../../../images/volunteer.png";
import logoText from "../../../images/volunteerText.png";
import * as authActions from "../../../actions/auth.action";
import "./Header.css";
<<<<<<< .merge_file_a09080
import { Button,Row, Popover, PopoverHeader, PopoverBody } from "reactstrap";
=======
import {
  Button,
  Row,
  Popover,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
>>>>>>> .merge_file_a02156

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
<<<<<<< .merge_file_a09080
      popoverOpen: false
    };
  }

=======
      popoverOpen: false,
      searchText: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
>>>>>>> .merge_file_a02156
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
<<<<<<< .merge_file_a09080
          <img src={logo} alt="Logo" height="80" />
          <img src={logoText} height="80" />
=======
          <img src={logo} alt="Logo" style={{height:"5rem"}} />
          <img src={logoText}style={{height:"5rem"}} />
>>>>>>> .merge_file_a02156

          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
<<<<<<< .merge_file_a09080
            />
=======
              name="searchText"
              onChange={this.onChange}
            />
             <Link to={`/searchPage/${this.state.searchText}`}>
>>>>>>> .merge_file_a02156
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
<<<<<<< .merge_file_a09080
=======
            </Link>
>>>>>>> .merge_file_a02156
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
<<<<<<< .merge_file_a09080
              <NavLink activeStyle={{ color: "white" }} to="/">
                <li className="nav-item active">
=======
              <NavLink activeStyle={{ color: "green" }} className="nav-link" to="/">
                
>>>>>>> .merge_file_a02156
                  <a className="nav-link">
                    <i className="fa fa-home" />
                    Home
                  </a>
<<<<<<< .merge_file_a09080
                </li>
              </NavLink>
              <li className="nav-item active" id="Popover1">
=======
               
              </NavLink>
              <Button
                className="nav-item active"
                style={{ all: "unset" }}
                id="PopoverFocus"
              >
>>>>>>> .merge_file_a02156
                <a className="nav-link">
                  <i className="fa fa-bell">
                    <span className="badge badge-info">11</span>
                  </i>
                  Thông báo
                </a>
<<<<<<< .merge_file_a09080
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
=======
              </Button>

              <UncontrolledPopover
                trigger="focus"
                placement="bottom"
                target="PopoverFocus"
              >
                <PopoverHeader>Thông báo</PopoverHeader>
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
                      Sự kiện <b>Xuân tình nguyện</b> đã bắt đầu
                    </div>
                  </div>
                </PopoverBody>
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
                      tài khoản đã được <b>Xác thực</b>
                    </div>
                  </div>
                </PopoverBody>
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
                      Sự kiện <b>Xuân tình nguyện</b> đã bắt đầu
                    </div>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
>>>>>>> .merge_file_a02156

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
