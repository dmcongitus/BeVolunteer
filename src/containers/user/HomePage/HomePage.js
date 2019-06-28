import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/Post/PostCard/PostCard";
import NewPost from "../../../components/Post/NewPost/NewPost";
import "./HomePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getNewfeed } from "../../../services/newfeed";
import { reportPost } from "../../../services/post.service";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actionTypes from '../../../constants/actionTypes';

import Socket from '../../../socket';

import { joinEvent, unjoinEvent } from "../../../services/event.service";

class HomePage extends Component {
  state = {
    data: [],
    update: false,
    page: 1
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  componentDidUpdate = (_, prevState) => {
    if (prevState.data.length !== this.state.data.length) {
      document.addEventListener("scroll", this.trackScrolling);
    }
  };
  componentDidMount = () => {
    getNewfeed(1)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));

    const socket = Socket.getInstance();
    socket.on(this.props._id,  (data) => {
      console.log("here")
      console.log(data);
      this.props.appendNotification(data);
    });
  };
  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
  };
  trackScrolling = async () => {
    const wrappedElement = document.getElementById("header");
    if (this.isBottom(wrappedElement)) {
      this.setState({ page: this.state.page + 1 });
      getNewfeed(this.state.page)
        .then(async data => {
          if (data.data.length !== 0) {
            let newData = await this.state.data.concat(data.data);
            console.log(newData);
            this.setState({ data: newData });
          }
        })
        .catch(e => console.log(e));
      console.log("header bottom reached");
      document.removeEventListener("scroll", this.trackScrolling);
    }
  };

  onPostTypeChanged = async postType => {
    const data = await getNewfeed(postType);

    if (postType !== "ALL") {
      this.setState({
        data: data.data.filter(d => d.type === postType)
      });
    } else {
      this.setState({ data: data.data });
    }
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
  joinToEvent = async id => {
    await joinEvent(id);
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };
  unjoinEvent = async id => {
    await unjoinEvent(id);
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <PageLayout
        title="bài đăng"
        hasMoreButton
        onPostTypeChanged={this.onPostTypeChanged}
      >
        <div id="header">
          {this.props.permission === "USER" && (
            <NewPost style={{ zIndex: 50, position: "relative" }} />
          )}

          {this.state.data.map(post => (
            <div className="hoverPostCard" key={post._id}>
              <Post
                key={post.id}
                {...post}
                successReport={this.successReport}
                joinToEvent={this.joinToEvent}
                unjoinEvent={this.unjoinEvent}
              />
            </div>
          ))}
        </div>
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp, _id }
  }
}) => ({ name, permission, exp, _id });

const mapDispatchToProps = (dispatch) => ({
  appendNotification: (notif) => dispatch({ type: actionTypes.APPEND_NOTIF, payload: notif })
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomePage));
