import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import RightSideCard from '../RightSideCard/RightSideCard'

import './RightSide.css';

const RightSide = (props) => (
          
                  <div className="widget-sidebar">
                    <h2 className="title-widget-sidebar">// Sự kiện xắp diễn ra</h2>
                    <div className="content-widget-sidebar">
                      <RightSideCard></RightSideCard>
                      <RightSideCard></RightSideCard>
                      <RightSideCard></RightSideCard>
                    </div>
                  </div>          
);

export default RightSide;