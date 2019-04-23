import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as authActions from "../../actions/auth.action";

import "./SignUp.css";
import { createUser } from "../../services/user.service";

class SignUp extends Component {
  state = {
    permission: 1,
    email: "",
    username: "",
    password: "",
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
      const data = await createUser({ ...this.state });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    // this.props.loginUser(this.state.username, this.state.password);
    console.log("submitform");
  };

  render() {
    return (
      <div class="container-fluid mylogin">
        <div class="d-flex justify-content-center h-100">
          <div class="card">
            <div class="card-header">
              <h3>Đăng kí</h3>
              <div class="d-flex justify-content-end social_icon">
                <span>
                  <i class="fab fa-facebook-square" />
                </span>
                <span>
                  <i class="fab fa-google-plus-square" />
                </span>
                <span>
                  <i class="fab fa-twitter-square" />
                </span>
              </div>
            </div>

            <div class="card-body">
              <form onSubmit={this.onFormSubmit}>
                {/*  Tên đăng nhập */}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Tên đăng nhập"
                    name="username"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/* Mật khẩu*/}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Nhập lại mật khẩu */}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Nhập lại mật khẩu"
                    name="repassword"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Họ và tên */}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user-tag" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Họ và tên"
                    name="name"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Email */}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-at" />
                    </span>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Số ddienj thoại */}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-phone" />
                    </span>
                  </div>
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="Số điện thoại"
                    name="phone"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/* Sinh nhật */}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-calendar-week" />
                    </span>
                  </div>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Ngày Sinh"
                    name="dob"
                    onChange={this.onFieldChanged}
                  />
                </div>
                {/*  Giới tính */}
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-venus-mars" />
                    </span>
                  </div>

                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div class="form-group">
                  <input
                    type="submit"
                    value="Đăng kí"
                    class="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-center links">
                Đã có tài khoản?
                <NavLink to="/login">
                  <div className="singup-color"> Đăng nhập</div>
                </NavLink>
              </div>
              <div class="d-flex justify-content-center">
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
