import React from "react";
import { NavLink, Link } from "react-router-dom";
import moment from 'moment';

import profileIcon from '../../../../images/profile.png';
import classnames from 'classnames';

import {
    Modal,
    Table,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Alert,
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Dropdown,
    DropdownMenu,
    DropdownToggle, 
    Input,
    NavItem,
    Nav,
    TabContent,
    TabPane,
    Card,
    CardTitle,
    CardText,
    InputGroup
    } from "reactstrap";

import "./EventDetailCard.css";
import { cpus } from "os";

class EventDetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            activeIndex: 0,
            items: props.filenames.map(filename  => `/resources/${filename}`),
            dropdownOpen: false,
            paymentOpen: false,
            activeTab: "1"
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleMenuEvent = this.toggleMenuEvent.bind(this);
        this.togglePayment = this.togglePayment.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    toggleMenuEvent() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    togglePayment() {
        this.setState({
        paymentOpen: !this.state.paymentOpen
        });
    }

    clearArray() {
        this.setState = {
            items : []
        }    
    }
    
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex =
        this.state.activeIndex === this.state.items.length - 1
            ? 0
            : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex =
        this.state.activeIndex === 0
            ? this.state.items.length - 1
            : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    changeTab(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    render() {
        console.log(this.state);
        console.log("-------------");
        console.log(this.props);

        const { activeIndex } = this.state;

        const slides = this.state.items.map(item => {
            return (
                <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item}
                >
                <img src={item} className="img-slide-style" />
                </CarouselItem>
            );
        });

        var tabActive = {
            background: "#7d767673", 
     
        }

        var tabNonActive = {
        }

        return (
            <div className="side-body">
            	<Row>
                    <Alert className="event-detail-header" style={{width: '100%', height: '55px'}} color="success">
                        <Row>
                            <Col>
                                <img alt="profile_icon" src={profileIcon} /> {this.props.title}
                            </Col>

                        </Row>
                    </Alert>
				</Row>

                <div className="detailCard">
                    <Nav tabs className="tab-event-detail">
                        <NavItem
                            style={ this.state.activeTab === '1' ? tabActive : tabNonActive }
                            className="tab-event-description">
                            <NavLink
                                to="#"
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.changeTab('1'); }}>
                                Chi tiết
                            </NavLink>
                        </NavItem>

                        <NavItem 
                            style={ this.state.activeTab === '2' ? tabActive : tabNonActive }
                            className="tab-event-list">
                            <NavLink
                                to="#"
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.changeTab('2'); }}>
                                Danh sách tham gia
                            </NavLink>
                        </NavItem>

                        <NavItem 
                            style={ this.state.activeTab === '3' ? tabActive : tabNonActive }
                            className="tab-event-monitoring">
                            <NavLink
                                to="#"
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.changeTab('3'); }}>
                                Điểm danh
                            </NavLink>
                        </NavItem>
                    </Nav>
                    
                    <TabContent style={{marginLeft: "25px"}} activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            
                            <Row className="hr-border-bottom" style={{width: "91%"}}>

                                <Col className="header-col headerDetail" xs="11">
                                    <Row className="item-center header-postCard pb-3">
                                        <Col xs="1">
                                            <div>
                                                <img
                                                className="img-user-postCard rounded-circle"
                                                src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                                                alt="UserAvatar"
                                                />
                                            </div>
                                        </Col>
                                        
                                        <Col xs="auto" style={{marginLeft: "20px"}}>
                                            <div>
                                                {this.props.name} 
                                                                                        
                                                <span className="ml-1 small">đã chia sẻ một sự kiện</span>
                                                <span className="ml-1">

                                                </span>
                                                <div className="small">
                                                    <i className="fa fa-calendar" data-original-title title />
                                                    {
                                                        new Date(this.props.createdAt).toLocaleDateString()
                                                    }
                                                    <i className="fas fa-map-marker-alt ml-3" />
                                                    {
                                                        this.props.address
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                            <Row className="ml-50 pt-2">
                                <p>
                                    {"Mô tả sự kiện: "}
                                </p> 
                                <p className="ml-1">
                                    {this.props.description}
                                </p>
                            </Row>

                            <Row>
                            <Col className="event-detail-img" xs="6">
                                    <div>
                                        {
                                        this.state.items.length < 1 ? 
                                            (
                                                <div
                                                    className="EventEdit-img__placeholder">
                                                    <span>+</span>
                                                </div>
                                            ) : 
                                            (
                                                this.state.items.length < 2 ? 
                                                (
                                                    <img
                                                        className="event-detail-image" 
                                                        style={{cursor: "pointer"}} 
                                                        src={`${this.state.items}`}
                                                        alt="load"/>
                                                ) : 
                                                (
                                                    // <div 
                                                    //     className="event-detail-image"
                                                    //     style={{cursor: "pointer"}} 
                                                    //     onClick={() => this.inputImage.current.click()}>
                                                    //     <img 
                                                    //         src={`${this.state.items[0]}`}
                                                    //         alt="load"   
                                                            
                                                    //     />
                                                    //     <div>
                                                    //         +{this.state.items.length - 1}
                                                    //     </div>
                                                    // </div>

                                                    <div className="event-detail-image">
                                                        <img
                                                        style={{ cursor: "pointer" }}
                                                        src={`/resources/${this.props.filenames[0]}`}
                                                        />
                                                        <div>+{this.state.items.length - 1}</div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                </Col>
                            
                            </Row>

                            <div style={{ width: "91%", marginLeft: "15px" }}>
                                <Row>
                                    <div className="item-right pb-2 mg-2 hr-border-bottom">
                                        <Link to={`/eventEdit/${this.props._id}`}>
                                            <Button className="mr-1 add-btn">
                                                Tham gia
                                            </Button>
                                        </Link>
                                    </div>            
                                </Row>
                                    
                                <Row>            
                                    <Col>
                                        <Row className="pb-2 ml-3">
                                            <div className="item-center">
                                            <div>
                                                <img
                                                className="img-user-postCard rounded-circle"
                                                src="https://vignette.wikia.nocookie.net/leagueoflegends/images/a/a0/Xin_Zhao_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203730"
                                                alt="UserAvatar"
                                                style={{ width: "30px", height: "30px" }}
                                                />
                                            </div>
                                            <div className="ml-2 my-Comment ">
                                                <div className="item-row item-center d-flex">
                                                <b className="tcl-1">Minh Công</b>
                                                <div className="flex-grow-1 ml-3">
                                                    <Input
                                                    type="text"
                                                    id="exampleEmail"
                                                    placeholder="Bình luận"
                                                    />
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </Row>
                                        <Row className="pb-2 ml-3">
                                            <div className="item-center">
                                            <div>
                                                <img
                                                className="img-user-postCard rounded-circle"
                                                src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                                                alt="UserAvatar"
                                                style={{ width: "30px", height: "30px" }}
                                                />
                                            </div>
                                            <div className="ml-2 border-Comment">
                                                <b>DH Sài Gòn {this.props.name}</b> Text messaging, or texting,
                                                is the act of composing and sending electronic messages,
                                            </div>
                                            </div>
                                        </Row>

                                    
                                        <Row className="header-postCard pb-3 ml-3">
                                            <div className="item-center">
                                            <div>
                                                <img
                                                className="img-user-postCard rounded-circle"
                                                src="https://lolstatic-a.akamaihd.net/site/mount-targon/079694fdf251b5e7de788d9ab439d401d31ae160/img/champions/pantheon/pantheon-hero-mobile.jpg"
                                                alt="UserAvatar"
                                                style={{ width: "30px", height: "30px" }}
                                                />
                                            </div>
                                            <div className="ml-2 border-Comment">
                                                <b>Yasuo {this.props.name}</b> is the act of composing and
                                                sending electronic
                                            </div>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                                {/*/ cardbox-like */}
                            </div>
                            {/*/ col-lg-6 */}
                        </TabPane>

                        <TabPane className="tabList" tabId="2">
                            <div>
                                <div className="mr-2 ml-2">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{width: "50px"}}>STT</th>

                                                <th>
                                                <div className="item-mid">Tên người dùng</div>
                                                </th>

                                                <th>
                                                <div className="item-mid">Họ và tên</div>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-row">
                                                <th scope="row" style={{width: "50px"}}>1</th>

                                                <th>
                                                <div className="item-mid">tommyteo</div>
                                                </th>

                                                <th>
                                                <div className="item-mid">Nguyễn Văn A</div>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </TabPane>

                        <TabPane className="tabMonitoring" tabId="3">
                            <div>
                                <div className="mr-2 mb-2">
                                    <Row>
                                        <InputGroup>
                                            <Col className="timeMonitor" xs="3">
                                                <span>Thời gian:</span>
                                            </Col>

                                            <Col xs="5">
                                                <Input
                                                    className="monitorDate" 												
                                                    id="monitorDate"
                                                    type="date"
                                                    placeholder="Click to select date"
                                                    name="monitorDate"
                                                    // min={moment(this.state.infor['starttime']).format('YYYY-MM-DD')}
                                                    max='2019-06-10'
                                                    onChange={this.onFieldChanged}/>                                        
                                            </Col>
                                        </InputGroup>                                            
                                    </Row>

                                    <Row>
                                        <Col className="codeMonitorButton" xs="3">
                                        <Button
                                        disabled
                                        className="success"
                                        // onClick={() => this.onAccountVerify(account.username)}
                                        >
                                        Điểm danh
                                        </Button>
                                        </Col>

                                        <Col xs="5">
                                        <Input
                                            name="code"
                                            className="codeMonitor"
                                            type="text"
                                            id="codeMonitor"
                                            placeholder="Nhập code điểm danh"
                                        />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </TabPane>

                    </TabContent>
                </div>
            </div>
        );
    }
}

export default EventDetailCard;

