import React, { Component } from "react";
import Info from "../../../components/user/Info/Info";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import "./MedalPage.css";

import hc1 from "../../../images/hc1.png";
import hc2 from "../../../images/hc2.png";
import hc3 from "../../../images/hc3.png";
import hc4 from "../../../images/hc4.png";
import hc5 from "../../../images/hc5.png";
class MedalPage extends Component {
  render() {
    return (
      <PageLayout title="Danh Hiệu">
        <div className="body-medal">
        {/* start huân chương */}
          <div className="medal-card">
            <div className="item-column">
              <img src={hc1} className="medal-rank" />
              <b><div className="item-mid mt-2 tcl-1">Nhà đầu tư</div></b>
            </div>
          </div>
           {/* end huân chương */}
            {/* start huân chương */}
          <div className="medal-card">
            <div className="item-column">
              <img src={hc2} className="medal-rank" />
              <b><div className="item-mid mt-2 tcl-1">Đại gia</div></b>
            </div>
          </div>
           {/* end huân chương */}
            {/* start huân chương */}
          <div className="medal-card">
            <div className="item-column">
              <img src={hc3} className="medal-rank" />
              <b><div className="item-mid mt-2 tcl-1">Người công chúng</div></b>
            </div>
          </div>
           {/* end huân chương */}
            {/* start huân chương */}
          <div className="medal-card">
            <div className="item-column">
              <img src={hc4} className="medal-rank" />
              <b><div className="item-mid mt-2 tcl-1">Nghiêm túc</div></b>
            </div>
          </div>
           {/* end huân chương */}
            {/* start huân chương */}
          <div className="medal-card">
            <div className="item-column">
              <img src={hc5} className="medal-rank" />
              <b><div className="item-mid mt-2 tcl-1">Tiền đầy túi</div></b>
            </div>
          </div>
           {/* end huân chương */}
          
         
          <div />
     
        </div>
      </PageLayout>
    );
  }
}

export default MedalPage;
