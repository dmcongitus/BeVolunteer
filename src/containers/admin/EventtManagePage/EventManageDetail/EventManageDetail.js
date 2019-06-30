import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Table, Button, FormGroup, Label } from "reactstrap";
import EventCardMore from "../../../../components/Post/PostCardMore/EventCardMore";
import PageLayout from "../../../../layouts/PageLayout/PageLayout";
import { connect } from "react-redux";
import EventSetting from "../../../../components/EventPage/EventSetting/EventSetting";
import EventCheckin from "../../../../components/EventPage/EventCheckin/EventCheckin";
import EditEvent from "../../../../components/EventPage/EditEvent/EditEvent";
import DatePicker from "react-datepicker";
import addDays from "date-fns/add_days";
import format from "date-fns/format";
import { editEvent } from "../../../../services/event.service";
import "react-datepicker/dist/react-datepicker.css";
import {
  getEventByID,
  startEventByID,
  getCheckinByDate,
  createCheckinByDate,
  CheckinUserByHost
} from "../../../../services/event.service";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardTitle,
    CardText,
    Row,
    Col,
    Input,
    Alert
} from "reactstrap";
import classnames from "classnames";
import { withLocalize, Translate } from "react-localize-redux";
import eventManageDetailTranslations from './translation.json';
import { withRouter } from "react-router";


