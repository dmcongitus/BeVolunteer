import React from "react";
import { NavLink, Link } from "react-router-dom";
import Moment from 'react-moment';
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
    } from "reactstrap";

import Payment from "../../../../components/user/Payment/Payment";

import "./EventDetailCard.css";

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

        let number = 0;


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

                <Row className="detailCard">

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
                            className="tab-event-monitoring">
                            <NavLink
                                to="#"
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.changeTab('2'); }}>
                                Điểm danh
                            </NavLink>
                        </NavItem>
                    </Nav>
                    
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row className="hr-border-bottom" style={{height: "230px", width: "91%"}}>
                                <Col className="header-col event-detail-infor" xs="6">
                                    <div className="mr-2 ml-3">
                                        Dương Minh Công {this.props.name}
                                        <small>
                                        <span className="ml-1">đã tổ chức một sự kiện</span>
                                        </small>
                                        <div>
                                            <small>
                                                <span>
                                                <i className="fa fa-calendar mr-2" data-original-title title />{" "}
                                                {
                                                    new Date(this.props.createdAt).toLocaleTimeString()
                                                }
                                                </span><br/>
                                                <span>
                                                <i
                                                    className="fas fa-map-marker-alt mr-2"
                                                />
                                                {" "}
                                                {
                                                    this.props.address
                                                }
                                                </span><br/>
                                                <span>
                                                <i
                                                    className="fas fa-map-marker-alt mr-2"
                                                />
                                                {" "}
                                                {
                                                    "Sắp diễn ra"
                                                }
                                                </span>
                                            </small>
                                        </div>
                                    </div>
                                </Col>

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
                                                    <div 
                                                        className="event-detail-image"
                                                        style={{cursor: "pointer"}} 
                                                        onClick={() => this.inputImage.current.click()}>
                                                        <img 
                                                            src={`${this.state.items[0]}`}
                                                            alt="load"   
                                                            
                                                        />
                                                        <div>
                                                            +{this.state.items.length - 1}
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
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
                            <div style={{ width: "91%", marginLeft: "15px" }}>
                                <Row>
                                    <div className="item-right pb-2 mg-2 hr-border-bottom">
                                        <Link to={`/eventEdit/${this.props.id}`}>
                                            <Button className="mr-1 add-btn">
                                                Chỉnh sửa
                                            </Button>
                                        </Link>
                                        <div>
                                            <Button
                                            className="mr-1 donate-btn"
                                            onClick={this.togglePayment}
                                            >Xóa
                                            </Button>
                                        </div>
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

                        <TabPane tabId="2">
                            <Row>
                            <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>
                                                    <div className="item-mid">Tên người dùng</div>
                                                </th>
                                                <th>
                                                    <div className="item-mid">Họ và tên</div>
                                                </th>
                                                <th>
                                                    {" "}
                                                    <div className="item-mid">Tình trạng</div>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                        {/* {
                                            this.state.accounts.map(account =>
                                                account.isRequestVerify && account.isVerified === false ? (
                                                    <tr key={account.username} className="table-row">
                                                        <td scope="row">{++number}</td>

                                                        <td>
                                                            <div className="item-mid">{account.username}</div>
                                                        </td>

                                                        <td>
                                                            <div className="item-mid">{account.name}</div>
                                                        </td>

                                                        <td>
                                                            <div className="item-mid">
                                                                <Button
                                                                className="ml-2 donate-btn"
                                                                onClick={this.toggle}
                                                                >
                                                                <i class="fas fa-eye icon-button" />
                                                                Xem
                                                                </Button>
                                                                <Modal
                                                                    isOpen={this.state.modal}
                                                                    toggle={this.toggle}
                                                                    className="modal-approve">

                                                                    <ModalHeader toggle={this.toggle}>
                                                                        Xác thực người dùng
                                                                    </ModalHeader>

                                                                    <ModalBody>
                                                                        <Row>
                                                                            <Col>
                                                                                <img
                                                                                src="http://image.sggp.org.vn/w1200/Uploaded/2019/nkdkswkqoc/original/2015/12/images597493_cmnd-6.jpg"
                                                                                className="img-Model"/>
                                                                            </Col>

                                                                            <Col>
                                                                                <Row>
                                                                                    <Col xs="5">
                                                                                        <div className="item-column item-mb">
                                                                                        <div>
                                                                                            <b className="m-3 tcl-1">Họ và tên:</b>
                                                                                        </div>
                                                                                        <div>
                                                                                            <b className="m-3  tcl-1">Ngày sinh:</b>
                                                                                        </div>
                                                                                        <div>
                                                                                            <b className="m-3  tcl-1">Giới tính:</b>
                                                                                        </div>
                                                                                        <div>
                                                                                            <b className="m-3  tcl-1">
                                                                                            Số điện thoại
                                                                                            </b>
                                                                                        </div>
                                                                                        <div>
                                                                                            <b className="m-3  tcl-1">
                                                                                            Loại tài khoản
                                                                                            </b>
                                                                                        </div>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col xs="auto">
                                                                                        <div className="item-column item-mb">
                                                                                        <div>Công Anh Kiệt</div>
                                                                                        <div>09/11/2001</div>
                                                                                        <div>Nam</div>
                                                                                        <div>0123456789</div>
                                                                                        <div>Cá nhân</div>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </ModalBody>

                                                                    <ModalFooter>
                                                                        <Button
                                                                            className="ml-2 success"
                                                                            onClick={() =>
                                                                                this.onAccountVerify(account.username)
                                                                            }
                                                                            >
                                                                            <i class="fas fa-check-circle icon-button" />
                                                                            Đồng ý
                                                                            </Button>
                                                                            <Button
                                                                            className="ml-2 new-btn"
                                                                            onClick={() =>
                                                                                this.onAccountUnVerify(account.username)}>
                                                                            <i class="fas fa-times-circle icon-button" />
                                                                            Hủy
                                                                        </Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="item-mid">
                                                                <Button
                                                                    className="ml-2 success"
                                                                    onClick={() => this.onAccountVerify(account.username)}>
                                                                    <i class="fas fa-check-circle icon-button" />
                                                                    Đồng ý
                                                                </Button>

                                                                <Button
                                                                    className="ml-2 new-btn"
                                                                    onClick={() =>
                                                                        this.onAccountUnVerifyg(account.username)}>
                                                                    <i class="fas fa-times-circle icon-button" />
                                                                    Hủy
                                                                </Button>
                                                            </div>{" "}
                                                        </td>
                                                    </tr>
                                                ) : null
                                            )
                                        } */}
                                        </tbody>
                                    </Table>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Row>
            </div>
        );
    }
}

export default EventDetailCard;

