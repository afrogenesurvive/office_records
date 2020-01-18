import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateUserForm.css';

const SearchUserLeaveDateRangeForm = (props) => {

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="formBasicStartDate">
<Form.Label>Start Date</Form.Label>
<Form.Control type="date" placeholder="StartDate"/>
</Form.Group>

<Form.Group controlId="formBasicEndDate">
<Form.Label>End Date</Form.Label>
<Form.Control type="date" placeholder="EndDate"/>
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

export default SearchUserLeaveDateRangeForm;
