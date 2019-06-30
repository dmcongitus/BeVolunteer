import React, { Component } from "react";
import NewEvent from "../../../../components/EventPage/NewEvent/NewEvent";
import "./CreateEvent.css";
import PageLayout from "../../../../layouts/PageLayout/PageLayout";
import { withLocalize, Translate } from "react-localize-redux";
import createEventTranslations from './translation.json';
import { withRouter } from "react-router";

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(createEventTranslations);
    }

    render() {
        const t = <Translate id="createEvent.title">Tạo sự kiện</Translate>

        return (
            <PageLayout title={t}>
                <NewEvent />
            </PageLayout>
        );
    }
}

// export default CreateEvent;

export default withRouter(withLocalize(CreateEvent));

