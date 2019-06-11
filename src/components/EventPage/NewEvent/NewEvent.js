import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../../../actions/auth.action';
import { Container, Row, Col, Alert } from "reactstrap";
import DatePicker from "react-datepicker";
import './NewEvent.css';
import moment from 'moment';
import Select from 'react-select';
import profileIcon from '../../../images/profile.png';
import cancelIcon from '../../../images/cancel.png';
import editIcon from '../../../images/edit.png';
import identityImage from '../../../images/identity.png';
import { userInfo } from 'os';
import { getAllUsers } from "../../../services/user.service";
import { createEvent } from "../../../services/event.service";

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
<<<<<<< .merge_file_a11532
	DropdownMenu, 
	DropdownItem,
=======
	DropdownMenu,
	DropdownItem
>>>>>>> .merge_file_a12124
} from "reactstrap";

const options = [
	{ value: 'chocolate' , label: 'Chocolate'},
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
  ];

class NewEvent extends Component {
	constructor(props) {
		super(props);
		this.inputImage = createRef();
<<<<<<< .merge_file_a11532
        this.state = {
			infor:{
				permission: this.props.permission,
=======
		this.state = {
			infor: {
				permission: 5,
>>>>>>> .merge_file_a12124
				title: "",
				publisher: this.props.name,
				sharer: [],
				description: "",
				address: "",
				starttime: "",
				endtime: "",
				contact: "",
				numVolunteer: 1,
				deadline: "",
				isDelete: false,
				image: [],
				multiSelect: []
			},
			statusForm: false,
			isOpenErrorModal: false,
<<<<<<< .merge_file_a11532
			messageError: "",
			user:[],
			selectedOption: null,
        }
	}
=======
			messageError: ""
		}
>>>>>>> .merge_file_a12124

	componentDidMount = async () => {
		console.log("ssssssss");
        try {
			const { data } = await getAllUsers();
			console.log(data);
			this.setState({
				//user: data.map(u => (u.name))
				
				user: data.map(u => {
					var obj = {}
					obj["value"] = u._id;
					obj["label"] = u.name;
					return obj;
				})
			})
        } catch {
            this.setState({ user: false });
        }
	}

<<<<<<< .merge_file_a11532
	handleChange = (selectedOption) => {
		console.log(selectedOption);
		this.setState({ 
			infor:{
				...this.state.infor,
				multiSelect: selectedOption
			}
		});
		console.log(`Option selected:`, selectedOption);
	};
	
	handleImageChange = e => {
		e.persist();
		console.log(e);
        this.setState({ 
			infor:{
=======
	handleImageChange = e => {
		e.persist();
		this.setState({
			infor: {
>>>>>>> .merge_file_a12124
				...this.state.infor,
				image: e.target.files
			}
		});
	};

	onFieldChanged = e => {
		this.setState({
			infor: {
				...this.state.infor,
				[e.target.name]: e.target.value
			}
		});
	};

	onFormSubmit = async (e) => {
		console.log("submitform");
		console.log(this.state);
		await this.setState({
			infor: {
				...this.state.infor,
				sharer: this.state.infor.multiSelect.map(s => s.value)
			}
		})

		e.preventDefault();
		try {
<<<<<<< .merge_file_a11532
			console.log("try");
			const data = await createEvent({...this.state.infor});
=======
			const data = await createEvent({ ...this.state.infor });
>>>>>>> .merge_file_a12124
			console.log(data);
		} catch (error) {
			console.error(error);
		}

	};

	checkFormPost = (state) => {
		console.log("BBBBBBB");
		console.log(state);
		console.log(state.infor.starttime);

		var d1 = new Date(document.getElementById("starttime").value);
		var d2 = new Date(document.getElementById("endtime").value);
		var d3 = new Date(document.getElementById("deadline").value);

		var current = moment();
		var startD = moment(d1);
		var endD = moment(d2);
		var deadline = moment(d3);

		//Kiểm tra giá trị rỗng
		if (state.infor.title === "" ||
			state.infor.sharer === "" ||
			state.infor.description === "" ||
			state.infor.address === "" ||
			state.infor.starttime === "" ||
			state.infor.endtime === "" ||
			state.infor.contact === "" ||
			state.infor.num_volunteer === "" ||
			state.infor.state === "" ||
<<<<<<< .merge_file_a11532
			state.infor.image.length === 0 ||
			state.infor.deadline === ""){
				return {
					statusForm: false,
					message: "Value cannot be blank"
				};
			}
=======
			state.infor.deadline === "") {
			return {
				statusForm: false,
				message: "Value cannot be blank"
			};
		}
>>>>>>> .merge_file_a12124
		//Kiểm tra số lượng tình nguyện viên có từ 1 trở lên hay không?
		else if (state.infor.num_volunteer < 1) {
			return {
				statusForm: false,
				message: "Quantity of volunteer have to larger than 1"
			};
		}

		//Kiểm tra hạn chót đăng ký sự kiện có sau ngày bắt đầu hay không?
		else if (deadline.isAfter(startD)) {
			return {
				statusForm: false,
				message: "Deadline have to before start date."
			};
		}

		//Kiểm tra thời gian bắt đầu và kết thức sự kiện có hợp lệ hay không?
		else if (startD.isAfter(endD)) {
			return {
				statusForm: false,
				message: "Start date have to before end date."
			};
		}
<<<<<<< .merge_file_a11532
		
		
=======

		//Kiểm tra thời gian và trạng thái sự kiện có hợp lệ hay không?
		else if (state.infor.statusEvent === "Sắp diễn ra" && current.isAfter(deadline)) {
			return {
				statusForm: false,
				message: "Upcoming event date have to later than current date"
			};
		}

		//Kiểm tra thời gian và trạng thái sự kiện có hợp lệ hay không?
		else if (state.infor.statusEvent === "Đang diễn ra" && (current.isAfter(endD) || current.isBefore(startD))) {
			return {
				statusForm: false,
				message: "Ongoing event date have to between start date and end date"
			};
		}

		else if (state.infor.statusEvent === "Kết thúc" && current.isBefore(endD)) {
			return {
				statusForm: false,
				message: "Ended event date have to later than end date"
			};
		}

>>>>>>> .merge_file_a12124
		else return {
			statusForm: true,
			message: "Generate event successfully."
		};
	}

<<<<<<< .merge_file_a11532
    render() {
        console.log("New Event");
		console.log(this.state);
		console.log(this.props.name + "------" + this.props.permission);

        if (this.state.isLoading) {
            return null;
        }
=======
	render() {
		if (this.state.isLoading) {
			return null;
		}
>>>>>>> .merge_file_a12124

		return (
			<div style={{ marginTop: "1.3rem" }} className="widget-sidebar">
				<div className="NewEventBox col">
					<Row>
						<Alert className="headerEvent" style={{ width: '100%' }} color="success">
							<Row>
								<Col xs="9">
									<img alt="profile_icon" src={profileIcon} /> THÔNG TIN SỰ KIỆN
								</Col>

								<Col xs="3">
								</Col>
							</Row>
						</Alert>
					</Row>

					<Row>
						<div className="event-form w-100 text-lg font-bold border-b border-solid border-grey-light" >
							<div className="NewEvent" >

								<Row className="Row1" style={{ width: '100%' }}>
									<Col xs="7">
										{/* Tên sự kiện */}
										<Row className="subEventRow1" style={{ width: '100%' }}>
											<InputGroup >
												<InputGroupAddon
													className="btn-edit"
													addonType="prepend">
													<Button outline color="success">Tên sự kiện</Button>
												</InputGroupAddon>
												<Input
													onChange={this.onFieldChanged}
													name="title" />
											</InputGroup>
										</Row>

										{/* Tổ chức */}
<<<<<<< .merge_file_a11532
										<Row className="subEventRow2" style={{width: '100%'}}>
											<InputGroup >
												<InputGroupAddon className="btn-edit" addonType="prepend">
												
													<Button outline color="success">Tổ chức</Button>
												</InputGroupAddon>
												<Input
													type="text" 
													name="publisher"
													defaultValue={this.state.infor['publisher']}
													disabled/>
=======
										<Row className="subEventRow1" style={{ width: '100%' }}>
											<InputGroup >
												<InputGroupAddon className="btn-edit" addonType="prepend">

													<Button outline color="success">Tổ chức</Button>
												</InputGroupAddon>
												<Input
													type="text"
													name="publisher"
													defaultValue="Admin"
													disabled />
>>>>>>> .merge_file_a12124
											</InputGroup>
										</Row>

										{/* Địa điểm */}
<<<<<<< .merge_file_a11532
										<Row className="subEventRow3" style={{width: '100%'}}>
=======
										<Row className="subEventRow1" style={{ width: '100%' }}>
>>>>>>> .merge_file_a12124
											<InputGroup >
												<InputGroupAddon className="btn-edit" addonType="prepend">

													<Button outline color="success">Địa điểm</Button>
												</InputGroupAddon>
												<Input
													onChange={this.onFieldChanged}
													name="address" />
											</InputGroup>
										</Row>

										{/* Người chia sẻ */}
<<<<<<< .merge_file_a11532
										<Row className="subEventRow4" style={{width: '100%'}}>
=======
										<Row className="subEventRow1" style={{ width: '100%' }}>
>>>>>>> .merge_file_a12124
											<InputGroup >
												<InputGroupAddon className="btn-edit" addonType="prepend">

													<Button outline color="success">Người chia sẻ</Button>
												</InputGroupAddon>
<<<<<<< .merge_file_a11532

												<Col xs="8">
													<Select
														name="sharer"
														value={this.state.infor.multiSelect}
														onChange={this.handleChange}
														options={this.state.user}
														//onChange={this.onFieldChanged}
														isSearchable 
														isMulti 
														/>
												</Col>

												{/* <Input 
													onChange={this.onFieldChanged}
													name="sharer"/> */}
=======
												<Input
													onChange={this.onFieldChanged}
													name="sharer" />
>>>>>>> .merge_file_a12124
											</InputGroup>
										</Row>
									</Col>
									<Col className="NewEvent-img" xs="5">
										{
											this.state.infor.image.length < 1 ?
												(
													<div
														className="NewEvent-img__placeholder"
														onClick={() => this.inputImage.current.click()}>
														<span>+</span>
													</div>
												) :
												(
													this.state.infor.image.length < 2 ?
														(
															<img
																style={{ cursor: "pointer" }}
																src={URL.createObjectURL(this.state.infor.image[0])}
																alt="fucku"
																onClick={() => this.inputImage.current.click()}
															/>
														) :
														(
															<div className="NewEvent-img__more">
																<img
																	style={{ cursor: "pointer" }}
																	src={URL.createObjectURL(this.state.infor.image[0])}
																	alt="fucku"
																	onClick={() => this.inputImage.current.click()}
																/>
																<div>
																	+{this.state.infor.image.length - 1}
																</div>
															</div>
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
								<Row className="eventRow" style={{ width: '96.5%' }}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">
											<Button outline color="success">Nội dung</Button>
										</InputGroupAddon>
										<Input
											onChange={this.onFieldChanged}
											type="textarea"
											name="description"
											id="exampleText" />
									</InputGroup>
								</Row>

								{/* Thời gian diễn ra */}
								<Row className="eventRow2" style={{ width: '100%' }}>
									<InputGroup>
										<Col xs="2">
											<InputGroupAddon className="btn-edit" addonType="prepend">

												<Button outline color="success">Thời gian diễn ra</Button>
											</InputGroupAddon>
										</Col>


										<Col xs="5" style={{ marginLeft: "4px" }}>
											<Input
												id="starttime"
												type="date"
												placeholder="Click to select start date"
												name="starttime"
												onChange={this.onFieldChanged} />
										</Col>
										<Col style={{ width: "300px" }}>
											<Input
												id="endtime"
												type="date"
												placeholder="Click to select end date"
												name="endtime"
												onChange={this.onFieldChanged} />
										</Col>
									</InputGroup>
								</Row>

								{/* Hạn chót đăng kí */}
								<Row className="eventRow" style={{ width: '55.5%' }}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">

											<Button outline color="success">Hạn chót đăng kí</Button>
										</InputGroupAddon>
										<Input
											id="deadline"
											type="date"
											name="deadline"
											onChange={this.onFieldChanged} />
									</InputGroup>
								</Row>

								{/* Liên hệ */}
								<Row className="eventRow" style={{ width: '55.5%' }}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">

											<Button outline color="success">Liên hệ</Button>
										</InputGroupAddon>
										<Input
											onChange={this.onFieldChanged}
											name="contact" />
									</InputGroup>
								</Row>

								{/* Số lượng TNV */}
								<Row className="eventRow" style={{ width: '55.5%' }}>
									<InputGroup >
										<InputGroupAddon className="btn-edit" addonType="prepend">

											<Button outline color="success">Số lượng TNV</Button>
										</InputGroupAddon>
										<Input
											type="number"
											onChange={this.onFieldChanged}
											name="num_volunteer" />
									</InputGroup>
								</Row>
<<<<<<< .merge_file_a11532
						
=======

								{/* Trạng thái sự kiện*/}
								<Row className="eventRow" style={{ width: '55.5%' }}>
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
											<option value="Sắp diễn ra">Sắp diễn ra</option>
											<option value="Đang diễn ra">Đang diễn ra</option>
											<option value="Kết thúc">Kết thúc</option>
										</Input>
									</InputGroup>
								</Row>

>>>>>>> .merge_file_a12124
								{this.state.profileChanged && <div className="NewEvent__Footer">

									<Button className="NewEvent__Footer__Update" onClick={this.handleUpdate}>
										<i className="fas fa-check-circle ml-1" />  Cập nhật
								</Button>
									<Button className="NewEvent__Footer__Cancel" onClick={this.handleCancel}>
										<i class="fas fa-trash-alt ml-1" /> Hủy
									</Button></div>}
							</div>
						</div>
					</Row>

					<Row>
						<Col sm={{ size: "auto", offset: 9 }}>
							<div className="btnEvent">
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

const mapDispatchToProps = dispatch => ({
	updateUserInfo: (username, userInfo) => dispatch(authActions.updateUser(username, userInfo))
});


const mapStateToProps = ({ 
    auth: { 
        user: { 
            name, permission 
        } 
    } 
}) => ({ name, permission });

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);