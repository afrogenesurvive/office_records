import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck'
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const CreatePatientForm = (props) => {

  // console.log({...props});
  // console.log("CreatePatientForm:  ", AuthContext.token);

return (
<div className="CreateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridName">
    <Form.Label>name</Form.Label>
    <Form.Control type="text" placeholder="Enter name"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridAddress">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder="Address"/>
  </Form.Group>
</Form.Row>

<Form.Group controlId="formGridDob">
  <Form.Label>D.O.B</Form.Label>
  <Form.Control type="date" placeholder="D.O.B" />
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
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default CreatePatientForm;
