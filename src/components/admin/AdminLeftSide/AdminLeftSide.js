import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { Row, Col } from "reactstrap";
import {
  mapPermissionToSelections
} from "../../../configs/permission";
import man from "../../../images/man.png"
var permissionArr = { 'CONTENT_MOD': 'Content Admin', 'ACCOUNT_MOD': 'Account Admin', 'UNIT_ADMIN': 'Unit Admin', 'SUPER': 'Super Admin' };

const adminLeftSide = ({ username, permission }) => (
    <div>
        <div className="side-body">
            <Row className="item-mid">
                <div>
                <div className="logo ">
                    <img
                    src={man}
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
                            to={navigation.redirectTo}>
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
