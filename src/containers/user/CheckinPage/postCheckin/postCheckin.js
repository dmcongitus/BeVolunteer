import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import addDays from "date-fns/add_days";
import format from "date-fns/format";
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
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeaderPost from "../../../../components/Post/HeaderPost/HeaderPost";

class PostCheckin extends React.Component {
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
      modalCheckin: false,
      startDate: new Date()
    };
    this.toggleReport = this.toggleReport.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleMenuPost = this.toggleMenuPost.bind(this);
    this.togglePayment = this.togglePayment.bind(this);
    this.toggleCheckin = this.toggleCheckin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  toggleCheckin() {
    this.setState(prevState => ({
      modalCheckin: !prevState.modalCheckin
    }));
  }
  toggleReport() {
    this.setState(prevState => ({
      modalReport: !prevState.modalReport
    }));
  }
  toggleMenuPost() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  togglePayment() {
    this.setState({
      paymentOpen: !this.state.paymentOpen
    });
  }
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

        <Row>
          <Col xs="6">
            <div onClick={this.toggle}>
              {/* {this.clearArray()} */}

              {this.state.items.length < 2 ? (
                <img
                  style={{ cursor: "pointer" }}
                  src={`/resources/${this.props.filenames[0]}`}
                  className="post-album"
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

          <Col xs="6" className="textMedia pl-0">
            <Alert color="success">{this.props.description}</Alert>

            <div className="item-right">
              {this.props.type === "EVENT" && (
                <div>
                  <Button className="mr-1 add-btn" onClick={this.toggleCheckin}>
                    <i class="fas fa-calendar-check icon-button" />
                    Điểm danh
                  </Button>
                  <Modal
                    isOpen={this.state.modalCheckin}
                    toggle={this.toggleCheckin}
                  >
                    <ModalHeader
                      toggle={this.toggleCheckin}
                      style={{ background: "#042c38", color: "white" }}
                    >
                      <i class="far fa-calendar-check" /> Điểm danh
                    </ModalHeader>
                    <ModalBody style={{ background: "gainsboro" }}>
                      <Row>
                        <Col>
                          <DatePicker
                            inline
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            minDate={new Date(this.props.starttime)}
                            maxDate={new Date(this.props.endtime)}
                            highlightDates={[
                              new Date(this.props.starttime),
                              new Date(this.props.endtime)
                            ]}
                          />
                        </Col>
                        <Col>
                          <b className="mt-4">Mã điểm danh</b>
                  
                            <Input
                            className="mt-3"
                              placeholder={format(
                                new Date(this.state.startDate),
                                "DD/MM/YYYY"
                              )}
                            />
  

                          <div className="item-right mt-3">
                            <Button
                              color="success"
                              className="mr-2"
                              onClick={this.toggleCheckin}
                            >
                              Xác thực
                            </Button>
                            <Button color="danger" onClick={this.toggleCheckin}>
                              Thoát
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </ModalBody>
                  </Modal>
                </div>
              )}

              <Link to={`post/${this.props._id}`}>
                <Button color="success" className="mr-1 success p-2">
                  <i class="fas fa-angle-double-right icon-button" /> Xem thêm
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/*/ cardbox-like */}

        {/*/ col-lg-6 */}
      </div>
    );
  }
}
const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(PostCheckin);
