import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth.action';

import './Info.css';

import profileIcon from '../../images/profile.png';
import cancelIcon from '../../images/cancel.png';
import editIcon from '../../images/edit.png';
import identityImage from '../../images/identity.png';
import { userInfo } from 'os';

class MeComponent extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     postContent: '',
        //     isLoading: false,
        //     isOpenModal: false,
        //     profileChanged: false,
        //     profiles: {
        //         name: 'Nguyễn Trọng Nghĩa',
        //         phone: '0339190971',
        //         email: 'ntncsebku@gmail.com',
        //         dob: '22/03/1998',
        //         address: '264 Lý Thường Kiệt',
        //         identityCard: undefined,
        //         accountType: 'personal'
        //     }
        // }

                this.state = {
            postContent: '',
            isLoading: false,
            isOpenModal: false,
            profileChanged: false,
            profiles: props.user
        }

        /* WARNING: JSON.parse(JSON.stringify(...)) is intended for deep copy */
        this.initialProfiles = JSON.parse(JSON.stringify(this.state.profiles));
    }

    handleEdit = (field, e) => {
        if (field === "identityCard") {
            this[field].click();
        } else {
            this[field].focus();
        }
    }

    handleImageChange = (e) => {
        const profiles = { ...this.state.profiles };        

        e.persist();
        profiles.identityCard = URL.createObjectURL(e.target.files[0]);
        this.setState({ profiles, profileChanged: true });
    }

    handleFocus = (e) => {
        const actualValue = e.target.value;

        e.target.value = '';
        e.target.value = actualValue;
    }

    handleChange = (e) => {
        const profiles = { ...this.state.profiles };        

        profiles[e.target.name] = e.target.value;
        this.setState({ profiles, profileChanged: true });
    }

    handleCancel = () => {
        /* WARNING: JSON.parse(JSON.stringify(...)) is intended */
        this.setState({ profiles: JSON.parse(JSON.stringify(this.initialProfiles)), profileChanged: false });
    }

    componentDidMount = () => {
        this.setState({isLoading: false});
    }

    handleUpdate = () => {
        this.props.updateUserInfo(this.state.profiles.username, this.state.profiles);
        this.setState({ profileChanged: false });
    }

    handlePostChange = (e) => {
        this.setState({postContent: e.target.value})
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }

        return (
            <div className="widget-sidebar">
                <div className="p-3 text-lg font-bold border-b border-solid border-grey-light" >
                    <div className="updateStatus">
                        <div >
                            <div >
                                <div className="posttweettacontainer">
                                    <textarea
                                        id="posttweetta"
                                        className="posttweetta"
                                        placeholder="What's happening?"
                                        rows="5"
                                        cols="50"
                                        value={this.state.postContent}
                                        onChange={this.handlePostChange}>
                                        </textarea>
                                    <div className="posttweetcountcont">
                                    </div>
                                </div>
                                <div className="posttweetbutcont">
                                    <button id="posttweetbut" className="posttweetbut" onClick={this.sentPost}>Post</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul id="tweetscontainer" className="tweetscontainer">
                            </ul>
                        </div>
                    </div>
            
                    <div className="UpdateProfile" >
                        <section className="UpdateProfile__Header">
                            <div className="UpdateProfile__Header__Left">
                                <div>Thông tin cá nhân</div>
                                <img alt="profile_icon" src={profileIcon} />
                            </div>
                            <div className="UpdateProfile__Header__Right">
                                <img alt="authenticated?" src={cancelIcon} />
                                <div>Chưa được xác thực</div>
                            </div>
                        </section>
                        <section className="UpdateProfile__Main" >
                            <ul>

                                <li className="UpdateProfile__Main__FieldItem">
                                    <div className="UpdateProfile__Main__FieldName">Tên</div>
                                    <input className="UpdateProfile__Main__FieldValue" name="name" ref={el => this.name = el} onFocus={this.handleFocus} value={this.state.profiles["name"]} onChange={this.handleChange} />
                                    <button onClick={this.handleEdit.bind(this, "name")} className="UpdateProfile__Main__FieldEdit">
                                        <img src={editIcon} alt="Edit icon" />
                                        <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                    </button>
                                </li>
                                
                                <li className="UpdateProfile__Main__FieldItem">
                                    <div className="UpdateProfile__Main__FieldName">Số điện thoại</div>
                                    <input className="UpdateProfile__Main__FieldValue" name="phone" ref={el => this.phone = el} onFocus={this.handleFocus} value={this.state.profiles["phone"]} onChange={this.handleChange} />
                                    <button onClick={this.handleEdit.bind(this, "phone")} className="UpdateProfile__Main__FieldEdit">
                                        <img src={editIcon} alt="Edit icon" />
                                        <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                    </button>
                                </li>

                                <li className="UpdateProfile__Main__FieldItem">
                                    <div className="UpdateProfile__Main__FieldName">Địa chỉ email</div>
                                    <input className="UpdateProfile__Main__FieldValue" name="email" ref={el => this.email = el} onFocus={this.handleFocus} value={this.state.profiles["email"]} onChange={this.handleChange} />
                                    <button onClick={this.handleEdit.bind(this, "email")} className="UpdateProfile__Main__FieldEdit">
                                        <img src={editIcon} alt="Edit icon" />
                                        <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                    </button>
                                </li>
                                
                                <li className="UpdateProfile__Main__FieldItem">
                                    <div className="UpdateProfile__Main__FieldName">Ngày sinh</div>
                                    <input className="UpdateProfile__Main__FieldValue" name="dob" ref={el => this.dob = el} onFocus={this.handleFocus} value={this.state.profiles["dob"]} onChange={this.handleChange} />
                                    <button onClick={this.handleEdit.bind(this, "dob")} className="UpdateProfile__Main__FieldEdit">
                                        <img src={editIcon} alt="Edit icon" />
                                        <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                    </button>
                                </li>

                                <li className="UpdateProfile__Main__FieldItem">
                                    <div className="UpdateProfile__Main__FieldName">Địa chỉ</div>
                                    <input className="UpdateProfile__Main__FieldValue" name="address" ref={el => this.address = el} onFocus={this.handleFocus} value={this.state.profiles["address"]} onChange={this.handleChange} />
                                    <button onClick={this.handleEdit.bind(this, "address")} className="UpdateProfile__Main__FieldEdit">
                                        <img src={editIcon} alt="Edit icon" />
                                        <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                    </button>
                                </li>


                                <li className="UpdateProfile__Main__FieldItem">
                                    <div className="UpdateProfile__Main__FieldName">CMND</div>
                                    <div className="UpdateProfile__Main__FieldValue">
                                        <img src={this.state.profiles["identityCard"] || identityImage} alt="Identity" />
                                        <input type="file" accept="image/*" style={{ display: 'none' }} ref={el => this.identityCard = el} onClick={e => e.target.value = null} onChange={this.handleImageChange} />
                                        {this.state.profiles["identityCard"] === undefined && <div className="UpdateProfile__Main__FieldValue__Warning">Vui lòng cập nhật CMND để xác thực tài khoản</div>}
                                    </div>
                                    <button onClick={this.handleEdit.bind(this, "identityCard")} className="UpdateProfile__Main__FieldEdit">
                                        <img src={editIcon} alt="Edit icon" />
                                        <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                    </button>
                                </li>

                                <li className="UpdateProfile__Main__FieldItem">
                                    <div className="UpdateProfile__Main__FieldName">Loại tài khoản</div>
                                    <div className="UpdateProfile__Main__FieldValue" >
                                        <select ref={el => this.accountType = el} name="accountType" onChange={this.handleChange} value={this.state.profiles["accountType"]} >
                                            <option value="private">Cá nhân</option>
                                            <option value="group">Nhóm</option>
                                        </select>
                                    </div>
                                    <button onClick={this.handleEdit.bind(this, "accountType")} className="UpdateProfile__Main__FieldEdit">
                                        <img src={editIcon} alt="Edit icon" />
                                        <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                    </button>
                                </li>

                            </ul>
                        </section>
                    
                        {this.state.profileChanged && <div className="UpdateProfile__Footer">
                            <button className="UpdateProfile__Footer__Update" onClick={this.handleUpdate}>Cập nhật</button>
                            <button className="UpdateProfile__Footer__Cancel" onClick={this.handleCancel}>Hủy</button></div>}
                    </div>
              
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

const mapDispatchToProps = dispatch => ({
    updateUserInfo: (username, userInfo) => dispatch(authActions.updateUser(username, userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeComponent);