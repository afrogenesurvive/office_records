import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientMiscNoteForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateMiscNote}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenMiscNote1">
        <Form.Label>Note #1</Form.Label>
        <Form.Control as="textarea" placeholder="Note 1"/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridDocGenMiscNote2">
        <Form.Label>Note #2</Form.Label>
        <Form.Control as="textarea" placeholder="Note 2"/>
      </Form.Group>
    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    No no! Create Misc Note
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientMiscNoteForm;
