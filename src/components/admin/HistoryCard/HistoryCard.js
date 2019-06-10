import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Alert,
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";


import Payment from "../../Post/Payment/Payment";
import HeaderPost from "../../Post/HeaderPost/HeaderPost";

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
      reportText: ""
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
        
        {this.props.type === "EVENT"?<HeaderPost
          {...this.props} user =  {this.props.publisher} 
          successReport = {this.props.successReport}
          reporter = {this.props.myUser._id}
          object = {this.props._id}
          objectModel = {this.props.type}
        />:<HeaderPost
          {...this.props}
          successReport = {this.props.successReport}
          reporter = {this.props.myUser._id}
          object = {this.props._id}
          objectModel = {this.props.type}
        />}
        

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
                  <Button className="mr-1 add-btn">
                    <i class="fas fa-angle-double-right icon-button" />
                    Tham gia
                  </Button>
                </div>
              )}
              {this.props.type === "PLACE" && (
                <div>
                  <Button className="mr-1 new-btn">
                    <i class="fas fa-edit icon-button" />
                    Tạo event
                  </Button>
                </div>
              )}
              {this.props.type === "DONATION" && (
                <div>
                  <Button
                    className="mr-1 donate-btn"
                    onClick={this.togglePayment}
                  >
                    <i class="fas fa-donate icon-button" />
                    Quyên góp
                  </Button>
                  <Modal
                    isOpen={this.state.paymentOpen}
                    toggle={this.togglePayment}
                  >
                    <ModalHeader>Thanh toán </ModalHeader>
                    <ModalBody>
                      <Payment close={this.togglePayment} />
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

export default connect(mapStateToProps)(PostCard);

