import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import user from '../../images/user.png'

import './LeftSide.css';

const LeftSide = (props) => (
    
          <div className="sidebar1">
            <div className="logo">
              <img src="http://lorempixel.com/output/people-q-g-64-64-1.jpg" className="img-responsive center-block" alt="Logo" />
          
              <h2 className="title-widget-sidebar">Dương Minh Công</h2>
              
            </div>
            <br />
            <div className="left-navigation">
              <ul className="list">
                <h5><strong>CÁ NHÂN</strong></h5>
               
                <li>Thông tin cá nhân</li>
                <li >Lịch sử</li>
                <li>Đang đăng ký</li>
              </ul>
              <br />
              <ul className="list">
                <h5><strong>CỘNG ĐỒNG</strong></h5>
                <li>Trang chủ</li>
                <li>Xếp Hạng</li>
     
        
              </ul>
            </div>
          </div>
     
    
);

export default LeftSide;