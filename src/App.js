import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as authActions from './actions/auth.action';

import Router from './router';

import './App.css';

class App extends Component {
    componentDidMount = () => {
        this.props.getUser();
    }

    render() {
        if (this.props.isLoading) {
            return "Loading...";
        }

        return (
            <Router isAuthenticated={this.props.isAuthenticated} permission={this.props.user && this.props.user.permission} username={this.props.user && this.props.user.username} />
        );
    }
}

const mapStateToProps = ({ auth: { isAuthenticated, user }, ui: {isLoading}}) => ({ isAuthenticated, user, isLoading });

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(authActions.getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
