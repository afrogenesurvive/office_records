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
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="HistoryDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridHistoryDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="HistoryTitle"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="HistoryDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridHistoryAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="HistoryAttachmentFormat"/>
  </Form.Group>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridHistoryAttachmentFile">
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
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientHistoryForm;