class EventManageDetail extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            event: undefined,
            activeTab: "1",
            startDate: new Date(),
            listCheckin: undefined
        };
        this.props.addTranslation(eventManageDetailTranslations);
    }

    CheckinUser = async (idUser, idCheck) => {
        await CheckinUserByHost(idUser, idCheck);
        let { eventId } = this.props.match.params;
        const DateFomart = await format(
        new Date(this.state.startDate),
        "YYYY-MM-DD"
        ).toString();
        const checkList = await getCheckinByDate(eventId, DateFomart);
        this.setState({ listCheckin: checkList.data[0] });
    };
    handleChange = async date => {
        await this.setState({
        startDate: date
        });
        const DateFomart = await format(new Date(date), "YYYY-MM-DD").toString();
        const checkList = await getCheckinByDate(this.state.event._id, DateFomart);
        if (checkList.length !== 0) {
        await this.setState({ listCheckin: checkList.data[0] });
        }

        if (checkList.data.length === 0) {
        await createCheckinByDate(this.state.event._id, DateFomart);

        const checkList = await getCheckinByDate(
            this.state.event._id,
            DateFomart
        );
        if (checkList.length !== 0) {
            await this.setState({ listCheckin: checkList.data[0] });
        }
        }
    };
    componentDidMount = async () => {
        let { eventId } = this.props.match.params;
        const DateFomart = await format(
        new Date(this.state.startDate),
        "YYYY-MM-DD"
        ).toString();

        try {
        const { data } = await getEventByID(eventId);
        await this.setState({ event: data.event });
        if (this.state.event.status === "ONGOING") {
            if(this.state.event.volunteers.length > 0){
            const checkList = await getCheckinByDate(eventId, DateFomart);
            this.setState({ listCheckin: checkList.data[0] });
    
            if (checkList.data.length === 0) {
                createCheckinByDate(eventId, DateFomart);
            }
            }
        
        }
        } catch {
        this.setState({ event: false });
        }
    };
    startEvent = async id => {

        await startEventByID(id);
        var newEvent = this.state.event;
        newEvent.starttime = new Date();
        console.log(newEvent)
        await editEvent( newEvent)
        const { data } = await getEventByID(id);
        this.setState({ event: data.event });
    };
    endEvent = async id => {
        await startEventByID(id);
        
        //
        const { data } = await getEventByID(id);
        this.setState({ event: data.event });
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
        }
    }

    render() {
        const t = <Translate id="eventManageDetail.title">Quản lý sự kiện</Translate>

        if (this.state.event !== undefined) {
            return (
                <PageLayout title={t}>
                    <Nav tabs>
                        <NavItem className="pointer">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === "1" })}
                            onClick={() => {
                            this.toggle("1");
                            }}
                        >
                            <Translate id="eventManageDetail.detailInfor">Thông tin chi tiết</Translate>
                        </NavLink>
                        </NavItem>
                        <NavItem className="pointer">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === "2" })}
                            onClick={() => {
                            this.toggle("2");
                            }}
                        >
                            <Translate id="eventManageDetail.monitoring">Điểm danh</Translate>
                        </NavLink>
                        </NavItem>

                        <NavItem className="pointer">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === "3" })}
                            onClick={() => {
                            this.toggle("3");
                            }}
                        >
                            <Translate id="eventManageDetail.edit">Chỉnh sửa</Translate>
                        </NavLink>
                        </NavItem>
                        <NavItem />
                    </Nav>
                    <div>
                    {this.state.activeTab === "1" ? (
                    <EventCardMore {...this.state.event} />
                    ) : null}
                    {this.state.activeTab === "2" &&
                    this.state.event.status === "ONGOING" ? (
                    <Row>
                        <Col xs="6">
                        <Table className="tableUnset">
                            <tbody>
                            <tr>
                                <td><Translate id="eventManageDetail.monitoringDate">Ngày diểm danh</Translate></td>
                                <td>
                                {format(new Date(this.state.startDate), "DD/MM/YYYY")}
                                </td>
                            </tr>
                            <tr>
                                <td> <Translate id="eventManageDetail.beMonitored">Đã điểm danh</Translate></td>
                                <td>
                                {this.state.listCheckin !== undefined
                                    ? this.state.listCheckin.attendances.filter(
                                        user => {
                                        return user.isPresent === true;
                                        }
                                    ).length
                                    : null}
                                /
                                {this.state.listCheckin !== undefined
                                    ? this.state.listCheckin.attendances.length
                                    : null}
                                </td>
                            </tr>
                            <tr>
                                <td> <Translate id="eventManageDetail.unMonitoring">Chưa điểm danh</Translate></td>

                                <td>
                                {this.state.listCheckin !== undefined
                                    ? this.state.listCheckin.attendances.filter(
                                        user => {
                                        return user.isPresent === false;
                                        }
                                    ).length
                                    : null}
                                /
                                {this.state.listCheckin !== undefined
                                    ? this.state.listCheckin.attendances.length
                                    : null}
                                </td>
                            </tr>
                            <tr>
                                <td> <Translate id="eventManageDetail.monitoringCode">Mã diểm danh</Translate></td>

                                {this.state.listCheckin !== undefined ? (
                                <td>{this.state.listCheckin.code}</td>
                                ) : null}
                            </tr>
                            </tbody>
                        </Table>
                        </Col>
                        <Col xs="6" className="item-mid">
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            inline
                            minDate={new Date(this.state.event.starttime)}
                            maxDate={new Date(this.state.event.endtime)}
                            highlightDates={[
                            new Date(this.state.event.starttime),
                            new Date(this.state.event.endtime)
                            ]}
                        />
                        </Col>
                        <Table striped>
                        <thead>
                            <tr>
                            <th><Translate id="eventManageDetail.stt">STT</Translate></th>
                            <th><Translate id="eventManageDetail.username">Tên đăng nhập</Translate></th>
                            <th><Translate id="eventManageDetail.fullname">Họ và tên</Translate></th>
                            <th><Translate id="eventManageDetail.status">Tình trạng</Translate></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listCheckin !== undefined
                            ? this.state.listCheckin.attendances.map(
                                (checkin, index) => (
                                    <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{checkin.user.username}</td>
                                    <td>{checkin.user.name}</td>

                                    {checkin.isPresent === false
                                        ? (<td className="tcl-2">Chưa điểm danh</td>,
                                        (
                                            <td>
                                            <Button
                                                color="success"
                                                style={{ width: "7rem" }}
                                                onClick={() =>
                                                this.CheckinUser(
                                                    this.state.event._id,
                                                    checkin._id
                                                )
                                                }
                                            >
                                                điểm danh
                                            </Button>
                                            </td>
                                        ))
                                        : (<td className="tcl-2">Đã điểm danh</td>,
                                        (
                                            <td>
                                            {" "}
                                            <Button
                                                color="danger"
                                                style={{ width: "7rem" }}
                                                onClick={() =>
                                                this.CheckinUser(
                                                    this.state.event._id,
                                                    checkin._id
                                                )
                                                }
                                            >
                                                Huỷ
                                            </Button>{" "}
                                            </td>
                                        ))}
                                    </tr>
                                )
                                )
                            : null}
                        </tbody>
                        </Table>
                    </Row>
                    ) : null}
                    {this.state.activeTab === "2" &&
                    this.state.event.status !== "ONGOING" ? (
                    <Row>
                        <div className="tcl-2 p-5">Sự kiện chưa bắt đầu!!!</div>
                    </Row>
                    ) : null}
                    {this.state.activeTab === "3" ? (
                    <div>
                        {/* {" "}
                        <EventSetting
                        {...this.state.event}
                        startEvent={this.startEvent}
                        /> */}
                        <EditEvent {...this.state.event} startEvent={this.startEvent} />
                    </div>
                    ) : null}
                </div>
                </PageLayout>
            );
        }
        return null;
    }
}

const mapStateToProps = ({
    auth: {
        user: { name, permission, exp }
    }
}) => ({ name, permission, exp });

// export default connect(mapStateToProps)(EventManageDetail);

export default withRouter(
    connect(
        mapStateToProps
    )(withLocalize(EventManageDetail))
);

