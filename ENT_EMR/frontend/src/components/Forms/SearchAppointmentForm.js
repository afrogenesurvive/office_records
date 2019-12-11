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
  <Form.Group controlId="formBasicFieldSelect">
  <Form.Label>Field Options</Form.Label>
  <Form.Control as="select">
  <option>select</option>
  <option>title</option>
  <option>type</option>
  <option>date</option>
  <option>checkinTime</option>
  <option>seenTime</option>
  <option>location</option>
  <option>description</option>
  <option>patient.name</option>
  <option>inProgress</option>
  <option>attended</option>
  <option>important</option>
  </Form.Control>
  </Form.Group>

<Form.Group controlId="formBasicField">
<Form.Label>Field</Form.Label>
<Form.Control type="text" placeholder="Field"/>
</Form.Group>

<Form.Group controlId="formBasicQuery">
<Form.Label>Query</Form.Label>
<Form.Control type="textarea" rows="5" placeholder="Query" />
</Form.Group>

{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="5" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="5" type="submit">
  Submit
  </Accordion.Toggle>
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
