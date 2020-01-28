import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientOperationReminderForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateOperationReminder}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenOperationReminderName">
        <Form.Label>Operation Name</Form.Label>
        <Form.Control type="text" placeholder="Operation Name"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenOperationReminderDate">
        <Form.Label>Operation Date</Form.Label>
        <Form.Control type="date" placeholder="Operation Date"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridDocGenOperationReminderTime">
      <Form.Label>Operation Time</Form.Label>
      <Form.Control type="time" placeholder="Operation Time"/>
    </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridDocGenOperationReminderHospitalName">
      <Form.Label>Hospital Name</Form.Label>
      <Form.Control type="text" placeholder="Hospital Name"/>
    </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridDocGenOperationReminderHopsitalAddress">
      <Form.Label>Hospital Address</Form.Label>
      <Form.Control as="textarea" rows="3" placeholder="Hospital Address"/>
    </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridDocGenOperationReminderFastDate">
      <Form.Label>Fasting Date</Form.Label>
      <Form.Control type="date" placeholder="Fasting date"/>
    </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridDocGenOperationReminderFastTime">
      <Form.Label>Fasting Start Time</Form.Label>
      <Form.Control type="time" placeholder="Fasting start time"/>
    </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridDocGenOperationReminderEstimateCost">
      <Form.Label>Estimated Cost</Form.Label>
      <Form.Control type="number" step="0.01" placeholder="Estimated Cost"/>
    </Form.Group>
    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    No no! Create Operation Reminder
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientOperationReminderForm;
