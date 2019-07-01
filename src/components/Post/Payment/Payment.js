import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Alert
} from "reactstrap";

import { donateEvent, checkPayment } from "../../../services/momo.service";
import "./Payment.css";
import { Loading, Radio, Notification } from "element-react";
import momoIcon from "../../../images/momo.png";
import visaIcon from "../../../images/visa.png";
import successIcon from "../../../images/success.png";
import {donateMoney, getDonateEvent} from "../../../services/event.service"
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submited: false,
      InputAmount: "",
      fullscreen: false,
      btnDonate: false,
      momoType: true,
      visaType: false,
      paymentStatus: false,
      dataPayment: undefined,
      test: false
    };

    this.toggle = this.toggle.bind(this);
  }
  changeTypePaymentMomo = () => {
    if (this.state.btnDonate === false) {
      this.setState({
        momoType: true,
        visaType: false
      });
    }
  };
  changeTypePaymentVisa = () => {
    if (this.state.btnDonate === false) {
      this.setState({
        momoType: false,
        visaType: true
      });
    }
  };

  componentDidUpdate = async () => {};
  checkStatusPayment = async () => {
    donateMoney(this.props.event._id, 5000)
    getDonateEvent(this.props.event._id)
    if (
      this.state.btnDonate === true &&
      this.state.dataPayment !== undefined &&
      this.state.paymentStatus === false
    ) {
      this.interval = setInterval(() => {
        checkPayment(this.state.dataPayment.payUrl)
          .then(data => {
            const statusCode = data.data.status_code;
            if (statusCode !== -1) {
              clearInterval(this.interval);
              this.setState({ paymentStatus: true });
              Notification({
                title: "Thành công",
                message: "Thanh toán thành công",
                type: "success"
              });
              
            }
          })
          .catch(er => {
            console.log(er);
          });
      }, 3000);
    } 
  };
  foo = async data => {
    console.log(data);
    await this.setState({ dataPayment: data });
    if (data.errorCode === 0) {
      if (this.state.momoType === true) {
        window.open(data.payUrl);
      }
      if (this.state.visaType === true) {
        window.open(data.paymentCredit);
      }
      this.checkStatusPayment();
    } else {
      Notification.error({
        title: "Lỗi",
        message: data.localMessage
      });
    }
    this.setState({
      fullscreen: false
    });
  };

  successDonate = async (amount, e) => {
    e.preventDefault();
    console.log(amount);
    donateEvent(amount, this.foo, this.fooend);
    this.setState({
      fullscreen: true,
      btnDonate: true
    });
    // var data = this.foo
  };
  toggle() {
    this.setState({
      submited: !this.state.submited
    });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.InputAmount);
  };
  render() {
    return (
      <div>
        {this.state.paymentStatus === false ? (
          <div>
            {this.state.fullscreen && <Loading fullscreen={true} />}
            {this.state.submited === false ? (
              <div className="item-mid">
                <span className="anchor" id="formPayment" />
                <hr className="my-5" />
                {/* form card cc payment */}
                <div className="">
                  <div className="card-body">
                    <Row>
                      {/*Start Chọn loại thanh toán */}
                      <Col className="item-mid">
                        <div
                          className="flex-column-center click"
                          onClick={this.changeTypePaymentMomo}
                        >
                          <div>
                            <img
                              src={momoIcon}
                              style={{ height: "4rem" }}
                              className="typePayment"
                            />
                          </div>
                          <div>
                            <Radio value="" checked={this.state.momoType} />
                          </div>
                        </div>
                        <div
                          className="flex-column-center ml-5 click"
                          onClick={this.changeTypePaymentVisa}
                        >
                          <div>
                            <img
                              src={visaIcon}
                              style={{ height: "4rem" }}
                              className="typePayment"
                            />
                          </div>
                          <div>
                            <Radio value="" checked={this.state.visaType} />
                          </div>
                        </div>
                      </Col>

                      {/*End Chọn loại thanh toán */}
                    </Row>
                    <hr />

                    <form className="form" role="form" autoComplete="off">
                      <div className="row">
                        <label className="col-md-12">Số tiền</label>
                      </div>
                      <div className="form-inline">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                          </div>
                          <input
                            type="text"
                            className="form-control text-right"
                            name="InputAmount"
                            onChange={this.onChange}
                            placeholder={0}
                            disabled={this.state.btnDonate}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">VNĐ</span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <div className="col-md-6">
                          <button
                            type="reset"
                            className="btn btn-default btn-lg btn-block"
                            onClick={this.props.close}
                          >
                            Hủy
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            className="btn btn-success btn-lg btn-block"
                            onClick={e =>
                              this.successDonate(this.state.InputAmount, e)
                            }
                            disabled={this.state.btnDonate}
                          >
                            Thanh Toán
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div className="donateOke">
            <div className="item-mid">
              <hr className="my-5" />
              {/* form card cc payment */}
              <div>
                <div className="card-body">
                  <Row>
                    {/*Start Chọn loại thanh toán */}
                    <Col className="item-mid">
                      <div className="flex-column-center click">
                        <div>
                          <img
                            src={successIcon}
                            style={{ height: "4rem" }}
                            className="typePayment mb-2"
                          />
                        </div>
                        <div>
                          Quyên góp thành công{" "}
                          <b style={{ fontSize: "1.5rem", color: "red" }}>
                            {/* {this.state.InputAmount} */}50000 VNĐ
                          </b>
                        </div>
                        <div>
                          Cho sự kiện
                          <span className="ml-2 tcl-2 bold">
                            {this.props.event.title}
                          </span>
                        </div>
                      </div>
                    </Col>

                    {/*End Chọn loại thanh toán */}
                  </Row>
                  <hr />

                  <form className="form" role="form" autoComplete="off">
                    <div className="row item-mid">
                      <div>
                        {console.log(this.props.event.publisher.name)}
                        Thay mặt{" "}
                        <span
                          className="ml-2 mr-2"
                          style={{ fontWeight: "bold", color: "red" }}
                        >
                          {this.props.event.publisher.name}
                        </span>{" "}
                        chân thành cảm ơn bạn.
                      </div>
                    </div>

                    <hr />
                    <div className="form-group row item-mid">
                      <Link to={`/eventMore/${this.props.event._id}`}>
                        <button className="btn btn-success btn-lg btn-block">
                          <i className="fas fa-check-circle mr-2" />
                          Đóng
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Payment;
