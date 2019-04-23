import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/admin/HistoryCard/HistoryCard";
import "./ContentManagePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";

class ContentManagePage extends Component {
  render() {
    return (
      <PageLayout title="Quản lý bài viết">
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </PageLayout>
    );
  }
}

export default ContentManagePage;
