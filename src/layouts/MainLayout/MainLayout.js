import React from 'react';

import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import ModalConductor from '../../modals/ModalConductor';
import Snackbar from '../../components/user/Snackbar/Snackbar';
import LeftSide from '../../components/user/LeftSide/LeftSide';
import RightSide from '../../components/user/RightSide/RightSide';


import './MainLayout.css';

import { Container, Row, Col } from 'reactstrap';

const MainLayout = (props) => (
    <div className="my-layout">
        <Header />
        <Row>
            <Col xs="3">
                <LeftSide />
            </Col>

            <Col xs="6">
                {props.children}
            </Col>

            <Col xs="3">
                <RightSide />
            </Col>
        </Row>
        <ModalConductor />
        <Snackbar />
        <Footer />
    </div>
);

export default MainLayout;