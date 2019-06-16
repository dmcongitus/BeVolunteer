import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "./postCheckin/postCheckin";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getEventJoined } from "../../../services/event.service";
import { reportPost } from "../../../services/post.service";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  CheckinUserByCode,
  getCheckinByDateUser,
  getAllCheckinUser
} from "../../../services/event.service";
import format from "date-fns/format";
class CheckinPage extends Component {
  state = {
    data: [],
    listChecked: []
  };

  componentDidMount = () => {
    getEventJoined(this.props.username)
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(e => console.log(e));
  };

  successReport = (reporter, object, objectModel, content) => {
    const data = {
      reporter: reporter,
      object: object,
      objectModel: objectModel,
      content: content
    };
    reportPost(data);
  };
  successCheckin = async (eventId, date, code) => {
    const DateFomart = await format(new Date(date), "YYYY-MM-DD").toString();
    const checkList = await getCheckinByDateUser(
      eventId,
      DateFomart,
      this.props.username
    );
    if (checkList.length !== 0) {
      CheckinUserByCode(eventId, checkList.data[0]._id, code);
    }
  };
  getStatusCheckinToday = async eventId => {
    const DateFomart = await format(new Date(), "YYYY-MM-DD").toString();
    const checkList = await getCheckinByDateUser(
      eventId,
      DateFomart,
      this.props.username
    );
    if (checkList.length !== 0) {
      return checkList.data[0].isPresent;
    }
    return false;
  };
  render() {
    return (
      <PageLayout title="Điểm danh">
        {this.state.data.map(post => (
          <Post
            key={post.id}
            {...post}
            successReport={this.successReport}
            successCheckin={this.successCheckin}
            getStatusCheckinToday={this.getStatusCheckinToday}
          />
        ))}
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, username, _id }
  }
}) => ({ name, permission, username, _id });

export default withRouter(connect(mapStateToProps)(CheckinPage));
