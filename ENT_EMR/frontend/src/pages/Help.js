import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import './Users.css';
import AuthContext from '../context/auth-context';
import AlertBox from '../components/AlertBox';
import LoadingOverlay from '../components/LoadingOverlay';

class HelpPage extends Component {
  state = {
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
  };
  static contextType = AuthContext;

  componentDidMount() {
    this.setState({ userAlert: "welcome to the help page ..." })
  }

  render() {
    return (
      <Row>
      <AlertBox
        authUserId={this.context.userId}
        alert={this.state.userAlert}
      />

      {this.state.overlay === true && (
        <LoadingOverlay
          status={this.state.overlayStatus}
        />
      )}

        <Col className="helpPageMainCol">
        <p>Help Page</p>

        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="1">Get Started</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3">Staff</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="4">Patients</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="5">Appointments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="6">...</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="1">
                  <Accordion className="helpAccordion">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          Intro
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>The mango is most ripe when I said so. Now go back to bed!</Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                          Basics 1.1: Access
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <ul>
                            <li>Sign-Up</li>
                            <li>Login</li>
                            <li>Roles</li>
                            <li>Privilages</li>
                          </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                          Basics 1.2: User Interface
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                        <ul>
                          <li>Navigation Bar</li>
                          <li>Sidebar</li>
                          <li>Selection</li>
                          <li>Pages</li>
                          <li>Menus</li>
                          <li>Lists</li>
                          <li>Details</li>
                          <li>PDFs & Attachments</li>
                          <li>Forms</li>
                          <li>Search</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Tab.Pane>

                <Tab.Pane eventKey="2">
                  <Accordion className="helpAccordion">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                          Your Profile 1.1: Navigation
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                        <ul>
                          <li>Profile Menu</li>
                          <li>Sub Menus</li>
                          <li>Details</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="4">
                          Your Profile 1.2: Actions
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="4">
                        <Card.Body>
                          <ul>
                            <li>Editing</li>
                            <li>Adding</li>
                            <li>Attachment</li>
                            <li>Creating Documents</li>
                          </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="5">
                          Your Profile 1.3: Troubleshooting
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="5">
                        <Card.Body>
                        <ul>
                          <li>Form issues</li>
                          <li>Attachment issues</li>
                          <li>PDF Creator issues</li>
                          <li>Mistakes & Errors</li>
                          <li>Deletion</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Tab.Pane>

                <Tab.Pane eventKey="3">
                  <Accordion className="helpAccordion">

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="7">
                          Staff 1.1: Navigation
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="7">
                        <Card.Body>
                        <ul>
                          <li>Profile Menu</li>
                          <li>Sub Menus</li>
                          <li>Details</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="8">
                          Staff 1.2: Actions
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="8">
                        <Card.Body>
                        <ul>
                          <li>Editing</li>
                          <li>Adding</li>
                          <li>Attachment</li>
                          <li>Creating Documents</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="9">
                          Staff 1.3: Troubleshooting
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="9">
                        <Card.Body>
                        <ul>
                          <li>Form issues</li>
                          <li>Attachment issues</li>
                          <li>PDF Creator issues</li>
                          <li>Mistakes & Errors</li>
                          <li>Deletion</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                  </Accordion>
                </Tab.Pane>

                <Tab.Pane eventKey="4">
                  <Accordion className="helpAccordion">

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="7">
                          Patients 1.1: Navigation
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="7">
                        <Card.Body>
                        <ul>
                          <li>Profile Menu</li>
                          <li>Sub Menus</li>
                          <li>Details</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="8">
                          Patients 1.2: Actions
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="8">
                        <Card.Body>
                        <ul>
                          <li>Editing</li>
                          <li>Adding</li>
                          <li>Attachment</li>
                          <li>Creating Documents</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="9">
                          Patients 1.3: Troubleshooting
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="9">
                        <Card.Body>
                        <ul>
                          <li>Form issues</li>
                          <li>Attachment issues</li>
                          <li>PDF Creator issues</li>
                          <li>Mistakes & Errors</li>
                          <li>Deletion</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                  </Accordion>
                </Tab.Pane>

                <Tab.Pane eventKey="5">
                  <Accordion className="helpAccordion">

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="7">
                          Appointments 1.1: Navigation
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="7">
                        <Card.Body>
                        <ul>
                          <li>Profile Menu</li>
                          <li>Sub Menus</li>
                          <li>Details</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="8">
                          Appointments 1.2: Actions
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="8">
                        <Card.Body>
                        <ul>
                          <li>Editing</li>
                          <li>Adding</li>
                          <li>Attachment</li>
                          <li>Creating Documents</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="9">
                          Appointments 1.3: Troubleshooting
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="9">
                        <Card.Body>
                        <ul>
                          <li>Form issues</li>
                          <li>Attachment issues</li>
                          <li>PDF Creator issues</li>
                          <li>Mistakes & Errors</li>
                          <li>Deletion</li>
                        </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                  </Accordion>
                </Tab.Pane>

                <Tab.Pane eventKey="6">
                <Card>
                    <Card.Body>
                      <Card.Text>
                        User feedback
                      </Card.Text>

                      <Card.Text>
                        Contact Request
                      </Card.Text>
                    </Card.Body>
                </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>


      </Col>
    </Row>
    );
  }
}

export default HelpPage;
