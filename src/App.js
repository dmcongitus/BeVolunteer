import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import * as authActions from "./actions/auth.action";
import io from 'socket.io-client';
import { LocalizeProvider } from "react-localize-redux";

import Router from "./router";
import { Loading } from "element-react";
import "./App.css";

class App extends Component {
  componentDidMount = () => {
    this.props.getUser();
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div
          style={{
            background: "rgba(152, 251, 152, 0.44)",
            height: "100vh",
            fontSize: "4rem"
          }}
          className="item-mid item-center"
        >
          Đang tải...

        </div>
      );
    }

    return (
      <LocalizeProvider>
        <Router
          isAuthenticated={this.props.isAuthenticated}
          permission={this.props.user && this.props.user.permission}
          username={this.props.user && this.props.user.username}
        />
      </LocalizeProvider>
    );
  }
}

const mapStateToProps = ({
  auth: { isAuthenticated, user },
  ui: { isLoading }
}) => ({ isAuthenticated, user, isLoading });

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(authActions.getUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
