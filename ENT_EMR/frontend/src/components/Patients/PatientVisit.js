import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './PatientDetail.css';

const PatientVisit = (props) => {
  const visit = props.visit;
  // FIX ME!!!
  // some subfields are arrays. tease out lists and items
  console.log(`
    patientVisit: ${JSON.stringify(visit)},
    `);
    return (
      <div className="PatientDetailBox1">

      <Tabs defaultActiveKey="Visit" id="uncontrolled-tab-example" className="tab">
      <Tab eventKey="" title="Visit:" disabled>
      </Tab>
      <Tab eventKey="Consultant" title="Consultant">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
      </Card.Text>
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Complaint" title="Complaint">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
      </Card.Text>
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Examination" title="Examination">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
      </Card.Text>
      </Card.Body>
      </Card>
      </Tab>
      </Tabs>
      </div>
    )

}

export default PatientVisit;
