import React, { Component } from 'react';
import '../styles/Home.css';
import "../index.css";
import axios from 'axios';
import { API_server } from '../config';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';

class CreateAcount extends Component {
    
    constructor(props){
        super(props);
        this.state = {

                username:"",
                password:"",
                repeatpassword:"",
                name:"",
                gender:"",
                permission: 0,
                email:"",
                dob: "",
                phone: "",
            
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onSubmitRegistration = this.onSubmitRegistration.bind(this);

    }

    onHandleChange(event){
        console.log("on change");
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
                [name] : value        
        });

    }

    onSubmitRegistration(event){
        console.log("catch at component");
        console.log(this.state);
        console.log("--------------")

        this.props.createAccount(this.state);
        event.preventDefault();  
       
    }

    render() {
      return (
        <div className="limiter">
          <div className="container-register100">
              <Container className="container-fluid mx-auto flex flex-col wrap-register100 box-shadow-main">
                  <Row>
                        <Col xs={6} md={4}>
                            <div className="register100-pic js-tilt" data-tilt>
                                <img src="images/img-01.png" alt="IMG"/>
                            </div>                            
                        </Col>

                        <Col xs={6} md={8}>
                            <div 
                                className="register100-form validate-form">
                                <span className="register100-form-title">
                                    CREATE ACCOUNT
                                </span>
            
                                <div className="register-wrap-input100 validate-input" data-validate = "Valid username is required: ex@abc.xyz">
                                    <span className="symbol-input100">
                                        <i 
                                            aria-hidden="true">Tên đăng nhập
                                        </i>
                                    </span>
                                    <input 
                                        className="ml-64 register-input100" 
                                        type="text" 
                                        name="username"
                                        ref="username"
                                        required
                                        autoComplete="username"
                                        onChange={this.onHandleChange}
                                        placeholder="abcde123"/>
                                </div>

                                <div className="register-wrap-input100 validate-input" data-validate = "Password is required">
                                    <span className="symbol-input100">
                                        <i aria-hidden="true">Mật khẩu</i>
                                    </span>                                   
                                    <input 
                                        className="ml-64 register-input100" 
                                        type="password" 
                                        name="password"
                                        required
                                        autoComplete="new-password"
                                        onChange={this.onHandleChange} 
                                        placeholder="123456789"/>
                                </div>

                                <div className="register-wrap-input100 validate-input" data-validate = "Password is required">
                                    <span className="symbol-input100">
                                        <i aria-hidden="true">Nhập lại mật khẩu</i>
                                    </span>
                                    <input 
                                        required
                                        className="ml-64 register-input100" 
                                        type="password" 
                                        name="repeatpassword"
                                        autoComplete="new-password"
                                        onChange={this.onHandleChange}  
                                        placeholder="123456789"/>
                                </div>

                                <div className="register-wrap-input100 validate-input" data-validate = "Valid username is required: ex@abc.xyz">
                                    <span className="symbol-input100">
                                        <i
                                            aria-hidden="true">Họ và tên
                                        </i>
                                    </span>
                                    <input 
                                        required    
                                        className="ml-64 register-input100" 
                                        type="text" 
                                        name="name"
                                        onChange={this.onHandleChange}  
                                        placeholder="Nguyễn Văn A"/>
                                </div>
                                
                                <div className="register-wrap-input100 validate-input" data-validate = "Valid username is required: ex@abc.xyz">
                                    <span className="symbol-input100">
                                        <i
                                            aria-hidden="true">Email
                                        </i>
                                    </span>
                                    <input
                                        required 
                                        className="ml-64 register-input100" 
                                        type="email" 
                                        name="email"
                                        onChange={this.onHandleChange}  
                                        placeholder="ex@abc.xyz"/>
                                </div>
                                
                                <div className="register-wrap-input100 validate-input" data-validate = "Valid username is required: ex@abc.xyz">
                                    <span className="symbol-input100">
                                        <i
                                            aria-hidden="true">Số điện thoại
                                        </i>
                                    </span>
                                    <input 
                                        className="ml-64 register-input100" 
                                        type="text" 
                                        name="phone"
                                        required 
                                        onChange={this.onHandleChange}  
                                        placeholder="0123456789"/>
                                </div>
                                
                                <div className="register-wrap-input100 validate-input" data-validate = "Password is required">
                                    <span className="symbol-input100">
                                        <i aria-hidden="true">Ngày sinh</i>
                                    </span>
                                    <input 
                                        required
                                        className="ml-64 register-input100" 
                                        type="date"
                                        onChange={this.onHandleChange}
                                        name="dob" />
                                </div>

                                <div className="register-wrap-input100 validate-input" data-validate = "Password is required">
                                    <span className="symbol-input100">
                                        <i aria-hidden="true">Giới tính</i>
                                    </span>
                                    <select
                                        required
                                        className="ml-64 register-input100" 
                                        onChange={this.onHandleChange}
                                        value={this.state.gender}
                                        name="gender">  
                                        <option disable="disable" value="">Giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>

                                    </select>
                                </div>
            
                                <div className="container-login100-form-btn">
                                    <Link to = "/">
                                    <button 
                                        onClick={this.onSubmitRegistration}
                                        className="login100-form-btn">
                                        CREATE
                                    </button>
                                    </Link>
                                </div>
            
                                <div className="text-center p-t-36">
                                    <a className="txt2" href="/#" >
                                        Forgot Password
                                        <i className="fa fa-long-arrow-right m-l-5"></i>
                                    </a>
                                </div>
                            </div>                            
                        </Col>
                  </Row>
              </Container>
          </div>
      </div>
  
      );
    }
  }
  
  export default CreateAcount;