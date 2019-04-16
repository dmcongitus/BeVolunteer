import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div>
                Homepage

                <Link to="/login" >Login</Link>
            </div>
        );
    }
}


export default HomePage;
