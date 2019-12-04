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
  state = {};
  isActive = true;

  static contextType = AuthContext;

  // constructor(props) {
  //   super(props);
  // }
  //
  // componentDidMount() {
  //   this.state = this.context;
  //   console.log("state:  ", this.state);
  // }


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
      </Col>
      </Row>
      </Container>
      </React.Fragment>
    );
  }
}

export default SidebarPage;
