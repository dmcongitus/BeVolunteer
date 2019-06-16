import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../../../actions/auth.action";
import { Container, Row, Col, Alert } from "reactstrap";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./EditEvent.css";
import Select from "react-select";
import Moment from "react-moment";
import moment from "moment";
import profileIcon from "../../../images/profile.png";
import cancelIcon from "../../../images/cancel.png";
import editIcon from "../../../images/edit.png";
import identityImage from "../../../images/identity.png";
import { userInfo } from "os";
import { editEvent } from "../../../services/event.service";
import { getAllUsers } from "../../../services/user.service";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroupAddon,
  InputGroup
} from "reactstrap";

import {} from "reactstrap";
import { NavLink, Link } from "react-router-dom";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.inputImage = createRef();

    this.state = {
      infor: {
        _id: this.props._id,
        permission: 5,
        title: this.props.title,
        publisher: this.props.publisher.name,
        sharer: this.props.sharer,
        description: this.props.description,
        address: this.props.address,
        starttime: this.props.starttime,
        endtime: this.props.endtime,
        contact: this.props.contact,
        deadline: this.props.deadline,
        isDelete: this.props.isDeleted,
        numVolunteers: this.props.numVolunteers,
        image: this.props.filenames,
        multiSelect: []
      },
      statusForm: false,
      isOpenErrorModal: false,
      messageError: "",
      user: [],
      selectedOption: null,
      redirect: false
    };
  }

  componentDidMount = async () => {
    this.getSharer();

    try {
      const { data } = await getAllUsers();

      this.setState({
        //user: data.map(u => (u.name))

        user: data.map(u => {
          var obj = {};
          obj["value"] = u._id;
          obj["label"] = u.name;
          return obj;
        })
      });
    } catch {
      this.setState({ user: false });
    }
  };

  getSharer = () => {
    try {
      this.setState({
        infor: {
          ...this.state.infor,
          multiSelect: this.state.infor.sharer.map(u => {
            var obj = {};
            obj["value"] = u._id;
            obj["label"] = u.name;
            return obj;
          })
        }
      });
    } catch {
      this.setState({
        infor: {
          ...this.state.infor,
          multiSelect: false
        }
      });
    }
  };

  clearArray() {
    this.setState({
      infor: {
        ...this.state.infor,
        image: []
      }
    });
  }

  handleChange = selectedOption => {
    this.setState({
      infor: {
        ...this.state.infor,
        multiSelect: selectedOption
      }
    });
  };

  handleImageChange = e => {
    this.clearArray();

    e.persist();
    this.setState({
      infor: {
        ...this.state.infor,
        image: e.target.files
      }
    });
  };

  onFieldChanged = e => {
    this.setState({
      infor: {
        ...this.state.infor,
        [e.target.name]: e.target.value
      }
    });
  };

  onFormSubmit = async e => {
    e.preventDefault();

    await this.setState({
      infor: {
        ...this.state.infor,
        redirect: true,
        sharer: this.state.infor.multiSelect.map(s => s.value)
      }
    });

    try {
      const data = await editEvent({ ...this.state.infor });

    //   this.props.history.push(`/eventMore/${this.props._id}`);
    } catch (error) {
      alert(error);
    }
  };

  checkFormPost = state => {
    var d1 = new Date(document.getElementById("starttime").value);
    var d2 = new Date(document.getElementById("endtime").value);
    var d3 = new Date(document.getElementById("deadline").value);

    var current = moment();
    var startD = moment(d1);
    var endD = moment(d2);
    var deadline = moment(d3);

    //Kiểm tra giá trị rỗng
    if (
      state.infor.title === "" ||
      state.infor.sharer === "" ||
      state.infor.description === "" ||
      state.infor.address === "" ||
      state.infor.starttime === "" ||
      state.infor.endtime === "" ||
      state.infor.contact === "" ||
      state.infor.state === "" ||
      state.infor.image.length === 0 ||
      state.infor.deadline === ""
    ) {
      return {
        statusForm: false,
        message: "Value cannot be blank"
      };
    }

    //Kiểm tra hạn chót đăng ký sự kiện có sau ngày bắt đầu hay không?
    else if (deadline.isAfter(startD)) {
      return {
        statusForm: false,
        message: "Deadline have to before start date."
      };
    }

    //Kiểm tra thời gian bắt đầu và kết thức sự kiện có hợp lệ hay không?
    else if (startD.isAfter(endD)) {
      return {
        statusForm: false,
        message: "Start date have to before end date."
      };
    } else
      return {
        statusForm: true,
        message: "Generate event successfully."
      };
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={`eventMore/${this.state._id}`} />;
    }

    if (!this.state.isDelete) {
      var edit = (
        <Row>
          <div className="event-form w-100 text-lg font-bold border-b border-solid border-grey-light">
            <div className="EventEdit">
              <Row className="Row1" style={{ width: "100%" }}>
                <Col xs="7">
                  <Col>
                    {/* Tên sự kiện */}
                    <FormGroup row>
                      <Label sm={4}> Trạng thái</Label>

                      <Col sm={8}>
                        <div className="item-center">
                          {this.props.status === "UPCOMING"
                            ? "chưa bắt đầu"
                            : null}
                          {this.props.status === "ONGOING"
                            ? "Đang diễn ra"
                            : null}
                        </div>
                      </Col>
                    </FormGroup>
                    {this.props.status === "UPCOMING" ? (
                      <FormGroup row>
                        <Label sm={4}> </Label>

                        <Col sm={8}>
                          <Button
                            color="success"
                            onClick={() =>
                              this.props.startEvent(this.props._id)
                            }
                          >
                            Bắt đầu ngay
                          </Button>
                        </Col>
                      </FormGroup>
                    ) : null}

                    <FormGroup row>
                      <Label sm={4}> Tên sự kiện</Label>

                      <Col sm={8}>
                        <Input
                          name="title"
                          value={this.state.infor["title"]}
                          onChange={this.onFieldChanged}
                        />
                      </Col>
                    </FormGroup>

                    {/* Tổ chức */}
                    <FormGroup row>
                      <Label sm={4}>Tổ chức</Label>

                      <Col sm={8}>
                        <Input
                          value={this.state.infor["publisher"]}
                          type="text"
                          name="publisher"
                          defaultValue="Admin"
                          disabled
                        />
                      </Col>
                    </FormGroup>

                    {/* Địa điểm */}
                    <FormGroup row>
                      <Label sm={4}>Địa điểm</Label>

                      <Col sm={8}>
                        <Input
                          onChange={this.onFieldChanged}
                          value={this.state.infor["address"]}
                          name="address"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  {/* Người chia sẻ */}
                </Col>
                <Col className="EventEdit-img" xs="5">
                  {/* <img
										style={{ cursor: "pointer" }}
										src={`/resources/${this.props.filenames}`}
										className="event-edit-image"
										/> */}
                  {typeof this.state.infor.image[0] === "string" ? (
                    this.state.infor.image.length < 1 ? (
                      <div
                        className="EventEdit-img__placeholder"
                        onClick={() => this.inputImage.current.click()}
                      >
                        <span>+</span>
                      </div>
                    ) : this.state.infor.image.length < 2 ? (
                      <img
                        style={{ cursor: "pointer" }}
                        src={`/resources/${this.state.infor.image[0]}`}
                        alt="load"
                        onClick={() => this.inputImage.current.click()}
                      />
                    ) : (
                      <div
                        className="EventEdit-img__more"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.inputImage.current.click()}
                      >
                        <img
                          src={`/resources/${this.state.infor.image[0]}`}
                          alt="load"
                        />
                        <div>+{this.state.infor.image.length - 1}</div>
                      </div>
                    )
                  ) : this.state.infor.image.length < 1 ? (
                    <div
                      className="EventEdit-img__placeholder"
                      onClick={() => this.inputImage.current.click()}
                    >
                      <span>+</span>
                    </div>
                  ) : this.state.infor.image.length < 2 ? (
                    <img
                      style={{ cursor: "pointer" }}
                      src={URL.createObjectURL(this.state.infor.image[0])}
                      alt="newupload"
                      onClick={() => this.inputImage.current.click()}
                    />
                  ) : (
                    <div
                      className="EventEdit-img__more"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.inputImage.current.click()}
                    >
                      <img
                        src={URL.createObjectURL(this.state.infor.image[0])}
                        alt="newupload"
                      />
                      <div>+{this.state.infor.image.length - 1}</div>
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    ref={this.inputImage}
                    onClick={e => (e.target.value = null)}
                    onChange={this.handleImageChange}
                  />
                </Col>
              </Row>

              {/* Miêu tả sự kiện */}
              <Form>
                <FormGroup className="ml-4 pl-1">
                  <Label>Chia sẻ</Label>
                  <Select
                    name="sharer"
                    value={this.state.infor.multiSelect}
                    onChange={this.handleChange}
                    options={this.state.user}
                    //onChange={this.onFieldChanged}
                    isSearchable
                    isMulti
                  />
                </FormGroup>

                <FormGroup className="ml-4 pl-1">
                  <Label> Nội dung</Label>
                  <Input
                    onChange={this.onFieldChanged}
                    type="textarea"
                    name="description"
                    value={this.state.infor["description"]}
                    id="exampleText"
                  />
                </FormGroup>

                {/* Thời gian diễn ra */}
                <FormGroup className="ml-4 pl-1">
                  <Label> Thời gian diễn ra</Label>
                  <Row>
                    <Col xs="6">
                      <Input
                        id="starttime"
                        type="date"
                        placeholder="Click to select end date"
                        value={moment(this.state.infor["starttime"]).format(
                          "YYYY-MM-DD"
                        )}
                        name="starttime"
                        onChange={this.onFieldChanged}
                      />
                    </Col>
                    <Col xs="6">
                      <Input
                        id="endtime"
                        type="date"
                        placeholder="Click to select end date"
                        value={moment(this.state.infor["endtime"]).format(
                          "YYYY-MM-DD"
                        )}
                        name="endtime"
                        onChange={this.onFieldChanged}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                {/* Hạn chót đăng kí */}
                <FormGroup className="ml-4 pl-1">
                  <Label> Hạn chót đăng kí</Label>
                  <Row>
                    <Col xs="6">
                      <Input
                        id="deadline"
                        type="date"
                        value={moment(this.state.infor["deadline"]).format(
                          "YYYY-MM-DD"
                        )}
                        name="deadline"
                        onChange={this.onFieldChanged}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                {/* Liên hệ */}
                <FormGroup className="ml-4 pl-1">
                  <Label> Liên hệ</Label>
                  <Input
                    onChange={this.onFieldChanged}
                    value={this.state.infor["contact"]}
                    name="contact"
                  />
                </FormGroup>

                <FormGroup className="ml-4 pl-1">
                  <Label> Số lượng TNV</Label>
                  <Input
                    onChange={this.onFieldChanged}
                    value={this.state.infor["numVolunteers"]}
                    name="numVolunteers"
                    type="number"
                    min={this.props.volunteers.length}
                  />
                </FormGroup>
              </Form>
            </div>
          </div>
        </Row>
      );
    }

    return (
      <div style={{ marginTop: "1.3rem" }} className="widget-sidebar">
        <div className=" col">
          {edit}

          <Row>
            <Col sm={{ size: "auto", offset: 9 }}>
              <div className="btnEvent">
                {/* <Link to={`/eventMore/${this.props._id}`}> */}
                <Button onClick={this.onFormSubmit} color="success">
                  Cập nhật
                </Button>
                {/* </Link> */}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (username, userInfo) =>
    dispatch(authActions.updateUser(username, userInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEvent);
