import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientAttachmentForm = (props) => {

console.log("UpdatePatientAttachmentForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientAttachmentForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridPatientAttachmentName">
    <Form.Label>PatientAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="PatientAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridPatientAttachmentFormat">
    <Form.Label>PatientAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="PatientAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridPatientAttachmentPath">
    <Form.Label>PatientAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="PatientAttachmentPath"/>
  </Form.Group>
  </Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="9" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="9" className="btn" type="submit">
  Submit
  </Accordion.Toggle>
)}

</Form>
{
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientAttachmentForm;
