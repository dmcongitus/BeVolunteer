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
  CarouselIndicators
} from "reactstrap";

import Payment from "../../Post/Payment/Payment";
import HeaderPost from "../../Post/HeaderPost/HeaderPost";
import Component from "../../../components/Post/PostCardMore/Comment/Comment";
class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeIndex: 0,
      items: props.object.filenames.map(filename => `/resources/${filename}`),
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
        {this.props.type === "EVENT" ? (
          <HeaderPost
            admin={true}
            {...this.props.object}
            user={this.props.object.publisher}
          />
        ) : (
          <HeaderPost admin={true} {...this.props.object} />
        )}

        <Row>
          <Col xs="6">
            <div onClick={this.toggle}>
              {/* {this.clearArray()} */}

              {this.state.items.length < 2 ? (
                <img
                  style={{ cursor: "pointer" }}
                  src={`/resources/${this.props.object.filenames[0]}`}
                  className="post-album"
                />
              ) : (
                <div className="Newpost-img__more">
                  <img
                    style={{ cursor: "pointer" }}
                    src={`/resources/${this.props.object.filenames[0]}`}
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
            <Alert color="success">{this.props.object.description}</Alert>

            <div className="item-right">
              <Button
                className="mr-1 donate-btn"
                onClick={ () => this.props.deleteReport(this.props._id)}
              >
                <i class="fas fa-trash-alt icon-button" />
                Xóa báo cáo
              </Button>
              <Button className="mr-1 new-btn">
                <i class="fas fa-lock icon-button" />
                Khóa bài
              </Button>

              <Link to={`post/${this.props.object._id}`}>
                <Button color="success" className="mr-1 success p-2">
                  <i class="fas fa-angle-double-right icon-button" /> Xem thêm
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <div className="mt-3">
          <Component {...this.props.reporter} content={this.props.content} />
        </div>

        {/*/ cardbox-like */}

        {/*/ col-lg-6 */}
      </div>
    );
  }
}
const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(PostCard);
