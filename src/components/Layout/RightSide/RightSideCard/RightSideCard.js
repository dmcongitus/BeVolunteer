import React from "react";
import { NavLink, Link } from "react-router-dom";
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
  
  console.log("thís í test"),
  console.log(props),
  <div>
    <li className="recent-post">
      <Row>
      <Col xs = "6" className = "pl-3 pr-3">
       
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
      
      
    </li>
    <hr />
  </div>
);

export default RightSideCard;
