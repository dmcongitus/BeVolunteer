import React, { Component } from 'react';
import {Row} from 'reactstrap';

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
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className="ml-2 border-Comment">
                <b>{this.props.name}</b> {this.props.content}
              </div>
            </div>
          </Row>
        );
    }
}
