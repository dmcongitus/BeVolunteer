import React, { Component } from "react";
import { Table, Button, Pagination, PaginationLink, PaginationItem } from "reactstrap";
import { Link } from 'react-router-dom';

import PageLayout from "../../../layouts/PageLayout/PageLayout";

import { getAllUsersRank } from "../../../services/user.service";

import { withLocalize, Translate } from "react-localize-redux";
import rankPageTranslations from './translation.json';
import { withRouter } from "react-router";

const countPerPage = 6;

class RankPage extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(rankPageTranslations);
    }

    state = {
        accounts: [],
        pageCount: 0,
        shouldRedirect: false,
        currentPage: 1,
        primitiveAccounts: []
    };

    componentDidMount = async () => {
        try {
        const data = await getAllUsersRank();
        const returnAccounts = [...data.data, ...data.data];
        const page = this.props.match.params["page"];

        if (page === undefined) {
            this.setState({ primitiveAccounts: returnAccounts, accounts: returnAccounts.slice(0, countPerPage), pageCount: Math.ceil(returnAccounts.length / countPerPage), currentPage: 1 });
        } else {
            const pageNum = parseInt(page);
            const maxPage = Math.ceil(returnAccounts.length / countPerPage)
            this.setState({ maxPage })
            if (pageNum > maxPage || pageNum < 1) {
            this.setState({ shouldRedirect: true });
            } else {
            this.setState({ primitiveAccounts: returnAccounts, accounts: returnAccounts.slice((pageNum - 1) * countPerPage, pageNum * countPerPage), pageCount: Math.ceil(returnAccounts.length / countPerPage), currentPage: pageNum })
            }
        }
        } catch (e) {
        console.log(e);
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params["page"] !== prevProps.match.params["page"]) {
        const page = this.props.match.params["page"];

        if (page === undefined) {
            this.setState((prevState) => ({ currentPage: 1, accounts: prevState.primitiveAccounts.slice(0, countPerPage) }));
        } else {
            const pageNum = parseInt(page);
            if (parseInt(pageNum) > this.state.maxPage || pageNum < 1) {
            this.setState({ shouldRedirect: true });
            } else {
            this.setState((prevState) => ({ currentPage: pageNum, accounts: prevState.primitiveAccounts.slice((pageNum - 1) * countPerPage, pageNum * countPerPage) }));
            }
        }
        }
    }

    getNeighborPages(currentPage, pageCount) {
        console.log(currentPage, pageCount);

        let pages = [];

        if (currentPage === 1 || currentPage === 2) {
        let i = 1;
        while (i <= 5 && i <= pageCount) {
            pages.push(i);
            i++;
        }
        } else if (currentPage === pageCount || currentPage === pageCount - 1) {
        let i = pageCount;
        while (i > pageCount - 5 && i >= 1) {
            pages.push(i);
            i--;
        }
        pages = pages.reverse();
        } else {
        pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2)
        }

        return pages;
    }

    render() {
        let number = 0;
        const { accounts, shouldRedirect, pageCount, currentPage } = this.state;

        if (shouldRedirect) {
        return null; // TODO: Return <Redirect /> to not found page
        }

        const t = <Translate id="rankPage.title">XẾP HẠNG</Translate>

        return (
            <PageLayout title={t}>
                <div>
                    <Table striped >
                        <thead>
                        <tr>
                            <th><Translate id="rankPage.stt">STT</Translate></th>
                            <th><Translate id="rankPage.username">Tên người dùng</Translate></th>
                            <th><Translate id="rankPage.fullname">Họ và tên</Translate></th>
                            <th><Translate id="rankPage.exp">Điểm</Translate></th>
                        </tr>
                        </thead>
                        <tbody className="hoverTable">
                        {this.state.accounts &&
                            this.state.accounts.map(account =>
                            account.isBanned ? null : (
                                <tr key={account.username} className="table-row">
                                <th scope="row">{++number}</th>
                                <td>{account.username}</td>
                                <td>{account.name}</td>
                                <td>{account.exp}</td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </Table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem>
                        <Link to={`/rank/1`}>
                            <PaginationLink first href="#" />
                        </Link>
                        </PaginationItem>

                        <PaginationItem>
                        <Link to={`/rank/${currentPage - 1 >= 1 ? currentPage - 1 : 1}`}>
                            <PaginationLink previous href="#" />
                        </Link>
                        </PaginationItem>

                        {this.getNeighborPages(currentPage, pageCount).map((page) => (
                        <PaginationItem active={page === currentPage}>
                            <Link to={`/rank/${page}`}><PaginationLink href="#">
                            {page}
                            </PaginationLink>
                            </Link>
                        </PaginationItem>
                        ))}

                        <PaginationItem>
                        <Link to={`/rank/${currentPage + 1 <= pageCount ? currentPage + 1 : pageCount}`}>
                            <PaginationLink next href="#" />
                        </Link>
                        </PaginationItem>

                        <PaginationItem>
                        <Link to={`/rank/${pageCount}`}>
                            <PaginationLink last href="#" />
                        </Link>
                        </PaginationItem>
                    </Pagination>
                </div>
            </PageLayout>
        );
    }
}

// export default RankPage;

export default withRouter(withLocalize(RankPage));
