import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchAppointmentDateRangeForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="formBasicStartDate">
<Form.Label>Appointment Start Date</Form.Label>
<Form.Control type="date" placeholder="Appointment Date Range"/>
</Form.Group>
<Form.Group controlId="formBasicEndDate">
<Form.Label>Appointment End Date</Form.Label>
<Form.Control type="date" placeholder="Appointment Date Range"/>
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

export default SearchAppointmentDateRangeForm;
