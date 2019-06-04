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
  DropdownToggle
} from "reactstrap";

import "./PostCard.css";
import Payment from "../Payment/Payment";
import HeaderPost from "../HeaderPost/HeaderPost";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeIndex: 0,
      items: props.filenames.map(filename => `/resources/${filename}`),
      dropdownOpen: false,
      paymentOpen: false
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleMenuPost = this.toggleMenuPost.bind(this);
    this.togglePayment = this.togglePayment.bind(this);
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
      <Row className="postCard">
        <HeaderPost {...this.props} />

        <Col xs="1">
          <div className="menu-post">
            <Dropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleMenuPost}
            >
              <DropdownToggle
                tag="span"
                onClick={this.toggleMenuPost}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
              >
                <i class="fas fa-bars" />
              </DropdownToggle>
              <DropdownMenu className="menu-post-item p-1">
                <div onClick={this.toggleMenuPost}>
                  <i class="fas fa-flag ml-3" />
                  Lưu
                </div>
                <div onClick={this.toggleMenuPost}>
                  <i class="fas fa-bug ml-3" />
                  Báo cáo
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
        <div style={{ width: "100%" }}>
          <Row>
            <Col>
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

            <Col className="textMedia">
              <Alert color="success">{this.props.description}</Alert>

              <div className="item-right">
                {this.props.type === "ACTIVITY" && (
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
                        <Payment />
                      </ModalBody>
                    </Modal>
                  </div>
                )}
                <Link to={`post/${this.props._id}`}>
                  <Button color="success" className="mr-1 success">
                    <i class="fas fa-angle-double-right icon-button" /> Xem thêm
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>

          {/*/ cardbox-like */}
        </div>
        {/*/ col-lg-6 */}
      </Row>
    );
  }
}

export default PostCard;
