import React, { Component } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";

import {
  getUsersVerify,
  verifyUser,
  unVerifyUser
} from "../../../services/user.service";
import InfoUser from "./InfoUser";
import "./ApprovePage.css";
import { withLocalize, Translate } from "react-localize-redux";
import approvePageTranslations from './translation.json';
import { withRouter } from "react-router";

class appovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        accounts: [],
        modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.props.addTranslation(approvePageTranslations);
    }

    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    componentDidMount = async () => {
        try {
        const data = await getUsersVerify();
        this.setState({ accounts: data.data });
        } catch (e) {
        console.log(e);
        }
    };

    // componentDidMount = () => {
    //   getAllUsers().then(data =>
    //     this.setState({ accounts: data.data  })
    //   );

    // };

    onAccountVerify = username => {
        this.setState(prevState => ({
        accounts: prevState.accounts.filter(
            account => account.username !== username
        )
        }));
        verifyUser(username);

    };
    onAccountUnVerify = username => {
        this.setState(prevState => ({
        accounts: prevState.accounts.filter(
            account => account.username !== username
        )
        }));
        unVerifyUser(username);

    };

    handleRowOnClick = account => {
        this.setState({ activeAccount: account });
    };

    render() {
        let number = 0;
        const t = <Translate id="approvePage.title">Xác thực tài khoản</Translate>

        return (
            <PageLayout title={t}>
                <div className="mr-2 ml-2">
                <Table>
                    <thead>
                    <tr>
                        <th><Translate id="approvePage.stt">STT</Translate></th>
                        <th>
                        <div className="item-mid"><Translate id="approvePage.username">Tên người dùng</Translate></div>
                        </th>
                        <th>
                        <div className="item-mid"><Translate id="approvePage.fullname">Họ và tên</Translate></div>
                        </th>
                        <th>
                        {" "}
                        <div className="item-mid"><Translate id="approvePage.status">Tình trạng</Translate></div>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.accounts.map(account => (
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
                                onClick={() => {
                                this.toggle();
                                this.handleRowOnClick(account);
                                }}
                            >
                                <i className="fas fa-eye icon-button" />
                                <Translate id="approvePage.view">Xem</Translate>
                            </Button>
                            </div>
                        </td>
                        <td>
                            <div className="item-mid">
                            <Button
                                className="ml-2 success"
                                onClick={() => this.onAccountVerify(account.username)}
                            >
                                <i className="fas fa-check-circle icon-button" />
                                <Translate id="approvePage.approve">Đồng ý</Translate>
                            </Button>
                            <Button
                                className="ml-2 new-btn"
                                onClick={() => this.onAccountUnVerify(account.username)}
                            >
                                <i className="fas fa-times-circle icon-button" />
                                <Translate id="approvePage.cancel">Hủy</Translate>
                            </Button>
                            </div>{" "}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="modal-approve"
                >
                    <ModalHeader className="my-ModalHeader" toggle={this.toggle}>
                    <i className="fas fa-user-check" />
                    <Translate id="approvePage.verifyuser">Xác thực người dùng</Translate>
                    </ModalHeader>
                    <ModalBody style={{ background: "#E6E6E6" }}>
                    {/* Thong tin user */}

                    <InfoUser
                        {...this.state.activeAccount}
                        isOpen={this.state.modal}
                    />
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        color="success"
                        className="ml-2"
                        onClick={() => {
                        this.onAccountVerify(this.state.activeAccount.username)}
                        }
                    >
                        <i className="fas fa-check-circle icon-button" />
                        <Translate id="approvePage.approve">Đồng ý</Translate>
                    </Button>
                    <Button
                        color="danger"
                        className="ml-2 "
                        onClick={() =>
                        this.onAccountUnVerify(this.state.activeAccount.username)
                        }
                    >
                        <i className="fas fa-times-circle icon-button" />
                        <Translate id="approvePage.cancel">Hủy</Translate>
                    </Button>
                    </ModalFooter>
                </Modal>
                </div>
            </PageLayout>
        );
    }
}

// export default appovePage;

export default withRouter(withLocalize(appovePage));
