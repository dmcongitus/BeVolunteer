import React from "react";
import { NavLink, Link } from "react-router-dom";

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
      <a>
        <h6>Giúp đỡ cụ già tại ngã 6 lý thái tổ</h6>
      </a>
      <p>
        <small>
          <i className="fa fa-calendar" data-original-title title /> 30 Juni
          2014
        </small>
      </p>
    </li>
    <hr />
  </div>
);

export default RightSideCard;
