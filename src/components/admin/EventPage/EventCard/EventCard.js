import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Alert,
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from "reactstrap";
import img1 from "../../../../images/1.jpg";
import img2 from "../../../../images/2.jpg";
import img3 from "../../../../images/3.jpg";
import "./EventCard.css";
const items = [
    {
        src: img1,
        altText: "Slide 1",
        caption: "Slide 1"
    },
    {
        src: img2,
        altText: "Slide 2",
        caption: "Slide 2"
    },
    {
        src: img3,
        altText: "Slide 3",
        caption: "Slide 3"
    }
];
class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            activeIndex: 0
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
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
        this.state.activeIndex === items.length - 1
            ? 0
            : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex =
        this.state.activeIndex === 0
            ? items.length - 1
            : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    toggle(filename) {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map(item => {
        return (
            <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}>
                <img 
                    src={item.src} 
                    alt={item.altText} 
                    className = "img-slide-style"/>
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}/>
            </CarouselItem>
        );
    });

    return (
        <Row className="postCard">
            <div style={{ width: "100%" }}>
                <Row>
                    <Col xs="4">
                        <div className="">

                        </div>
                    </Col>

                    <Col xs="8" className="textMedia">
                        <div >
                            {
                                (this.props.statusEvent === "Sắp diễn ra")  && (
                                <div>
                                    <Alert color="success">{this.props.title}</Alert>
                                    <Alert color="success">{this.props.starttime}</Alert>
                                    <Button className="mr-1 new-btn">
                                    <i className="fas fa-edit icon-button" />
                                    Tham gia
                                    </Button>
                                </div>
                            )}
                            {
                                this.props.statusEvent === "Đang diễn ra" && (
                                <div>
                                    <Alert color="success">{this.props.title}</Alert>
                                    <Alert color="warning">{this.props.starttime}</Alert>
                                </div>
                            )}
                            {
                                this.props.statusEvent === "Đã kết thúc" && (
                                <div>
                                    <Alert color="success">{this.props.title}</Alert>
                                    <Alert color="danger">{this.props.starttime}</Alert>
                                </div>
                            )}
                            <Link to={`events/${this.props.id}`}>
                                <Button color="success" className="mr-1 success">
                                    <i className="fas fa-angle-double-right icon-button" /> Xem thêm
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>

          {/*/ cardbox-like */}
        </div>
            {/*/ col-lg-6 */}
        </Row>
    );
  }
}

export default EventCard;
