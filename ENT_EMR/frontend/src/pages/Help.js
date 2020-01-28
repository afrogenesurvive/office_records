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
import Image from 'react-bootstrap/Image';

import helpImg1_1_1 from '../assets/img/help/helpImg1_1_1.png';

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
                          Introduction:
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Card.Text>Welcome to the ENT EMR App Guide</Card.Text>
                          <Card.Text>For any additional help, please contact your system adminstrator.</Card.Text>
                        </Card.Body>
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
                            <li>
                              Sign-Up :
                              <ul>
                                <li>
                                  <h6>The Sign-Up Page</h6>
                                  <Image src="../assets/img/help/helpImg1_1_1.png" fluid />
                                </li>
                                <li>
                                  The Sign-Up Form
                                </li>
                                <li>
                                  The 1st Login
                                </li>
                              </ul>
                            </li>

                            <li>
                              Login :
                              <ul>
                                <li>
                                  The Login Page
                                </li>
                                <li>
                                  The Login Form
                                </li>
                              </ul>
                            </li>
                            <li>
                              Roles & Privilages:
                              <ul>
                                <li>
                                  Admin
                                </li>
                                <li>
                                  Doctor
                                </li>
                                <li>
                                  Nurse
                                </li>
                                <li>
                                  Guest
                                </li>
                              </ul>
                            </li>
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
                          <li>
                            Navigation Bar :
                            <ul>
                              <li>
                                The User Alert Box
                              </li>
                              <li>
                                Navbar Items:
                              </li>
                              <li>
                                Loggin Out
                              </li>
                            </ul>
                          </li>
                          <li>
                            Sidebar :
                            <ul>
                              <li>
                                You
                              </li>
                              <li>
                                Selection
                              </li>
                              <li>
                                Appointments Today
                              </li>
                              <li>
                                Appointments In-Progress
                              </li>
                              <li>
                                Sidebar Display
                              </li>
                            </ul>
                          </li>
                          <li>
                            Pages :
                            <ul>
                              <li>
                                The Staff Page
                              </li>
                              <li>
                                The Patient Page
                              </li>
                              <li>
                                The Appointment Page
                              </li>
                              <li>
                                Page Switching
                              </li>
                            </ul>
                          </li>
                          <li>
                            Menus :
                            <ul>
                              <li>
                                Main Menus
                              </li>
                              <li>
                                Detail Menus
                              </li>
                              <li>
                                Detail Sub Menus
                              </li>
                            </ul>
                          </li>
                          <li>
                            Lists :
                            <ul>
                              <li>
                                Master Lists
                              </li>
                              <li>
                                Detail Lists
                              </li>
                              <li>
                                Detail-Item Lists
                              </li>
                              <li>
                                Search Lists
                              </li>
                              <li>
                                The Patient Visit List
                              </li>
                              <li>
                                List Sorting
                              </li>
                            </ul>
                          </li>
                          <li>
                            Details :
                          </li>
                          <li>
                            Attachments :
                            <ul>
                              <li>
                                Viewing Attachments
                              </li>
                              <li>
                                Uploading Attachments
                              </li>
                              <li>
                                Saving/Downloading Attachments
                              </li>
                              <li>
                                Deleting Attachments
                              </li>
                              <li>
                                Attachment Troubleshooting
                              </li>
                            </ul>
                          </li>
                          <li>
                            Documents/PDFs :
                            <ul>
                              <li>
                                The PDF Document Generator
                              </li>
                              <li>
                                Creating Documents
                              </li>
                              <li>
                                Viewing/Saving Documents
                              </li>
                              <li>
                                Document Generator Troubleshooting
                              </li>
                            </ul>
                          </li>
                          <li>
                            Forms :
                            <ul>
                              <li>
                                List/Types of Forms
                              </li>
                              <li>
                                Filling out Forms
                              </li>
                              <li>
                                Cancelling Forms
                              </li>
                              <li>
                                Submitting Forms
                              </li>
                              <li>
                                Forms Troubleshooting
                              </li>
                            </ul>
                          </li>
                          <li>
                            Search :
                            <ul>
                              <li>
                                List/Types of Search
                              </li>
                              <li>
                                Search Input
                              </li>
                              <li>
                                Search Results
                              </li>
                              <li>
                                Search Troubleshooting
                              </li>
                            </ul>
                          </li>
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
                          <li>
                          Profile Menu :
                          <ul>
                            <li>
                              You
                            </li>
                            <li>
                              Edit
                            </li>
                            <li>
                              Add
                            </li>
                          </ul>
                          </li>
                          <li>
                          Your Profile Details :
                          <ul>
                            <li>
                              Demographics
                            </li>
                            <li>
                              Leave
                            </li>
                            <li>
                              Attendance
                            </li>
                            <li>
                              Attachments
                            </li>
                          </ul>
                          </li>
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
                            <li>
                            Editing :
                            <ul>
                              <li>
                                How to Edit all your Demographics
                              </li>
                              <li>
                                How to Edit a Single Field of your Demographics
                              </li>
                              <li>
                                Profile Edit Troubleshooting
                              </li>
                            </ul>
                            </li>
                            <li>
                            Adding :
                            <ul>
                              <li>
                                How to Add your Attendance
                              </li>
                              <li>
                                How to Add your Leave/Holiday
                              </li>
                              <li>
                                How to Add Attachments to your Profile
                              </li>
                              <li>
                                Profile Add Troubleshooting
                              </li>
                            </ul>
                            </li>
                            <li>
                            Creating Documents :
                            </li>
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
                          <li>
                          Staff Menu :
                          <ul>
                            <li>
                              Master List
                            </li>
                            <li>
                              Selected
                            </li>
                            <li>
                              Edit
                            </li>
                            <li>
                              Add
                            </li>
                          </ul>
                          </li>
                          <li>
                          Staff Details :
                          <ul>
                            <li>
                              Demographics
                            </li>
                            <li>
                              Leave
                            </li>
                            <li>
                              Attendance
                            </li>
                            <li>
                              Attachments
                            </li>
                          </ul>
                          </li>
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
                          <li>
                          Search :
                          <ul>
                            <li>
                              Search for Staff members by Name
                            </li>
                            <li>
                              Search for Staff members by Field
                            </li>
                            <li>
                              Search for Staff members by ID
                            </li>
                            <li>
                              Search for Staff members by Attendance
                            </li>
                            <li>
                              Search for Staff members by Leave/Holiday
                            </li>
                          </ul>
                          </li>
                          <li>
                          Editing :
                          <ul>
                            <li>
                              How to Edit all of a Staff member's Demographics
                            </li>
                            <li>
                              How to Edit a Single Field of a Staff member's Demographics
                            </li>
                            <li>
                              Staff member Edit Troubleshooting
                            </li>
                          </ul>
                          </li>
                          <li>
                          Adding :
                          <ul>
                            <li>
                              How to Add a Staff member's Attendance
                            </li>
                            <li>
                              How to Add a Staff member's Leave/Holiday
                            </li>
                            <li>
                              How to Add Attachments to a Staff member's Profile
                            </li>
                            <li>
                              Staff members Add Troubleshooting
                            </li>
                          </ul>
                          </li>
                          <li>
                          Creating Documents :
                          </li>
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
                          <li>
                          Patient Menu :
                          <ul>
                            <li>
                              Master List
                            </li>
                            <li>
                              Selected
                            </li>
                            <li>
                              Edit
                            </li>
                            <li>
                              Add
                            </li>
                          </ul>
                          </li>

                          <li>
                          Patient Detail Menu :
                          <ul>
                            <li>
                              Demographics
                            </li>
                            <li>
                              Visit List
                            </li>
                            <li>
                              Visit Search
                            </li>
                            <li>
                              Appointments
                            </li>
                            <li>
                              Consultants
                            </li>
                            <li>
                              Insurance
                            </li>
                            <li>
                              Next Of Kin
                            </li>
                            <li>
                              History
                            </li>
                            <li>
                              Surveys
                            </li>
                            <li>
                              Systematic Inquiry
                            </li>
                            <li>
                              Vitals
                            </li>
                            <li>
                              Examination
                            </li>
                            <li>
                              Past History
                            </li>
                            <li>
                              Allergies
                            </li>
                            <li>
                              Medication
                            </li>
                            <li>
                              Investigation
                            </li>
                            <li>
                              Diagnosis
                            </li>
                            <li>
                              Treatment
                            </li>
                            <li>
                              Billing
                            </li>
                            <li>
                              Attachments
                            </li>
                            <li>
                              Notes
                            </li>
                            <li>
                              Tags
                            </li>
                          </ul>
                          </li>

                          <li>
                          Patient Details :
                          <ul>
                            <li>
                              Demographics
                            </li>
                            <li>
                              Visit List
                            </li>
                            <li>
                              Visit Search
                            </li>
                            <li>
                              Appointments
                            </li>
                            <li>
                              Consultants
                            </li>
                            <li>
                              Insurance
                            </li>
                            <li>
                              Next Of Kin
                            </li>
                            <li>
                              History
                            </li>
                            <li>
                              Surveys
                            </li>
                            <li>
                              Systematic Inquiry
                            </li>
                            <li>
                              Vitals
                            </li>
                            <li>
                              Examination
                            </li>
                            <li>
                              Past History
                            </li>
                            <li>
                              Allergies
                            </li>
                            <li>
                              Medication
                            </li>
                            <li>
                              Investigation
                            </li>
                            <li>
                              Diagnosis
                            </li>
                            <li>
                              Treatment
                            </li>
                            <li>
                              Billing
                            </li>
                            <li>
                              Attachments
                            </li>
                            <li>
                              Notes
                            </li>
                            <li>
                              Tags
                            </li>
                          </ul>
                          </li>
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
                          <li>
                          Search :
                          <ul>
                            <li>
                              Search for Patient by Name
                            </li>
                            <li>
                              Search for Patient by a Single Field
                            </li>
                            <li>
                              Search for Patient by Id
                            </li>
                          </ul>
                          </li>
                          <li>
                          Editing :
                          <ul>
                            <li>
                              How to Edit all of a Patient's Demographics
                            </li>
                            <li>
                              How to Edit a Single Field of a Patient's Demographics
                            </li>
                          </ul>
                          </li>
                          <li>
                          Adding :
                          <ul>
                            <li>
                              How to Add a Patient's Visit
                            </li>
                            <li>
                              How to Add a Patient's Consultant
                            </li>
                            <li>
                              How to Add a Patient's Insurance
                            </li>
                            <li>
                              How to Add a Patient's Next Of Kin
                            </li>
                            <li>
                              How to Add a Patient's History
                            </li>
                            <li>
                              How to Add a Patient's Surveys
                            </li>
                            <li>
                              How to Add a Patient's Systematic Inquiry
                            </li>
                            <li>
                              Vitals
                            </li>
                            <li>
                              How to Add a Patient's Examination
                            </li>
                            <li>
                              How to Add a Patient's Past History
                            </li>
                            <li>
                              How to Add a Patient's Allergies
                            </li>
                            <li>
                              How to Add a Patient's Medication
                            </li>
                            <li>
                              How to Add a Patient's Investigation
                            </li>
                            <li>
                              How to Add a Patient's Diagnosis
                            </li>
                            <li>
                              How to Add a Patient's Treatment
                            </li>
                            <li>
                              How to Add a Patient's Billing
                            </li>
                            <li>
                              How to Add a Patient's Attachments
                            </li>
                            <li>
                              How to Add a Patient's Notes
                            </li>
                            <li>
                              How to Add a Patient's Tags
                            </li>
                          </ul>
                          </li>
                          <li>
                          Creating Documents :
                          <ul>
                            <li>
                              Document Creation menu
                            </li>
                            <li>
                              How to create a Patient Referral
                            </li>
                            <li>
                              How to create a Patient Miscellaneous Note
                            </li>
                            <li>
                              How to create a Patient Operation Reminder
                            </li>
                            <li>
                              How to create a Patient Sick Note
                            </li>
                            <li>
                              How to create a Patient Insurance Note
                            </li>
                            <li>
                              How to create a Patient Prescription
                            </li>
                            <li>
                              How to create a Patient Unfit-to-Fly Authorization
                            </li>
                            <li>
                              How to create a Patient's Treatment Instructions
                            </li>
                          </ul>
                          </li>
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
                          <li>
                          Appointment Menu :
                          <ul>
                            <li>
                              Master List
                            </li>
                            <li>
                              Selected
                            </li>
                            <li>
                              Edit
                            </li>
                            <li>
                              Add
                            </li>
                          </ul>
                          </li>
                          <li>
                          Appointment Details :
                          <ul>
                            <li>
                              Basic Info
                            </li>
                          </ul>
                          </li>
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
                          <li>
                          Search :
                          <ul>
                            <li>
                              Search for an Appointment by Field
                            </li>
                            <li>
                              Search for an Appointment by ID
                            </li>
                            <li>
                              Search for an Appointment by Patient
                            </li>
                            <li>
                              Search for an Appointment by Date
                            </li>
                            <li>
                              Search for an Appointment within a Date Range
                            </li>
                          </ul>
                          </li>
                          <li>
                          Editing :
                          <ul>
                            <li>
                              How to Edit an Appointment's Basic Info
                            </li>
                            <li>
                              How to Edit a Single Field of an Appointment
                            </li>
                            <li>
                              How to Edit an Appointment's Patient
                            </li>
                            <li>
                              Appointment Edit Troubleshooting
                            </li>
                          </ul>
                          </li>
                          <li>
                          Creating Documents :
                          </li>
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
