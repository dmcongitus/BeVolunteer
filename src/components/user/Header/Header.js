import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/volunteer.png'
import logoText from '../../../images/volunteerText.png'
import './Header.css';



class Header extends React.Component  {
  
    log_out = () =>{
      
        sessionStorage.clear();
        localStorage.clear(); 
        window.location.reload();
    }
    render(){
    return(
    <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark ">

        <img src={logo} alt="Logo" height="80" />
        <img src={logoText} height="80" />

        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>


        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"/>
            <ul className="navbar-nav ">
                <li className="nav-item active">
                    <a className="nav-link">
                        <i className="fa fa-home" />
                        <NavLink activeStyle={{ color: 'white' }} to="/">Home</NavLink>
                    </a>
                </li>

                <li className="nav-item active">
                    <a className="nav-link">
                        <i className="fa fa-bell">
                            <span className="badge badge-info">11</span>
                        </i>
                        Test
                    </a>
                </li>

                <li className="nav-item active">
                    <a className="nav-link">
                        <i className="fa fa-sign-out" onClick={this.log_out}
/>
                        Logout
                    <span className="sr-only">(current)</span>
                    </a>
                </li>
            </ul>

        </div>
    </nav>
    )
    }

}

export default Header;