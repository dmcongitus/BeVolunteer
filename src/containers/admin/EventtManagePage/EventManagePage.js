import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/Post/PostCard/PostCard";
import "./EventManagePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { connect } from "react-redux";
import { o } from "../../../services/report.service";
import {  } from "../../../services/post.service";
import {  getEventCreatedBy } from "../../../services/event.service";

class EventManagePage extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    getEventCreatedBy(this.props.thisUser.username)
    .then(data => {
    
      this.setState({data : data.data.events});
    
    })
      .catch(e => console.log(e));
     
  };


  render() {
    return (
      <PageLayout title="Quản lý bài viết">
        <div>
         
          {this.state.data.map(data => (
            <div className = "mr-3 ml-3"> 
<HistoryCard {...data} deleteReport={this.deleteReportfun} deletePostReport={this.deletePostReport}/>
            </div>
            
          ))}
        </div>
      </PageLayout>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ thisUser: user });

export default connect(mapStateToProps)(EventManagePage);
