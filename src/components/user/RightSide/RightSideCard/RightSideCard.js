import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./Post.css";

const RightSideCard = props => (
  <div>
    <li className="recent-post">
      <div className="post-img">
        <img
          src="https://lh3.googleusercontent.com/-ojLI116-Mxk/WM1ZIwdnuwI/AAAAAAAADeo/4K6VpwIPSfgsmlXJB5o0N8scuI3iW4OpwCJoC/w424-h318-n-rw/thumbnail6.jpg"
          className="img-responsive"
        />
      </div>
      <a href="#">
        <h6>Giúp đỡ cũ già tại ngã 6 lý thái tổ</h6>
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