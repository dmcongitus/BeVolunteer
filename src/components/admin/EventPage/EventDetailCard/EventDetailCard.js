import React from "react";
import { NavLink, Link } from "react-router-dom";
import Moment from 'react-moment';
import profileIcon from '../../../../images/profile.png';

import {
    Modal,
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
    DropdownToggle, Input
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
            paymentOpen: false
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleMenuEvent = this.toggleMenuEvent.bind(this);
        this.togglePayment = this.togglePayment.bind(this);
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

        return (
            <div className="side-body">
            	<Row>
                    <Alert className="event-detail-header" style={{width: '100%'}} color="success">
                        <Row>
                            <Col>
                                <img alt="profile_icon" src={profileIcon} /> {this.props.title}
                            </Col>

                        </Row>
                    </Alert>
				</Row>

                <Row className="detailCard">
                    <Col className="header-col hr-border-bottom" xs="12">
                        <Row className="item-center header-postCard pb-3">
                            <Col xs="1" className="event-detail-logo">
                                <div>
                                    <img
                                    className="img-user-postCard rounded-circle"
                                    src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                                    alt="UserAvatar"
                                    />
                                </div>
                            </Col>
                            <Col xs="6" className="event-detail-info">
                                <div className="ml-2">
                                    <span style={{fontStyle: "inherit", fontSize: "18px", color: "blue"}}>Dương Minh Công </span>
                                    {this.props.name}
                                    <span className="ml-1">đã tổ chức một sự kiện</span>
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
                                                {"Ngày "} 
                                                {
                                                    <Moment format="DD/MM/YYYY">
                                                        {this.props.starttime}
                                                    </Moment>
                                                    
                                                } {" đến "} 
                                                {
                                                    <Moment format="DD/MM/YYYY">
                                                    {this.props.endtime}
                                                    </Moment>                                            }
                                            </span><br/>

                                            <span>
                                                <i
                                                    className="fas fa-map-marker-alt mr-2"
                                                />
                                                {" "}
                                                {
                                                    "Số người tham gia: "
                                                }
                                                {
                                                    this.props.num_volunteer
                                                }
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="5" className="event-detail-img">
                                <img
                                    style={{ cursor: "pointer" }}
                                    src={`/resources/${this.props.filenames}`}
                                    className="event-edit-image"
                                    />
                            </Col>
                        </Row>
                    </Col>

                    <Row className="ml-93 pt-2">
                        <p>
                            {"Mô tả sự kiện: "}
                        </p> 
                        <p className="ml-1">
                            {this.props.description}
                        </p>
                    </Row>
                    <div style={{ width: "100%" }}>
                    <Row>
                        <Col>
                        <div onClick={this.toggle}>
                            {/* {this.clearArray()}
                            {this.props.filenames.map(filename => {
                            this.state.items.push(`/resources/${filename}`);
                            })}
                            {this.state.items.length < 2 ? (
                            <img
                                style={{ cursor: "pointer" }}
                                src={`/resources/${this.props.filenames[0]}`}
                                className="post-album-more"
                            />
                            ) : (
                            <div className="Newpost-img__more">
                                <img
                                style={{ cursor: "pointer" }}
                                src={`/resources/${this.props.filenames[0]}`}
                                className="post-album"
                                />
                                <div>+{this.state.items.length - 1}</div>
                            </div>
                            )} */}
                        </div>

                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className="slide-image-post"
                        >
                            <ModalHeader toggle={this.toggle}>Album </ModalHeader>
                            <ModalBody>
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}
                            >
                                <CarouselIndicators
                                items={this.state.items}
                                activeIndex={activeIndex}
                                onClickHandler={this.goToIndex}
                                />
                                {slides}
                                <CarouselControl
                                direction="prev"
                                directionText="Previous"
                                onClickHandler={this.previous}
                                />
                                <CarouselControl
                                direction="next"
                                directionText="Next"
                                onClickHandler={this.next}
                                />
                            </Carousel>
                            </ModalBody>
                        </Modal>    
                        {/*/ cardbox-item */}
                        </Col>
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
                </Row>
            </div>
        );
    }
}

export default EventDetailCard;

