import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as authActions from "../../actions/auth.action";
import { Message } from 'element-react';
import "./SignUp.css";
import { createUser } from "../../services/user.service";

class SignUp extends Component {
  state = {
    permission: 'USER',
    email: "",
    username: "",
    password: "",
    rePassword:"",
    name: "",
    phone: "",
    dob: "",
    email: "",
    gender: "Nam"
  };

  onFieldChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    try {
      if (this.state.password === this.state.rePassword){
        const data = await createUser({ ...this.state }).then(response => { 
          Message.success("Tạo tài khoản thành công")
        })
        .catch(error => {
          Message.error("Tạo tài khoản thất bại")
        });
      }else{
        Message.error("Mật khẩu nhập lại không đúng")
      }
    } catch (error) {
      console.error(error);
    }
    // this.props.loginUser(this.state.username, this.state.password);
    console.log("submitform");
  };

  render() {
    return (
      <div className="container-fluid mySignup">
        <div className="d-flex justify-content-center ">
          <div className="card">
            <div className="card-header">
              <h3>Đăng kí</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fab fa-facebook-square" />
                </span>
                <span>
                  <i className="fab fa-google-plus-square" />
                </span>
                <span>
                  <i className="fab fa-twitter-square" />
                </span>
              </div>
            </div>

            <div className="card-body">
              <form onSubmit={this.onFormSubmit}>
                {/*  Tên đăng nhập */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    name="username"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/* Mật khẩu*/}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Nhập lại mật khẩu */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    name="rePassword"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Họ và tên */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user-tag" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    name="name"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Email */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-at" />
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Số ddienj thoại */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-phone" />
                    </span>
                  </div>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Số điện thoại"
                    name="phone"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/* Sinh nhật */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-week" />
                    </span>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Ngày Sinh"
                    name="dob"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Giới tính */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-venus-mars" />
                    </span>
                  </div>

                  <select className="form-control" id="exampleFormControlSelect1" name="gender" onChange={this.onFieldChanged} value={this.state.gender}>
                    <option>Nam</option>
                    <option>Nữ</option>
                  
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Đăng kí"
                    className="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Đã có tài khoản?
                <NavLink to="/login">
                  <div className="singup-color"> Đăng nhập</div>
                </NavLink>
              </div>
              <div className="d-flex justify-content-center">
                <div className="singup-color">Forgot your password?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
