import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const UpdateAppointmentFieldForm = (props) => {
const {...appointment} = props.appointment;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridFieldSelect">
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
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridField">
    <Form.Label>Field</Form.Label>
    <Form.Control type="text" placeholder="Field"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridQuery">
    <Form.Label>Query</Form.Label>
    <Form.Label>Time Format: ( 24Hr ex 16:15 )</Form.Label>
    <Form.Label>Date Format: ( YYYY-MM-DD )</Form.Label>
    <Form.Control type="text" placeholder="Query"/>
  </Form.Group>
</Form.Row>

<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}
{props.canCancelProfile && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="success" className="formButton" type="submit">
  Submit
  </Button>
)}
</Form.Row>

</Form>
</div>

)};

export default UpdateAppointmentFieldForm;
