import React from "react";
import {
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export default class EventSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="p-3">
       
        <span className="mr-2">
        Sự kiện
        </span>
        <span className="mr-2">
        {this.props.status === "UPCOMING" ? "chưa bắt đầu" : null}
        {this.props.status === "ONGOING" ? "Đang diễn ra" : null}
        </span>
       
        {this.props.status === "UPCOMING" ? (
          <Button
            color="success"
            onClick={() => this.props.startEvent(this.props._id)}
          >
            Bắt đầu ngay
          </Button>
        ) : null}
        {this.props.status === "ONGOING" ? (
          <Button
            color="danger"
            onClick={() => this.props.startEvent(this.props._id)}
          >
            Dừng{" "}
          </Button>
        ) : null}
      </div>
    );
  }
}
