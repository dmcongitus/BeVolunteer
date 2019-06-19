import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../../../actions/auth.action";
import { Container, Row, Col, Alert } from "reactstrap";
import DatePicker from "react-datepicker";
import "./NewEvent.css";
import moment from "moment";
import Select from "react-select";
import profileIcon from "../../../images/profile.png";
import cancelIcon from "../../../images/cancel.png";
import editIcon from "../../../images/edit.png";
import identityImage from "../../../images/identity.png";
import { userInfo } from "os";
import { getAllUsers } from "../../../services/user.service";
import { createEvent } from "../../../services/event.service";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.inputImage = createRef();
    this.state = {
      infor: {
        permission: this.props.permission,
        title: "",
        publisher: this.props.name,
        sharer: [],
        description: "",
        address: "",
        starttime: "",
        endtime: "",
        contact: "",
        numVolunteers: 1,
        deadline: "",
        isDelete: false,
        image: [],
        multiSelect: []
      },
      statusForm: false,
      isOpenErrorModal: false,
      messageError: "",
      user: [],
      selectedOption: null
    };
  }

  componentDidMount = async () => {
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

  handleChange = selectedOption => {
    this.setState({
      infor: {
        ...this.state.infor,
        multiSelect: selectedOption
      }
    });
  };

  handleImageChange = e => {
    e.persist();
    console.log(e);
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
    await this.setState({
      infor: {
        ...this.state.infor,
        sharer: this.state.infor.multiSelect.map(s => s.value)
      }
    });

    alert(this.checkFormPost(this.state).message);
    e.preventDefault();
    try {
      const data = await createEvent({ ...this.state.infor });
      console.log(data);
    } catch (error) {
      console.error(error);
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
      state.infor.numVolunteers === "" ||
      state.infor.state === "" ||
      state.infor.image.length === 0 ||
      state.infor.deadline === ""
    ) {
      return {
        statusForm: false,
        message: "Value cannot be blank"
      };
    }
    //Kiểm tra số lượng tình nguyện viên có từ 1 trở lên hay không?
    else if (state.infor.numVolunteers < 1) {
      return {
        statusForm: false,
        message: "Quantity of volunteer have to larger than 1"
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

    return (
      <div style={{ marginTop: "1.3rem" }} className="">
        <div className="">
          <Row>
            <div className="event-form w-100 text-lg font-bold border-b border-solid border-grey-light">
              <div className="NewEvent">
                <Row className="Row1" style={{ width: "100%" }}>
                  <Col xs="7">
                    {/* Tên sự kiện */}
                    <Col>
                      <FormGroup row>
                        <Label sm={4}> Tên sự kiện</Label>

                        <Col sm={8}>
                          <Input onChange={this.onFieldChanged} name="title" />
                        </Col>
                      </FormGroup>

                      {/* Tổ chức */}

                      <FormGroup row>
                        <Label sm={4}>Tổ chức</Label>

                        <Col sm={8}>
                          <Input
                            type="text"
                            name="publisher"
                            defaultValue={this.state.infor["publisher"]}
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
                            name="address"
                          />
                        </Col>
                      </FormGroup>

                      {/* Người chia sẻ */}
                    </Col>
                  </Col>
                  <Col className="NewEvent-img" xs="5">
                    {this.state.infor.image.length < 1 ? (
                      <div
                        className="NewEvent-img__placeholder"
                        onClick={() => this.inputImage.current.click()}
                      >
                        <span>+</span>
                      </div>
                    ) : this.state.infor.image.length < 2 ? (
                      <img
                        style={{ cursor: "pointer" }}
                        src={URL.createObjectURL(this.state.infor.image[0])}
                        alt="fucku"
                        onClick={() => this.inputImage.current.click()}
                      />
                    ) : (
                      <div className="NewEvent-img__more">
                        <img
                          style={{ cursor: "pointer" }}
                          src={URL.createObjectURL(this.state.infor.image[0])}
                          alt="fucku"
                          onClick={() => this.inputImage.current.click()}
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
                      id="exampleText"
                    />
                  </FormGroup>
                  <FormGroup className="ml-4 pl-1">
                    <Label> Thời gian diễn ra</Label>
                    <Row>
                      <Col xs="6">
                        <Input
                          id="starttime"
                          type="date"
                          placeholder="Click to select start date"
                          name="starttime"
                          onChange={this.onFieldChanged}
                        />
                      </Col>
                      <Col xs="6">
                        <Input
                          id="endtime"
                          type="date"
                          placeholder="Click to select end date"
                          name="endtime"
                          onChange={this.onFieldChanged}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup className="ml-4 pl-1">
                    <Label> Hạn chót đăng kí</Label>
                    <Row>
                      <Col xs="6">
                        <Input
                          id="deadline"
                          type="date"
                          name="deadline"
                          onChange={this.onFieldChanged}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup className="ml-4 pl-1">
                    <Label> Liên hệ</Label>

                    <Input onChange={this.onFieldChanged} name="contact" />
                  </FormGroup>
                  <FormGroup className="ml-4 pl-1">
                    <Label> Số lượng TNV</Label>

                    <Input
                      type="number"
                      onChange={this.onFieldChanged}
					  name="numVolunteers"
					  
					  min = {1}
                    />
                  </FormGroup>
                </Form>

                {this.state.profileChanged && (
                  <div className="NewEvent__Footer">
                    <Button
                      className="NewEvent__Footer__Update"
                      onClick={this.handleUpdate}
                    >
                      <i className="fas fa-check-circle ml-1" /> Cập nhật
                    </Button>
                    <Button
                      className="NewEvent__Footer__Cancel"
                      onClick={this.handleCancel}
                    >
                      <i className="fas fa-trash-alt ml-1" /> Hủy
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Row>

          <Row>
            <Col sm={{ size: "auto", offset: 9 }}>
              <div className="btnEvent">
                <Button
                  type="submit"
                  onClick={this.onFormSubmit}
                  color="success"
                >
                  Đăng tải
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (username, userInfo) =>
    dispatch(authActions.updateUser(username, userInfo))
});

const mapStateToProps = ({
  auth: {
    user: { name, permission }
  }
}) => ({ name, permission });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEvent);
