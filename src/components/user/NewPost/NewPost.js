import React from "react";
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

const NewPost = props => (
  <div className="NewPostBox col">
    <Row>
      <Alert style={{width: '100%'}} color="success">Tạo Bài Viết</Alert>
    </Row>

    <Row>
      <Col xs="9">
        <Row >
        <Col xs="2">

          <img
            className="img-user-postCard rounded-circle"
            src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
          />
        </Col>
        <Col xs="10">

          <Form >
            <FormGroup >
              <Input
                className="TextBox-input"
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="Hãy nói gì về bức ảnh này."
                style={{height: '100px', width:'100%'}}
              />
            </FormGroup>
          </Form>
        </Col>
        </Row>
      </Col>
      <Col xs="3">
        <img
          id="blah"
          className="imagePost-input"
          src="http://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Photo-icon.png"
        />
      </Col>
    </Row>
    <Row>
   
        <div className="checkInPost" style={{width: '100%'}}>
          <InputGroup >
            <InputGroupAddon addonType="prepend" >
              <Button color="primary">Tại</Button>
            </InputGroupAddon>
            <Input />
          </InputGroup>
        </div>
   
    </Row>
    <Row class="float-right">
      <Col sm={{ size: "auto", offset: 9 }}>
        <div className="btnPost">
          <Button color="success">Đăng tải</Button>
        </div>
      </Col>
    </Row>
  </div>
);

export default NewPost;
