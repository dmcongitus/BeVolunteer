import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { Row, Col } from "reactstrap";
import {
  mapPermissionToText,
  mapPermissionToSelections
} from "../../../configs/permission";
import DropdownCustom from '../DropdownCustom/DropdownCustom';

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
                mapPermissionToSelections[permission].map((selection, index) => (
                    <ul className="list" key={index}>
                    <Row>
                        <Col>
                        <div className="text-title-2 title-left-side p-1">
                            <strong>{selection.header}</strong>
                        </div>
                        </Col>
                    </Row>
                    {
                        selection.navigations.map((navigation,index) => (
                            <li key={index}>
                            {
                                navigation.title !== "Sự kiện"?
                                <NavLink
                                    activeStyle={{ color: "#004916", fontWeight: "bold" }}
                                    to={navigation.redirectTo}
                                >
                                    {navigation.title}
                                </NavLink>:
                                <DropdownCustom
                                    activeStyle={{ color: "#004916", fontWeight: "bold" }} 
                                    sub={navigation.subPermission}
                                    permission={permission}>
                                    {navigation.title}
                                </DropdownCustom>
                            }
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    </div>
);

export default withRouter(adminLeftSide);
