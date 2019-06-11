<<<<<<< .merge_file_a11232
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import RightSideCard from '../RightSideCard/RightSideCard'

import './RightSide.css';

const RightSide = (props) => (
          
                  <div className="side-body">
                    <h2 className="title-side-body"><i class="fas fa-calendar-week"></i> Sự kiện xắp diễn ra</h2>
                    <div className="content-side-body">
                      <RightSideCard></RightSideCard>
                      <RightSideCard></RightSideCard>
                      <RightSideCard></RightSideCard>
                    </div>
                  </div>          
);

export default RightSide;
=======
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
          <i class="fas fa-calendar-week" /> Sự kiện xắp diễn ra
        </div>
        <div className="content-side-body">
         

         {(this.state.data.map(data => (
            <RightSideCard {...data} />
          )))}
        </div>
      </div>
    );
  }
}

export default RightSide;
>>>>>>> .merge_file_a10208
