import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../../../../actions/auth.action';
import { Container, Row, Col, Alert } from "reactstrap";
import DatePicker from "react-datepicker";
import './EditEvent.css';
import Moment from 'react-moment';
import moment from 'moment';
import profileIcon from '../../../../images/profile.png';
import cancelIcon from '../../../../images/cancel.png';
import editIcon from '../../../../images/edit.png';
import identityImage from '../../../../images/identity.png';
import { userInfo } from 'os';
import { editEvent } from "../../../../services/event.service";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Dropdown,
    DropdownMenu,
	DropdownToggle, Input,
	InputGroupAddon,
	InputGroup,
} from "reactstrap";

import {

} from "reactstrap";

class EditEvent extends Component {
    constructor(props) {
		super(props);
		this.inputImage = createRef();
		
        this.state = {
			infor:{
				permission: 5,
				title: this.props.title,
				publisher: this.props.publisher,
				sharer: this.props.sharer,
				program_id: this.props.id,
				description: this.props.description,
				address: this.props.address,
				starttime: this.props.starttime,
				endtime: this.props.endtime,
				contact: this.props.contact,
				num_volunteer: this.props.num_volunteer,
				statusEvent: this.props.statusEvent,
				deadline: this.props.deadline,
				isDelete: this.props.isDelete,
				image: this.props.filenames
			},
			statusForm: false,
			isOpenErrorModal: false,
			messageError: ""
        }
	}

	clearArray() {
        this.setState({
			infor:{
				...this.state.infor,
				image: []
			}
		})
    }
	
	handleImageChange = e => {
		console.log("Update img");
		this.clearArray();
		console.log(this.state);
		console.log(e);
        e.persist();
        this.setState({ 
			infor:{
				...this.state.infor,
				image: e.target.files
			}
		});
    };

	onFieldChanged = e => {
		this.setState({ 
			infor:{
				...this.state.infor,
			[e.target.name]: e.target.value 
			}
		});
	};

	onFormSubmit = async (e) => {
		console.log("submitform");
		console.log(this.state);

		alert(this.checkFormPost(this.state).message);

		e.preventDefault();
		try {
			const data = await editEvent({...this.state.infor});
			console.log(data);
		} catch (error) {
			console.error(error);
		}
		
	};

	checkFormPost = (state) =>{	
		// console.log("BBBBBBB");
		// console.log(state);
		var d1 = new Date(document.getElementById("starttime").value);
		var d2 = new Date(document.getElementById("endtime").value);
		var d3 = new Date(document.getElementById("deadline").value);

		var current = moment();
		var startD = moment(d1);
		var endD = moment(d2);
		var deadline = moment(d3);

		// console.log("------------------");
		// console.log(startD);
		// console.log(endD);
		// console.log(deadline);
		// console.log(current);

		//Kiểm tra giá trị rỗng
		if( state.infor.title === "" || 
			state.infor.sharer === "" ||
			state.infor.description === "" ||
			state.infor.address === "" ||
			state.infor.starttime === "" ||
			state.infor.endtime === "" ||
			state.infor.contact === "" ||
			state.infor.num_volunteer === "" ||
			state.infor.state === "" ||
			state.infor.deadline === ""){
				return {
					statusForm: false,
					message: "Value cannot be blank"
				};
			}
		//Kiểm tra số lượng tình nguyện viên có từ 1 trở lên hay không?
		else if(state.infor.num_volunteer < 1){
			return {
				statusForm: false,
				message: "Quantity of volunteer have to larger than 1"
			};
		}

		//Kiểm tra hạn chót đăng ký sự kiện có sau ngày bắt đầu hay không?
		else if(deadline.isAfter(startD)){
			return {
				statusForm: false,
				message: "Deadline have to before start date."
			};
		}

		//Kiểm tra thời gian bắt đầu và kết thức sự kiện có hợp lệ hay không?
		else if(startD.isAfter(endD)){
			return {
				statusForm: false,
				message: "Start date have to before end date."
			};
		}
		
		//Kiểm tra thời gian và trạng thái sự kiện có hợp lệ hay không?
		else if(state.infor.statusEvent === "Sắp diễn ra" && current.isAfter(deadline)){
			return {
				statusForm: false,
				message: "Upcoming event date have to later than current date"
			};
		}

		//Kiểm tra thời gian và trạng thái sự kiện có hợp lệ hay không?
		else if(state.infor.statusEvent === "Đang diễn ra" && (current.isAfter(endD) || current.isBefore(startD))){
			return {
				statusForm: false,
				message: "Ongoing event date have to between start date and end date"
			};
		}

		else if(state.infor.statusEvent === "Kết thúc" && current.isBefore(endD)){
			return {
				statusForm: false,
				message: "Ended event date have to later than end date"
			};
		}

		else return {
			statusForm: true,
			message: "Generate event successfully."
		};
	}

