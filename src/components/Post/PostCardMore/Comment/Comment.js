import React, { Component } from "react";
import { Row } from "reactstrap";

export default class Comment extends Component {
  render() {
    return (
      <Row className="header-postCard pb-3 ml-3">
        <div className="item-center">
          <div>
            <img
              className="img-user-postCard rounded-circle"
              src={"/resources/" + this.props.avatar}
              alt="UserAvatar"
              style={{ width: "2rem", height: "2rem" }}
            />
          </div>
          <div className="ml-2 border-Comment">
            <b className={this.props.permission}>{this.props.name}</b>

            {this.props.isVerified === true && (
              <i className="ml-1 small fas fa-check-circle check-user" />
            )}
            {this.props.content}
          </div>
        </div>
      </Row>
    );
  }
}
