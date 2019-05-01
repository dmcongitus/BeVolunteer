import React, { Component, createRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "reactstrap";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup
} from "reactstrap";
import "./NewPost.css";

import * as postServices from "../../../services/post.service";
const initialState = {
  image: [],
  description: "",
  address: "",
  type: "Hoạt động cá nhân"
};

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.inputImage = createRef();
  }

  state = initialState;

  handleImageChange = e => {
    e.persist();
    this.setState({ image: e.target.files });
  };

  onTypeChange = e => {
    this.setState({ type: e.target.value });
  };

  onFieldChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    postServices.createPost(this.state).then(() => {
      this.setState({ ...initialState });
      alert("Tạo bài viết thành công");
    });
  };

  render() {
    return (
      <Col className="NewPostBox" style={this.props.style}>
        <Row>
          <Alert style={{ width: "100%" }} className="header-1">
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col xs="9">
                <div className="text1">
                  <i class="fas fa-pencil-alt" />
                  Tạo Bài Viết
                </div>
              </Col>
              <Col xs="3">
                <FormGroup style={{ marginBottom: 0 }}>
                <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={this.onTypeChange}
                    value={this.state.type}
                    
                  >
                    <option value="Hoạt động cá nhân">Cá nhân</option>
                    <option value="Địa điểm">Địa điểm</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Alert>
        </Row>

        <Row>
          <Col xs="8">
            <Row style={{ height: "100%" }}>
              <Col xs="2">
                <img
                  className="img-user-postCard rounded-circle"
                  src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                  alt="temp"
                />
              </Col>
              <Col xs="10">
                <Form style={{ height: "100%" }}>
                  <FormGroup>
                    <Input
                      className="TextBox-input"
                      type="textarea"
                      name="description"
                      id="exampleText"
                      placeholder="Hãy nói gì về bức ảnh này."
                      style={{ height: "100%", width: "100%" }}
                      value={this.state.description}
                      onChange={this.onFieldChanged}
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xs="4" className="Newpost-img">
            {this.state.image.length < 1 ? (
              <div
                className="Newpost-img__placeholder"
                onClick={() => this.inputImage.current.click()}
              >
                <span>+</span>
              </div>
            ) : (this.state.image.length < 2 ? (
              <img style={{cursor: "pointer"}} src={URL.createObjectURL(this.state.image[0])} alt="fucku"   onClick={() => this.inputImage.current.click()}/>
              ) : (<div className="Newpost-img__more">
              <img style={{cursor: "pointer"}} src={URL.createObjectURL(this.state.image[0])} alt="fucku"   onClick={() => this.inputImage.current.click()}/>
                  <div>+{this.state.image.length - 1}</div>
              </div>))}
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

        <Row>
          <div className="checkInPost" style={{ width: "100%" }}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button outline color="success">
                  Tại
                </Button>
              </InputGroupAddon>
              <Input
                name="address"
                value={this.state.address}
                onChange={this.onFieldChanged}
              />
            </InputGroup>
          </div>
        </Row>

        <Row className="botForm">
          <Button className="success mr-3 mb-10" onClick={this.onSubmit}>
            <i class="fas fa-upload icon-button" />Đăng tải
          </Button>
        </Row>
      </Col>
    );
  }
}

export default NewPost;
