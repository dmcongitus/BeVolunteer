import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "reactstrap";

import "./PostCard.css";

const PostCard = props => (
  <div>
    <div className="row postCard" style={{borderRadius: 5}}>
      <div style={{ width: "100%" }}>
        <div >
          <div> 
            <div className="media">
              {/* START media*/}
              <a>
                <img
                  className="img-user-postCard rounded-circle"
                  src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                  alt="UserAvatar"
                />
              </a>

              <div className="media-body">
                <p className="m-0">
                  {props.name}
                  <small>
                    <span style={{ marginLeft: "5px" }}>đã chia sẻ một</span>
                  </small>
                  <span style={{ marginLeft: "5px", color: "green" }}>
                    {props.type}
                  </span>
                </p>
                <small>
                  <span>
                    <i className="fa fa-calendar" data-original-title title />{" "}
                    {new Date(props.createdAt).toLocaleTimeString()}
                    <i
                      style={{ marginLeft: "5px" }}
                      className="fas fa-map-marker-alt"
                    />{" "}
                    {props.address}
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
              {/* <div>
                {props.filenames.map((filename) => <img  src={`/resources/${filename}`} style={{maxWidth: '100%', height: 'auto', borderRadius: 5, border: '1px solid gray'}} alt="Post album" />)}

              </div> */}
              {/*/ cardbox-item */}
            </Col>
            <Col className="textMedia">
                {props.description}
              <Alert color="success">
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

export default PostCard;
