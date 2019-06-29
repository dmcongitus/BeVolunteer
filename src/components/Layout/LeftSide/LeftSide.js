import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "./LeftSide.css";
import { Row, Col } from "reactstrap";


import { withLocalize, Translate } from "react-localize-redux";
import leftSideTranslations from './translation.json';

import * as userActions from "../../../actions/user.actions";
import { fn } from "moment";

var permissionArr = { USER: "Cá nhân", ORG: "Tổ chức" };

class LeftSide extends Component {
  constructor(props) {
    super(props);
    this.props.addTranslation(leftSideTranslations);
    
  }

  handleImageChange = e => {
    e.persist();
    const file = e.target.files[0];
    this.setState({ avatar: file });
    this.props.uploadAvatar(file);
  };

  render() {
    return (
      <div>
        <div className="side-body">
          <Col className="pr-0">
          {/* header */}
          <Row className="item-mid">
            <Col xs = "4" className="p-2">
              <div className="logo ">
                <img
                  alt="avatar"
                  onClick={() => this.avatar.click()}
                  src={
                    "/resources/" +
                    (this.props.avatar ||
                      "https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/57393041_305492127011755_8740904577945042944_n.jpg?_nc_cat=105&_nc_oc=AQn7GUnB8UXlqMTogNJWDlqNjMEYb8gBeMPWreuL7dXQQHbhb9R6_PFCvI5m-de4R8E&_nc_ht=scontent.fsgn2-1.fna&oh=70f6e9461f233111834a04094f2fa45e&oe=5D33B790")
                  }
                  className="mx-auto .d-block "
                  style={{ cursor: "pointer" }}
                />

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={el => (this.avatar = el)}
                  onClick={e => (e.target.value = null)}
                  onChange={this.handleImageChange}
                />
              </div>
            </Col>
            <Col xs = "8" className="p-1">
              <div className="item-center">
                <div className="item-column ">
                  <b>
                    {this.props.name}{" "}
                    {this.props.isVerified === true && (
                      <i className="ml-1 small fas fa-check-circle check-user" />
                    )}
                  </b>

                  <div className="item-row">
                    <div>
                      {permissionArr[this.props.permission]}
                      <span className="ml-2 tcl-1">
                      
                        Cấp {this.props.exp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          </Col>
          {/* end header */}
        </div>
        <div className="side-body">
          {/* Ca Nhan */}
          <Row>
            <Col>
              <div className="text-title-2 title-left-side p-1">
                <strong><Translate id="leftSide.header">Cá nhân</Translate></strong>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list">
                <li>
                  <NavLink exact activeClassName="NavLink--active" to="/me">
                    <i className="fas fa-user-edit" /><Translate  id="leftSide.info">Thông tin cá nhân</Translate>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    activeClassName="NavLink--active"
                    to="/history"
                  >
                    <i className="fas fa-history" /><Translate id="leftSide.activityHistory"> Lịch sử hoạt động</Translate>
                  </NavLink>
                </li>
                <li>
                  <NavLink exact activeClassName="NavLink--active" to="/medal">
                    <i className="fas fa-medal" /><Translate id="leftSide.title">  Danh hiệu</Translate>
                  </NavLink>
                </li>
              </ul>
            </Col>
          </Row>
          {/* End Ca Nhan */}
          <hr />
          <Row>
            <Col>
              <div className="text-title-2 title-left-side p-1">
                <strong>CỘNG ĐỒNG</strong>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list">
                <li>
                  <NavLink exact activeClassName="NavLink--active" to="/">
                    <i className="fas fa-home" />Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink exact activeClassName="NavLink--active" to="/rank">
                    <i className="fas fa-trophy" /> Xếp hạng
                  </NavLink>
                </li>
                <li>
                  <NavLink exact activeClassName="NavLink--active" to="/checkin">
                    <i className="fas fa-calendar-check" /> Điểm danh
                  </NavLink>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp, username, avatar, isVerified }
  }
}) => ({ name, permission, exp, username, avatar, isVerified });

const mapDispatchToProps = dispatch => ({
  uploadAvatar: avatar => dispatch(userActions.uploadAvatar(avatar))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withLocalize(LeftSide))
);
