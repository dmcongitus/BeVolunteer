import React from "react";
import { Col, Row } from "reactstrap";
import "./HeaderPost.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class headerPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
     
    };

    this.toggle = this.toggle.bind(this);
   
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
 

  render() {
  return (
    <Col className="header-col" xs="11">
      <Row className="item-center header-postCard pb-3">
        <Col xs="1">
          <div>
            <img
              className="img-user-postCard rounded-circle"
              src={"/resources/"+this.props.user.avatar}
              alt="UserAvatar"
              style={{}}
              onClick={this.toggle}
            />
          </div>
          {this.state.modal?( <Modal isOpen="true" toggle={this.toggle} className={this.props.className}>
          <ModalBody>
          <img
              className="img-slide-postCard"
              src={"/resources/"+this.props.user.avatar}
              alt="UserAvatar"
              style={{}}
              onClick={this.toggle}
            />
          </ModalBody>
         
        </Modal>):null}
         
        </Col>
        <Col xs="auto">
          <div className="ml-2">
            <span className= {this.props.user.permission}>
            {this.props.user.name} 
            </span>              
            {this.props.user.isVerified === true && (<i className="ml-1 small fas fa-check-circle check-user"></i>)}
            
            <span className="ml-1 small">đã chia sẻ một</span>
            <span className="ml-1">
              <b>
                {this.props.type === "PLACE" ? (
                  <span className="tcl-2">Địa điểm</span>
                ) : this.props.type === "DONATION" ? (
                  <span className="tcl-3">Quyên góp</span>
                ) : this.props.type === "ACTIVITY" ? (
                  <span className="tcl-1">Sự kiện</span>
                ) : (
                  <span className="tcl-4">Kỉ niệm</span>
                )}
              </b>
            </span>
            <div className="small">
              <i className="fa fa-calendar" data-original-title title />
              {new Date(this.props.createdAt).toLocaleDateString()}
              <i className="fas fa-map-marker-alt ml-3" />
              {this.props.address}
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
}
}
export default headerPost;


