import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row, Alert
} from "reactstrap";

import "./Payment.css";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submited: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      submited: !this.state.submited
    });
  }
  render() {
    return (
      <div>
        {console.log(this.state.submited)}
     { this.state.submited === false ?
     ( <div className="item-mid">
        <span className="anchor" id="formPayment" />
        <hr className="my-5" />
        {/* form card cc payment */}
        <div className="">
          <div className="card-body">
            <Row>
              <Col>
                 {/*Start Chọn loại thanh toán */}
                <div className="item-mid radiusPay">
                  <div>
                    <Col>
                      <div className="item-mid item-center">
                        <div className="item-column">
                          <div>
                            <img
                              src="https://www.executive-magazine.com/wp-content/uploads/2014/02/paypalbig.gif"
                              className="payCardItem"
                            />
                          </div>

                          <div className="item-mid">
                            <input type="radio" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </div>
                  <div>
                    <Col>
                      <div className="item-mid item-center">
                        <div className="item-column">
                          <div>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png"
                              className="payCardItem"
                            />
                          </div>

                          <div className="item-mid">
                            <input type="radio" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </div>
                  <div>
                  <Col>
                    <div className="item-mid item-center">
                      <div className="item-column">
                        <div>
                          <img
                            src="https://business.momo.vn/assets/landingpage/img/logo-momo.png"
                            className="payCardItem"
                          />
                        </div>

                        <div className="item-mid">
                          <input type="radio" />
                        </div>
                      </div>
                    </div>
                  </Col>
                  </div>
                  <div>
                  <Col>
                    <div className="item-mid item-center">
                      <div className="item-column">
                        <div>
                          <img
                            src="http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42492-bank-icon.png"
                            className="payCardItem"
                          />
                        </div>

                        <div className="item-mid">
                          <input type="radio" />
                        </div>
                      </div>
                    </div>
                  </Col>
                  </div>
                </div>
                {/*End Chọn loại thanh toán */}
              </Col>
            </Row>
            <hr />
            
            <form className="form" role="form" autoComplete="off">
              <div className="form-group">
                <label htmlFor="cc_name">Tên chủ thẻ</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc_name"
                  pattern="\w+ \w+.*"
                  title="First and last name"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label>Số thẻ</label>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  maxLength={20}
                  pattern="\d{16}"
                  title="Credit card number"
                  required
                />
              </div>
              <div className="form-group row">
                <label className="col-md-12">Ngày lập thẻ</label>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    autoComplete="off"
                    maxLength={20}
                    pattern="\d{16}"
                    title="Credit card number"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <select className="form-control" name="cc_exp_yr" size={0} />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    maxLength={3}
                    pattern="\d{3}"
                    title="Three digits at back of your card"
                    required
                    placeholder="CVC"
                  />
                </div>
              </div>
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
                    id="exampleInputAmount"
                    placeholder={39}
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
                  >
                    Hủy
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg btn-block"
                    onClick= {this.toggle}
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
     ):(<div></div>)}
        <Alert color ="primary">Thanh toán thành công</Alert>
     </div>
    );
    
  }
}

export default Payment;
