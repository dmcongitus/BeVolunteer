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
  Input
} from "reactstrap";
import Payment from "../Payment/Payment";
import HeaderPost from "../HeaderPost/HeaderPost";
import Comment from "./Comment/Comment";
import "./PostCardMore.css";
import Axios from "axios";
import addDays from "date-fns/add_days";
import format from "date-fns/format";

class EventCardMore extends React.Component {
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
      comment: "",
      modalEye: false
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
  }
  toggleEye() {
    this.setState({
      modalEye: !this.state.modalEye
    });
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
    Axios.get(`/events/${this.props._id}/comments`, {
      headers: { "x-access-token": localStorage.getItem("token") }
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
    Axios.post(
      "/comments",
      {
        user: _id,
        userModel: permisison,
        object: this.props._id,
        objectModel: "Event",
        content: this.state.comment
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
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
    console.log("Event card more");
    console.log(this.props)
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
            <small className="mr-2">Chia sẻ bởi</small>
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
                {console.log(this.props)}
                <div>
                  <Row>
                    <Col xs="3">
                      <i class="far fa-calendar-alt" /> <b>Thời gian: </b>
                      <i class="fas fa-users"> </i> <b>Số lượng: </b>
                    </Col>
                    <Col xs="8">
                      <div>
                        Từ
                        <span className="style-date">
                          {format(new Date(this.props.starttime), "DD/MM/YYYY")}
                        </span>
                        Đến
                        <span className="style-date">
                          {format(new Date(this.props.endtime), "DD/MM/YYYY")}
                        </span>
                      </div>
                      <div>
                        {this.props.volunteers.length}/
                        {this.props.numVolunteers}
                        <span className="ml-2 eye-btn" onClick={this.toggleEye}>
                          <i class="fas fa-eye" />
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
          <b>Nội dung: </b>
          <div className="p-2">{this.props.description}</div>
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

              <div className="item-right pb-2 m-2 hr-border-bottom">
                {
                    this.props.publisher.permission === "UNIT_ADMIN"?
                    <Link to={`/eventEdit/${this.props._id}`}>
                        <div>
                            <Button className="mr-1 success add-btn">
                            <i class="fas fa-angle-double-right icon-button" />
                            Chỉnh sửa
                            </Button>
                        </div>
                    </Link> :null
                }

              </div>
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
        <Modal isOpen={this.state.modalEye} toggle={this.toggleEye}>
          <ModalHeader toggle={this.toggleEye}>Danh sách tham gia</ModalHeader>
          <ModalBody>
            {this.props.volunteers.map(volunteer=>(
               <Row className="item-mid">
               <Col xs = "4" className="p-2">
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
               <Col xs = "8" className="p-1">
                 <div className="item-center">
                   <div className="item-column ">
                     <b>
                       {volunteer.name}{" "}
                       {volunteer.isVerified === true && (
                         <i className="ml-1 small fas fa-check-circle check-user" />
                       )}
                     </b>
   
                     <div className="item-row">
                       <div>
                         {volunteer.permission}
                         
                       </div>
                     </div>
                   </div>
                 </div>
               </Col>
             </Row>
            ))}
          
          
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEye}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(EventCardMore);
