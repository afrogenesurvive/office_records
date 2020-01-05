import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientTreatmentForm = (props) => {

console.log("UpdatePatientTreatmentForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientTreatmentForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridTreatmentDate">
    <Form.Label>TreatmentDate</Form.Label>
    <Form.Control type="date" placeholder="TreatmentDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentTitle">
    <Form.Label>TreatmentTitle</Form.Label>
    <Form.Control type="text" placeholder="TreatmentTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentType">
    <Form.Label>TreatmentType</Form.Label>
    <Form.Control type="text" placeholder="TreatmentType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentDescription">
    <Form.Label>TreatmentDescription</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="TreatmentDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridTreatmentDose">
    <Form.Label>TreatmentDose</Form.Label>
    <Form.Control type="text" placeholder="TreatmentDose"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentFrequency">
    <Form.Label>TreatmentFrequency</Form.Label>
    <Form.Control type="text" placeholder="TreatmentFrequency"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentTypeSelect">
    <Form.Label>TreatmentType Options</Form.Label>
    <Form.Control as="select">
    <option>select</option>
    <option>procedure</option>
    <option>prescription</option>
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentType">
    <Form.Label>TreatmentType</Form.Label>
    <Form.Control type="text" placeholder="TreatmentType"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridTreatmentAttachmentFormat">
    <Form.Label>TreatmentAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="TreatmentAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentAttachmentPath">
    <Form.Label>TreatmentAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="TreatmentAttachmentPath"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentAttachmentFile">
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
  // <Form.Group as={Col} controlId="formGridTreatmentAttachmentName">
  //   <Form.Label>TreatmentAttachmentName</Form.Label>
  //   <Form.Control type="text" placeholder="DiagnosisAttachmentName"/>
  // </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientTreatmentForm;