    render() {	
		console.log("State---------")
		console.log('aaaaaaa')
		console.log(this.state);

		console.log(this.state.infor.image.length);

        if (this.state.isLoading) {
            return null;
		}

		if(!this.state.isDelete){
			console.log("Hereeeeee");
			var edit = (
				<Row>
					<div className="event-form w-100 text-lg font-bold border-b border-solid border-grey-light" >            
						<div className="EventEdit" >	

							<Row className="Row1" style={{width: '100%'}}>
								<Col xs="7">
									{/* Tên sự kiện */}
									<Row className="subEventRow1" style={{width: '100%'}}>									
										<InputGroup >
											<InputGroupAddon 
												className="btn-edit" 
												addonType="prepend">
												<Button outline color="success">Tên sự kiện</Button>
											</InputGroupAddon>
											<Input
												name="title"
												value={this.state.infor['title']}
												onChange={this.onFieldChanged}
												/>
										</InputGroup>
									</Row>

									{/* Tổ chức */}
									<Row className="subEventRow1" style={{width: '100%'}}>
										<InputGroup >
												<InputGroupAddon className="btn-edit" addonType="prepend">
												
													<Button outline color="success">Tổ chức</Button>
												</InputGroupAddon>
												<Input
													value={this.state.infor['publisher']}
													type="text" 
													name="publisher"
													defaultValue="Admin" 
													disabled/>
										</InputGroup>
									</Row>
									
									{/* Địa điểm */}
									<Row className="subEventRow1" style={{width: '100%'}}>
										<InputGroup >
											<InputGroupAddon className="btn-edit" addonType="prepend">
											
												<Button outline color="success">Địa điểm</Button>
											</InputGroupAddon>
											<Input 
												onChange={this.onFieldChanged}
												value={this.state.infor['address']}
												name="address"/>
										</InputGroup>
									</Row>

									{/* Người chia sẻ */}
									<Row className="subEventRow1" style={{width: '100%'}}>
										<InputGroup >
											<InputGroupAddon className="btn-edit" addonType="prepend">
											
												<Button outline color="success">Người chia sẻ</Button>
											</InputGroupAddon>
											<Input
												value={this.state.infor['sharer']}
												onChange={this.onFieldChanged}
												name="sharer"/>
										</InputGroup>
									</Row>
								</Col>
								<Col className="EventEdit-img" xs="5">
									{/* <img
										style={{ cursor: "pointer" }}
										src={`/resources/${this.props.filenames}`}
										className="event-edit-image"
										/> */}
										{
											typeof(this.state.infor.image[0]) === "string"?
											(
												this.state.infor.image.length < 1 ? 
												(
													<div
														className="EventEdit-img__placeholder"
														onClick={() => this.inputImage.current.click()}>
														<span>+</span>
													</div>
												) : 
												(
													this.state.infor.image.length < 2 ? 
													(
														<img 
															style={{cursor: "pointer"}} 
															src={`/resources/${this.state.infor.image[0]}`}
															alt="load"   
															onClick={() => this.inputImage.current.click()}
														/>
													) : 
													(
														<div className="EventEdit-img__more"
															style={{cursor: "pointer"}} 
															onClick={() => this.inputImage.current.click()}>
															<img 
																src={`/resources/${this.state.infor.image[0]}`}
																alt="load"   
																
															/>
															<div>
																+{this.state.infor.image.length - 1}
															</div>
														</div>
													)
												)
											):
											
											(
												this.state.infor.image.length < 1 ? 
												(
													<div
														className="EventEdit-img__placeholder"
														onClick={() => this.inputImage.current.click()}>
														<span>+</span>
													</div>
												) : 
												(
													this.state.infor.image.length < 2 ? 
													(
														<img 
															style={{cursor: "pointer"}} 
															src={URL.createObjectURL(this.state.infor.image[0])} 
															alt="newupload"   
															onClick={() => this.inputImage.current.click()}
														/>
													) : 
													(
														<div 
															className="EventEdit-img__more"
															style={{cursor: "pointer"}}
															onClick={() => this.inputImage.current.click()}>
															<img 
																src={URL.createObjectURL(this.state.infor.image[0])} 
																alt="newupload"   />
															<div>
																+{this.state.infor.image.length - 1}
															</div>
														</div>
													)
												)
											)
										}
										<input
										type="file"
										multiple
										style={{ display: "none" }}
										ref={this.inputImage}
										onClick={e => (e.target.value = null)}
										onChange={this.handleImageChange}
										/>
								</Col>

							</Row>
							
							{/* Miêu tả sự kiện */}
							<Row className="eventRow" style={{width: '96.5%'}}>
								<InputGroup >
									<InputGroupAddon className="btn-edit" addonType="prepend">
										<Button outline color="success">Nội dung</Button>
									</InputGroupAddon>	
									<Input 
										onChange={this.onFieldChanged}
										type="textarea" 
										name="description" 
										value={this.state.infor['description']}
										id="exampleText"/>
								</InputGroup>
							</Row>

							{/* Thời gian diễn ra */}
							<Row className="eventRow2" style={{width: '100%'}}>
								<InputGroup>
									<Col xs="2">										
									<InputGroupAddon className="btn-edit" addonType="prepend">
										
										<Button outline color="success">Thời gian diễn ra</Button>
									</InputGroupAddon>
									</Col>


									<Col xs="5" style={{marginLeft: "4px"}}>										
										<Input 
											id="starttime"										
											type="date"
											placeholder="Click to select end date"
											value={moment(this.state.infor['starttime']).format('YYYY-MM-DD')}

											name="starttime"
											onChange={this.onFieldChanged}>
											</Input>
									</Col>
									<Col style={{width: "300px"}}>										
										<Input
											id="endtime"										
											type="date"
											placeholder="Click to select end date"
											value={moment(this.state.infor['endtime']).format('YYYY-MM-DD')}
											name="endtime"
											onChange={this.onFieldChanged}/>
									</Col>
								</InputGroup>
							</Row>
							
							{/* Hạn chót đăng kí */}
							<Row className="eventRow" style={{width: '55.5%'}}>
								<InputGroup >
									<InputGroupAddon className="btn-edit" addonType="prepend">
									
										<Button outline color="success">Hạn chót đăng kí</Button>
									</InputGroupAddon>
									<Input 
										id="deadline"											
										type="date"
										value={moment(this.state.infor['deadline']).format('YYYY-MM-DD')}
										name="deadline"
										onChange={this.onFieldChanged}/>
								</InputGroup>
							</Row>

							{/* Liên hệ */}
							<Row className="eventRow" style={{width: '55.5%'}}>
								<InputGroup >
									<InputGroupAddon className="btn-edit" addonType="prepend">
									
										<Button outline color="success">Liên hệ</Button>
									</InputGroupAddon>
									<Input 
										onChange={this.onFieldChanged}
										value={this.state.infor['contact']}
										name="contact"/>
								</InputGroup>
							</Row>

							{/* Số lượng TNV */}
							<Row className="eventRow" style={{width: '55.5%'}}>
								<InputGroup >
									<InputGroupAddon className="btn-edit" addonType="prepend">
									
										<Button outline color="success">Số lượng TNV</Button>
									</InputGroupAddon>
									<Input 
										type="number"
										onChange={this.onFieldChanged}
										value={this.state.infor['num_volunteer']}
										name="num_volunteer"/>
								</InputGroup>
							</Row>

							{/* Trạng thái sự kiện*/}
							<Row className="eventRow" style={{width: '55.5%'}}>
								<InputGroup >
									<InputGroupAddon className="btn-edit" addonType="prepend">
									
										<Button outline color="success">Trạng thái</Button>
									</InputGroupAddon>
									<Input
										onChange={this.onFieldChanged}
										value={this.state.infor['statusEvent']}
										name="statusEvent"
										id="exampleFormControlSelect1"
										type="select">
											<option>Chọn trạng thái</option>
											<option value="Sắp diễn ra">Sắp diễn ra</option>
											<option value="Đang diễn ra">Đang diễn ra</option>
											<option value="Kết thúc">Kết thúc</option>
									</Input>
								</InputGroup>
							</Row>
					
							{this.state.profileChanged && <div className="EventEdit__Footer">
						
							<Button className="EventEdit__Footer__Update" onClick={this.handleUpdate}>
								<i className="fas fa-check-circle ml-1"/>  Cập nhật
							</Button>
							<Button className="EventEdit__Footer__Cancel" onClick={this.handleCancel}>
								<i class="fas fa-trash-alt ml-1"/> Hủy
								</Button></div>}
						</div>
					</div>
				</Row>
			)
		}

        return (
            <div style={{marginTop: "1.3rem"}} className="widget-sidebar">
				<div className="EventEditBox col">
					<Row>
						<Alert className="headerEvent" style={{width: '100%'}} color="success">
							<Row>
								<Col xs="9">
									<img alt="profile_icon" src={profileIcon} /> CHỈNH SỬA SỰ KIỆN
								</Col>

								<Col xs="3">
								</Col>
							</Row>
						</Alert>
					</Row>
				
					{edit}

					<Row>
						<Col sm={{ size: "auto", offset: 9 }}>
							<div className="btnEvent">
								<Button 
									type="submit"
									onClick={this.onFormSubmit}
									color="success">Cập nhật</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);