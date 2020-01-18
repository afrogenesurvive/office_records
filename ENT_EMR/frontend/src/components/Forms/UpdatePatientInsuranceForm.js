import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import './CreateUserForm.css';

const UpdatePatientInsuranceForm = (props) => {
const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridInsuranceCompany">
    <Form.Label>Company</Form.Label>
    <Form.Control type="text" placeholder="insuranceCompany"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInsuranceNumber">
    <Form.Label>Number</Form.Label>
    <Form.Control type="number" placeholder="insuranceNumber"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInsuranceExpiry">
    <Form.Label>Expiry</Form.Label>
    <Form.Control type="date" placeholder="insuranceExpiry"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInsuranceDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="insuranceDescription"/>
  </Form.Group>

</Form.Row>

<Form.Row>

<Form.Group as={Col} controlId="formGridInsuranceSubscriberCompany">
  <Form.Label>Subscriber Company</Form.Label>
  <Form.Control type="text" placeholder="insuranceSubscriberCompany"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridInsuranceSubscriberDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control tas="textarea" rows="5" placeholder="insuranceSubscriberDescription"/>
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

export default UpdatePatientInsuranceForm;
