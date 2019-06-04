import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router"
import user from "../../../../images/user.png";
import { connect } from "react-redux";
import "./LeftSide.css";
import {  Row, Col} from "reactstrap";


var permissionArr = { 'USER': 'Cá nhân', 'ORG': 'Tổ chức' };
const LeftSide = props  => (
  <div>
  <div className="side-body">
  {/* header */}
    <Row className="item-mid">
      <div>
        <div className="logo ">
        
          <img
            src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/57393041_305492127011755_8740904577945042944_n.jpg?_nc_cat=105&_nc_oc=AQn7GUnB8UXlqMTogNJWDlqNjMEYb8gBeMPWreuL7dXQQHbhb9R6_PFCvI5m-de4R8E&_nc_ht=scontent.fsgn2-1.fna&oh=70f6e9461f233111834a04094f2fa45e&oe=5D33B790"
            className="mx-auto .d-block"
          />
          
        </div>
      </div>
      <div>
        <div className="item-center">
          <div className="item-column ml-3">
            <b>{props.name}</b>
            <div className="item-row">
              <div className = "my-small">{permissionArr[props.permission]}
              <span className="ml-3 tcl-1"> Level {props.exp}</span>
             
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

const mapStateToProps = ({ auth: { user: { name, permission, exp } } }) => ({ name, permission, exp });

export default withRouter(connect(mapStateToProps)(LeftSide));
