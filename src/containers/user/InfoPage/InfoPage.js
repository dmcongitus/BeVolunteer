import React, { Component } from 'react';
import Info from '../../../components/user/Info/Info';
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { withLocalize, Translate } from "react-localize-redux";
import infoPageTranslations from './translation.json';
import { withRouter } from "react-router";

class InfoPage extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(infoPageTranslations);
    
    }

    render() {
        const title = <Translate id="infoPage.title">Thông tin cá nhân</Translate>;
        return (
            <PageLayout title={title}>
                 <Info />
            </PageLayout>
           
        );
    }
}

// export default InfoPage;

export default withRouter(withLocalize(InfoPage));
;