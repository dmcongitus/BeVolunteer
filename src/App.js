import React, { Component } from 'react';
import { connect } from 'react-redux';

import Router from './router';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router isAuthenticated={this.props.isAuthenticated} permission={this.props.user && this.props.user.permission} username={this.props.user && this.props.user.username} />
        );
    }
}

const mapStateToProps = ({ auth: { isAuthenticated, user }}) => ({ isAuthenticated, user });

export default connect(mapStateToProps)(App);
