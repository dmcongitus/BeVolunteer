import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Row, Col, Alert, Button } from "reactstrap";

import "./PostCard.css";

const PostCard = props => (
  <Row className="postCard">
    <Col className="header-col">
      <Row className="item-center header-postCard pb-3">
        <div>
          <img
            className="img-user-postCard rounded-circle"
            src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
            alt="UserAvatar"
          />
        </div>
        <div className="ml-2">
          Dương Minh Công {props.name}
          <small>
            <span className="ml-1">đã chia sẻ một</span>
          </small>
          <span className="ml-1">
            <b >{props.type === "Địa điểm"?<span className = "tcl-2">Địa điểm</span>
            :props.type === "Quyên góp"?<span className = "tcl-3">Quyên góp</span>
            :props.type === "Hoạt động"?<span className = "tcl-1">Hoạt động</span>
            :<span className = "tcl-4">{props.type}</span>
            }
            
            </b>
          </span>
          <div>
            <small>
              <span>
                <i className="fa fa-calendar" data-original-title title />{" "}
                {new Date(props.createdAt).toLocaleTimeString()}
                <i
                  style={{ marginLeft: "5px" }}
                  className="fas fa-map-marker-alt ml-3 mr-1"
                />{" "}
                {props.address}
              </span>
            </small>
          </div>
        </div>
      </Row>
    </Col>
    <div style={{ width: "100%" }}>
      <Row>
        <Col>
          <div>
            {props.filenames.map(filename => (
              <img
                src={`/resources/${filename}`}
                className="post-album"
                alt="Post album"
              />
            ))}
          </div>

          {/*/ cardbox-item */}
        </Col>

        <Col className="textMedia">
          <Alert color="success">{props.description}</Alert>

          <div className="item-right">
            {props.type === "Hoạt động" && (
              <div>
                <Button className="mr-1 add-btn">
                  <i class="fas fa-angle-double-right icon-button" />Tham gia
                </Button>
              </div>
            )}
            {props.type === "Địa điểm" && (
              <div>
                <Button className="mr-1 new-btn">
                  <i class="fas fa-edit icon-button" />Tạo event
                </Button>
              </div>
            )}
            {props.type === "Quyên góp" && (
              <div>
                <Button className="mr-1 donate-btn">
                  <i class="fas fa-donate icon-button" />Quyên góp
                </Button>
              </div>
            )}
            <Button color="success" className="mr-1 success">
              <i class="fas fa-angle-double-right icon-button" />Xem Thêm
            </Button>
          </div>
        </Col>
      </Row>

      {/*/ cardbox-like */}
    </div>
    {/*/ col-lg-6 */}
  </Row>
);

export default PostCard;
