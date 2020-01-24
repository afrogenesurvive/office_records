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
                <Card.Text>
                  Signing Up & Logging In
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Basics 1.2: Navigation
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  Finding your way around the User Interface app wide
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Staff 1.1: Your Profile - Navigation
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  The profile UI and actions
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Staff 1.2: Your Profile - Actions
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  The profile UI and actions
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Staff 1.3: Your Profile - Troubleshooting
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  The profile UI and actions
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Staff 1.4: The 'Staff' Page - Navigation
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  The profile UI and actions
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Staff 1.5: The 'Staff' Page - Actions
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  The profile UI and actions
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Staff 1.6: The 'Staff' Page - Troubleshooting
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  The profile UI and actions
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

        </Accordion>
      </Col>
    </Row>
    );
  }
}

export default HelpPage;
