import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/Post/PostCard/PostCard";
import "./EventManagePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { connect } from "react-redux";
import { o } from "../../../services/report.service";
import {  } from "../../../services/post.service";
import {  getEventCreatedBy } from "../../../services/event.service";
import { withLocalize, Translate } from "react-localize-redux";
import eventManageTranslations from './translation.json';
import { withRouter } from "react-router";

class EventManagePage extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(eventManageTranslations);
    }

    state = {
        data: []
    };

    componentDidMount = () => {
        getEventCreatedBy(this.props.myUser.username)
        .then(data => {
        
        this.setState({data : data.data.events});
        
        })
        .catch(e => console.log(e));
        
    };


    render() {
        const t = <Translate id="eventManage.title">Quản lý sự kiện</Translate>

        return (
            <PageLayout title={t}>
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

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

// export default connect(mapStateToProps)(EventManagePage);

export default withRouter(
    connect(
        mapStateToProps
    )(withLocalize(EventManagePage))
);
