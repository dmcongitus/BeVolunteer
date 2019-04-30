import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Row, Col, Alert, Button } from "reactstrap";

import "./HistoryCard.css";

const HistoryCard = props => (
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
           {props.name}
          <small>
            <span className="ml-1">đã chia sẻ một</span>
          </small>
          <span className="ml-1">
            <b >{props.type === "Địa điểm"?<span className = "tcl-1">Địa điểm</span>
            :props.type === "Quyên góp"?<span className = "tcl-3">Quyên góp</span>
            :props.type === "Hoạt động"?<span className = "tcl-2">Quyên góp</span>
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

const mapStateToProps = ({ auth: { user: { name } } }) => ({ name });

export default connect(mapStateToProps)(HistoryCard);
