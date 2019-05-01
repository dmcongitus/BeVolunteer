import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { Row, Col } from "reactstrap";
import {
  mapPermissionToText,
  mapPermissionToSelections
} from "../../../configs/permission";

var permissionArr = ['Cá nhân', 'Tổ chức', 'Content Mod','Acount Mod', 'Unit Admin', 'Super Admin' ]

const adminLeftSide = ({ username, permission }) => (
    
  <div>
    <div className="side-body">
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
              <b>{username}</b>
              <div className="item-row">
                <div className="my-small">
                {permissionArr[permission]}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
    <div className="side-body">
      <div className="left-navigation">
        {mapPermissionToSelections[permission] &&
          mapPermissionToSelections[permission].map(selection => (
            <ul className="list">
              <Row>
                <Col>
                  <div className="text-title-2 title-left-side p-1">
                    <strong>{selection.header}</strong>
                  </div>
                </Col>
              </Row>
              {selection.navigations.map(navigation => (
                <li>
                  <NavLink
                    activeStyle={{ color: "#004916", fontWeight: "bold" }}
                    to={navigation.redirectTo}
                  >
                    {navigation.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  </div>
);

export default withRouter(adminLeftSide);
