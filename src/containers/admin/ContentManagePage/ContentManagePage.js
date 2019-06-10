import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/admin/HistoryCard/HistoryCard";
import "./ContentManagePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getReportPost } from "../../../services/post.service";
class ContentManagePage extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    getReportPost()
    .then(data => {
      this.setState(data);
      console.log(this.state.data)
    })
      .catch(e => console.log(e));
     
  };


  render() {
    return (
      <PageLayout title="Quản lý bài viết">
        <div>
         
          {this.state.data.map(data => (
            <HistoryCard post={data.object} />
          ))}
        </div>
      </PageLayout>
    );
  }
}

export default ContentManagePage;
