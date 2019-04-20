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
        console.log("Login function");
        console.log(this.props.isOpenErrorModal);
        console.log("--------------");

        this.props.loginUser(username, password);
        this.setState({
            isOpenModal: this.props.isOpenErrorModal,
            textNoti: this.props.errorMessage
        })

        console.log(this.state);
    }

    errorMessage() {
        console.log("Login error");
        if (this.props.errorMessage) {
            return (
                <ErrorModal	
                    isOpenModal={this.state.isOpenModal}
                    closeModal={() =>{this.setState({isOpenModal: false})}}
                    text={this.props.errorMessage}>
                </ErrorModal>
            );
        }
        else return "";
    }

    render() {
        console.log("Main");
        console.log(this.state);

 
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div>
                {
                    this.props.isOpenErrorModal === true ?
                    this.errorMessage():null
                }
                <Login
					login={this.login}>
				</Login>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    errorMessage : state.auth.error,
    isAuthenticated : state.auth.isAuthenticated,
    isOpenErrorModal : state.auth.isOpenErrorModal
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