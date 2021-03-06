import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientNextOfKinForm = (props) => {
const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridNextOfKinName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="NextOfKinName"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridNextOfKinPhone">
    <Form.Label>Phone</Form.Label>
    <Form.Control type="number" placeholder="NextOfKinPhone"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridNextOfKinEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="NextOfKinEmail"/>
  </Form.Group>

</Form.Row>

<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" className="formButton" type="submit">
  Submit
  </Button>
)}
</Form.Row>

</Form>
</div>

)};

export default UpdatePatientNextOfKinForm;
