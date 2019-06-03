import React from "react";
import { Col, Row } from "reactstrap";

function headerPost(props) {
  return (
    <Col className="header-col" xs="11">
      <Row className="item-center header-postCard pb-3">
        <Col xs="1">
          <div>
            <img
              className="img-user-postCard rounded-circle"
              src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
              alt="UserAvatar"
            />
          </div>
        </Col>
        <Col xs="11">
          <div className="ml-2">
            {props.userPost}
            <span className="ml-1 small">đã chia sẻ một</span>
            <span className="ml-1">
              <b>
                {props.type === "PLACE" ? (
                  <span className="tcl-2">Địa điểm</span>
                ) : props.type === "DONATION" ? (
                  <span className="tcl-3">Quyên góp</span>
                ) : props.type === "ACTIVITY" ? (
                  <span className="tcl-1">Sự kiện</span>
                ) : (
                  <span className="tcl-4">Kỉ niệm</span>
                )}
              </b>
            </span>
            <div className="small">
              <i className="fa fa-calendar" data-original-title title />
              {new Date(props.createdAt).toLocaleDateString()}
              <i className="fas fa-map-marker-alt ml-3" />
              {props.address}
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
}
export default headerPost;
