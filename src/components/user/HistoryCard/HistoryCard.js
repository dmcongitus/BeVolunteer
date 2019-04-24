import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Row, Col, Alert } from "reactstrap";

import "./HistoryCard.css";

const HistoryCard = props => (
  <div>
    <div className="row postCard" style={{borderRadius: 5}}>
    <Alert className="Alert-historyCard" color="success">Đã xác thực</Alert>
    <Alert className="Alert-historyCard" color="primary">Đang xác thực</Alert>
    <Alert className="Alert-historyCard" color="danger">Xác thực không thành công</Alert>
      <div style={{ width: "100%" }}>
        <div >
          <div> 
            <div className="media">
              {/* START media*/}
              <a>
                <img
                  className="img-user-postCard rounded-circle"
                  src="https://photo-2-baomoi.zadn.vn/w1000_r1/2018_08_06_181_27170707/a5250170ac3745691c26.jpg"
                />
              </a>

              <div className="media-body">
                <p className="m-0">
                  {props.name}
                  <small>
                    <span style={{ marginLeft: "5px" }}>đã chia sẻ một</span>
                  </small>
                  <span style={{ marginLeft: "5px", color: "green" }}>
                    {props.type}
                  </span>
                  
                </p>
                <small>
                  <span>
                    <i className="fa fa-calendar" data-original-title title />{" "}
                    {new Date(props.createdAt).toLocaleTimeString()}
                    <i
                      style={{ marginLeft: "5px" }}
                      className="fas fa-map-marker-alt"
                    />{" "}
                    {props.address}
                  </span>
                </small>
                <small />
              </div>
            </div>
            {/*/ media */}
          </div>
          {/*/ cardbox-heading */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 60px'}}>
            <div style={{marginRight: '10px'}}>
                {props.filenames.map((filename) => <img  src={`/resources/${filename}`} style={{maxWidth: '100%', height: 'auto', borderRadius: 5, border: '1px solid gray'}} alt="Post album" />)}
              {/*/ cardbox-item */}
            </div>
            <div className="textMedia" >
                {props.description}
            </div>
          </div>

        
          {/*/ cardbox-like */}
        </div>
        {/*/ cardbox */}
      </div>
      {/*/ col-lg-6 */}
    </div>
    {/*/ row */}
  </div>
);

const mapStateToProps = ({ auth: { user: { name } } }) => ({ name });

export default connect(mapStateToProps)(HistoryCard);
