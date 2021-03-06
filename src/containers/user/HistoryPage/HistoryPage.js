import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./HistoryPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getUserPosts } from "../../../services/post.service";
import { getHistory } from "../../../services/history.service";
import HistoryCard from "../../../components/user/HistoryCard/HistoryCard";
class History extends Component {
  constructor(props) {
    super(props);
    this.state = { data: undefined };
  }

  componentDidMount = async () => {
    let data = await getHistory(this.props.username);

    this.setState({ data: data.data });
  };

  render() {
    return (
      <PageLayout title="Lịch sử họat động">
        {this.state.data !== undefined &&
          this.state.data.map((dt, index) => (
            <HistoryCard key={index} {...dt} />
          ))}
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { username }
  }
}) => ({ username });

export default connect(mapStateToProps)(History);
