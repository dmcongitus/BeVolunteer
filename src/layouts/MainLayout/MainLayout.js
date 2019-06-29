import React, { Component } from 'react';

import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from "react-localize-redux";

import Header from '../../components/Layout/Header/Header';
import ModalConductor from '../../modals/ModalConductor';
import Snackbar from '../../components/Layout/Snackbar/Snackbar';
import LeftSide from '../../components/Layout/LeftSide/LeftSide';
import RightSide from '../../components/Layout/RightSide/RightSideListCard/RightSide';
import AdminLeftSide from '../../components/admin/AdminLeftSide/AdminLeftSide';

import './MainLayout.css';

import { Container, Row, Col } from 'reactstrap';

class MainLayout extends Component {
    constructor(props) {
        super(props);

        this.props.initialize({
            languages: [
                { name: "English", code: "en" },
                { name: "Tiếng Việt", code: "vn" }
            ],
            options: { renderToStaticMarkup, defaultLanguage: 'vn' }
        });
    }

    render() {
        const { children, permission, username } = this.props;

        return (
            <div className="main-layout">
                
                <Header />
                <div className="main-layout-body">
                      {permission == 'USER' || permission == 'ORG' ?
                    <Row className="mr-unset ml-0">
                        <Col xs="3" className="pl-3 pr-3">
                            <LeftSide username={username} />  }
                    </Col>

                        <Col xs="6" className="px-0 pl-3 pr-3">
                            {children}
                        </Col>
                        {/* {console.log(window.innerWidth)} */}

                        <Col xs="3" className="mr-unset pl-3 pr-3">
                            {/* Do not show RightSide if permission is admin */}
                            <RightSide ></RightSide>
                        </Col>
                    </Row>
                    :
                    <Row className="px-3 mr-unset">
                        <Col xs="3 pl-3 pr-3">
                            <div className="pl-3">
                                <AdminLeftSide username={username} permission={permission} />
                            </div>


                        </Col>

                        <Col xs="9" className="pl-5 pr-5">

                            {children}


                        </Col>


                    </Row>
                }
                </div>
              
                <ModalConductor />
                <Snackbar />

            </div>
        );
    }
}

export default withLocalize(MainLayout); 