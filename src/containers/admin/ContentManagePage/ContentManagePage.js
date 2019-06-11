import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/admin/HistoryCard/HistoryCard";
import "./ContentManagePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";

import { deleteReport, getReports } from "../../../services/report.service";
import { deletePost } from "../../../services/post.service";
import { deleteEvent } from "../../../services/event.service";
class ContentManagePage extends Component {
  state = {
    data: []
  };

  deleteReportfun(id){
    deleteReport(id)
    getReports()
    .then(data => {
      this.setState(data);
    })
      .catch(e => console.log(e));
  }
  deletePostReport(id, type){
    if(type === "Post"){
      deletePost(id)
    }else{
      deleteEvent(id)
    }
   
  }
  componentDidMount = () => {
    getReports()
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
            <HistoryCard {...data} deleteReport={this.deleteReportfun} deletePostReport={this.deletePostReport}/>
          ))}
        </div>
      </PageLayout>
    );
  }
}

export default ContentManagePage;
