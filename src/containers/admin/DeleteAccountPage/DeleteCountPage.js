import React, { Component } from 'react';
import { Table } from 'reactstrap';

import PageLayout from '../../../layouts/PageLayout/PageLayout';

import { getAllUsers, deleteUser } from '../../../services/user.service';

class DeleteAccountPage extends Component {
    state = {
        accounts: []
    }
    
    componentDidMount = () => {
        getAllUsers().then(({ data: { accounts } }) => this.setState({ accounts }));
    }

    onAccountDelete = (username) => {
        this.setState((prevState) => ({ accounts: prevState.accounts.filter((account) => account.username !== username) }));
        deleteUser(username);
    }

    render() {
        let number = 0;

        return (
            <PageLayout title="xóa tài khoản">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên người dùng</th>
                            <th>Họ và tên</th>
                            <th>Tình trạng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.accounts.map((account) => account.isDeleted ? null : (
                            <tr key={account.username}>
                                <th scope="row">{++number}</th>
                                <td>{account.username}</td>
                                <td>{account.name}</td>
                                <td>{account.verify ? "Đã xác thực" : "Chưa xác thực"}</td>
                                <td><button onClick={() => this.onAccountDelete(account.username)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </PageLayout>
        );
    }
}

export default DeleteAccountPage;