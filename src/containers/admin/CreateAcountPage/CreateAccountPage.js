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
import { withLocalize, Translate } from "react-localize-redux";
import createAccountTranslations from './translation.json';
import { withRouter } from "react-router";

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
        this.props.addTranslation(createAccountTranslations);
    }

    async componentDidMount() {
    
        if(this.props.permission==="SUPER_ADMIN"){
        const data = await getAdmins();
        await this.setState({         
                unitAdmins: data.data.filter(function(admins) {
                return admins.permission === "UNIT_ADMIN";
                })
            })
        }
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
        const t = <Translate id="createAccount.title">Tạo tài khoản Admin</Translate>

        return (
            <PageLayout title={t}>
                <div className="mr-5 ml-5 pl-5 pr-5 createAdmin">
                <Form>
                    {/* Chọn loại tài khoản */}
                    <FormGroup row>
                    <Label xs="3"><Translate id="createAccount.accountType">Loại tài khoản</Translate></Label>
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
                    <Label xs="3"><Translate id="createAccount.managementUnit">Đơn vị quản lý</Translate></Label>
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
                    <Label sm={3}><Translate id="createAccount.username">Tên đăng nhập</Translate></Label>
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
                    <Label sm={3}><Translate id="createAccount.password">Mật khẩu</Translate></Label>
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
                    <Label sm={3}><Translate id="createAccount.name">Tên hiển thị</Translate></Label>
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
                    <Label sm={3}><Translate id="createAccount.email">Email</Translate></Label>
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
                    <Label sm={3}><Translate id="createAccount.phone">Số điện thoại</Translate></Label>
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
                    <Label sm={3}><Translate id="createAccount.dob">Ngày sinh</Translate></Label>
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
                    <Label xs="3"><Translate id="createAccount.gender">Giới tính</Translate></Label>
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
                        <Translate id="createAccount.create">Tạo tài khoản</Translate>
                    </Button>
                    <Button
                    color="danger"
                    className="ml-3"
                    onClick={this.onFormSubmit}
                    style={{ width: "8rem" }}
                    >
                        <Translate id="createAccount.cancel">Hủy</Translate>
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

// export default connect(mapStateToProps)(CreateAccountPage);

export default withRouter(
    connect(
        mapStateToProps
    )(withLocalize(CreateAccountPage))
);
