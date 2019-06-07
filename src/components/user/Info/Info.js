import React, { Component } from "react";
import { connect } from "react-redux";

import * as authActions from "../../../actions/auth.action";
import * as userActions from "../../../actions/user.actions";

import "./Info.css";

import profileIcon from "../../../images/profile.png";
import cancelIcon from "../../../images/cancel.png";
import editIcon from "../../../images/edit.png";
import identityImage from "../../../images/identity.png";
import { userInfo } from "os";
import { Alert, Badge } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
var permissionArr = { USER: "Cá nhân", ORG: "Tổ chức" };
class MeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postContent: "",
      isLoading: false,
      isOpenModal: false,
      profileChanged: false,
      imageChange: false,
      profiles: props.user
    };

    /* WARNING: JSON.parse(JSON.stringify(...)) is intended for deep copy */
    this.initialProfiles = JSON.parse(JSON.stringify(this.state.profiles));
  }

  handleEdit = (field, e) => {
    if (field === "identityCard") {
      this[field].click();
    } else {
      this[field].focus();
    }
  };

  handleImageChange = e => {
    const profiles = { ...this.state.profiles };

    e.persist();
    profiles.identityCard = e.target.files;
    this.setState({ profiles, profileChanged: true, imageChange: true });
  };

  handleFocus = e => {
    const actualValue = e.target.value;
    e.target.value = "";
    e.target.value = actualValue;
  };

  handleChange = e => {
    const profiles = { ...this.state.profiles };
    profiles[e.target.name] = e.target.value;
    this.setState({ profiles, profileChanged: true });
  };

  handleCancel = () => {
    /* WARNING: JSON.parse(JSON.stringify(...)) is intended */
    this.setState({
      profiles: JSON.parse(JSON.stringify(this.initialProfiles)),
      profileChanged: false
    });
  };

  getDate = date => {
    let current_datetime = new Date(date);
    let formatted_date =
      current_datetime.getDate() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getFullYear();
    return formatted_date;
  };
  componentDidMount = () => {
    this.setState({ isLoading: false });
  };

  handleUpdate = () => {
    this.props.updateUserInfo(
      this.state.profiles.username,
      this.state.profiles
    );

    if (this.state.profiles["identityCard"] !== undefined) {
      this.props.verifyUser(this.state.profiles["identityCard"]);
      this.setState({ profiles: { ...this.state.profiles } });
    } else {
      this.setState({ profiles: { ...this.state.profiles } });
    }
  };

  handlePostChange = e => {
    this.setState({ postContent: e.target.value });
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <div>
        <div className="p-3 ">
          <div className="UpdateProfile">
            {this.props.user.isVerified === true && (
              <div>
                <Alert color="success">
                  Tài khoản - <b>Đã được xác thực</b>
                </Alert>
              </div>
            )}

            {
              this.props.user.isRequestVerify === false && (
                <div>
                  <Alert color="danger">
                    Tài khoản - <b>Chưa được xác thực</b>
                  </Alert>
                </div>
              )}

            {
              this.props.user.isRequestVerify === true && (
                <div>
                  <Alert color="info">
                    Tài khoản - <b>Đang chờ xác thực</b>
                  </Alert>
                </div>
              )}

            <section className="UpdateProfile__Main">
              <ul>
                <li className="UpdateProfile__Main__FieldItem">
                  <div className="UpdateProfile__Main__FieldName">Tên</div>
                  <input
                    className="UpdateProfile__Main__FieldValue"
                    name="name"
                    ref={el => (this.name = el)}
                    onFocus={this.handleFocus}
                    value={this.state.profiles["name"]}
                    onChange={this.handleChange}
                    disabled={this.props.user.isVerified === true}
                  />
                  {this.props.user.isVerified === false &&
                    this.state.profiles["isRequestVerify"] === false ? (
                      <button
                        onClick={this.handleEdit.bind(this, "name")}
                        className="UpdateProfile__Main__FieldEdit btn btn-light"
                      >
                        <img src={editIcon} alt="Edit icon" />
                      </button>
                    ) : null}
                </li>

                <li className="UpdateProfile__Main__FieldItem">
                  <div className="UpdateProfile__Main__FieldName">
                    Số điện thoại
                  </div>
                  <input
                    className="UpdateProfile__Main__FieldValue"
                    name="phone"
                    ref={el => (this.phone = el)}
                    onFocus={this.handleFocus}
                    value={this.state.profiles["phone"]}
                    onChange={this.handleChange}
                  />
                  <button
                    onClick={this.handleEdit.bind(this, "phone")}
                    className="UpdateProfile__Main__FieldEdit btn btn-light"
                  >
                    <img src={editIcon} alt="Edit icon" />
                  </button>
                </li>

                <li className="UpdateProfile__Main__FieldItem">
                  <div className="UpdateProfile__Main__FieldName">
                    Địa chỉ email
                  </div>
                  <input
                    className="UpdateProfile__Main__FieldValue"
                    name="email"
                    type="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    ref={el => (this.email = el)}
                    onFocus={this.handleFocus}
                    value={this.state.profiles["email"]}
                    onChange={this.handleChange}
                    disabled={this.props.user.isVerified === true}
                  />
                  {this.props.user.isVerified === false &&
                    this.state.profiles["isRequestVerify"] === false ? (
                      <button
                        onClick={this.handleEdit.bind(this, "email")}
                        className="UpdateProfile__Main__FieldEdit btn btn-light"
                      >
                        <img src={editIcon} alt="Edit icon" />
                      </button>
                    ) : null}
                </li>

                <li className="UpdateProfile__Main__FieldItem">
                  <div className="UpdateProfile__Main__FieldName">
                    Ngày sinh
                  </div>
                  <input
                    className="UpdateProfile__Main__FieldValue"
                    name="dob"
                    id="dob"
                    ref={el => (this.dob = el)}
                    onFocus={this.handleFocus}
                    //value = {new Date(this.state.profiles["dob"]).toLocaleDateString()}
                    value={this.getDate(this.state.profiles["dob"])}
                    onChange={this.handleChange}
                    disabled={this.props.user.isVerified === true}
                  />
                  {this.state.profiles["isVerified"] === false &&
                    this.state.profiles["isRequestVerify"] === false ? (
                      <button
                        onClick={this.handleEdit.bind(this, "dob")}
                        className="UpdateProfile__Main__FieldEdit btn btn-light"
                      >
                        <img src={editIcon} alt="Edit icon" />
                      </button>
                    ) : null}
                </li>

                {this.state.profiles["isVerified"] === true ? null : (
                  <li className="UpdateProfile__Main__FieldItem">
                    <div className="UpdateProfile__Main__FieldName">CMND</div>
                    <div className="UpdateProfile__Main__FieldValue">
                      <img
                        src={
                          (this.state.profiles["identityCard"] !== undefined &&
                            URL.createObjectURL(
                              this.state.profiles["identityCard"][0]
                            )) ||
                          identityImage
                        }
                        alt="Identity"
                      />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={el => (this.identityCard = el)}
                        onClick={e => (e.target.value = null)}
                        onChange={this.handleImageChange}
                      />
                      {this.state.profiles["isVerified"] === false &&
                        this.state.profiles["isRequestVerify"] === false && (
                          <div className="UpdateProfile__Main__FieldValue__Warning">
                            <Alert color="danger">
                              Cập nhật CMND để xác thực !!!
                            </Alert>
                          </div>
                        )}
                    </div>

                    <button
                      onClick={this.handleEdit.bind(this, "identityCard")}
                      className="btn btn-light UpdateProfile__Main__FieldEdit"
                    >
                      <img src={editIcon} alt="Edit icon" height="20px" />
                    </button>
                  </li>
                )}

                <li className="UpdateProfile__Main__FieldItem">
                  <div className="UpdateProfile__Main__FieldName">Loại TK</div>
                  <FormGroup>
                    <Input
                      type="select"
                      name="permission"

                      onChange={this.handleChange}
                      value={this.state.profiles["permission"]}
                      disabled={this.props.user.isVerified === true}
                    >
                      <option value="USER">Cá Nhân</option>
                      <option value="ORG">Tổ Chức</option>
                    </Input>
                  </FormGroup>
                </li>
              </ul>
            </section>

            {this.state.profileChanged && (
              <div className="UpdateProfile__Footer">
                <Button color="success" onClick={this.handleUpdate}>
                  <i className="fas fa-check-circle ml-1" /> Cập nhật
                </Button>
                <Button color="danger ml-3" onClick={this.handleCancel}>
                  <i className="fas fa-trash-alt ml-1" /> Hủy
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (username, userInfo) => dispatch(authActions.updateUser(username, userInfo)),
  verifyUser: identityCard => dispatch(userActions.verifyUser(identityCard))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeComponent);
