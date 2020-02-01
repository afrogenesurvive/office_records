import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientPrescriptionForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreatePrescription}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenPrescriptionPescription">
        <Form.Label>Prescription</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Prescription"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenPrescriptionGeneric">
        <Form.Label>Generic: Yes/No (check for 'Yes')</Form.Label>
        <Form.Control type="checkbox"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenPrescriptionRepeat">
        <Form.Label>Repeat</Form.Label>
        <Form.Control type="number" placeholder="x times"/>
      </Form.Group>
    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    Create Prescription
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientPrescriptionForm;
