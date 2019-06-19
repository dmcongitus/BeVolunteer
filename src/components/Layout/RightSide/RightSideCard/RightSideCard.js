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
  <div>
    <li className="recent-post">
      <Row className="ml-0">
        <Col xs="6" className="pl-0 pr-3">
          <div className="post-img">
            <img
              src={"/resources/" + props.publisher.avatar}
              className="img-responsive"
            />
          </div>
        </Col>
        <Col xs="6" className="pl-0 pr-2">
          
          <Link to={`/eventMore/${props._id}`}>
            <h6>{props.title}</h6>
            </Link>
          
          <p>
            <small>
              <i className="fa fa-calendar" />
              {getDate(props.deadline)}
            </small>
          </p>
        </Col>
      </Row>
    </li>
    <hr />
  </div>
);

export default RightSideCard;
