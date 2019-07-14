import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";
import newPostTranslations from "./translation.json";
import { withRouter } from "react-router";
import Resizer from "react-image-file-resizer";

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
import { Message } from "element-react";
import * as postServices from "../../../services/post.service";
import * as map from "../../../services/map.service"
const initialState = {
  image: [],
  description: "",
  address: "",
  type: "PERSONAL_ACTIVITY"
};

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.inputImage = createRef();
    this.props.addTranslation(newPostTranslations);
  }

  state = initialState;

  handleImageChange = e => {
    e.persist();
    // chia 1000 -> kb
    var size = 0;
    if (e.target.files !== undefined) {
      for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files[i];

        size += file.size;
      }
    }
    console.log(size);
    if (size < 10000000) {
      this.setState({ image: e.target.files });
    } else {
      Message.error("Tải ảnh thất bại, dung lượng tối đa là 10MB");
    }
  };

  onTypeChange = e => {
    this.setState({ type: e.target.value });
  };

  onFieldChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    
    var mapData = await map.getPlace(this.state.address)
    console.log(mapData);
    if(mapData.data !== undefined){
      if(mapData.data.status === "OK"){
        this.setState({address:mapData.data.results[0].formatted_address},()=>{

          postServices.createPost(this.state).then(({ data: { _id } }) => {
            postServices.updateImage(_id, this.state.image).then(() => {
              this.setState({ ...initialState });
              Message({
                message: "Tạo bài viết thành công.",
                type: "success"
              });
            });
          });
        })
        
      }else{
        Message.error("Địa chỉ không hợp lệ");
      }
    }
    
  };

  render() {
    const mem = <Translate id="newPost.memory">Kỉ niệm</Translate>;
    const add = <Translate id="newPost.address">Địa điểm</Translate>;
    return (
      <Col className="NewPostBox pr-3 lf-3" style={this.props.style}>
        <Row>
          <Alert style={{ width: "100%" }} className="header-1">
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col xs="9">
                <div className="text1">
                  <i className="fas fa-pencil-alt" />
                  <Translate id="newPost.new">Tạo Bài Viết</Translate>
                </div>
              </Col>
              <Col xs="3" className="pr-3 lf-3">
                <FormGroup style={{ marginBottom: 0 }}>
                  <Translate>
                    {({ translate }) => (
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        onChange={this.onTypeChange}
                        value={this.state.type}
                        className="pl-2 pr-2"
                      >
                        <option value="PERSONAL_ACTIVITY">
                          {translate("newPost.memory")}
                        </option>
                        <option value="PLACE">
                          {translate("newPost.address")}
                        </option>
                      </Input>
                    )}
                  </Translate>
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
                  src={"/resources/" + this.props.user.avatar}
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
                      maxLength="200"
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
            ) : this.state.image.length < 2 ? (
              <img
                style={{ cursor: "pointer" }}
                src={URL.createObjectURL(this.state.image[0])}
                alt="fucku"
                onClick={() => this.inputImage.current.click()}
              />
            ) : (
              <div
                className="Newpost-img__more"
                style={{ cursor: "pointer" }}
                onClick={() => this.inputImage.current.click()}
              >
                <img
                  src={URL.createObjectURL(this.state.image[0])}
                  alt="fucku"
                />
                <div>+{this.state.image.length - 1}</div>
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

        <Row>
          <div className="checkInPost" style={{ width: "100%" }}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button outline color="success">
                  <Translate id="newPost.address">Tại</Translate>
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
            <i className="fas fa-upload icon-button" />
            <Translate id="newPost.post">Đăng tải</Translate>
          </Button>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

// export default connect(mapStateToProps)(NewPost);

export default withRouter(connect(mapStateToProps)(withLocalize(NewPost)));
