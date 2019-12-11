import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdateAppointmentFieldForm = (props) => {

console.log("UpdateAppointmentFieldForm.props:  ", {...props});
const {...appointment} = props.appointment;
console.log("UpdateAppointmentFieldForm.props.user:  ", {...appointment});

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
  <Form.Group as={Col} controlId="formGridField">
    <Form.Label>Field</Form.Label>
    <Form.Control type="text" placeholder="Field"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridQuery">
    <Form.Label>Query</Form.Label>
    <Form.Label>Time Format 24Hr ex 16:15</Form.Label>
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

export default UpdateAppointmentFieldForm;
