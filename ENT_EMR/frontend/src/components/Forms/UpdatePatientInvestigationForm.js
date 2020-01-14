import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientInvestigationForm = (props) => {

console.log("UpdatePatientInvestigationForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientInvestigationForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridInvestigationDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="InvestigationDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInvestigationTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="InvestigationTitle"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInvestigationTypeSelect">
    <Form.Label>Type Options</Form.Label>
    <Form.Control as="select">
    <option>select</option>
    <option>procedure</option>
    <option>prescription</option>
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="InvestigationType"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInvestigationDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="InvestigationDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridInvestigationAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="InvestigationAttachmentFormat"/>
  </Form.Group>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridInvestigationAttachmentFile">
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
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "investigation")}>
    Done adding Investigation
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientInvestigationForm;
