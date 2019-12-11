import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientFieldForm = (props) => {

console.log("UpdatePatientFieldForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientFieldForm.props.user:  ", {...patient});

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
<Form.Group as={Col} controlId="formGridFieldSelect">
<Form.Label>Field Options</Form.Label>
<Form.Control as="select">
<option>select</option>
<option>name</option>
<option>dob</option>
<option>age</option>
<option>gender</option>
<option>address.town</option>
<option>address.parish</option>
<option>registrationDate</option>
<option>referralDate</option>
<option>expirationDate</option>
<option>attendingPhysician.name</option>
<option>referringDoctor.name</option>
</Form.Control>
</Form.Group>
  <Form.Group as={Col} controlId="formGridField">
    <Form.Label>Field</Form.Label>
    <Form.Control type="text" placeholder="Field"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridQuery">
    <Form.Label>Query</Form.Label>
    <Form.Label>Date Format YYYY-MM-DD</Form.Label>
    <Form.Control type="text" placeholder="Query"/>
  </Form.Group>
</Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="2" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}
{props.canCancelProfile && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="5" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  // <Accordion.Toggle as={Button} variant="success" eventKey="2" className="btn" type="submit">
  // Submit
  // </Accordion.Toggle>
  <Button variant="success" type="submit">
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

export default UpdatePatientFieldForm;
