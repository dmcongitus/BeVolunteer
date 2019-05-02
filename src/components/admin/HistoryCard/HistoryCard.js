
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

import "./HistoryCard.css";
import Payment from "../../../components/user/Payment/Payment";

class HistoryCard extends React.Component {
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
                  <span className="ml-1">đã chia sẻ một</span>
                </small>
                <span className="ml-1">
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
                </span>
                <div>
                  <small>
                    <span>
                      <i className="fa fa-calendar" data-original-title title />{" "}
                      {new Date(this.props.createdAt).toLocaleTimeString()}
                      <i
                        style={{ marginLeft: "5px" }}
                        className="fas fa-map-marker-alt ml-3 mr-1"
                      />{" "}
                      {this.props.address}
                    </span>
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs="1">
          {" "}
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
                {this.clearArray()}
                {this.props.filenames.map(filename => {
                  this.state.items.push(`/resources/${filename}`);
                })}
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
              <Button className="mr-1 new-btn">
                  <i class="fas fa-lock icon-button" />Khóa bài
                </Button>
                <Button className="mr-1 donate-btn">
                  <i class="fas fa-trash-alt icon-button" />Xóa báo cáo
                </Button>
          
           
                <Link to={`post/${this.props.id}`}>
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
        <Alert color="danger" style={{width:"100%"}}>
      
      <i class="fas fa-user"></i>
        Tôi nhận thấy bài viết này không đúng với sự thật, tôi đã đến đó
      </Alert>
      </Row>
    );
  }
}

export default HistoryCard;

