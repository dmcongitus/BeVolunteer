import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ModalConductor from '../../modals/ModalConductor';
import Snackbar from '../../components/Snackbar/Snackbar';
import LeftSide from '../../components/LeftSide/LeftSide';
import Post from '../../components/Post/Post';
import RightSide from '../../components/RightSide/RightSide';
import Info from '../../components/Info/Info';
import logo from '../../images/volunteer.png'
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