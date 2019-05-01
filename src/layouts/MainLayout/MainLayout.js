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
    <div className="main-layout">
        <Header />
        {
            permission < 2 ?

            <Row className="px-3 mr-unset">
                <Col xs="3">
                    <LeftSide username={username} />  }
                </Col>
                
                <Col xs="6" className="px-0">
                    {children}
                </Col>

                <Col xs="3" className="mr-unset">
                    {/* Do not show RightSide if permission is admin */}
                    <RightSide /> 
                </Col>
            </Row>
            :
            <Row className="px-3 mr-unset">
                <Col xs="3">
                    <div className="pl-3">
                        <AdminLeftSide username={username} permission={permission}/>
                    </div>
                </Col>
                
                <Col xs="9" className="pl-5 pr-5">
                    {children}
                </Col>
            </Row>
        }
        <ModalConductor />
        <Snackbar />
        <Footer />
    </div>
);

export default MainLayout;