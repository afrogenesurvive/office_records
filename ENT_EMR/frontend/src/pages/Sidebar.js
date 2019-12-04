import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

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

  // constructor(props) {
  //   super(props);
  // }
  //



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
      <Col md={8} className="">
      <h2>Sidebar</h2>
      <h5>You</h5>
      <p>ID: {this.context.user._id}</p>
      <p>Name: {this.context.user.name}</p>
      <h5>Selection</h5>
      <p>Staff: {this.context.selectedUser.name}</p>
      <p>Patient: {this.context.selectedPatient.name}</p>
      <p>Appt: {this.context.selectedAppointment.title}</p>
      </Col>
      </Row>
      </Container>
      </React.Fragment>
    );
  }
}

export default SidebarPage;
