import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


import AppointmentTodayList from '../components/Appointments/AppointmentList/AppointmentTodayList';
import AppointmentInProgressList from '../components/Appointments/AppointmentList/AppointmentInProgressList';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Sidebar.css';

class SidebarPage extends Component {
  state = {
    authContext: AuthContext._currentValue,
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    // this.appointmentsToday = this.context.appointmentsToday;
    // this.appointmentsWeekImportant = this.context.appointmentsWeekImportant;
    // this.appointmentsInprogress = this.context.appointmentsInprogress;
  }




  componentDidMount() {
    console.log("state:  ", this.state.authContext);
    // console.log("context:  ", AuthContext._currentValue);
    // run get today appts func and req
  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
      <Container className="sidebarContainer">
      <Row className="">
      <Col md={12} className="">

      <Card border="primary" className="sidebarCard">
      <Card.Body>
        <Card.Title>You</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">ID:</Card.Subtitle>
        <Card.Text>
          {this.context.user._id}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Name:</Card.Subtitle>
        <Card.Text>
          {this.context.user.name}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Role:</Card.Subtitle>
        <Card.Text>
          {this.context.user.role}
        </Card.Text>
      </Card.Body>
      </Card>

      <Card border="secondary" className="sidebarCard">
      <Card.Body>
        <Card.Title>Selection</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Staff:</Card.Subtitle>
        <Card.Text>
          {this.context.selectedUser.name}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Patient:</Card.Subtitle>
        <Card.Text>
          {this.context.selectedPatient.name}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Appointment:</Card.Subtitle>
        <Card.Text>
          {this.context.selectedAppointment.title}
        </Card.Text>
      </Card.Body>
      </Card>
      </Col>
      </Row>
      <Row className="">
      <Col md={12} className="apptSidebarRow">
      <p>Appointments Today</p>
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
      <p>Appointments InProgress</p>
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
