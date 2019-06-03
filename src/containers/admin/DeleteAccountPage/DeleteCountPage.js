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
  Col
} from "reactstrap";
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
    getAllUsers().then(data => {
      const accounts = data.data
      this.setState({ accounts })
      });
   
  };

  onAccountBan = username => {
    this.setState(prevState => {
      const newAccounts = [...prevState.accounts];
      for (let i = 0; i < newAccounts.length; i++) {
        if (newAccounts[i].username == username) {
          newAccounts[i].isBanned = true;
        }
      }
      return {accounts: newAccounts};
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
        console.log(newAccounts[i]);
        if (newAccounts[i].username == username) {
          newAccounts[i].isBanned = false;
        }
      }
      return {accounts: newAccounts};
    });
    unbanUser(username);
    // window.location.reload();
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
        <div>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <div className="item-mid item-center"> Người dùng</div>
                </th>
                <th>
                  <div className="item-mid item-center"> Họ và tên</div>
                </th>
                <th>
                  <div className="item-mid item-center"> Loại</div>
                </th>
                <th>
                  <div className="item-mid item-center"> Tình trạng</div>
                </th>
                <th>
                  <div className="item-mid item-center"> </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Start tab Tất cả */}
              {this.state.activeTab === "1"
                ? this.state.accounts.map(account =>
                    account.permission >= this.props.permission ? null : (
                      <tr key={account.username} className="table-row">
                        <th scope="row">{++number}</th>
                        <td>{account.username}</td>
                        <td>{account.name}</td>
                        {account.permission === 'ORG' ? (
                          <td className="tcl-1">
                            <b>{permissionArr[account.permission]}</b>
                          </td>
                        ) : (
                          <td>{permissionArr[account.permission]}</td>
                        )}

                        <td>
                          {account.isVerified ? (
                            <div className="tcl-1 item-mid">Đã xác thực</div>
                          ) : account.isRequestVerify ? (
                            <div className="tcl-3 item-mid">Đang xác thực</div>
                          ) : (
                            <div className="tcl-2 item-mid">Chưa xác thực</div>
                          )}
                        </td>
                        <td>
                          <div className="item-mid">
                            {account.isBanned === false ? (
                              <Button
                                className="mr-1 new-btn"
                                onClick={() =>
                                  this.onAccountBan(account.username)
                                }
                              >
                                <i class="fas fa-lock icon-button" />
                                Khóa TK
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
                    )
                  )
                : null}
              {/* End tab Tất cả */}
              {/* Start tab Chưa Khóa*/}
              {this.state.activeTab === "2"
                ? this.state.accounts.map(account =>
                    account.permission >=
                    this.props.permission ? null : account.isBanned ? null : (
                      <tr key={account.username} className="table-row">
                        <th scope="row">{++number}</th>
                        <td>{account.username}</td>
                        <td>{account.name}</td>
                        {account.permission > 1 ? (
                          <td className="tcl-2">
                            <b>{permissionArr[account.permission]}</b>
                          </td>
                        ) : account.permission == 1 ? (
                          <td className="tcl-1">
                            <b>{permissionArr[account.permission]}</b>
                          </td>
                        ) : (
                          <td>{permissionArr[account.permission]}</td>
                        )}
                        <td>
                          {account.isVerified ? (
                            <div className="tcl-1 item-mid">Đã xác thực</div>
                          ) : account.isRequestVerify ? (
                            <div className="tcl-3 item-mid">Đang xác thực</div>
                          ) : (
                            <div className="tcl-2 item-mid">Chưa xác thực</div>
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
                              Khóa TK
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                : null}
              {/* End tab Chưa Khóa*/}
              {/* Start tab Đã Khóa*/}
              {this.state.activeTab === "3"?this.state.accounts.map(account =>
                account.permission >=
                this.props.permission ? null : !account.isBanned ? null : (
                  <tr key={account.username} className="table-row">
                    <th scope="row">{++number}</th>
                    <td>{account.username}</td>
                    <td>{account.name}</td>
                    {account.permission > 1 ? (
                      <td className="tcl-2">
                        <b>{permissionArr[account.permission]}</b>
                      </td>
                    ) : account.permission == 1 ? (
                      <td className="tcl-1">
                        <b>{permissionArr[account.permission]}</b>
                      </td>
                    ) : (
                      <td>{permissionArr[account.permission]}</td>
                    )}
                    <td>
                      {account.isVerified ? (
                        <div className="tcl-1 item-mid">Đã xác thực</div>
                      ) : account.isRequestVerify ? (
                        <div className="tcl-3 item-mid">Đang xác thực</div>
                      ) : (
                        <div className="tcl-2 item-mid">Chưa xác thực</div>
                      )}
                    </td>
                    <td>
                      <div>
                        <Button
                          className="mr-1 success"
                          onClick={() => this.onAccountUnBan(account.username)}
                        >
                          <i class="fas fa-unlock icon-button" />
                          Mở khóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              ):null}
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

export default connect(mapStateToProps)(DeleteAccountPage);
