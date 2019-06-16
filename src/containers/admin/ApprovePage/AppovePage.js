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
  getUsersVerify,
  verifyUser,
  unVerifyUser
} from "../../../services/user.service";
import InfoUser from "./InfoUser";
import "./ApprovePage.css";

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
              ))}
            </tbody>
          </Table>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="modal-approve"
          >
            <ModalHeader className="my-ModalHeader" toggle={this.toggle}>
              <i class="fas fa-user-check" />
              Xác thực người dùng
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
                onClick={() =>
                  this.onAccountVerify(this.state.activeAccount.username)
                }
              >
                <i class="fas fa-check-circle icon-button" />
                Đồng ý
              </Button>
              <Button
                color="danger"
                className="ml-2 "
                onClick={() =>
                  this.onAccountUnVerify(this.state.activeAccount.username)
                }
              >
                <i class="fas fa-times-circle icon-button" />
                Hủy
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </PageLayout>
    );
  }
}

export default appovePage;
