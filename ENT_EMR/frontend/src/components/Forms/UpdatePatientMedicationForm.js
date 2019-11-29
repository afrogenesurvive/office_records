import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientMedicationForm = (props) => {

console.log("UpdatePatientMedicationForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientMedicationForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridMedicationTitle">
    <Form.Label>MedicationTitle</Form.Label>
    <Form.Control type="text" placeholder="MedicationTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridMedicationDescription">
    <Form.Label>MedicationDescription</Form.Label>
    <Form.Control type="text" placeholder="MedicationDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridMedicationAttachmentName">
    <Form.Label>MedicationAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="MedicationAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridMedicationAttachmentFormat">
    <Form.Label>MedicationAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="MedicationAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridMedicationAttachmentPath">
    <Form.Label>MedicationAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="MedicationAttachmentPath"/>
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

export default UpdatePatientMedicationForm;
