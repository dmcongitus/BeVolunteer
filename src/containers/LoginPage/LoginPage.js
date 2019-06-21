import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as authActions from '../../actions/auth.action';

import './LoginPage.css';

class LoginPage extends Component {
    state = {
        username: '',
        password: '',
        loginType: 0
    }

    onFieldChanged = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        this.props.loginUser(this.state.username, this.state.password, this.state.loginType);
    }

    onLoginTypeChange = () => {
        this.setState((prevState) => ({ loginType: !prevState.loginType }));
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div className="container-fluid mylogin">
            
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Đăng nhập</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="username" name="username" onChange={this.onFieldChanged} />
						
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password" name="password" onChange={this.onFieldChanged} />
                                </div>
                                {/* <div className="row align-items-center remember">
                                    <input type="checkbox" onChange={this.onLoginTypeChange} value={this.state.loginType}/>Login as admistrator
					            </div> */}
                                <div className="form-group">
                                    <input type="submit" value="Đăng nhập" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Bạn chưa có tài khoản?
                                <NavLink to="/signup"><div className="singup-color"> Tạo ngay</div></NavLink>
                                
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="singup-color" >Bạn quên mật khẩu?</div>
                               
                         
                        </div>
                        <div className="card-footer">
                        </div>
                            <div className="d-flex justify-content-center">
                                <div className="singup-color" >user: testaccount - testaccount</div>
                               
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="singup-color" >admin: superadmin - superadmin</div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated });

const mapDispatchToProps = dispatch => ({
    loginUser: (username, password, loginType) => dispatch(authActions.logInUser(username, password, loginType))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);