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

      <Alert style={{width: '100%'}} color="success">
      <Row>
      <Col xs="9">
      Tạo Bài Viết
      </Col>
      <Col xs="3">
      a
      </Col>
      </Row>
      
      </Alert>
    </Row>

    <Row>
      <Col xs="8">
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
      <Col xs="4">
      <div className="Newpost-img">
        <img
          src="https://lh3.googleusercontent.com/-ojLI116-Mxk/WM1ZIwdnuwI/AAAAAAAADeo/4K6VpwIPSfgsmlXJB5o0N8scuI3iW4OpwCJoC/w424-h318-n-rw/thumbnail6.jpg"
         
        />
      </div>
      </Col>
    </Row>
    
    <Row>
   
        <div className="checkInPost" style={{width: '100%'}}>
          <InputGroup >
            <InputGroupAddon addonType="prepend">
          
              <Button outline color="success">Tại</Button>
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
