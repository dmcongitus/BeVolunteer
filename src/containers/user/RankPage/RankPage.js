import React, { Component } from "react";
import { Table, Button } from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";

import { getAllUsersRank, banUser } from "../../../services/user.service";

class RankPage extends Component {
  state = {
    accounts: []
  };

  componentDidMount = () => {
    getAllUsersRank().then(({ data: { accounts } }) => this.setState({ accounts }));
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
                      {account.exp}
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
