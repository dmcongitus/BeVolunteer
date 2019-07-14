import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import "./HistoryCard.css";
class HistoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHistory = data => {
    switch (data.historyType) {
      case "COMMENT_ON_POST":
        return (
          <Link to={`/post/${this.props.object._id}`}>
            <Row>
              <Col xs="1">
                <i class="fas fa-comments" />
              </Col>
              <Col xs="auto">Bạn đã bình luận về bài viết</Col>
            </Row>
          </Link>
        );
      case "COMMENT_ON_EVENT":
        return (
          <Link to={`/event/${this.props.object._id}`}>
            <Row>
              <Col xs="1">
                <i class="fas fa-comments" />
              </Col>
              <Col xs="8">
                <div>
                  Bạn đã bình luận về sự kiện
                  <span style={{ color: "red" }} className="ml-2">
                    {this.props.object.title}
                  </span>
                </div>
                <div>
                  <small>
                    <i className="far fa-calendar-alt mr-2" />
                    {format(this.props.createdAt, "DD-MM-YYYY")}
                  </small>
                </div>
              </Col>
              <Col xs="3">
                <small>
                  {format(this.props.createdAt, "hh:mm")}{" "}
                  <i className="fas fa-clock ml-2" />
                </small>
              </Col>
            </Row>
          </Link>
        );
      case "CREATE_NEW_POST":
      
      case "CREATE_NEW_EVENT":
        
      case "CREATE_NEW_ADMIN":
        
      case "JOIN_EVENT":
        
      case "UNJOIN_EVENT":
      
      case "ATTENDANCE_EVENT":
       
      case "CANCEL_ATTENDANCE_EVENT":
       
      case "REQUEST_VERIFY_ACCOUNT":
      case "ACCEPT_VERIFY_ACCOUNT":
      case "UNVERIFIED_ACCOUNT":
      case "IGNORE_VERIFY_ACCOUNT":
      case "DELETE_ACCOUNT":
      case "BAN_ACCOUNT":
      case "UNBAN_ACCOUNT":
      case "DONATE_EVENT":
          return (
            <Link to={`/event/${this.props.object._id}`}>
              <Row>
                <Col xs="1">
                  <i class="fas fa-comments" />
                </Col>
                <Col xs="8">
                  <div>
                    Bạn đã quyên góp cho sự kiện
                    <span style={{ color: "red" }} className="ml-2">
                      {this.props.object.title}
                    </span>
                  </div>
                  <div>
                    <small>
                      <i className="far fa-calendar-alt mr-2" />
                      {format(this.props.createdAt, "DD-MM-YYYY")}
                    </small>
                  </div>
                </Col>
                <Col xs="3">
                  <small>
                    {format(this.props.createdAt, "hh:mm")}{" "}
                    <i className="fas fa-clock ml-2" />
                  </small>
                </Col>
              </Row>
            </Link>
          );
      case "VERIFIED_DONATE":
      case "REPORT":
    }
  };
  render() {
    return (
      <div className="history-Card">
        {/* {console.log(this.props)} */}
        {this.renderHistory(this.props)}
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { thisUser }
  }
}) => ({ thisUser });

export default withRouter(connect(mapStateToProps)(HistoryCard));
