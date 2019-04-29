import React, { Component } from "react";
import { Table, Button } from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";

import { getAllUsers, banUser } from "../../../services/user.service";

class DeleteAccountPage extends Component {
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
              {this.state.accounts.map(account =>
                account.isBanned ? null : (
                  <tr key={account.username}>
                    <th scope="row">{++number}</th>
                    <td>{account.username}</td>
                    <td>{account.name}</td>
                    <td>
                      {account.isVerified ? "Đã xác thực" : "Chưa xác thực"}
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

export default DeleteAccountPage;
