import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< .merge_file_a10068
=======
import { Button } from 'reactstrap';
import * as authActions from './actions/auth.action';
>>>>>>> .merge_file_a00924

import Router from './router';

import './App.css';

class App extends Component {
<<<<<<< .merge_file_a10068
    render() {
=======
    componentDidMount = () => {
        this.props.getUser();
    }

    render() {
        if (this.props.isLoading) {
            return ( <div>Loading</div>);
        }

>>>>>>> .merge_file_a00924
        return (
            <Router isAuthenticated={this.props.isAuthenticated} permission={this.props.user && this.props.user.permission} username={this.props.user && this.props.user.username} />
        );
    }
}

<<<<<<< .merge_file_a10068
const mapStateToProps = ({ auth: { isAuthenticated, user }}) => ({ isAuthenticated, user });

export default connect(mapStateToProps)(App);
=======
const mapStateToProps = ({ auth: { isAuthenticated, user }, ui: {isLoading}}) => ({ isAuthenticated, user, isLoading });

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(authActions.getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
>>>>>>> .merge_file_a00924
