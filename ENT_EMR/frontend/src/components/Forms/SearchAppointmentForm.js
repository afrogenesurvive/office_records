import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchAppointmentForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>
  <Form.Group controlId="formBasicField">
  <Form.Label>Field</Form.Label>
  <Form.Control type="text" placeholder="Field" />
  </Form.Group>

<Form.Group controlId="formBasicQuery">
<Form.Label>Query</Form.Label>
<Form.Control type="textarea" placeholder="Query" />
</Form.Group>

{props.canCancel && (
  <Accordion.Toggle as={Button} variant="link" eventKey="5" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Button variant="secondary" type="submit" >
  Submit
  </Button>
)}

{
// <AuthContext.Consumer>
// </AuthContext.Consumer>


// populate feilds with user object fields
}
</Form>
</div>


)};

export default SearchAppointmentForm;
