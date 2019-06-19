import React from "react";
import { NavLink, Link } from "react-router-dom";

import RightSideCard from "../RightSideCard/RightSideCard";

import "./RightSide.css";
import { getEvents } from "../../../../services/event.service";
class RightSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount = async () => {
    const data = await getEvents(0);
    this.setState({ data: data.data.events });
   
  };
  
  render() {
    return (
      <div className="side-body">
        <div className="title-side-body">
          <i className="fas fa-calendar-week" /> Sự kiện sắp diễn ra
        </div>
        <div className="content-side-body">
         

         {(this.state.data.map((data,index) => (
           index<4 &&
            <RightSideCard {...data} key={data._id}/>
          )))}
        </div>
      </div>
    );
  }
}

export default RightSide;
