import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchUserNameForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

  <Form.Group controlId="formBasicName">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder="Name"/>
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

export default SearchUserNameForm;
