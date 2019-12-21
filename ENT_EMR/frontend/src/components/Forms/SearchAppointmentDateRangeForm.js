import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

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
<Form.Label>Appointment EndDate</Form.Label>
<Form.Control type="date" placeholder="Appointment Date Range"/>
</Form.Group>

{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="5" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Button variant="success" type="submit">Search</Button>
)}

{
// <AuthContext.Consumer>
// </AuthContext.Consumer>


// populate feilds with user object fields
}
</Form>
</div>


)};

export default SearchAppointmentDateRangeForm;
