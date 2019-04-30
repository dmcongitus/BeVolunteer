import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroupAddon,
	InputGroup,
	Dropdown, 
	DropdownToggle,
	DropdownMenu, 
    DropdownItem,
    ButtonDropdown
} from "reactstrap";
import { mapPermissionToText, mapPermissionToSelections } from '../../../configs/permission';
import DropdownCustom from '../DropdownCustom/DropdownCustom';

const adminLeftSide = ({ username, permission }) => (
    <div className="sidebar1">
        <div className="logo">
            <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/57393041_305492127011755_8740904577945042944_n.jpg?_nc_cat=105&_nc_oc=AQn7GUnB8UXlqMTogNJWDlqNjMEYb8gBeMPWreuL7dXQQHbhb9R6_PFCvI5m-de4R8E&_nc_ht=scontent.fsgn2-1.fna&oh=70f6e9461f233111834a04094f2fa45e&oe=5D33B790" className="img-responsive center-block" alt="Logo" />
          
            <h2 className="title-side-body">
                <span>{username}</span> • 
                <span style={{ fontStyle: 'italic' }}> {mapPermissionToText[permission]}</span>
            </h2>
        </div>
        <br />
        <div className="left-navigation">
            {
                mapPermissionToSelections[permission] && mapPermissionToSelections[permission].map((selection, index) => (
                    <ul className="list" key={index}>
                        <h5>
                            <strong 
                                style={{ textTransform: 'uppercase' }}>{selection.header}
                            </strong>
                        </h5>
                        {
                            selection.navigations.map((navigation,index) => (
                                <li key={index}>
                                    {
                                        navigation.title !== "Sự kiện"?
                                        <NavLink 
                                            activeStyle={{ color: 'green' }} 
                                            to={navigation.redirectTo}>{navigation.title}
                                        </NavLink>:
                                    //     <NavLink 
                                    //     activeStyle={{ color: 'blue' }} 
                                    //     to={navigation.redirectTo}>{navigation.title}
                                    // </NavLink>
                                        <DropdownCustom
                                            activeStyle={{ color: 'green' }} 
                                            sub={navigation.subPermission}
                                            permission={permission}>
                                            {navigation.title}
                                        </DropdownCustom>
                                    }
                                </li>)) 
                        }
                    </ul>
                ))
            }
        </div>
    </div>
);

export default adminLeftSide;