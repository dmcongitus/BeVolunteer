import React from 'react';

import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import ModalConductor from '../../modals/ModalConductor';
import Snackbar from '../../components/user/Snackbar/Snackbar';
import LeftSide from '../../components/user/LeftSide/LeftSide';
import RightSide from '../../components/user/RightSide/RightSideListCard/RightSide';
import AdminLeftSide from '../../components/admin/AdminLeftSide/AdminLeftSide';


import './MainLayout.css';

import { Container, Row, Col } from 'reactstrap';

const MainLayout = ({children, permission, username}) => (
    <div class="my-layout">
        <Header />
        <Row>
            <Col xs="3">
                {permission < 2 ? <LeftSide username={username} /> : <AdminLeftSide username={username} permission={permission}/>}
            </Col>
            
            <Col xs="6" >
                {children}
            </Col>

            <Col xs="3">
                {/* Do not show RightSide if permission is admin */}
                {permission < 2 ? <RightSide /> : null}
            </Col>
        </Row>
        <ModalConductor />
        <Snackbar />
        <Footer />
    </div>
);

export default MainLayout;