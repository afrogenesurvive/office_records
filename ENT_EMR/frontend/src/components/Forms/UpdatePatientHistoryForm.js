import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
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
    <Form.Label>HistoryType</Form.Label>
    <Form.Control type="text" placeholder="HistoryType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryDate">
    <Form.Label>HistoryDate</Form.Label>
    <Form.Control type="date" placeholder="HistoryDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryTitle">
    <Form.Label>HistoryTitle</Form.Label>
    <Form.Control type="text" placeholder="HistoryTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryDescription">
    <Form.Label>HistoryDescription</Form.Label>
    <Form.Control type="text" placeholder="HistoryDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryAttachmentName">
    <Form.Label>HistoryAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="HistoryAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryAttachmentFormat">
    <Form.Label>HistoryAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="HistoryAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryAttachmentPath">
    <Form.Label>HistoryAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="HistoryAttachmentPath"/>
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

export default UpdatePatientHistoryForm;
