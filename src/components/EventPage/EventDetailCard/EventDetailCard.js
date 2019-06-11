import React from "react";
import { NavLink, Link } from "react-router-dom";
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
            items: [],
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
                <Row className="postCard">
                    <Col className="header-col" xs="11">
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
                            <Col xs="11">
                            <div className="ml-2">
                                Dương Minh Công {this.props.name}
                                <small>
                                <span className="ml-1">đã tổ chức một sự kiện</span>
                                </small>
                                {/* <span className="ml-1">
                                <b>
                                    {this.props.type === "Địa điểm" ? (
                                    <span className="tcl-2">Địa điểm</span>
                                    ) : this.props.type === "Quyên góp" ? (
                                    <span className="tcl-3">Quyên góp</span>
                                    ) : this.props.type === "Hoạt động" ? (
                                    <span className="tcl-1">Hoạt động</span>
                                    ) : (
                                    <span className="tcl-4">{this.props.type}</span>
                                    )}
                                </b>
                                </span> */}
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
                        </Row>
                    </Col>

                    <div className="p-2">{this.props.description}</div>
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
                            <div className="item-right pb-2 m-2 hr-border-bottom">
                                <div>
                                    <Button className="mr-1 add-btn">
                                    <i class="fas fa-angle-double-right icon-button" />
                                    Chỉnh sửa
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                    className="mr-1 donate-btn"
                                    onClick={this.togglePayment}
                                    >
                                    <i class="fas fa-donate icon-button" />
                                    Xóa
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

