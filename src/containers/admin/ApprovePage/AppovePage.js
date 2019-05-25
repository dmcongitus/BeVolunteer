import React, { Component } from "react";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row
} from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";

import {
    getAllUsers,
    verifyUser,
    unVerifyUser
} from "../../../services/user.service";

import "./ApprovePage.css";
import imgTest from "../../../images/1.jpg";
class appovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        accounts: [],
        modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    componentDidMount = () => {
        getAllUsers().then(({ data: { accounts } }) => this.setState({ accounts }));
    };

    onAccountVerify = username => {
        this.setState(prevState => ({
        accounts: prevState.accounts.filter(
            account => account.username !== username
        )
        }));
        verifyUser(username);
        this.toggle();
    };
    onAccountUnVerify = username => {
        this.setState(prevState => ({
        accounts: prevState.accounts.filter(
            account => account.username !== username
        )
        }));
        unVerifyUser(username);
        this.toggle();
    };

    render() {
        let number = 0;

        return (
            <PageLayout title="Xác thực tài khoản">
                <div className="mr-2 ml-2">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>
                                    <div className="item-mid">Tên người dùng</div>
                                </th>
                                <th>
                                    <div className="item-mid">Họ và tên</div>
                                </th>
                                <th>
                                    {" "}
                                    <div className="item-mid">Tình trạng</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.accounts.map(account =>
                                account.isRequestVerify && account.isVerified === false ? (
                                    <tr key={account.username} className="table-row">
                                        <td scope="row">{++number}</td>

                                        <td>
                                            <div className="item-mid">{account.username}</div>
                                        </td>

                                        <td>
                                            <div className="item-mid">{account.name}</div>
                                        </td>

                                        <td>
                                            <div className="item-mid">
                                                <Button
                                                className="ml-2 donate-btn"
                                                onClick={this.toggle}
                                                >
                                                <i class="fas fa-eye icon-button" />
                                                Xem
                                                </Button>
                                                <Modal
                                                    isOpen={this.state.modal}
                                                    toggle={this.toggle}
                                                    className="modal-approve">

                                                    <ModalHeader toggle={this.toggle}>
                                                        Xác thực người dùng
                                                    </ModalHeader>

                                                    <ModalBody>
                                                        <Row>
                                                            <Col>
                                                                <img
                                                                src="http://image.sggp.org.vn/w1200/Uploaded/2019/nkdkswkqoc/original/2015/12/images597493_cmnd-6.jpg"
                                                                className="img-Model"/>
                                                            </Col>

                                                            <Col>
                                                                <Row>
                                                                    <Col xs="5">
                                                                        <div className="item-column item-mb">
                                                                        <div>
                                                                            <b className="m-3 tcl-1">Họ và tên:</b>
                                                                        </div>
                                                                        <div>
                                                                            <b className="m-3  tcl-1">Ngày sinh:</b>
                                                                        </div>
                                                                        <div>
                                                                            <b className="m-3  tcl-1">Giới tính:</b>
                                                                        </div>
                                                                        <div>
                                                                            <b className="m-3  tcl-1">
                                                                            Số điện thoại
                                                                            </b>
                                                                        </div>
                                                                        <div>
                                                                            <b className="m-3  tcl-1">
                                                                            Loại tài khoản
                                                                            </b>
                                                                        </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs="auto">
                                                                        <div className="item-column item-mb">
                                                                        <div>Công Anh Kiệt</div>
                                                                        <div>09/11/2001</div>
                                                                        <div>Nam</div>
                                                                        <div>0123456789</div>
                                                                        <div>Cá nhân</div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <Button
                                                            className="ml-2 success"
                                                            onClick={() =>
                                                                this.onAccountVerify(account.username)
                                                            }
                                                            >
                                                            <i class="fas fa-check-circle icon-button" />
                                                            Đồng ý
                                                            </Button>
                                                            <Button
                                                            className="ml-2 new-btn"
                                                            onClick={() =>
                                                                this.onAccountUnVerify(account.username)}>
                                                            <i class="fas fa-times-circle icon-button" />
                                                            Hủy
                                                        </Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="item-mid">
                                                <Button
                                                    className="ml-2 success"
                                                    onClick={() => this.onAccountVerify(account.username)}>
                                                    <i class="fas fa-check-circle icon-button" />
                                                    Đồng ý
                                                </Button>

                                                <Button
                                                    className="ml-2 new-btn"
                                                    onClick={() =>
                                                        this.onAccountUnVerifyg(account.username)}>
                                                    <i class="fas fa-times-circle icon-button" />
                                                    Hủy
                                                </Button>
                                            </div>{" "}
                                        </td>
                                    </tr>
                                ) : null
                            )}
                        </tbody>
                    </Table>
                </div>
            </PageLayout>
        );
    }
}

export default appovePage;
