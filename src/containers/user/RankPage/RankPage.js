import React, { Component } from "react";
import { Table, Button } from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";

import { getAllUsers, banUser } from "../../../services/user.service";

class RankPage extends Component {
  state = {
    accounts: []
  };

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
  };

  render() {
    let number = 0;

    return (
      <PageLayout title="xóa tài khoản">
        <div>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên người dùng</th>
                <th>Họ và tên</th>
                <th>Exp</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.accounts.map(account =>
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
                          onClick={() => this.onAccountBan(account.username)}
                        >
                          <i class="fas fa-lock icon-button" />
                          Khóa
                        </Button>
                      </div>{" "}
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

export default RankPage;
