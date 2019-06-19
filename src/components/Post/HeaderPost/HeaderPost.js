import React from "react";
import { Col, Row } from "reactstrap";
import "./HeaderPost.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Input
} from "reactstrap";
import format from 'date-fns/format';
class headerPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownOpen: false,
      modalReport: false,
      reportText: ""
    };
    this.toggle = this.toggle.bind(this);
    this.toggleReport = this.toggleReport.bind(this);
    this.toggleSuccessReport = this.toggleSuccessReport.bind(this);
    this.toggleMenuPost = this.toggleMenuPost.bind(this);
  }
  toggle(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggleReport() {
    this.setState(prevState => ({
      modalReport: !prevState.modalReport
    }));
  }

  toggleSuccessReport() {
    this.setState(prevState => ({
      modalReport: !prevState.modalReport
    }));
    if(this.props.objectModel === "EVENT"){
       this.props.successReport(this.props.reporter,this.props.object, "Event", this.state.reportText )
    }else{
      this.props.successReport(this.props.reporter,this.props.object, "Post", this.state.reportText )
    }
   
  }
  toggleMenuPost() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Row>
        <Col className="header-col pr-0" xs="11">
          <Row className="item-center header-postCard pb-3">
            <Col xs="1">
    
              <div>
             
                <img
                  className="img-user-postCard rounded-circle"
                  src={"/resources/" + this.props.user.avatar}
                  alt="UserAvatar"
                  style={{cursor:"pointer"}}
                  onClick={this.toggle}
                />
               
              </div>
              {this.state.modal ? (
                <Modal
                  isOpen="true"
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalBody>
                    <img
                      className="img-slide-postCard"
                      src={"/resources/" + this.props.user.avatar}
                      alt="UserAvatar"
                      style={{}}
                      onClick={this.toggle}
                    />
                  </ModalBody>
                </Modal>
              ) : null}
            </Col>
            <Col xs="auto">
              <div className="ml-3">
                <span className={this.props.user.permission}>
                  {this.props.user.name}
                </span>
                
                  {this.props.user.isVerified === true && (
                  <i className="ml-1 small fas fa-check-circle check-user" />
                )}
                {(this.props.user.permission === "UNIT_ADMIN" ||this.props.user.permission === "SUPER_ADMIN" || this.props.user.permission === "CONTENT_MOD") ? (
                  <i className="ml-1 small fas fa-shield-alt" />
                  
                ):null}
               
                

                {/* {(this.props.publisher.permission === "CONTENT_MOD" ||this.props.publisher.permission === "UNIT_MOD" ||this.props.publisher.permission === "SUPER_ADMIN") ? (
                  <i className="ml-1 small fas fa-shield-alt" />
                  
                ):null} */}
                <span className="ml-1 small">đã chia sẻ một</span>
                <span className="ml-1">
                  <b>
                    {this.props.type === "PLACE" ? (
                      <span className="tcl-2">Địa điểm</span>
                    ) : this.props.type === "DONATION" ? (
                      <span className="tcl-3">Quyên góp</span>
                    ) : this.props.type === "EVENT" ? (
                      <span>
                          
                      <span className="tcl-1 mr-2">Sự kiện</span>
                      {this.props.status==="UPCOMING"?<i className="fas fa-user-plus"></i>:null}
                      {this.props.status==="ONGOING"?<i className="fas fa-running"></i>:null}
                      {this.props.status==="FINISHED"?<i className="fas fa-ban"></i>:null}
                      </span>
                      
                     
                    ) : (
                      <span className="tcl-4">Kỉ niệm</span>
                    )}
                  </b>
                  {this.props.type === "EVENT" && this.props.typePage=="more"?(<span className="ml-2 tcl-2">
                      {this.props.title}
                  </span>):null

                  }
                </span>
                <div className="small">
                  <i className="fa fa-calendar"/>
                  {format(new Date(this.props.createdAt), "DD/MM/YYYY")}
        
                  <i className="fas fa-map-marker-alt ml-3" />
                  {this.props.address}
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs="1" className="p-0 pr-3">
          <div className="menu-post">
            {this.props.admin !== true ?(
            <Dropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleMenuPost}
            >
              <DropdownToggle
                tag="span"
                // onClick={() => {this.toggleMenuPost(); this.toggleReport()}}
                  onClick={this.toggleMenuPost}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
              >
                <i className="fas fa-bars" />
              </DropdownToggle>
              <DropdownMenu className="menu-post-item p-1">
                <div onClick={this.toggleReport}>
                  <i className="fas fa-bug ml-3" />
                  Báo cáo
                </div>
              </DropdownMenu>
            </Dropdown>):null
            }
            {this.state.modalReport && (
              <Modal isOpen="true" toggle={this.toggleReport}>
                <ModalHeader toggle={this.toggleReport}>
                  Báo cáo bài viết
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="textarea"
                    name="reportText"
                    placeholder="Hãy cho chúng tôi biết điều gì đang xảy ra?"
                    rows={5}
                    onChange={this.onChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    className="mr-1"
                    onClick={this.toggleSuccessReport}
                  >
                    <i className="fas fa-bug icon-button" /> Báo cáo
                  </Button>
                  <Button
                    color="success"
                    className="mr-1"
                    onClick={this.toggleReport}
                  >
                    <i className="fas fa-trash icon-button" /> Hủy
                  </Button>
                </ModalFooter>
              </Modal>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}
export default headerPost;
