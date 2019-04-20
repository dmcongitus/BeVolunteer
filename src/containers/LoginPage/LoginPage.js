import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as authActions from '../../actions/auth.action';
import Login from "../../components/Login/Login";
import './LoginPage.css';
import ErrorModal from "../../modals/ErrorModal";

class LoginPage extends Component {
    
    constructor(props){
		super(props)
		this.state = {
            isAuth: false,
			isOpenModal: false,
            textNoti: ''
		}
    }
    
    login = (username, password) =>{
        this.props.loginUser(username, password);
    }

    errorMessage() {
        if (this.props.errorMessage) {
            return (
                <ErrorModal	
                    isOpenModal={() =>{this.setState({isOpenModal: true})}}
                    closeModal={() =>{this.setState({isOpenModal: false})}}
                    text={this.props.errorMessage}>
                </ErrorModal>
            );
        }
    }

    render() {
        console.log("AAAAAAAA");
        console.log("--------------");
        console.log(this.props.errorMessage)
 
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div>
                {this.errorMessage()}
                <Login
					login={this.login}>
				</Login>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    errorMessage : state.auth.error,
    isAuthenticated : state.auth.isAuthenticated
});


//({ auth: { isAuthenticated } }) => ({ isAuthenticated });

const mapDispatchToProps = dispatch => (
    {
        loginUser: (username, password) => {
            dispatch(authActions.logInUser(username, password))
        }
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);