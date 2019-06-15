import React, { Component } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import "./CreateAccountPage.css";
import { connect } from "react-redux";
import { createAdmin, getAdmins } from "../../../services/admin.service";

class CreateAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: "",
      email: "",
      manager: this.props._id,
      username: "",
      password: "",
      name: "",
      phone: "",
      dob: "",
      gender: "Nam",
      unitAdmins: []
    };
  }

  async componentDidMount() {
  

    const data = await getAdmins();
    await this.setState({
      
      unitAdmins: data.data.filter(function(admins) {
        return admins.permission === "UNIT_ADMIN";
      })
    })
   
   
    
   
   
  }
  onChanged = async e => {
    await this.setState({ [e.target.name]: e.target.value });
   
  };

  onFormSubmit = async e => {
    e.preventDefault();
    try {
  
      const data = await createAdmin({ ...this.state });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <PageLayout title="Tạo tài khoản admin">
        <div className="mr-5 ml-5 pl-5 pr-5 createAdmin">
          <Form>
            {/* Chọn loại tài khoản */}
            <FormGroup row>
              <Label xs="3">Loại tài khoản</Label>
              <Col xs="9">
                <Input
                  type="select"
                  name="permission"
                  onChange={this.onChanged}
                >
                   <option value="">- -</option>
                  {this.props.permission === "SUPER_ADMIN" ? (
                    <option value="UNIT_ADMIN">Unit Admin</option>
                  ) : null}

                  <option value="CONTENT_MOD">Content Mod</option>
                  <option value="ACCOUNT_MOD">Account Mod</option>
                </Input>
              </Col>
            </FormGroup>
            {/*Người quản lý */}
            <FormGroup row>
              <Label xs="3">Đơn vị quản lý</Label>
              <Col xs="9">
                <Input
                  type="select"
                  name="manager"
                  onChange={this.onChanged}
                  disabled={
                    this.state.permission === "UNIT_ADMIN" ||
                    this.props.permission !== "SUPER_ADMIN"
                  }
                >
                  {this.state.unitAdmins.map(ad => (
                    <option value={ad._id}>{ad.name}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            {/* User name */}
            <FormGroup row>
              <Label sm={3}>Tên đăng nhập</Label>
              <Col sm={9}>
                <Input
                  name="username"
                  placeholder="Tên đăng nhập"
                  onChange={this.onChanged}
                />
              </Col>
            </FormGroup>
            {/* Mật khẩu */}
            <FormGroup row>
              <Label sm={3}>Mật khẩu</Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  onChange={this.onChanged}
                />
              </Col>
            </FormGroup>
            {/* Tên */}
            <FormGroup row>
              <Label sm={3}>Tên hiển thị</Label>
              <Col sm={9}>
                <Input
                  name="name"
                  placeholder="Tên hiển thị"
                  onChange={this.onChanged}
                />
              </Col>
            </FormGroup>
            {/* email */}
            <FormGroup row>
              <Label sm={3}>Email</Label>
              <Col sm={9}>
                <Input
                  name="email"
                  placeholder="Email"
                  onChange={this.onChanged}
                />
              </Col>
            </FormGroup>
            {/* Số điện thoại */}
            <FormGroup row>
              <Label sm={3}>Số điện thoại</Label>
              <Col sm={9}>
                <Input
                  type="number"
                  name="phone"
                  placeholder="Số điện thoại"
                  onChange={this.onChanged}
                />
              </Col>
            </FormGroup>
            {/* Ngày tháng năm sinh */}
            <FormGroup row>
              <Label sm={3}>Ngày sinh</Label>
              <Col sm={9}>
                <Input
                  type="date"
                  name="dob"
                  placeholder="Ngày tháng năm sinh"
                  onChange={this.onChanged}
                />
              </Col>
            </FormGroup>
          </Form>
          {/* Gioi tinh */}
          {/*Người quản lý */}
          <FormGroup row>
            <Label xs="3">Giới tính</Label>
            <Col xs="9">
              <Input type="select" name="gender" onChange={this.onChanged}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Input>
            </Col>
          </FormGroup>
          <div className="item-right p-3">
            <Button
              color="success"
              onClick={this.onFormSubmit}
              style={{ width: "8rem" }}
            >
              Tạo tài khoản
            </Button>
            <Button
              color="danger"
              className="ml-3"
              onClick={this.onFormSubmit}
              style={{ width: "8rem" }}
            >
              Hủy
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, _id }
  }
}) => ({ name, permission, _id });

export default connect(mapStateToProps)(CreateAccountPage);
