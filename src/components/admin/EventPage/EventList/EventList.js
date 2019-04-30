import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../../../../actions/auth.action';
import { Container, Row, Col, Alert } from "reactstrap";
import DatePicker from "react-datepicker";
import './EventList.css';
import moment from 'moment';
import profileIcon from '../../../../images/profile.png';
import cancelIcon from '../../../../images/cancel.png';
import editIcon from '../../../../images/edit.png';
import identityImage from '../../../../images/identity.png';
import { userInfo } from 'os';
import { postEvent } from "../../../../services/admin.service";

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroupAddon,
	InputGroup,
	Dropdown, 
	DropdownToggle,
	DropdownMenu, 
	DropdownItem
} from "reactstrap";

class EventList extends Component {
    constructor(props) {
        super(props)
        this.state = {
			type: "Sắp diễn ra"
        }
	}
	
	onTypeChange = (e) => {
        this.setState({ type: e.target.value });
	}
	

	// onFieldChanged = e => {
	// 	this.setState({ 
	// 		infor:{
	// 			...this.state.infor,
	// 		[e.target.name]: e.target.value 
	// 		}
	// 	});
	// };

    render() {
        if (this.state.isLoading) {
            return null;
        }

        return (
            <div className="widget-sidebar">
				<div className="NewPostBox col">
					<Row>
						<Alert style={{width: '100%'}} color="success">
							<Row>
								<Col xs="9">
									<img alt="profile_icon" src={profileIcon} /> DANH SÁCH SỰ KIỆN
								</Col>

								<Col xs="3">
									<FormGroup style={{ marginBottom: 0 }}>
										<Input className="typeButton" type="select" name="select" id="exampleSelect" onChange={this.onTypeChange} value={this.state.type}>
											<option value="Sắp diễn ra">Sắp diễn ra</option>
											<option value="Đang diễn ra">Đang diễn ra</option>
											<option value="Kết thúc">Đã kết thúc</option>
										</Input>
									</FormGroup>
								</Col>
							</Row>
						</Alert>
					</Row>
				
					<Row>
						<div className="event-form w-100 text-lg font-bold border-b border-solid border-grey-light" >            
							<div className="UpdateProfile" >
								{/* <section className="UpdateProfile__Header">
									<div className="UpdateProfile__Header__Left">
									<div>Thông tin cá nhân</div>
									<img alt="profile_icon" src={profileIcon} />
									</div>
									<div className="UpdateProfile__Header__Right">
										<img alt="authenticated?" src={cancelIcon} />
										<div>Chưa được xác thực</div>
									</div>
								</section> */}
								
								{/* Tên sự kiện */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon 
											className="btn-edit" 
											addonType="prepend">
											<Button outline color="success">Tên sự kiện</Button>
										</InputGroupAddon>
										<Input 
											onChange={this.onFieldChanged}
											name="title"/>
									</InputGroup>
								</div>

								{/* Tổ chức */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Tổ chức</Button>
										</InputGroupAddon>
										<Input
											type="text" 
											name="publisher"
											defaultValue="Admin" 
											disabled/>
									</InputGroup>
								</div>

								{/* Miêu tả sự kiện */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
											<Button outline color="success">Nội dung</Button>
										</InputGroupAddon>	
										<Input 
											onChange={this.onFieldChanged}
											type="textarea" 
											name="description" 
											id="exampleText"/>
									</InputGroup>
								</div>

								{/* Người chia sẻ */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Người chia sẻ</Button>
										</InputGroupAddon>
										<Input 
											onChange={this.onFieldChanged}
											name="sharer"/>
									</InputGroup>
								</div>

								{/* Địa điểm */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Địa điểm</Button>
										</InputGroupAddon>
										<Input 
											onChange={this.onFieldChanged}
											name="address"/>
									</InputGroup>
								</div>

								{/* Thời gian diễn ra */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Thời gian diễn ra</Button>
										</InputGroupAddon>
										
										<Input 												
											id="starttime"
											type="date"
											placeholder="Click to select start date"
											name="starttime"
											onChange={this.onFieldChanged}/>

										<Input 		
											id="endtime"										
											type="date"
											placeholder="Click to select end date"
											name="endtime"
											onChange={this.onFieldChanged}/>
									</InputGroup>
								</div>

								{/* Liên hệ */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Liên hệ</Button>
										</InputGroupAddon>
										<Input 
											onChange={this.onFieldChanged}
											name="contact"/>
									</InputGroup>
								</div>

								{/* Số lượng TNV */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Số lượng TNV</Button>
										</InputGroupAddon>
										<Input 
											type="number"
											onChange={this.onFieldChanged}
											name="num_volunteer"/>
									</InputGroup>
								</div>

								{/* Trạng thái sự kiện*/}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Trạng thái</Button>
										</InputGroupAddon>
										<Input
											onChange={this.onFieldChanged}
											name="statusEvent"
											id="exampleFormControlSelect1"
											type="select">
												<option>Chọn trạng thái</option>
												<option>Sắp diễn ra</option>
												<option>Đang diễn ra</option>
												<option>Kết thúc</option>
										</Input>
									</InputGroup>
								</div>

								{/* Hạn chót đăng kí */}
								<div className="checkInPost" style={{width: '100%'}}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
										
											<Button outline color="success">Hạn chót đăng kí</Button>
										</InputGroupAddon>
										<Input 
											id="deadline"											
											type="date"
											name="deadline"
											onChange={this.onFieldChanged}/>
									</InputGroup>
								</div>
										
								{/* <section className="UpdateProfile__Main" >
									<ul>										
										<li className="UpdateProfile__Main__FieldItem">
											<div className="UpdateProfile__Main__FieldName">Số điện thoại</div>
											<input className="UpdateProfile__Main__FieldValue" name="phone" ref={el => this.phone = el} onFocus={this.handleFocus} value={this.state.profiles["phone"]} onChange={this.handleChange} />
											<button onClick={this.handleEdit.bind(this, "phone")} className="UpdateProfile__Main__FieldEdit btn btn-light">
												<img src={editIcon} alt="Edit icon" />
											
											</button>
										</li>
										<li className="UpdateProfile__Main__FieldItem">
											<div className="UpdateProfile__Main__FieldName">Địa chỉ email</div>
											<input className="UpdateProfile__Main__FieldValue" name="email" ref={el => this.email = el} onFocus={this.handleFocus} value={this.state.profiles["email"]} onChange={this.handleChange} />
											<button onClick={this.handleEdit.bind(this, "email")} className="UpdateProfile__Main__FieldEdit btn btn-light">
												<img src={editIcon} alt="Edit icon" />
											
											</button>
										</li>
										
										<li className="UpdateProfile__Main__FieldItem">
											<div className="UpdateProfile__Main__FieldName">Ngày sinh</div>
											<input className="UpdateProfile__Main__FieldValue" name="dob" ref={el => this.dob = el} onFocus={this.handleFocus} value={this.state.profiles["dob"]} onChange={this.handleChange} />
											<button onClick={this.handleEdit.bind(this, "dob")} className="UpdateProfile__Main__FieldEdit btn btn-light">
												<img src={editIcon} alt="Edit icon" />
			
											</button>
										</li>
										<li className="UpdateProfile__Main__FieldItem">
											<div className="UpdateProfile__Main__FieldName">Địa chỉ</div>
											<input className="UpdateProfile__Main__FieldValue" name="address" ref={el => this.address = el} onFocus={this.handleFocus} value={this.state.profiles["address"]} onChange={this.handleChange} />
											<button onClick={this.handleEdit.bind(this, "address")} className="UpdateProfile__Main__FieldEdit btn btn-light">
												<img src={editIcon} alt="Edit icon" />
											
											</button>
										</li>
										<li className="UpdateProfile__Main__FieldItem">
											<div className="UpdateProfile__Main__FieldName">CMND</div>
											<div className="UpdateProfile__Main__FieldValue">
												<img src={this.state.profiles["identityCard"] || identityImage} alt="Identity" />
												<input type="file" accept="image/*" style={{ display: 'none' }} ref={el => this.identityCard = el} onClick={e => e.target.value = null} onChange={this.handleImageChange} />
												{this.state.profiles["identityCard"] === undefined && <div className="UpdateProfile__Main__FieldValue__Warning">
												<Alert color="danger">
												Cập nhật CMND để xác thực !!!
												</Alert></div>}
											</div>
											<button onClick={this.handleEdit.bind(this, "identityCard")} className="btn btn-light">
												<img src={editIcon} alt="Edit icon" height="20px"/>
								
											</button>
										</li>
										<li className="UpdateProfile__Main__FieldItem">
											<div className="UpdateProfile__Main__FieldName">Loại TK</div>
											<div className="type-user"  >
													Cá Nhân
											</div>
										</li>
									</ul>
								</section> */}
						
								{this.state.profileChanged && <div className="UpdateProfile__Footer">
							
								<Button className="UpdateProfile__Footer__Update" onClick={this.handleUpdate}>
									<i className="fas fa-check-circle ml-1"/>  Cập nhật
								</Button>
								<Button className="UpdateProfile__Footer__Cancel" onClick={this.handleCancel}>
									<i class="fas fa-trash-alt ml-1"/> Hủy
									</Button></div>}
							</div>
						</div>
					</Row>

					<Row>
						<Col sm={{ size: "auto", offset: 9 }}>
							<div className="btnPost">
								<Button 
									type="submit"
									onClick={this.onFormSubmit}
									color="success">Đăng tải</Button>
							</div>
						</Col>
					</Row>
				</div>			
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

const mapDispatchToProps = dispatch => ({
    updateUserInfo: (username, userInfo) => dispatch(authActions.updateUser(username, userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);