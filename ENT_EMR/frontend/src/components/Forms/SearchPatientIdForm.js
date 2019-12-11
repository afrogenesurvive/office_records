import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchPatientIdForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>
  <Form.Group controlId="formBasicId">
  <Form.Label>Id</Form.Label>
  <Form.Control type="text" placeholder="Id"/>
  </Form.Group>

{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="10" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="10" type="submit">
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

export default SearchPatientIdForm;
