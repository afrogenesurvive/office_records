import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientSurveyForm = (props) => {

console.log("UpdatePatientSurveyForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientSurveyForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridSurveyDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="SurveyDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridSurveyDateTodayCheckbox">
    <Form.Label>Today's Date?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridSurveyTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="SurveyTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridSurveyDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="SurveyDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridSurveyAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="SurveyAttachmentFormat"/>
  </Form.Group>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridSurveyAttachmentFile">
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
  // <Form.Group as={Col} controlId="formGridSurveyAttachmentName">
  //   <Form.Label>SurveyAttachmentName</Form.Label>
  //   <Form.Control type="text" placeholder="SurveyAttachmentName"/>
  // </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientSurveyForm;
