import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "reactstrap";

import "./NewPost.css";

const NewPost = props => (
    <div id="status-overlay" style="display: none">
    
    <form id="highlight-textarea" class="form">
    <textarea onclick="highlight();" name="postText" cols="10" rows="3" placeholder="What's going on?"></textarea>
    <input type="button" value="Post"/>
    </form>

    </div>
);

export default NewPost;
