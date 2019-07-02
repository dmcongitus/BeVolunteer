import React, { Component } from "react";
import { PopoverBody } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  //src={`/resources/${this.props.filenames}`}
  renderNotifi = data => {
    switch (data.notificationType) {
      case "COMMENT_ON_POST":
        return (
          <Link to={`/post/${data.object._id}`}>
            <div className="item-center">
              <div>
                <img
                  className="img-user-postCard rounded-circle"
                  src={`/resources/${data.user.avatar}`}
                  alt="UserAvatar"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className="ml-2">
                <b> {data.user.name}</b> đã bình luận về bài viết
                {data.object.user === this.props._id ? (
                  <span> của bạn</span>
                ) : null}
              </div>
            </div>
          </Link>
        );

      case "ACCEPT_VERIFY_ACCOUNT":
        return (
          <Link to={`/me`}>
            <div className="item-center">
              <div>
                <img
                  className="img-user-postCard rounded-circle"
                  src={`/resources/${data.user.avatar}`}
                  alt="UserAvatar"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className="ml-2">
                Tài khoản của bạn đã được
                <b> xác thực</b> bởi <b>{data.user.name}</b>
              </div>
            </div>
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
      case "START_EVENT":
        return (
          <Link to={`/eventMore/${data.object._id}`}>
            <div className="item-center">
              <div>
                <img
                  className="img-user-postCard rounded-circle"
                  src={`/resources/${data.user.avatar}`}
                  alt="UserAvatar"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className="ml-2">
                Sự kiện
                <b>{data.object.title}</b> đã bắt đầu
              </div>
            </div>
          </Link>
        );
      case "END_EVENT":
      case "UNBAN_ACCOUNT":
      case "DONATE_EVENT":
      case "VERIFIED_DONATE":
      case "REPORT":
    }
  };
  render() {
    return (
      <PopoverBody className="notifi-header">
        {this.renderNotifi(this.props.notif)}
        {/* {console.log(this.props.notif)} */}
      </PopoverBody>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { _id }
  }
}) => ({ _id });

export default withRouter(
  connect(mapStateToProps)(withLocalize(Notifications))
);
