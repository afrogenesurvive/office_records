import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientDiagnosisForm = (props) => {

console.log("UpdatePatientDiagnosisForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientDiagnosisForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridDiagnosisDate">
    <Form.Label>DiagnosisDate</Form.Label>
    <Form.Control type="date" placeholder="DiagnosisDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridDiagnosisTitle">
    <Form.Label>DiagnosisTitle</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridDiagnosisType">
    <Form.Label>DiagnosisType</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridDiagnosisDescription">
    <Form.Label>DiagnosisDescription</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="DiagnosisDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridDiagnosisAttachmentName">
    <Form.Label>DiagnosisAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridDiagnosisAttachmentFormat">
    <Form.Label>DiagnosisAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridDiagnosisAttachmentPath">
    <Form.Label>DiagnosisAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisAttachmentPath"/>
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

export default UpdatePatientDiagnosisForm;
