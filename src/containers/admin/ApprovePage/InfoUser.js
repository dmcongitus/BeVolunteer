import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import { Table } from "reactstrap";
import "./ApprovePage.css"
class InfoUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      listImg: [
        "resources/" + this.props.verifyImages[0],
        "resources/" + this.props.verifyImages[1]
      ]
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.listImg.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.listImg.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
    const { activeIndex } = this.state;
    const slides = this.state.listImg.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}

        >
          <img src={item} className = "img-cardID"  />
        </CarouselItem>
      );
    });

    return (
      <Row>
        <Col xs="6">
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              items={this.state.listImg}
              activeIndex={activeIndex}
              onClickHandler={this.goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Carousel>
        </Col>
        <Col xs="6">
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Loại</th>
                    <th>Thông tin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Họ và tên</td>
                    <td>{this.props.name}</td>
                  </tr>
                  <tr>
                    <td>Ngày sinh:</td>
                    <td>{this.props.dob}</td>
                  </tr>
                  <tr>
                    <td>Giới tính:</td>
                    <td>{this.props.gender}</td>
                  </tr>
                  <tr>
                    <td>Số điện thoại</td>
                    <td>{this.props.phone}</td>
                  </tr>
                  <tr>
                    <td>Loại tài khoản</td>
                    <td>{this.props.permission}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default InfoUser;
