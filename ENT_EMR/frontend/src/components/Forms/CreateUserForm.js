import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import FormCheck from 'react-bootstrap/FormCheck'
// import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const CreateUserForm = (props) => {

  // console.log({...props});
  console.log("CreateUserForm:  ", AuthContext.token);

return (
<div className="CreateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"/>
  </Form.Group>
</Form.Row>

<Form.Group controlId="formGridName">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder="Name" />
</Form.Group>

<Form.Group controlId="formGridRole">
  <Form.Label>Role</Form.Label>
  <Form.Control placeholder="role" />
</Form.Group>


{props.canCancel && (
  <Button variant="primary" onClick={props.onCancel}>
  Cancel
  </Button>
)}

{props.canConfirm && (
  <Button variant="secondary" type="submit" >
  Submit
  </Button>
)}
<p>{props.successText}</p>

</Form>
{
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default CreateUserForm;
