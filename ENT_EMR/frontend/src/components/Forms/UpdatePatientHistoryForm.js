import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientHistoryForm = (props) => {

console.log("UpdatePatientHistoryForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientHistoryForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="HistoryType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="HistoryDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="HistoryTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="HistoryDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridHistoryAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="HistoryAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryAttachmentPath">
    <Form.Label>Attachment Path</Form.Label>
    <Form.Control type="text" placeholder="HistoryAttachmentPath"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryAttachmentFile">
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
  // <Form.Group as={Col} controlId="formGridHistoryAttachmentName">
  //   <Form.Label>HistoryAttachmentName</Form.Label>
  //   <Form.Control type="text" placeholder="HistoryAttachmentName"/>
  // </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientHistoryForm;
