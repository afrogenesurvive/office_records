import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateUserForm.css';

const SearchPatientForm = (props) => {

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>
  <Form.Group controlId="formBasicFieldSelect">
  <Form.Label>Field</Form.Label>
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

  <Form.Group controlId="formBasicField">
  <Form.Label>Field</Form.Label>
  <Form.Control type="text" placeholder="Field"/>
  </Form.Group>

<Form.Group controlId="formBasicQuery">
<Form.Label>Query</Form.Label>
<Form.Control type="textarea" rows="5" placeholder="Query"/>
</Form.Group>

{props.canCancel && (
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="success" type="submit">Search</Button>
)}

</Form>
</div>


)};

export default SearchPatientForm;
