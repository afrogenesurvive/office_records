import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientComplaintForm = (props) => {

console.log("UpdatePatientComplaintForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientComplaintForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridComplaintDate">
    <Form.Label>ComplaintDate</Form.Label>
    <Form.Control type="date" placeholder="ComplaintDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridComplaintTitle">
    <Form.Label>ComplaintTitle</Form.Label>
    <Form.Control type="text" placeholder="ComplaintTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridComplaintDescription">
    <Form.Label>ComplaintDescription</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="ComplaintDescription"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridComplaintAnamnesis">
    <Form.Label>ComplaintAnamnesis</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="ComplaintAnamnesis"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridComplaintAttachmentFile">
    <Form.Label>File</Form.Label>
    <Form.Control type="file" placeholder="File" onChange={(e) => {console.log(e.target.files[0]);AuthContext._currentValue.file = e.target.files[0];console.log(AuthContext._currentValue.file);}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridComplaintAttachmentName">
    <Form.Label>ComplaintAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="complaintAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridComplaintAttachmentFormat">
    <Form.Label>ComplaintAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="complaintAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridComplaintAttachmentPath">
    <Form.Label>ComplaintAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="complaintAttachmentPath"/>
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

export default UpdatePatientComplaintForm;
