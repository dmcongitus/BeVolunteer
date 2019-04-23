import React, { Component } from 'react';
import Info from '../../../components/user/Info/Info';
import PageLayout from "../../../layouts/PageLayout/PageLayout";

class InfoPage extends Component {
    render() {
        return (
            <PageLayout title="Thông tin cá nhân">
                 <Info />
            </PageLayout>
           
        );
    }
}

export default InfoPage;