import React, { Component } from "react";
import NewEvent from "../../../../components/EventPage/NewEvent/NewEvent";
import "./CreateEvent.css";
import PageLayout from "../../../../layouts/PageLayout/PageLayout";
class CreateEvent extends Component {
  render() {
    return (
      <PageLayout title="Tạo sự kiện">
        <NewEvent />
      </PageLayout>
    );
  }
}

export default CreateEvent;
