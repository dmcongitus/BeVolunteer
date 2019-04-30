import React, { Component } from "react";
import { Table, Button } from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";

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
  Col
} from "reactstrap";
import classnames from "classnames";
class DeleteAccountPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      accounts: []
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount = () => {
    getAllUsers().then(({ data: { accounts } }) => this.setState({ accounts }));
  };

  onAccountBan = username => {
    this.setState(prevState => ({
      accounts: prevState.accounts.filter(
        account => account.username !== username
      )
    }));
    banUser(username);
    window.location.reload();
  };
  onAccountUnBan = username => {
    this.setState(prevState => ({
      accounts: prevState.accounts.filter(
        account => account.username !== username
      )
    }));
    unbanUser(username);
    window.location.reload();
  };
  render() {
    let number = 0;

    return (
      <PageLayout title="Quản lý tài khoản">
        <Nav tabs>
          <NavItem className="pointer">
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Tất cả
            </NavLink>
          </NavItem>
          <NavItem className="pointer">
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Chưa khóa
            </NavLink>
          </NavItem>
          <NavItem className="pointer">
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Đã khóa
            </NavLink>
          </NavItem>
        </Nav>
        <div className="mr-5 ml-5">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên người dùng</th>
                <th>Họ và tên</th>
                <th>Tình trạng</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.activeTab === "1"
                ? this.state.accounts.map(account => (
                    <tr key={account.username} className="table-row">
                      <th scope="row">{++number}</th>
                      <td>{account.username}</td>
                      <td>{account.name}</td>
                      <td>
                        {account.isVerified ? (
                          <div className="tcl-1">Đã xác thực</div>
                        ) : account.isRequestVerify ? (
                          <div className="tcl-3">Đang xác thực</div>
                        ) : (
                          <div className="tcl-2">Chưa xác thực</div>
                        )}
                      </td>
                      <td>
                        <div>
                          {account.isBanned === false ? (
                            <Button
                              className="mr-1 new-btn"
                              onClick={() =>
                                this.onAccountBan(account.username)
                              }
                            >
                              <i class="fas fa-lock icon-button" />
                              Khóa
                            </Button>
                          ) : (
                            <Button
                              className="mr-1 success"
                              onClick={() =>
                                this.onAccountUnBan(account.username)
                              }
                            >
                              <i class="fas fa-unlock icon-button" />
                              Mở khóa
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                : this.state.activeTab === "2"
                ? this.state.accounts.map(account =>
                    account.isBanned ? null : (
                      <tr key={account.username} className="table-row">
                        <th scope="row">{++number}</th>
                        <td>{account.username}</td>
                        <td>{account.name}</td>
                        <td>
                          {account.isVerified ? (
                            <div className="tcl-1">Đã xác thực</div>
                          ) : account.isRequestVerify ? (
                            <div className="tcl-3">Đang xác thực</div>
                          ) : (
                            <div className="tcl-2">Chưa xác thực</div>
                          )}
                        </td>
                        <td>
                          <div>
                            <Button
                              className="mr-1 new-btn"
                              onClick={() =>
                                this.onAccountBan(account.username)
                              }
                            >
                              <i class="fas fa-lock icon-button" />
                              Khóa
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                : this.state.accounts.map(account =>
                    !account.isBanned ? null : (
                      <tr key={account.username} className="table-row">
                        <th scope="row">{++number}</th>
                        <td>{account.username}</td>
                        <td>{account.name}</td>
                        <td>
                          {account.isVerified ? (
                            <div className="tcl-1">Đã xác thực</div>
                          ) : account.isRequestVerify ? (
                            <div className="tcl-3">Đang xác thực</div>
                          ) : (
                            <div className="tcl-2">Chưa xác thực</div>
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
                              <i class="fas fa-unlock icon-button" />
                              Mở khóa
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
            </tbody>
          </Table>
        </div>
      </PageLayout>
    );
  }
}

export default DeleteAccountPage;
