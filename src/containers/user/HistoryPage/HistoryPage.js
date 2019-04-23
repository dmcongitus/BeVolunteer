import React, { Component } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../../../components/user/HistoryCard/HistoryCard";
import "./HistoryPage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";

class History extends Component {
  render() {
    return (
      <PageLayout title="Lịch sử họat động">
        <HistoryCard />
      </PageLayout>
    );
  }
}

export default History;
