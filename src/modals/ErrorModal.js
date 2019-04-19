import React, { Component } from 'react';
// import '../../styles/Home.css';
// import '../../index.css';
// import "../../styles/Follow.css";
// import "../../styles/Modal.css";
import "../modals/modal.css";

import Modal from 'react-modal';

const customStyles = {
    content : {
        width:"250px",
        position:"relative",
        padding:"1.2rem",
        left: "0px",
        boxShadow:"0 12px 15px 0 rgba(0, 0, 0, 0.25)",
        margin:"auto"
    }
};

class ErrorModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: props.isOpenModal
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }   
    
    render(){
        console.log("Error component");
        return( 
            <Modal
                isOpen={this.props.isOpenModal}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <p 
                    className="error-form-noti"
                    ref={subtitle => this.subtitle = subtitle}>{this.props.text}</p>
                <button className="error-form-btn" onClick={this.props.closeModal}>close</button>
                
            </Modal> 
    )}
}

export default ErrorModal;