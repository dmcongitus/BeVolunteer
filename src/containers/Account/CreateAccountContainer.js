import React, { Component } from 'react';
// import Home from '.././components/Home';
// import Login from '../components/CreateAcount';
// import axios from 'axios';
// import { API_server } from '../config';
import ErrorModal from "../../modals/ErrorModal";
//import SuccessModal from "../components/Modal/SuccessModal";
import CreateAcount from '../../components/Account/CreateAccount';

class CreateAccountContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			isOpenErrorModal: false,
			// isOpenSuccessModal:false,
			status: false,
            textNoti: ''
		}
		this.createAccount = this.createAccount.bind(this);
	}

	createAccount = async (account)=>{
		console.log("catch at container");
		var check = this.checkRegister(account);
		console.log(this.state);
		console.log("---------");
		console.log(check);
		if(check.status){
			console.log("AAAAA");
			console.log(check.message);
			this.setState({
				isOpenErrorModal: false,
				// isOpenSuccessModal: true,
				status:check.status,
				textNoti: check.message
			})
		// 	try{
		// 		axios.post(API_server + '/', { 
		// 			username: this.state.account.username,
		// 			password: this.state.account.password,
		// 			name: thi	s.state.account.name,
		// 			gender: this.state.account.gender,
		// 			email: this.state.account.email,
		// 			dob: this.state.account.dob,
		// 			phone: this.state.account.phone,}).then(async rs => {
		// 			if(rs.status === 200){
		// 				console.log('Register success');
		// 				console.log(rs);
		// 				console.log("-----------");
		// 				alert("verify email");
		// 				this.props.history.push('/')

		// 			}
		// 		}).catch(e => {
		// 			console.log('This account is not exist');
		// 			this.setState({
		// 				textNoti: 'This account is not exist',
		// 				isOpenModal: true
		// 			})
		// 		})
		// 	}catch (e) {
		// 		console.log('Secret key is invalid')
		// 		this.setState({
		// 			textNoti: 'Secret key is invalid',
		// 			isOpenModal: true
		// 		})
		// 	} 
		}else{
			console.log('Error')
			// this.setState({
			// 		isOpenModal: true,
			// 		status:false,
			// 		textNoti: check.message}, 
			// 		function () {
			// 			console.log(this.state);
			// });
			await this.setState(function(state, props) {
				console.log("ssadsadsa");
				return {
					isOpenErrorModal: true,
					// isOpenSuccessModal: false,
					status:check.status,
					textNoti: check.message
				};
			});		
		}
	}

	checkRegister = (account) =>{	
		console.log("BBBBBBB");
		if( account.username === "" || 
			account.password === "" ||
			account.name === "" ||
			account.gender === "" ||
			account.email === "" ||
			account.dob === "" ||
			account.phone === "" ||
			account.repeatpassword === ""){
				return {
					status: false,
					message: "Value cannot be blank"
				};
			}
		else if(account.phone.length !== 10){
			return {
				status: false,
				message: "Phone number has to have 10 digits"
			};
		}
		else if(account.username.length < 8){
			return {
				status: false,
				message: "Username's length has to bigger than 7 letters"
			};
		}
		else if(account.password !== account.repeatpassword){
			return {
				status: false,
				message: "Password and repeatpassword different"
			};
		}
		else if(account.password.length < 8){
			return {
				status: false,
				message: "Password's length has to bigger than 7 letters"
			};
		}
		else if(account.gender !== "Nam" && account.gender !== "Nữ"){
			return {
				status: false,
				message: "Gender is not valid"
			};
		}
		else return {
			status: true,
			message: "Register successfully. Please check your email to activate your account"
		};
	}

	render() {
		return (
			<div>
				<ErrorModal	
					isOpenModal={this.state.isOpenErrorModal}
					closeModal={() =>{this.setState({isOpenErrorModal: false})}}
					text={this.state.textNoti}>
				</ErrorModal>

				{/* <SuccessModal	
					isOpenModal={this.state.isOpenSuccessModal}
					closeModal={() =>{this.setState({isOpenSuccessModal: false})}}
					text={this.state.textNoti}>
				</SuccessModal> */}

				<CreateAcount 
					flag = "create"
					createAccount={this.createAccount}>
            	</CreateAcount>
			</div>

		);
	}
}

export default CreateAccountContainer;