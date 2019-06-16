import React, { Component } from "react";
import { Table, Button } from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { connect } from "react-redux";
import { banUser, unbanUser } from "../../../services/user.service";
import { getAdminsManger, delelteAdmin } from "../../../services/admin.service";
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
import classnames from "classnames";

var permissionArr = [
  "Cá nhân",
  "Tổ chức",
  "AccountMod",
  "ContentMod",
  "UnitAdmin",
  "SupperAdmin"
];

class AdminManagePage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      accounts: [],
      search: ""
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  deleteAccAdmin = async username => {
    await delelteAdmin(username);
    await getAdminsManger().then(data => {
      const accounts = data.data;
      this.setState({ accounts });
    });
  };
  async componentWillUpdate() {}
  componentDidMount = async () => {
    await getAdminsManger().then(data => {
      const accounts = data.data;
      this.setState({ accounts });
    });
  };
  onChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });

    getAdminsManger(this.state.search).then(data => {
      const accounts = data.data;

      this.setState({
        accounts: accounts.filter(acc => {
          return acc.username.toString().indexOf(this.state.search) >= 0;
        })
      });
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
          {this.permission === "SUPER_ADMIN" ? (
            <NavItem className="pointer">
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Unit Admin
              </NavLink>
            </NavItem>
          ) : null}

          <NavItem className="pointer">
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Account Mod
            </NavLink>
          </NavItem>
          <NavItem className="pointer">
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Content Mod
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

                      <td>{account.permission}</td>

                      <td>
                        <div className="item-mid">
                          <Button
                            color="danger"
                            className="mr-1"
                            onClick={() =>
                              this.deleteAccAdmin(account.username)
                            }
                          >
                            <i class="far fa-trash-alt" />
                            Xóa
                          </Button>
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
                      account.permission === "UNIT_ADMIN" && (
                        <tr key={account.username} className="table-row">
                          <th scope="row">{++number}</th>
                          <td>{account.username}</td>
                          <td>{account.name}</td>

                          <td>{account.permission}</td>

                          <td>
                            <div>
                              <Button
                                color="danger"
                                className="mr-1"
                                onClick={() =>
                                  this.deleteAccAdmin(account.username)
                                }
                              >
                                <i class="far fa-trash-alt" />
                                Xóa
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
                      account.permission === "ACCOUNT_MOD" && (
                        <tr key={account.username} className="table-row">
                          <th scope="row">{++number}</th>
                          <td>{account.username}</td>
                          <td>{account.name}</td>

                          <td>{account.permission}</td>

                          <td>
                            <div>
                              <Button
                                color="danger"
                                className="mr-1"
                                onClick={() =>
                                  this.deleteAccAdmin(account.username)
                                }
                              >
                                <i class="far fa-trash-alt" />
                                Xóa
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                  )
                : null}
              {this.state.activeTab === "4"
                ? this.state.accounts.map(
                    account =>
                      account.permission === "CONTENT_MOD" && (
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
                            <div>
                              <Button
                                color="danger"
                                className="mr-1"
                                onClick={() =>
                                  this.deleteAccAdmin(account.username)
                                }
                              >
                                <i class="far fa-trash-alt" />
                                Xóa
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

export default connect(mapStateToProps)(AdminManagePage);
