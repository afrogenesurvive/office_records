import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AuthContext from '../context/auth-context';
import LoadingOverlay from '../components/LoadingOverlay';

import AppointmentTodayList from '../components/Appointments/AppointmentList/AppointmentTodayList';
import AppointmentInProgressList from '../components/Appointments/AppointmentList/AppointmentInProgressList';

import './Sidebar.css';

class SidebarPage extends Component {
  state = {
    authContext: AuthContext._currentValue,
    overlay: false,
    overlayStatus: "test",
  };
  isActive = true;

  static contextType = AuthContext;

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
      <Container className="sidebarContainer">
      <Row className="sidebarRow1">
      <Col md={12} className="">

      <Card border="primary" className="sidebarCard">
      <Card.Body>
        <Card.Title className="cardTitle">You</Card.Title>
        <Card.Subtitle className="mb-2">ID:</Card.Subtitle>
        <Card.Text>
          {this.context.user._id}
        </Card.Text>
        <Card.Subtitle className="mb-2">Name:</Card.Subtitle>
        <Card.Text>
          {this.context.user.name}
        </Card.Text>
        <Card.Subtitle className="mb-2">Role:</Card.Subtitle>
        <Card.Text>
          {this.context.user.role}
        </Card.Text>
      </Card.Body>
      </Card>

      <Card border="secondary" className="sidebarCard">
      <Card.Body>
        <Card.Title className="cardTitle">Selection</Card.Title>
        <Card.Subtitle className="mb-2">Staff:</Card.Subtitle>
        <Card.Text>
          {this.context.selectedUser.name}
        </Card.Text>

        <Card.Subtitle className="mb-2">Patient:</Card.Subtitle>
        <Card.Text>
          {this.context.selectedPatient.name}
        </Card.Text>
        <Card.Subtitle className="mb-2">Appointment:</Card.Subtitle>
        <Card.Text>
          {this.context.selectedAppointment.title}
        </Card.Text>
      </Card.Body>
      </Card>
      </Col>
      </Row>
      <Row className="sidebarRow2">
      <Col md={12} className="apptSidebarCol">
      <h5 className="apptSidebarTitle">Appointments Today</h5>
      {this.context.appointmentsToday === null && (
        <Button variant="outline-warning">
          Check the Appointments page to load
        </Button>
      )}
      {this.context.appointmentsToday !== null && (
        <AppointmentTodayList
          appointmentToday={this.context.appointmentsToday}
          authUserId={this.context.userId}
          />
      )}
      </Col>
      </Row>
      <Row className="apptSidebarRow">
      <Col md={12} className="">
      <h5 className="apptSidebarTitle">Appointments InProgress</h5>
      {this.context.appointmentsToday === null && (
        <Button variant="outline-warning">
          Check the Appointments page to load
        </Button>
      )}
      {this.context.appointmentsInProgress !== null && (
        <AppointmentInProgressList
          appointmentInProgress={this.context.appointmentsInProgress}
          authUserId={this.context.userId}
          />
      )}
      </Col>
      </Row>
      </Container>
      </React.Fragment>
    );
  }
}

export default SidebarPage;
