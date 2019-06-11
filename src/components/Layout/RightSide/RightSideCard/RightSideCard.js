import React from "react";
import { NavLink, Link } from "react-router-dom";
<<<<<<< .merge_file_a01056

import "./RightSideCard.css";

const RightSideCard = props => (
  <div>
    <li className="recent-post">
      <div className="post-img">
        <img
          src="https://static.ybox.vn/2015/12/30/o-HELPING-OTHERS-facebook.jpg"
          className="img-responsive"
        />
      </div>
      <a >
        <h6>Giúp đỡ cụ già tại ngã 6 lý thái tổ</h6>
      </a>
      <p>
        <small>
          <i className="fa fa-calendar" data-original-title title /> 30 Juni
          2014
        </small>
      </p>
=======
import { Row, Col } from "reactstrap";
import "./RightSideCard.css";

const getDate = date => {
  let current_datetime = new Date(date);
  let formatted_date =
    current_datetime.getDate() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getFullYear();
  return formatted_date;
};
const RightSideCard = props => (
  

  <div>
    <li className="recent-post">
      <Row className = "ml-0">
      <Col xs = "6" className = "pl-0 pr-3">
       
        <div className="post-img">
        <img
          src={"/resources/"+props.publisher.avatar}
          className="img-responsive"
        />
      </div>
        
     
      </Col>
      <Col xs = "6" className = "pl-0 pr-2">
      
      <a>
        <h6>{props.title}</h6>
      </a>
      <p>
        <small>
          <i className="fa fa-calendar" data-original-title title /> {getDate(props.deadline)}
        </small>
      </p>

      </Col>
      </Row>
      
      
>>>>>>> .merge_file_a10528
    </li>
    <hr />
  </div>
);

export default RightSideCard;
