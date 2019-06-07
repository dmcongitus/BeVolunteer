import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router"
import { connect } from "react-redux";
import "./LeftSide.css";
import {  Row, Col} from "reactstrap";

import * as userActions from '../../../actions/user.actions';

var permissionArr = { 'USER': 'Cá nhân', 'ORG': 'Tổ chức' };

class LeftSide extends Component {
	handleImageChange = e => {  
		e.persist();
		const file =  e.target.files[0]
		this.setState({ avatar: file });
		this.props.uploadAvatar(file);
	  };

  render() {
    return  (
      <div>
      <div className="side-body">
      {/* header */}
        <Row className="item-mid">
          <div>
            <div className="logo ">
            
              <img alt="avatar" onClick={() => this.avatar.click()}
                src={"/resources/" + (this.props.avatar || 
				"https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/57393041_305492127011755_8740904577945042944_n.jpg?_nc_cat=105&_nc_oc=AQn7GUnB8UXlqMTogNJWDlqNjMEYb8gBeMPWreuL7dXQQHbhb9R6_PFCvI5m-de4R8E&_nc_ht=scontent.fsgn2-1.fna&oh=70f6e9461f233111834a04094f2fa45e&oe=5D33B790")}
                className="mx-auto .d-block"
				style={{cursor:"pointer"}}
              />
              
              <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={el => this.avatar = el}
                  onClick={e => (e.target.value = null)}
                  onChange={this.handleImageChange}
                />
    
            </div>
          </div>
          <div>
            <div className="item-center">
              <div className="item-column ml-3">
                <b>{this.props.name}</b>
                <div className="item-row">
                  <div className = "my-small">{permissionArr[this.props.permission]}
                  <span className="ml-3 tcl-1"> Level {this.props.exp}</span>
                 
                </div>
              
                  </div> 
              </div>
            </div>
          </div>
      
        </Row>
    
        {/* end header */}
        </div>
        <div className="side-body">
        {/* Ca Nhan */}
        <Row>
          <Col>
            <div className="text-title-2 title-left-side p-1">
              <strong>Cá Nhân</strong>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul className="list">
              <li>
                  <NavLink
                    exact
                  activeClassName="NavLink--active"
                  to="/me"
                >
                  <i class="fas fa-user-edit"></i>Thông tin cá nhân
                </NavLink>
              </li>
              <li>
                  <NavLink
                    exact
                  activeClassName="NavLink--active"
                  to="/history"
                >
                 <i class="fas fa-history"></i> Lịch sử hoạt động
                </NavLink>
    
                
              </li>
              <li>
                  <NavLink
                    exact
                  activeClassName="NavLink--active"
                  to="/medal"
                >
                 <i class="fas fa-medal"></i> Danh hiệu
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
                <NavLink exact
                  activeClassName="NavLink--active"
                  to="/"
                >
                  <i class="fas fa-home"></i>Trang chủ
                </NavLink>
              </li>
              <li>
                  <NavLink 
                    exact
                  activeClassName="NavLink--active"
                  to="/rank"
                >
                <i class="fas fa-trophy"></i>  Xếp hạng
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

const mapStateToProps = ({ auth: { user: { name, permission, exp, username, avatar, isVerified } } }) => ({ name, permission, exp, username, avatar, isVerified });

const mapDispatchToProps = dispatch => ({
	uploadAvatar: avatar => dispatch(userActions.uploadAvatar(avatar))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSide));
