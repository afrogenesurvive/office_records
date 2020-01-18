import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const UpdatePatientFieldForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
<Form.Group as={Col} controlId="formGridFieldSelect">
<Form.Label>Field Options</Form.Label>
<Form.Control as="select">
<option>select</option>
<option>name</option>
<option>dob</option>
<option>age</option>
<option>gender</option>
<option>address.town</option>
<option>address.parish</option>
<option>registrationDate</option>
<option>referralDate</option>
<option>expirationDate</option>
<option>attendingPhysician.name</option>
<option>referringDoctor.name</option>
</Form.Control>
</Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridField">
    <Form.Label>Field</Form.Label>
    <Form.Control type="text" placeholder="Field"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridQuery">
    <Form.Label>Query</Form.Label>
    <Form.Label>Date Format: ( YYYY-MM-DD )</Form.Label>
    <Form.Control type="text" placeholder="Query"/>
  </Form.Group>
</Form.Row>


<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" className="formButton" type="submit">
  Edit Patient
  </Button>
)}
</Form.Row>

</Form>
</div>

)};

export default UpdatePatientFieldForm;
