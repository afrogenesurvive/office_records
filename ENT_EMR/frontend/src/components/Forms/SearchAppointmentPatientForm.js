import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchAppointmentPatientForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="formBasicPatientId">
<Form.Label>Patient Id</Form.Label>
<Form.Control type="text" placeholder="Patient Id"/>
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

export default SearchAppointmentPatientForm;
