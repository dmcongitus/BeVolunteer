import React, { Component, Fragment } from 'react';

import './Info.css';
import { connect } from 'react-redux';

import profileIcon from '../../images/profile.png';
import cancelIcon from '../../images/cancel.png';
import editIcon from '../../images/edit.png';
import identityImage from '../../images/identity.png'
import Axios from 'axios';

class MeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            renderTweets: [],
            content_post: '',
            isOpenModal: false,
            textNoti: '',
            profileChanged: false,
            profiles: {
                name: {
                    value: 'Nguyễn Trọng Nghĩa',
                    displayName: 'Tên'
                },
                phone: {
                    value: '0339190971',
                    displayName: 'Số điện thoại'
                },
                email: {
                    value: 'ntncsebku@gmail.com',
                    displayName: 'Địa chỉ email'
                },
                dob: {
                    value: '22/03/1998',
                    displayName: 'Ngày sinh'
                },
                address: {
                    value: '264 Lý Thường Kiệt',
                    displayName: 'Địa chỉ'
                },
                identityCard: {
                    value: undefined,
                    displayName: 'CMND'
                },
                accountType: {
                    value: 'personal',
                    displayName: 'Loại tài khoản'
                }
            }
        }

    /* WARNING: JSON.parse(JSON.stringify(...)) is intended for deep copy */
        this.initialProfiles = JSON.parse(JSON.stringify(this.state.profiles));
        this.profileChanged = true;

        // Binds our scroll event handler
      
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
        profiles.identityCard.value = URL.createObjectURL(e.target.files[0]);
        this.setState({ profiles, profileChanged: true });
    }

    handleFocus = (e) => {
        const actualValue = e.target.value;

        e.target.value = '';
        e.target.value = actualValue;
    }

    handleChange = (e) => {
        const profiles = { ...this.state.profiles };        

        profiles[e.target.name].value = e.target.value;
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
        Axios.put('accounts/kumishida', Object.keys(this.state.profiles).reduce((body, fieldName) => {
            if (fieldName == 'dob') {
                body[fieldName] = new Date( this.state.profiles[fieldName].value);
            } else {
                body[fieldName] = this.state.profiles[fieldName].value;
            }
            return body;
        }, {}), {headers:{
            'x-access-token': localStorage.getItem('token')
        }}).then((res) => {
            this.setState({ profileChanged: false });
        }).catch((err) => {
            alert(err);
        });
    }

    ChangePost = (e) => {
        this.setState({ content_post: e.target.value })
    }
   
    renderAvatar = (avatar, _className) => {
        try {
            const src = 'data:image/jpeg;base64,' + Buffer.from(avatar).toString('base64');
            return (<img src={src} alt="avatar" className={_className} />)
        }
        catch (e) {
            return (<img src="images/default-avatar.jpg" alt="avatar" className={_className} />)
        }
    }
    

    render() {
        if (this.state.isLoading) {
            return null;
        }

        return (
            <div className="widget-sidebar">
            <div className="p-3 text-lg font-bold border-b border-solid border-grey-light" >
               
                {
                    (this.props.flagMe === "me" && false) ?
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
                                            value={this.state.content_post}
                                            onChange={this.ChangePost}>>
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
                            {/* render tweets in here */}
                            {this.props.tweetsUser.map((tweet, i) => {
                                return this.render_a_tweet(tweet, i)
                            })}
                            {this.props.loadingState ? <p className="loading"> <hr></hr>Loading ...</p> : ""}
                            {this.props.nothingToLoad ? <p className="loading"> <hr></hr>Nothing to load</p> : ""}
                        </div> : null
                
                         
                }
                
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
                    <h2 className="title-widget-sidebar"></h2>
                    <section className="UpdateProfile__Main" >
                        <ul>
                            {Object.keys(this.state.profiles).map(field => {
                                let input;
                                switch (field) {
                                    case 'accountType':
                                        input =
                                            <div className="UpdateProfile__Main__FieldValue" >
                                            <select ref={el => this[field] = el} name={field} onChange={this.handleChange} value={this.state.profiles[field].value} >
                                                    <option value="private">Cá nhân</option>
                                                    <option value="group">Nhóm</option>
                                                </select>
                                            </div>
                                        break;
   
                                    case 'identityCard':
                                        input =
                                            <div className="UpdateProfile__Main__FieldValue">
                                                <img src={this.state.profiles.identityCard.value || identityImage} alt="Identity" />
                                            <input type="file" accept="image/*" style={{ display: 'none' }} ref={el => this[field] = el} onClick={e => e.target.value = null} onChange={this.handleImageChange}/>
                                                {this.state.profiles.identityCard.value === undefined && <div className="UpdateProfile__Main__FieldValue__Warning">Vui lòng cập nhật CMND để xác thực tài khoản</div>}
                                            </div>
                                        break;
                                    default:
                                        input = <input className="UpdateProfile__Main__FieldValue" name={field} ref={el => this[field] = el} onFocus={this.handleFocus} value={this.state.profiles[field].value} onChange={this.handleChange}/>
                                }

                                return (
                                    <li className="UpdateProfile__Main__FieldItem">
                                        <div className="UpdateProfile__Main__FieldName">{this.state.profiles[field].displayName}</div>
                                        {input}
                                        <button onClick={this.handleEdit.bind(this, field)} className="UpdateProfile__Main__FieldEdit">
                                            <img src={editIcon} alt="Edit icon"/>
                                            <div className="UpdateProfile__Main__FieldEdit" >Chỉnh sửa</div>
                                        </button>
                                    </li>
                                )
                            })}
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

// const mapStateToProps = (state) => ({
//     userProfileReducer: state.userProfileReducer,
//     tweetsUserReducer: state.tweetsUserReducer,
//     flagMe: state.flagMeReducer
// })

export default (MeComponent);
// export default connect(mapStateToProps, null)(MeComponent);