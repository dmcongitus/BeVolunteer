import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/admin/Report/HistoryCard";
import "./ContentManagePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";

import { deleteReport, getReports } from "../../../services/report.service";
import { deletePost } from "../../../services/post.service";
import { deleteEvent } from "../../../services/event.service";
import { withLocalize, Translate } from "react-localize-redux";
import contentManagePageTranslations from './translation.json';
import { withRouter } from "react-router";

class ContentManagePage extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(contentManagePageTranslations);
    }

    state = {
        data: []
    };

    deleteReportfun = (id) =>{
        deleteReport(id)

        getReports()
        .then(data => {
            console.log(data);
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
        })
        .catch(e => console.log(e));
        
    };


    render() {
        const t = <Translate id="contentManagePage.title">Quản lý bài viết</Translate>

        return (
            <PageLayout title={t}>
                <div>
                    {this.state.data.map(data => (
                        <HistoryCard {...data} deleteReport={this.deleteReportfun} deletePostReport={this.deletePostReport}/>
                    ))}
                </div>
            </PageLayout>
        );
    }
}

// export default ContentManagePage;

export default withRouter(withLocalize(ContentManagePage));
