import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateUserForm.css';

const SearchAppointmentDateForm = (props) => {

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="formBasicDate">
<Form.Label>Appointment Date</Form.Label>
<Form.Control type="date" placeholder="Appointment Date"/>
</Form.Group>
<Form.Group controlId="formBasicDateTodayCheckbox">
  <Form.Label>Today's Date?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
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

export default SearchAppointmentDateForm;
