import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientTreatmentInstructionForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateTreatmentInstruction}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenTreatmentInstruction">
        <Form.Label>Treatment Instructions</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="TreatmentInstruction"/>
      </Form.Group>
    </Form.Row>

  <Form.Row>
    <Button variant="primary" className="formButton" type="submit">
    No no Create Treatment Instructions
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientTreatmentInstructionForm;
