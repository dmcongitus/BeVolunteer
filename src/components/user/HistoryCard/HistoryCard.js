import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Row, Col, Alert } from "reactstrap";

import "./HistoryCard.css";

const HistoryCard = props => (
  <div>
    <div className="row postCard">
    <Alert className="Alert-historyCard" color="success">Đã xác thực</Alert>
    <Alert className="Alert-historyCard" color="primary">Đang xác thực</Alert>
    <Alert className="Alert-historyCard" color="danger">Xác thực không thành công</Alert>
      <div style={{ width: "100%" }}>
        <div >
          <div> 
            <div className="media">
              {/* START media*/}
              <a>
                <img
                  className="img-user-postCard rounded-circle"
                  src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                />
              </a>

              <div className="media-body">
                <p className="m-0">
                  Khoa Học Tự Nhiên
                  <small>
                    <span style={{ marginLeft: "5px" }}>đã chia sẻ một</span>
                  </small>
                  <span style={{ marginLeft: "5px", color: "green" }}>
                    Hoạt Động cá nhân
                  </span>
                  
                </p>
                <small>
                  <span>
                    <i className="fa fa-calendar" data-original-title title />{" "}
                    30 Juni 2014
                    <i
                      style={{ marginLeft: "5px" }}
                      className="fas fa-map-marker-alt"
                    />{" "}
                    450 Nguyễn Thị Minh Khai
                  </span>
                </small>
                <small />
              </div>
            </div>
            {/*/ media */}
          </div>
          {/*/ cardbox-heading */}
          <Row>
            <Col>
              <div>
                <img
                  className="img-fluid"
                  src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/1.jpg"
                  alt="Image"
                />
              </div>
              {/*/ cardbox-item */}
            </Col>
            <Col className="textMedia">
              <Alert color="success">
                Hôm nay giúp đỡ được một cụ già. Thật là vui quá ahihi Lần sau
                sẽ cố gắng giúp đỡ thật nhiều người nữa ahuhu!!
              </Alert>
            </Col>
          </Row>

        
          {/*/ cardbox-like */}
        </div>
        {/*/ cardbox */}
      </div>
      {/*/ col-lg-6 */}
    </div>
    {/*/ row */}
  </div>
);

export default HistoryCard;
