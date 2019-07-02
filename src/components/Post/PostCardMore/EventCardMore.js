import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Badge } from "reactstrap";
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
  DropdownToggle,
  Input,
  Table
} from "reactstrap";
import Payment from "../Payment/Payment";
import HeaderPost from "../HeaderPost/HeaderPost";
import Comment from "./Comment/Comment";
import "./PostCardMore.css";
import addDays from "date-fns/add_days";
import format from "date-fns/format";
import { Notification } from "element-react";
import request from "../../../services/request";
import { withLocalize, Translate } from "react-localize-redux";
import eventCardMoreTranslations from './translation.json';
import { withRouter } from "react-router";
import { donateEvent, checkPayment } from "../../../services/momo.service";
import { donateMoney, getDonateEvent } from "../../../services/event.service"


class EventCardMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeIndex: 0,
      items: [],
      dropdownOpen: false,
      paymentOpen: false,
      comments: [],
      comment: "",
      modalEye: false,
      totalDonateAmount: 0,
      donators: [],
      isDonatorModalOpen: false
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleEye = this.toggleEye.bind(this);
    this.toggleMenuPost = this.toggleMenuPost.bind(this);
    this.togglePayment = this.togglePayment.bind(this);
    this.props.addTranslation(eventCardMoreTranslations);

  }
  messOutAfterRun = () => {
    Notification.error({
      title: "Error",
      message: "Sự kiện đã bắt đầu, không thể huỷ"
    });
  };
  joinToEvent = () => {
    this.props.joinToEvent();
  };
  toggleEye() {
    this.setState({
      modalEye: !this.state.modalEye
    });
  }

  setPayment = data => {
    console.log(data);
    window.open(data.payUrl);
    checkPayment(data.payUrl).then(data => {
      console.log(data.data.status_code);
    });
  };

  togglePayment = () => {
    this.setState((prevState) => ({ paymentOpen: !prevState.paymentOpen }))
  }

  successDonate = async (amount, e) => {
    e.preventDefault();
    console.log(amount);
    donateEvent(amount, this.setPayment);
    // var data = this.foo
  };

  checkJoinEvent = (_id, _ids) => {
    return _ids.find(i => i._id === _id);
  };

  toggeDonatorModal = () => {
    this.setState((prevState) => ({isDonatorModalOpen: !prevState.isDonatorModalOpen}));
  }

  toggleMenuPost() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  togglePayment = () => {
    this.setState({
      paymentOpen: !this.state.paymentOpen
    });
  }
  clearArray() {
    this.state.items = [];
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

  componentDidMount = () => {
    request({
      url: `/events/${this.props._id}/comments`,
      method: "get"
    })
      .then(({ data }) => {
        this.setState({ comments: data });
        return getDonateEvent(this.props._id)
      })
      .then(({ data }) => {
        console.log(data);
        const donators = [];
        const amount = data.reduce((currentSum, donate) => {
          donators.push(donate.donater)
          return currentSum + parseInt(donate.value, 10);
        }, 0);
        this.setState({
          totalDonateAmount: amount,
          donators: donators
        });
      })
      .catch(err => {
        alert(err);
      });
  };

  getAmountAfterDonation = () => {
    getDonateEvent(this.props._id)
      .then(({ data }) => {
        const donators = [];
        const amount = data.reduce((currentSum, donate) => {
          donators.push(donate.donater)
          return currentSum + parseInt(donate.value, 10);
        }, 0);
        this.setState({
          totalDonateAmount: amount,
          donators: donators
        });
      }).catch(err => {
        alert(err);
      });
  }

  handleCommentOnChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleCommentOnSubmit = e => {

    e.preventDefault();

    const { _id, permisison, avatar } = this.props.myUser;
    request({
      url: `/comments`,
      method: "post",
      data: {
        user: _id,
        userModel: permisison,
        object: this.props._id,
        objectModel: "Event",
        content: this.state.comment
      }
    })
      .then(() => {
        this.setState(prevState => ({
          comments: [
            {
              name: this.props.myUser.name,
              content: prevState.comment,
              avatar,
              isVerified: this.props.myUser.isVerified
            },
            ...prevState.comments
          ],
          comment: ""
        }));

      })
      .catch(err => {
        alert(err);
      });
  };

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
        <div className="postCard mt-0">
          {this.props.type === "EVENT" ? (
            <HeaderPost
              {...this.props}
              user={this.props.publisher}
              successReport={this.props.successReport}
              reporter={this.props.myUser._id}
              object={this.props._id}
              objectModel={this.props.type}
              typePage="more"
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
          <div className="ml-5 pl-3" style={{ marginTop: "-1rem" }}>
            <small className="mr-2"><Translate id="eventCardMore.no1">Chia sẻ bởi</Translate></small>
            {this.props.sharer.map(mem => (
              <Badge pill href="#" color="success">
                {mem.name}
              </Badge>
            ))}
          </div>

          <Row className="mt-2">
            <Col>
              <hr />
              <div className="ml-3">
                <div>
                  <Row>
                    <Col xs="4">
                      <div>
                        <i className="far fa-calendar-alt" /> <b><Translate id="eventCardMore.time">Thời gian: </Translate></b>
                      </div>
                      <div>
                        <i className="fas fa-users"> </i> <b><Translate id="eventCardMore.numVolunteer">Số lượng: </Translate></b>
                      </div>

                      <div>
                        <i className="fas fa-money"> </i> <b><Translate id="eventCardMore.totalDonateAmount">Tiền quyên góp: </Translate></b>
                      </div>
                    </Col>
                    <Col xs="8">
                      <div>
                        <Translate id="eventCardMore.from">Từ </Translate>
                        <span className="style-date">
                          {format(new Date(this.props.starttime), "DD/MM/YYYY")}
                        </span>
                        <Translate id="eventCardMore.to">đến </Translate>
                        <span className="style-date">
                          {format(new Date(this.props.endtime), "DD/MM/YYYY")}
                        </span>
                      </div>
                      <div>
                        {this.props.volunteers.length}/
                        {this.props.numVolunteers}
                        <span className="ml-2 eye-btn" onClick={this.toggleEye}>
                          <i className="fas fa-eye" />
                        </span>
                      </div>
                      <div>
                        {this.state.totalDonateAmount}
                        <span className="ml-2 eye-btn" onClick={this.toggeDonatorModal}>
                          <i className="fas fa-eye" />
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div />
              </div>
              <hr />
            </Col>
          </Row>
          <Row className="item-mid">
            <div className="pl-4 pr-4 pb-2">{this.props.description}</div>
          </Row>

          <div style={{ width: "100%" }}>
            <Row>
              <Col>
                <div onClick={this.toggle}>
                  {this.clearArray()}
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
                          className="post-album-more"
                        />
                        <div>+{this.state.items.length - 1}</div>
                      </div>
                    )}
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
            </Row>

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
                                onClick={() =>
                                  this.props.unjoinEvent(this.props._id)
                                }
                              >
                                <div>
                                  <i className="fas fa-user-minus" /> <Translate id="eventCardMore.cancel">Huỷ</Translate>
                                </div>
                              </th>
                            ) : (
                                <th onClick={() => this.messOutAfterRun()}>
                                  <div style={{ color: "gray" }}>
                                    <i className="fas fa-user-minus" /> <Translate id="eventCardMore.cancel">Huỷ</Translate>
                                  </div>
                                </th>
                              )
                          ) : this.props.status === "UPCOMING" ? (
                            <th
                              disabled={
                                this.props.myUser.isVerified === false ||
                                this.props.myUser.permission != "USER"
                              }
                              onClick={() =>
                                this.props.joinToEvent(this.props._id)
                              }
                            >
                              <div>
                                <i className="fas fa-user-plus" /> <Translate id="eventCardMore.join">Tham gia</Translate>
                              </div>
                            </th>
                          ) : null
                      ) : null}
                      {this.props.type === "EVENT" && (
                        <th onClick={this.togglePayment}>
                          <div>
                            <i className="fas fa-donate" />
                            <Translate id="eventCardMore.donation">Quyên góp</Translate>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col>
                <Row className="pb-2 ml-3">
                  <div className="item-center">
                    <div>
                      <img
                        className="img-user-postCard rounded-circle"
                        src={"/resources/" + this.props.myUser.avatar}
                        alt="UserAvatar"
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    </div>
                    <div className="ml-2 my-Comment ">
                      <div className="item-row item-center d-flex">
                        <b className="tcl-1">{this.props.myUser.name}</b>
                        <form
                          className="flex-grow-1 ml-3"
                          onSubmit={this.handleCommentOnSubmit}
                        >
                          <Input
                            type="text"
                            id="exampleEmail"
                            placeholder="Bình luận"
                            onChange={this.handleCommentOnChange}
                            value={this.state.comment}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </Row>
                {this.state.comments.map(comment => (
                  <Comment {...comment} />
                ))}
              </Col>
            </Row>
            {/*/ cardbox-like */}
          </div>
          {/*/ col-lg-6 */}
        </div>

        <Modal
          isOpen={this.state.paymentOpen}
          toggle={this.togglePayment}
        >
          <ModalHeader>Thanh toán </ModalHeader>
          <ModalBody>
            <Payment
              incrementDonateAmount={this.getAmountAfterDonation}
              close={this.togglePayment}
              donate={this.successDonate}
              event={this.props}
            />
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalEye} toggle={this.toggleEye}>
          <ModalHeader toggle={this.toggleEye}><Translate id="eventCardMore.joinList">Danh sách tham gia</Translate></ModalHeader>
          <ModalBody>
            {this.props.volunteers.map(volunteer => (
              <Row className="item-mid">
                <Col xs="4" className="p-2">
                  <div className="logo ">
                    <img
                      alt="avatar"
                      src={
                        "/resources/" +
                        (volunteer.avatar ||
                          "https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/57393041_305492127011755_8740904577945042944_n.jpg?_nc_cat=105&_nc_oc=AQn7GUnB8UXlqMTogNJWDlqNjMEYb8gBeMPWreuL7dXQQHbhb9R6_PFCvI5m-de4R8E&_nc_ht=scontent.fsgn2-1.fna&oh=70f6e9461f233111834a04094f2fa45e&oe=5D33B790")
                      }
                      className="mx-auto .d-block "
                    />
                  </div>
                </Col>
                <Col xs="8" className="p-1">
                  <div className="item-center">
                    <div className="item-column ">
                      <b>
                        {volunteer.name}{" "}
                        {volunteer.isVerified === true && (
                          <i className="ml-1 small fas fa-check-circle check-user" />
                        )}
                      </b>
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEye}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.isDonatorModalOpen} toggle={this.toggeDonatorModal}>
          <ModalHeader toggle={this.toggeDonatorModal}><Translate id="eventCardMore.joinList">Danh sách tham gia</Translate></ModalHeader>
          <ModalBody>
            {this.state.donators.map(volunteer => (
              <Row className="item-mid">
                <Col xs="4" className="p-2">
                  <div className="logo ">
                    <img
                      alt="avatar"
                      src={
                        "/resources/" +
                        (volunteer.avatar ||
                          "https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/57393041_305492127011755_8740904577945042944_n.jpg?_nc_cat=105&_nc_oc=AQn7GUnB8UXlqMTogNJWDlqNjMEYb8gBeMPWreuL7dXQQHbhb9R6_PFCvI5m-de4R8E&_nc_ht=scontent.fsgn2-1.fna&oh=70f6e9461f233111834a04094f2fa45e&oe=5D33B790")
                      }
                      className="mx-auto .d-block "
                    />
                  </div>
                </Col>
                <Col xs="8" className="p-1">
                  <div className="item-center">
                    <div className="item-column ">
                      <b>
                        {volunteer.name}{" "}
                        {volunteer.isVerified === true && (
                          <i className="ml-1 small fas fa-check-circle check-user" />
                        )}
                      </b>
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggeDonatorModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

// export default connect(mapStateToProps)(EventCardMore);

export default withRouter(
  connect(
    mapStateToProps
  )(withLocalize(EventCardMore))
);

