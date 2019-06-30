import React, { Component } from "react";
import { Table, Button } from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { connect } from "react-redux";
import {
  getAllUsers,
  banUser,
  unbanUser
} from "../../../services/user.service";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardTitle,
    CardText,
    Row,
    Col,
    Input
} from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";
import deleteAccountPageTranslations from './translation.json';
import { withRouter } from "react-router";
import classnames from "classnames";

var permissionArr = [
    "Cá nhân",
    "Tổ chức",
    "AccountMod",
    "ContentMod",
    "UnitAdmin",
    "SupperAdmin"
];

class DeleteAccountPage extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
        activeTab: "1",
        accounts: [],
        search: ""
        };
        this.props.addTranslation(deleteAccountPageTranslations);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
        }
    }

    async componentWillUpdate() {}
    componentDidMount = async () => {
        await getAllUsers().then(data => {
        const accounts = data.data;
        this.setState({ accounts });
        });
    };
    onChange = async e => {
        await this.setState({ [e.target.name]: e.target.value });
        getAllUsers(this.state.search).then(data => {
        const accounts = data.data;

        this.setState({ accounts: accounts });
        });
    };
    onAccountBan = async username => {
        await this.setState(prevState => {
        const newAccounts = [...prevState.accounts];
        for (let i = 0; i < newAccounts.length; i++) {
            if (newAccounts[i].username == username) {
            newAccounts[i].isBanned = true;
            }
        }
        return { accounts: newAccounts };
        });
        banUser(username);
        //window.location.reload();// sao cho nay` lai reload v a?
    };
    onAccountUnBan = username => {
        // this.setState(prevState => ({
        //   accounts: prevState.accounts.filter(
        //     account => account.permission !== username
        //   )
        // }));
        this.setState(prevState => {
        const newAccounts = [...prevState.accounts];
        for (let i = 0; i < newAccounts.length; i++) {
            if (newAccounts[i].username == username) {
            newAccounts[i].isBanned = false;
            }
        }
        return { accounts: newAccounts };
        });
        unbanUser(username);
        // window.location.reload();
    };
    render() {
        let number = 0;
        const t = <Translate id="deleteAccountPage.title">Quản lý tài khoản</Translate>

        return (
            <PageLayout title={t}>
                <Nav tabs>
                <NavItem className="pointer">
                    <NavLink
                    className={classnames({ active: this.state.activeTab === "1" })}
                    onClick={() => {
                        this.toggle("1");
                    }}
                    >
                        <Translate id="deleteAccountPage.all">Tất cả</Translate>
                    </NavLink>
                </NavItem>
                <NavItem className="pointer">
                    <NavLink
                    className={classnames({ active: this.state.activeTab === "2" })}
                    onClick={() => {
                        this.toggle("2");
                    }}
                    >
                        <Translate id="deleteAccountPage.unlock">Chưa khóa</Translate>
                    </NavLink>
                </NavItem>
                <NavItem className="pointer">
                    <NavLink
                    className={classnames({ active: this.state.activeTab === "3" })}
                    onClick={() => {
                        this.toggle("3");
                    }}
                    >
                        <Translate id="deleteAccountPage.locked">Đã khóa</Translate>
                    </NavLink>
                </NavItem>
                <NavItem width="100%">
                    <Input
                    name="search"
                    placeholder="Tìm kiếm"
                    onChange={this.onChange}
                    />
                </NavItem>
                </Nav>
                <div>
                <Table striped style={{ textAlign: "center" }}>
                    <thead>
                    <tr>
                        <th><Translate id="deleteAccountPage.stt">STT</Translate></th>
                        <th>
                        <div className="item-mid item-center"> <Translate id="deleteAccountPage.username">Người dùng</Translate></div>
                        </th>
                        <th>
                        <div className="item-mid item-center"> <Translate id="deleteAccountPage.fullname">Họ và tên</Translate></div>
                        </th>
                        <th>
                        <div className="item-mid item-center"> <Translate id="deleteAccountPage.type">Loại</Translate></div>
                        </th>
                        <th>
                        <div className="item-mid item-center"> <Translate id="deleteAccountPage.status">Tình trạng</Translate></div>
                        </th>
                        <th>
                        <div className="item-mid item-center"> </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="hoverTable">
                    {/* Start tab Tất cả */}
                    {this.state.activeTab === "1"
                        ? this.state.accounts.map(account => (
                            <tr key={account.username} className="table-row">
                            <th scope="row">{++number}</th>
                            <td>{account.username}</td>
                            <td>{account.name}</td>

                            {account.permission === "ORG" ? (
                                <td className="tcl-2">
                                <b>{account.permission}</b>
                                </td>
                            ) : (
                                <td>{account.permission}</td>
                            )}

                            <td>
                                {account.isVerified ? (
                                <div className="tcl-1 item-mid"><Translate id="deleteAccountPage.verified">Đã xác thực</Translate></div>
                                ) : account.isRequestVerify ? (
                                <div className="tcl-3 item-mid"><Translate id="deleteAccountPage.pendingVerify">Đang xác thực</Translate></div>
                                ) : (
                                <div className="tcl-2 item-mid"><Translate id="deleteAccountPage.unverified">Chưa xác thực</Translate></div>
                                )}
                            </td>
                            <td>
                                <div className="item-mid">
                                {account.isBanned === false ||
                                account.isBanned === undefined ? (
                                    <Button
                                    color="danger"
                                    className="mr-1"
                                    onClick={() =>
                                        this.onAccountBan(account.username)
                                    }
                                    style={{ width: "7rem" }}
                                    >
                                    <i className="fas fa-lock" />
                                    <Translate id="deleteAccountPage.lock">Khóa</Translate>
                                    </Button>
                                ) : (
                                    <Button
                                    className="mr-1 success"
                                    style={{ width: "7rem" }}
                                    onClick={() =>
                                        this.onAccountUnBan(account.username)
                                    }
                                    >
                                    <i className="fas fa-unlock" />
                                        <Translate id="deleteAccountPage.open">Mở</Translate>
                                    </Button>
                                )}
                                </div>
                            </td>
                            </tr>
                        ))
                        : null}
                    {/* End tab Tất cả */}
                    {/* Start tab Chưa Khóa*/}
                    {this.state.activeTab === "2"
                        ? this.state.accounts.map(
                            account =>
                            !account.isBanned && (
                                <tr key={account.username} className="table-row">
                                <th scope="row">{++number}</th>
                                <td>{account.username}</td>
                                <td>{account.name}</td>
                                {account.permission === "ORG" ? (
                                    <td className="tcl-2">
                                    <b>{account.permission}</b>
                                    </td>
                                ) : (
                                    <td>{account.permission}</td>
                                )}
                                <td>
                                    {account.isVerified ? (
                                    <div className="tcl-1 item-mid"><Translate id="deleteAccountPage.verified">Đã xác thực</Translate></div>
                                    ) : account.isRequestVerify ? (
                                    <div className="tcl-3 item-mid">
                                        <Translate id="deleteAccountPage.pendingVerify">Đang xác thực</Translate>
                                    </div>
                                    ) : (
                                    <div className="tcl-2 item-mid">
                                        <Translate id="deleteAccountPage.unverified">Chưa xác thực</Translate>
                                    </div>
                                    )}
                                </td>
                                <td>
                                    <div>
                                    <Button
                                        className="mr-1"
                                        color="danger"
                                        onClick={() =>
                                        this.onAccountBan(account.username)
                                        }
                                    >
                                        <i className="fas fa-lock" />
                                        <Translate id="deleteAccountPage.lock">Khóa</Translate>
                                    </Button>
                                    </div>
                                </td>
                                </tr>
                            )
                        )
                        : null}
                    {/* End tab Chưa Khóa*/}
                    {/* Start tab Đã Khóa*/}
                    {this.state.activeTab === "3"
                        ? this.state.accounts.map(
                            account =>
                            (account.permission === "ORG" ||
                                account.permission === "USER") &&
                            account.isBanned && (
                                <tr key={account.username} className="table-row">
                                <th scope="row">{++number}</th>
                                <td>{account.username}</td>
                                <td>{account.name}</td>
                                {account.permission === "ORG" ? (
                                    <td className="tcl-2">
                                    <b>{account.permission}</b>
                                    </td>
                                ) : (
                                    <td>{account.permission}</td>
                                )}
                                <td>
                                    {account.isVerified ? (
                                    <div className="tcl-1 item-mid"><Translate id="deleteAccountPage.verified">Đã xác thực</Translate></div>
                                    ) : account.isRequestVerify ? (
                                    <div className="tcl-3 item-mid">
                                        <Translate id="deleteAccountPage.pendingVerify">Đang xác thực</Translate>
                                    </div>
                                    ) : (
                                    <div className="tcl-2 item-mid">
                                        <Translate id="deleteAccountPage.unverified">Chưa xác thực</Translate>
                                    </div>
                                    )}
                                </td>
                                <td>
                                    <div>
                                    <Button
                                        className="mr-1 success"
                                        onClick={() =>
                                        this.onAccountUnBan(account.username)
                                        }
                                    >
                                        <i className="fas fa-unlock" />
                                        <Translate id="deleteAccountPage.open">Mở</Translate>
                                    </Button>
                                    </div>
                                </td>
                                </tr>
                            )
                        )
                        : null}
                    {/* End tab Đã Khóa*/}
                    </tbody>
                </Table>
                </div>
            </PageLayout>
        );
    }
}

const mapStateToProps = ({
    auth: {
        user: { name, permission, exp }
    }
}) => ({ name, permission, exp });

// export default connect(mapStateToProps)(DeleteAccountPage);

export default withRouter(
    connect(
        mapStateToProps
    )(withLocalize(DeleteAccountPage))
);
