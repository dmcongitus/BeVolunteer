import React from "react";
import { NavLink, Link } from "react-router-dom";

import RightSideCard from "../RightSideCard/RightSideCard";

import "./RightSide.css";
import {getEvents} from "../../../../services/event.service"
class RightSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data :[]
    };
  }
  componentDidMount= async () => {
    const data = await getEvents(0)
    this.setState({ data: data.data.events }); 
    console.log("update State")
    console.log(this.state.data)
  }
  render() {
   
    return (
      <div className="side-body">
        <h2 className="title-side-body">
          <i class="fas fa-calendar-week" /> Sự kiện xắp diễn ra
        </h2>
        <div className="content-side-body">
        {console.log("render Start")  }
        {console.log(this.state.data)}
        {console.log("render End")  }
          {this.state.data.map(data=><RightSideCard {...data}/>
                    )          }
          <RightSideCard />
          {this.props.length > 3 ? null : null}
         
        </div>
      </div>
    );
  }
}

export default RightSide;