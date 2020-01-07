import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
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
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="MedicationTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridMedicationType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="MedicationType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridMedicationDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="MedicationDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridMedicationAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="MedicationAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridMedicationAttachmentPath">
    <Form.Label>Attachment Path</Form.Label>
    <Form.Control type="text" placeholder="MedicationAttachmentPath"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridMedicationAttachmentFile">
    <Form.Label>File</Form.Label>
    <Form.Control type="file" placeholder="File" onChange={(e) => {console.log(e.target.files[0]);AuthContext._currentValue.file = e.target.files[0];console.log(AuthContext._currentValue.file);}}/>
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
  // <Form.Group as={Col} controlId="formGridMedicationAttachmentName">
  //   <Form.Label>MedicationAttachmentName</Form.Label>
  //   <Form.Control type="text" placeholder="MedicationAttachmentName"/>
  // </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientMedicationForm;
