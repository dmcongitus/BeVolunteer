import React, { Component } from "react";
import { PopoverBody } from "reactstrap";
class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  renderNotifi = data => {
    switch (data.notificationType) {
      case "COMMENT_ON_POST":
        return (
          <div className="item-center">
            <div>
              <img
                className="img-user-postCard rounded-circle"
                src="https://lolstatic-a.akamaihd.net/site/mount-targon/079694fdf251b5e7de788d9ab439d401d31ae160/img/champions/pantheon/pantheon-hero-mobile.jpg"
                alt="UserAvatar"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
            <div className="ml-2">
              Sự kiện
              <b> Xuân tình nguyện</b>
              đã bắt đầu
            </div>
          </div>
        );
    }
  };
  render() {
    return (
      <PopoverBody className="notifi-header">
        {this.renderNotifi(this.props.notif)}
        {console.log(this.props.notif)}
      </PopoverBody>
    );
  }
}

export default Notifications;
