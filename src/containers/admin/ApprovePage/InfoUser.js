import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";

class InfoUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Row>
        <Col>
            
          <img
            src={"resources/" + this.props.verifyImages[0]}
            className="img-Model"
          />
          
        </Col>
        <Col>
        <img
            src={"resources/" + this.props.verifyImages[1]}
            className="img-Model"
          />
        </Col>
        </Row>
        <Row style={{display:"flex", justifyContent:"center"}}>
            <Col xs="auto">
              <div className="item-column item-mb">
                <div>
                  <b className="m-3 tcl-1">Họ và tên:</b>
                </div>
                <div>
                  <b className="m-3  tcl-1">Ngày sinh:</b>
                </div>
                <div>
                  <b className="m-3  tcl-1">Giới tính:</b>
                </div>
                <div>
                  <b className="m-3  tcl-1">Số điện thoại</b>
                </div>
                <div>
                  <b className="m-3  tcl-1">Loại tài khoản</b>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <div className="item-column item-mb">
                <div>{this.props.name}</div>
                <div>{this.props.dob}</div>
                <div>{this.props.gender}</div>
                <div>{this.props.phone}</div>
                <div>{this.props.permission}</div>
              </div>
            </Col>
          </Row>
      </div>
    );
  }
}

export default InfoUser;
