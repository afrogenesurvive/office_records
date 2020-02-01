import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientSickNoteForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateSickNote}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenSickNoteAddress">
        <Form.Label>Receiver Adress</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Receiver Adress"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenSickNoteDuration">
        <Form.Label>Duration (Days)</Form.Label>
        <Form.Control type="text" placeholder="Duration"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenSickNoteStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" placeholder="Start Date"/>
      </Form.Group>
    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    No no! Create Sick Note
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientSickNoteForm;
