import React, { Component } from "react";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import "./CreateAccountPage.css";

import { createAdmin } from "../../../services/admin.service";
import { ReactReduxContext } from 'react-redux'
class CreateAccountPage extends Component {
    state = {
        permission: 2,
        email: "",
        username: "",
        password: "",
        name: "",
        phone: "",
        dob: "",
        email: "",
        gender: "Nam",
        
      };
    
      onFieldChanged = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      onFormSubmit = async e => {
        e.preventDefault();
        try {
          const data = await createAdmin({ ...this.state });
          console.log(data);
        } catch (error) {
          console.error(error);
        }
        // this.props.loginUser(this.state.username, this.state.password);
        console.log("submitform");
      };

  render() {
    

    return (
      <PageLayout title="Tạo tài khoản admin">
        <form onSubmit={this.onFormSubmit} className="body-midForm">
         
          {/*  Tên đăng nhập */}
          <div className="input-group form-group">
            <div className="input-group-prepend-midSide">
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
            <div className="input-group-prepend-midSide">
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
            <div className="input-group-prepend-midSide">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập lại mật khẩu"
              name="repassword"
              onChange={this.onFieldChanged}
            />
          </div>
          {/*  Họ và tên */}
          <div className="input-group form-group">
            <div className="input-group-prepend-midSide">
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
            <div className="input-group-prepend-midSide">
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
            <div className="input-group-prepend-midSide">
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
            <div className="input-group-prepend-midSide">
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
            <div className="input-group-prepend-midSide ">
              <span className="input-group-text ">
                <i className="fas fa-venus-mars" />
              </span>
            </div>

            <select className="form-control" id="exampleFormControlSelect1" name="gender" onChange={this.onFieldChanged} value={this.state.gender}>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
          {/*  Loại Admin */}
          <div className="input-group form-group">
            <div className="input-group-prepend-midSide">
              <span className="input-group-text">
                <i className="fas fa-user-secret" />
              </span>
            </div>

            <select className="form-control" id="exampleFormControlSelect1" name="permission" onChange={this.onFieldChanged} value={this.state.permission}>
              <option value={2}>Content Admin</option>
              <option value={3}>Account Admin</option>
              <option value= {4}>Unit Admin</option>
            </select>
          </div>
        </form>
        <div className="fooder-crAccAdmin">
          <Button color="success" onClick={this.onFormSubmit}>
            <i className="fas fa-check-circle ml-1" /> Tạo
          </Button>
          <Button color="danger ml-10" >
            <i className="fas fa-trash-alt ml-1" /> Hủy
          </Button>
        </div>
      </PageLayout>
    );
  }
}

export default CreateAccountPage;
