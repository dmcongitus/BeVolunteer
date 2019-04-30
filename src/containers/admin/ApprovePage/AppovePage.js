import React, { Component } from "react";
import { Table, Button } from "reactstrap";

import PageLayout from "../../../layouts/PageLayout/PageLayout";

import { getAllUsers, verifyUser, unVerifyUser } from "../../../services/user.service";

import "./ApprovePage.css";

class appovePage extends Component {
  state = {
    accounts: []
  };

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
  };
  onAccountUnVerify = username => {
    this.setState(prevState => ({
      accounts: prevState.accounts.filter(
        account => account.username !== username
      )
    }));
    unVerifyUser(username);
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
                <th />
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
                          onClick={() => this.onAccountVerify(account.username)}
                        >
                          <i class="fas fa-eye icon-button" />
                          Xem
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className="item-mid">
                        <Button
                          className="ml-2 success"
                          onClick={() => this.onAccountVerify(account.username)}
                        >
                          <i class="fas fa-check-circle icon-button" />
                          Đồng ý
                        </Button>
                        <Button
                          className="ml-2 new-btn"
                          onClick={() => this.onAccountUnVerify(account.username)}
                        >
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
