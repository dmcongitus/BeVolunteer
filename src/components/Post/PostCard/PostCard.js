import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import postCardTranslations from './translation.json';
import { withRouter } from "react-router";
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
    Tooltip,
    Input,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Collapse,
    Table
} from "reactstrap";

import { Notification } from "element-react";
import "./PostCard.css";
import Payment from "../Payment/Payment";
import HeaderPost from "../HeaderPost/HeaderPost";
import { donateEvent, checkPayment } from "../../../services/momo.service";

class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            activeIndex: 0,
            items: props.filenames.map(filename => `/resources/${filename}`),
            dropdownOpen: false,
            paymentOpen: false,
            modalReport: false,
            reportText: "",
            tooltipJoin: false,
            collapse: false
        };
        this.toggletooltipJoin = this.toggletooltipJoin.bind(this);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.togglePayment = this.togglePayment.bind(this);
        this.props.addTranslation(postCardTranslations);
    }

    setPayment = data => {
        console.log(data);
        window.open(data.payUrl);
        checkPayment(data.payUrl).then(data => {
            console.log(data.data.status_code);
        });
    };

    successDonate = async (amount, e) => {
        e.preventDefault();
        console.log(amount);
        donateEvent(amount, this.setPayment);
        // var data = this.foo
    };
    messOutAfterRun() {
        Notification.error({
            title: "Error",
            message: "Sự kiện đã bắt đầu, không thể huỷ"
        });
    }
    joinToEvent = () => {
        if (this.props.volunteers.length === this.props.numVolunteers) {
            Notification.error({
                title: "Error",
                message: "Số lượng nguời đã đạt giới hạn "
            });
        } else this.props.joinToEvent(this.props._id);
    };
    toggletooltipJoin() {
        this.setState({
            tooltipJoin: !this.state.tooltipJoin
        });
    }

    toggleOpenCard = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    };
    togglePayment = () => {
        if (this.state.paymentOpen === true) {
            window.location.reload();
        }
        this.setState({ paymentOpen: !this.state.paymentOpen });
    };
    checkJoinEvent = (_id, _ids) => {
        return _ids.find(i => i._id === _id);
    };

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
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
                    <img src={item} className="img-slide-style img-slide-postCard" />
                </CarouselItem>
            );
        });
        return (
            <div className="postCard">
                <div>
                    {this.props.type === "EVENT" ? (
                        <HeaderPost
                            {...this.props}
                            user={this.props.publisher}
                            successReport={this.props.successReport}
                            reporter={this.props.myUser._id}
                            object={this.props._id}
                            objectModel={this.props.type}
                        />
                    ) : (
                            <HeaderPost
                                {...this.props}
                                successReport={this.props.successReport}
                                reporter={this.props.myUser._id}
                                object={this.props._id}
                                objectModel={this.props.type}
                            />
                        )}
                </div>

                <Row>
                    <Col>
                        <div className="item-mid pb-3">
                        <div className="pl-2 pr-3 test" style={{textAlign:"justify"}}>{this.props.description}</div>
                        </div>
                    </Col>
                </Row>

                <Collapse isOpen={this.state.collapse}>
                    <div className="p-2 item-mid" onClick={this.toggle}>
                        {/* {this.clearArray()} */}

                        {this.state.items.length < 2 ? (
                            <img
                                style={{ cursor: "pointer" }}
                                src={`/resources/${this.props.filenames[0]}`}
                                className="post-album"
                            />
                        ) : null}
                        {this.state.items.length === 2 ? (
                            <Row>
                                <Col xs="6" style={{ paddingRight: "2px", paddingLeft: "0" }}>
                                    <div>
                                        <img
                                            style={{ cursor: "pointer" }}
                                            src={`/resources/${this.props.filenames[0]}`}
                                            className="post-album-2"
                                        />
                                    </div>
                                </Col>
                                <Col xs="6" className="pl-0 pr-0">
                                    <div>
                                        <img
                                            style={{ cursor: "pointer" }}
                                            src={`/resources/${this.props.filenames[1]}`}
                                            className="post-album-2"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ) : null}
                        {this.state.items.length >= 3 ? (
                            <Row>
                                <Col
                                    xs="6"
                                    style={{ paddingRight: "0.1rem", paddingLeft: "0" }}
                                >
                                    <div>
                                        <img
                                            style={{ cursor: "pointer" }}
                                            src={`/resources/${this.props.filenames[0]}`}
                                            className="post-album-3"
                                        />
                                    </div>
                                </Col>
                                <Col xs="6" className="pl-0 pr-0" style={{ height: "24rem" }}>
                                    <div>
                                        <img
                                            style={{ cursor: "pointer" }}
                                            src={`/resources/${this.props.filenames[1]}`}
                                            className="post-album-2-3"
                                        />
                                    </div>
                                    {this.state.items.length > 3 ? (
                                        <div
                                            className="Newpost-img__more"
                                            style={{ marginTop: "0.1rem" }}
                                        >
                                            <img
                                                style={{ cursor: "pointer" }}
                                                src={`/resources/${this.props.filenames[2]}`}
                                                className="post-album-2-3"
                                            />
                                            <div>+{this.state.items.length - 1}</div>
                                        </div>
                                    ) : (
                                            <div style={{ marginTop: "0.1rem" }}>
                                                <img
                                                    style={{ cursor: "pointer" }}
                                                    src={`/resources/${this.props.filenames[2]}`}
                                                    className="post-album-2-3"
                                                />
                                            </div>
                                        )}
                                </Col>
                            </Row>
                        ) : null}

                        {/*/ cardbox-item */}
                    </div>
                </Collapse>
                <div className="btn-bottom-postCard">
                    <Collapse isOpen={!this.state.collapse}>
                        <Row className="item-mid" onClick={this.toggleOpenCard}>
                            <div>
                                <i className="fas fa-angle-double-down" />
                            </div>
                        </Row>
                    </Collapse>
                    <Collapse isOpen={this.state.collapse}>
                        <Row className="item-mid" onClick={this.toggleOpenCard}>
                            <div>
                                <i className="fas fa-angle-double-up" />
                            </div>
                        </Row>
                    </Collapse>
                </div>

                <Row>
                    <Col>
                        <Table className="bottomPostcard">
                            <thead>
                                <tr>
                                    {this.props.type === "EVENT" ? (
                                        this.checkJoinEvent(
                                            this.props.myUser._id,
                                            this.props.volunteers
                                        ) ? (
                                                this.props.status === "UPCOMING" ? (
                                                    <th
                                                        onClick={() => this.props.unjoinEvent(this.props._id)}
                                                    >
                                                        <div>
                                                            <i className="fas fa-user-minus" /> <Translate id="postCard.cancel">Huỷ</Translate>
                                                        </div>
                                                    </th>
                                                ) : (
                                                        <th onClick={() => this.messOutAfterRun()}>
                                                            <div style={{ color: "gray" }}>
                                                                <i className="fas fa-user-minus" /> <Translate id="postCard.cancel">Huỷ</Translate>
                                                            </div>
                                                        </th>
                                                    )
                                            ) : this.props.status === "UPCOMING" &&
                                                this.props.myUser.permission === "USER" ? (
                                                    <th onClick={this.joinToEvent}>
                                                        <Link to={`eventMore/${this.props._id}`}>
                                                            <div>
                                                                <i className="fas fa-user-plus" /> <Translate id="postCard.join">Tham gia</Translate>
                                                            </div>
                                                        </Link>
                                                    </th>
                                                ) : null
                                    ) : null}

                                    {this.props.type === "EVENT" && (
                                        <th onClick={this.togglePayment}>
                                            <div>
                                                <i className="fas fa-donate" />
                                                <Translate id="postCard.donation">Quyên góp</Translate>
                                            </div>
                                        </th>
                                    )}
                                    {this.props.type !== "EVENT" ? (
                                        <th>
                                            <Link to={`/post/${this.props._id}`}>
                                                <div>
                                                    <i className="fas fa-glasses" /><Translate id="postCard.more">Xem thêm</Translate>
                                                </div>
                                            </Link>
                                        </th>
                                    ) : null}

                                    {this.props.type === "PLACE" &&
                                        ((this.props.myUser.permission === "ORG" &&
                                            this.props.myUser.isActive === true) ||
                                            this.props.myUser.permission === "UNIT_ADMIN" ||
                                            this.props.myUser.permission === "CONTENT_MOD" ||
                                            this.props.myUser.permission === "SUPER_ADMIN" ? (
                                                <th>
                                                    <Link to="/event">
                                                        <div>
                                                            <i className="far fa-calendar-plus" /> <Translate id="postCard.newEvent">Tạo sự kiện</Translate>
                                                        </div>
                                                    </Link>
                                                </th>
                                            ) : null)}

                                    {this.props.type === "EVENT" ? (
                                        this.props.publisher.username ===
                                            this.props.myUser.username ? (
                                                <th>
                                                    <Link to={`/EventManageDetail/${this.props._id}`}>
                                                        <div>
                                                            <i className="fas fa-glasses" /> <Translate id="postCard.more">Xem thêm</Translate>
                                                        </div>
                                                    </Link>
                                                </th>
                                            ) : (
                                                <th>
                                                    <Link to={`/eventMore/${this.props._id}`}>
                                                        <div>
                                                            <i className="fas fa-glasses" /> <Translate id="postCard.more">Xem thêm</Translate>
                                                        </div>
                                                    </Link>
                                                </th>
                                            )
                                    ) : null}
                                </tr>
                            </thead>
                        </Table>
                    </Col>
                </Row>

                {/*/ MORE TODO */}
                {/* Modal Pyment */}
                <Modal isOpen={this.state.paymentOpen}>
                    <ModalHeader><Translate id="postCard.payment">Thanh toán</Translate></ModalHeader>
                    <ModalBody>
                        <Payment
                            close={this.togglePayment}
                            donate={this.successDonate}
                            event={this.props}
                        />
                    </ModalBody>
                </Modal>
                {/* Modal slide  */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="slide-image-post"
                >
                    <ModalHeader toggle={this.toggle}> <Translate id="postCard.album">Album</Translate><i className="fas fa-images ml-1"></i></ModalHeader>
                    <ModalBody style={{ background: "black" }}>
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
                {/*/ col-lg-6 */}
            </div>
        );
    }
}
const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

// export default connect(mapStateToProps)(PostCard);

export default withRouter(
    connect(
        mapStateToProps
    )(withLocalize(PostCard))
);
