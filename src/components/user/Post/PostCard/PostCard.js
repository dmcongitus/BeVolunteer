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
  CarouselCaption
} from "reactstrap";
import img1 from "../../../../images/1.jpg";
import img2 from "../../../../images/2.jpg";
import img3 from "../../../../images/3.jpg";
import "./PostCard.css";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeIndex: 0,
      items: []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
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
  toggle(filename) {
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
        <Col className="header-col">
          <Row className="item-center header-postCard pb-3">
            <div>
              <img
                className="img-user-postCard rounded-circle"
                src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                alt="UserAvatar"
              />
            </div>

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
          </Row>
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
                className={this.props.className}
              >
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
                {this.props.type === "Hoạt động" && (
                  <div>
                    <Button className="mr-1 add-btn">
                      <i class="fas fa-angle-double-right icon-button" />
                      Tham gia
                    </Button>
                  </div>
                )}
                {this.props.type === "Địa điểm" && (
                  <div>
                    <Button className="mr-1 new-btn">
                      <i class="fas fa-edit icon-button" />
                      Tạo event
                    </Button>
                  </div>
                )}
                {this.props.type === "Quyên góp" && (
                  <div>
                    <Button className="mr-1 donate-btn">
                      <i class="fas fa-donate icon-button" />
                      Quyên góp
                    </Button>
                  </div>
                )}
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
      </Row>
    );
  }
}

export default PostCard;
