import React from "react";
import { connect } from "react-redux";
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
  DropdownToggle,
  Input
} from "reactstrap";
import Payment from "../Payment/Payment";
import HeaderPost from "../HeaderPost/HeaderPost";
import Comment from "./Comment/Comment";
import "./PostCardMore.css";
import request from "../../../services/request";
class PostCardMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeIndex: 0,
      items: [],
      dropdownOpen: false,
      paymentOpen: false,
      comments: [
        {
          name: "NTN",
          content: "lkajsdkjdsfoiwer"
        },
        {
          name: "afsdif",
          content: "asdl;kjfu9308"
        }
      ],
      comment: ""
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

  componentDidMount = () => {
    request({
      url: `/posts/${this.props._id}/comments`,
      method: "get"
    })
      .then(({ data }) => {
        this.setState({ comments: data });
      })
      .catch(err => {
        alert(err);
      });
  };

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
        objectModel: "Post",
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

          <div className="p-2" style={{display:"flex", justifyContent:"center"}}> {this.props.description}

</div>
          <div style={{ width: "100%", overflow:"hidden" }}>
            <Row>
              <Col>
                <div onClick={this.toggle}>
                  {this.clearArray()}
                  {this.props.filenames.map(filename => {
                    this.state.items.push(`/resources/${filename}`);
                  })}
                  {this.props.filenames.length < 2 && (
                    <img
                      style={{ cursor: "pointer" }}
                      src={`/resources/${this.props.filenames[0]}`}
                      className="post-album-more"
                    />
                  )}
                  {this.props.filenames.length == 2 ? (
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
                {this.props.filenames.length >= 3 ? (
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
                    {this.props.filenames.length > 3 ? (
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
                {this.props.type === "Hoạt động" && (
                  <div>
                    <Button
                      className="mr-1 add-btn"
                      disabled={this.props.myUser.isVerified === false}
                    >
                      <i className="fas fa-angle-double-right icon-button" />
                      Tham gia
                    </Button>
                  </div>
                )}
                {this.props.type === "Địa điểm" && (
                  <div>
                    <Button className="mr-1 new-btn">
                      <i className="fas fa-edit icon-button" />
                      Tạo event
                    </Button>
                  </div>
                )}
                {this.props.type === "Quyên góp" && (
                  <div>
                    <Button
                      className="mr-1 donate-btn"
                      onClick={this.togglePayment}
                    >
                      <i className="fas fa-donate icon-button" />
                      Quyên góp
                    </Button>
                  </div>
                )}
              </div>
            </Row>

            <Row>
              <Col>
                <Row className="pb-2 ml-3">
                  <div className="item-center">
                    <div>
                      <img
                        className="img-user-postCard rounded-circle"
                        src={`/resources/` + this.props.myUser.avatar}
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
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(PostCardMore);
