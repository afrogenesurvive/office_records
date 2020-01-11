import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="success" type="submit">Search</Button>
)}
</Form>
</div>


)};

export default SearchAppointmentForm;
