import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Row, Col, Alert, Button } from "reactstrap";

import "./HistoryCard.css";

const HistoryCard = props => (
<Row className="postCard mr-5 ml-5">

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
            
             
                <Button className="mr-1 new-btn">
                  <i class="fas fa-lock icon-button" />Khóa bài
                </Button>
                <Button className="mr-1 donate-btn">
                  <i class="fas fa-trash-alt icon-button" />Xóa báo cáo
                </Button>
           
         <Button color="success" className="mr-1 success">
              <i class="fas fa-angle-double-right icon-button" />    Xem thêm
            </Button>
           
           
          </div>
        
        </Col>
      </Row>
      <Alert color="danger" style={{width:"100%"}}>
      
      <i class="fas fa-user"></i>
        Tôi nhận thấy bài viết này không đúng với sự thật, tôi đã đến đó
      </Alert>
      {/*/ cardbox-like */}
   
    {/*/ col-lg-6 */}
  </Row>
);

export default HistoryCard;
