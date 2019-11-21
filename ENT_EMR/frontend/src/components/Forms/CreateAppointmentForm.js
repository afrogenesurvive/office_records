import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const CreateAppointmentForm = props => (

<AuthContext.Consumer>
<div className="CreateFormContainer">
  <Form>
<Form.Group controlId="formBasicEmail">
<Form.Label>Email address</Form.Label>
<Form.Control type="email" placeholder="Enter email" />
<Form.Text className="text-muted">
We'll never share your email with anyone else.
</Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password" />
</Form.Group>
<Form.Group controlId="formBasicCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group>

{
//   props.canCancel && (
//   <Button variant="primary" onClick={props.onCancel}>
//   Cancel
//   </Button>
// )}
// {props.canConfirm && (
//   <Button variant="secondary" onClick={props.onConfirm}>
//   Submit
//   </Button>
// )
}
</Form>
</div>

</AuthContext.Consumer>
);

export default CreateAppointmentForm;