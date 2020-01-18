import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateUserForm.css';

const SearchPatientVisitForm = (props) => {

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onGetVisit}>

  <Form.Group controlId="formBasicVisitDate">
  <Form.Label>Visit Date</Form.Label>
  <Form.Control type="date" placeholder="VisitDate"/>
  </Form.Group>

{props.canCancel && (
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" type="submit">
  Submit
  </Button>
)}

</Form>
</div>


)};

export default SearchPatientVisitForm;
