import React from "react";
import { NavLink, Link } from "react-router-dom";

import RightSideCard from "../RightSideCard/RightSideCard";

import "./RightSide.css";

const RightSide = props => (
  <div className="side-body">
    <h2 className="title-side-body">
      <i class="fas fa-calendar-week" /> Sự kiện xắp diễn ra
    </h2>
    <div className="content-side-body">
      {props.length > 3 ? null : null}
      <RightSideCard />
      <RightSideCard />
      <RightSideCard />
    </div>
  </div>
);

export default RightSide;
