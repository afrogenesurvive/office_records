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
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="TreatmentDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridTreatmentTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="TreatmentTitle"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridTreatmentTypeSelect">
    <Form.Label>Type Options</Form.Label>
    <Form.Control as="select">
    <option>select</option>
    <option>procedure</option>
    <option>prescription</option>
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="TreatmentType"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridTreatmentDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="TreatmentDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridTreatmentDose">
    <Form.Label>Dose</Form.Label>
    <Form.Control type="text" placeholder="TreatmentDose"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridTreatmentFrequency">
    <Form.Label>Frequency</Form.Label>
    <Form.Control type="text" placeholder="TreatmentFrequency"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridTreatmentAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="TreatmentAttachmentFormat"/>
  </Form.Group>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridTreatmentAttachmentFile">
    <Form.Label>File</Form.Label>
    <Form.Control type="file" placeholder="File" onChange={(e) => {console.log(e.target.files[0]);AuthContext._currentValue.file = e.target.files[0];console.log(AuthContext._currentValue.file);}}/>
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

  {props.visit && (
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "treatment")}>
    Done adding Treatment
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientTreatmentForm;
