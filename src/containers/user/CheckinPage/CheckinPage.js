import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "./postCheckin/postCheckin";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getEventJoined } from "../../../services/event.service";
import { reportPost } from "../../../services/post.service";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class CheckinPage extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    getEventJoined(this.props.username)
      .then(data => {
        console.log("t")
        console.log(data)
        this.setState({ data: data.data });
      })
      .catch(e => console.log(e));
  };

  successReport(reporter, object, objectModel, content) {
    const data = {
      reporter: reporter,
      object: object,
      objectModel: objectModel,
      content: content
    };
    reportPost(data);
  }

  render() {
    return (
      <PageLayout
        title="news"
        hasMoreButton
        onPostTypeChanged={this.onPostTypeChanged}
      >
        {this.state.data.map(post => (
          <Post key={post.id} {...post} successReport={this.successReport} />
        ))}
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, username }
  }
}) => ({ name, permission, username });

export default withRouter(connect(mapStateToProps)(CheckinPage));
