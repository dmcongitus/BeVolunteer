import React, { Component } from 'react';
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

class DropdownCustom extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    onMouseEnter() {
        this.setState({dropdownOpen: true});
    }
    
    onMouseLeave() {
        this.setState({dropdownOpen: false});
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render(){
        return(
            <Dropdown 
                onMouseOver={this.onMouseEnter} 
                isOpen={this.state.dropdownOpen} 
                toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.props.children}
                </DropdownToggle>
                {
                    
                        <DropdownMenu>
                            {
                            this.props.sub.map((navigation) => (
                                <DropdownItem>
                                    <NavLink 
                                        activeStyle={{ color: 'green' }} 
                                        to={navigation.redirectTo}>{navigation.title}
                                    </NavLink>
                                </DropdownItem>
                                )) 
                            } 

                        </DropdownMenu>
                      
                 }
            </Dropdown>
        );
    }
}

export default DropdownCustom;