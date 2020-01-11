import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchPatientIdForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>
  <Form.Group controlId="formBasicId">
  <Form.Label>Patient Id</Form.Label>
  <Form.Control type="text" placeholder="Id"/>
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

export default SearchPatientIdForm;
