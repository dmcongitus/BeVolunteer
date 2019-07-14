import React, { Component } from "react";
import { connect } from "react-redux";

import * as authActions from "../../../actions/auth.action";
import * as userActions from "../../../actions/user.actions";

import "./Info.css";


import editIcon from "../../../images/edit.png";
import identityImage from "../../../images/identity.png";
import { withLocalize, Translate } from "react-localize-redux";
import infoTranslations from './translation.json';
import { withRouter } from "react-router";

import { Alert } from "reactstrap";
import { Button, FormGroup, Label, Input, FormText } from "reactstrap";
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
            profiles: props.user,
            isRequestVerify: this.props.user.isRequestVerify
        };

        /* WARNING: JSON.parse(JSON.stringify(...)) is intended for deep copy */
        this.initialProfiles = JSON.parse(JSON.stringify(this.state.profiles));
        this.props.addTranslation(infoTranslations);
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

    handleUpdate = async () => {
        
        this.props.updateUserInfo(
        this.state.profiles.username,
        this.state.profiles
        );

        if (this.state.profiles["identityCard"] !== undefined) {
        this.props.verifyUser(this.state.profiles["identityCard"]);
        
        this.setState({ profiles: {...this.state.profiles}, isRequestVerify:true });
        
        
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

        const per = <Translate id="info.personal">Cá Nhân</Translate>;
        const org = <Translate id="info.organization">Tổ chức</Translate>;

        return (
        <div>
            <div className="p-3 ">
            <div className="UpdateProfile">
                {this.props.user.isVerified === true ? (
                <div>
                    <Alert color="success">
                    <Translate id="info.account">Tài khoản - </Translate><b><Translate id="info.verified">Đã được xác thực</Translate></b>
                    </Alert>
                </div>
                ) : this.state.isRequestVerify === false ? (
                <div>
                    <Alert color="danger">
                        <Translate id="info.account">Tài khoản - </Translate><b><Translate id="info.unverified">Chưa được xác thực</Translate></b>
                    </Alert>
                </div>
                ) : (
                this.state.isRequestVerify === true && (
                    <div>
                    <Alert color="info">
                        <Translate id="info.account">Tài khoản - </Translate><b><Translate id="info.pendingVerify">Đang chờ xác thực</Translate></b>
                    </Alert>
                    </div>
                )
                )}

                <section className="UpdateProfile__Main">
                <ul>
                    <li className="UpdateProfile__Main__FieldItem">
                    <div className="UpdateProfile__Main__FieldName"><Translate id="info.name">Tên</Translate></div>
                    <input
                        className="UpdateProfile__Main__FieldValue"
                        name="name"
                        ref={el => (this.name = el)}
                        onFocus={this.handleFocus}
                        value={this.state.profiles["name"]}
                        onChange={this.handleChange}
                        disabled={this.props.user.isVerified === true}
                    />
                    {this.props.user.isVerified !== true ? (
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
                        <Translate id="info.phone">Số điện thoại</Translate>
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
                        <Translate id="info.email">Địa chỉ email</Translate>

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
                    {this.props.user.isVerified !== true ? (
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
                    <Translate id="info.dob">Ngày sinh</Translate>
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
                    {this.props.user.isVerified !== true ? (
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
                        <img src={editIcon} alt="Edit icon" height="1.25rem" />
                        </button>
                    </li>
                    )}

                    <li className="UpdateProfile__Main__FieldItem">
                    <div className="UpdateProfile__Main__FieldName"><Translate id="info.type">Loại</Translate></div>
                    <FormGroup>
                    <Translate>
              {({ translate }) => (
                        <Input
                        type="select"
                        name="permission"
                        onChange={this.handleChange}
                        value={this.state.profiles["permission"]}
                        disabled={this.props.user.isVerified === true}
                        >
             
          
                        <option value="USER">{translate("info.personal")}</option>
                        <option value="ORG">{translate("info.organization")}</option>
                        </Input>    )}
            </Translate>
                    </FormGroup>
                    </li>
                </ul>
                </section>

                {this.state.profileChanged && (
                <div className="UpdateProfile__Footer">
                    <Button color="success" onClick={this.handleUpdate}>
                    <i className="fas fa-check-circle ml-1" /> <Translate id="info.update">Cập nhật</Translate>
                    </Button>
                    <Button color="danger ml-3" onClick={this.handleCancel}>
                    <i className="fas fa-trash-alt ml-1" /> <Translate id="info.cancel">Hủy</Translate>
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
  updateUserInfo: (username, userInfo) =>
    dispatch(authActions.updateUser(username, userInfo)),
  verifyUser: identityCard => dispatch(userActions.verifyUser(identityCard))
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MeComponent);

export default withRouter(
  connect(
      mapStateToProps,
      mapDispatchToProps
  )(withLocalize(MeComponent))
);
