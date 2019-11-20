import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const CreateUserForm = (props) => {

  console.log({...props});

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

<Form.Row>
  <Form.Group as={Col} controlId="formGridCity">
    <Form.Label>City</Form.Label>
    <Form.Control />
  </Form.Group>

  <Form.Group as={Col} controlId="formGridState">
    <Form.Label>State</Form.Label>
    <Form.Control as="select">
      <option>Choose...</option>
      <option>...</option>
    </Form.Control>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridZip">
    <Form.Label>Zip</Form.Label>
    <Form.Control />
  </Form.Group>
</Form.Row>

<Form.Group id="formGridCheckbox">
  <Form.Check type="checkbox" label="Check me out" />
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

</Form>
{
  // <Button variant="secondary" type="submit" onSubmit={props.onConfirm.bind(this, event)}>
  // Submit
  // </Button>

  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default CreateUserForm;
