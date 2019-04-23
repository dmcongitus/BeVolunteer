import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import user from '../../../images/user.png'
import {connect} from 'react-redux'
import './LeftSide.css';

const LeftSide = ({username}) => (
    
          <div className="sidebar1">
            <div className="logo">
              <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/57393041_305492127011755_8740904577945042944_n.jpg?_nc_cat=105&_nc_oc=AQn7GUnB8UXlqMTogNJWDlqNjMEYb8gBeMPWreuL7dXQQHbhb9R6_PFCvI5m-de4R8E&_nc_ht=scontent.fsgn2-1.fna&oh=70f6e9461f233111834a04094f2fa45e&oe=5D33B790" className="img-responsive center-block" alt="Logo"/>
          
              <h2 className="title-widget-sidebar">{username}</h2>
              
            </div>
            <br />
            <div className="left-navigation">
              <ul className="list">
                <h5><strong>CÁ NHÂN</strong></h5>
               
                <li ><NavLink activeStyle={{ color: 'green' }} to="/me">Thông tin cá nhân</NavLink></li>
                <li ><NavLink activeStyle={{ color: 'green' }} to="/history">Lịch sử hoạt động</NavLink></li>
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