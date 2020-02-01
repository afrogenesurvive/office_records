import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientDiagTestForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateDiagTest}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenDiagTestDiagDate">
        <Form.Label>Diagnosis Visit Date</Form.Label>
        <Form.Control type="date" placeholder="Visit Date"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenDiagTestReceiver">
        <Form.Label>Receiver</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Receiver"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenDiagTestRequired">
        <Form.Label>Test(s) Required</Form.Label>
        <Form.Control as="textarea" rows="9" placeholder="Required Tests"/>
      </Form.Group>
    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    Create Tests & Screenings
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientDiagTestForm;
