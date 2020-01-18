import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientSystematicInquiryForm = (props) => {
const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridSystematicInquiryDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="SystematicInquiryDate"/>
  </Form.Group>
  )}
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridSystematicInquiryDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}
  {props.visit && (
  <Form.Group as={Col} controlId="formGridSystematicInquiryDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" defaultChecked={true}/>
  </Form.Group>
  )}

  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridSystematicInquiryTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="SystematicInquiryTitle"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridSystematicInquiryDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="SystematicInquiryDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridSystematicInquiryAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="SystematicInquiryAttachmentFormat"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridSystematicInquiryAttachmentFile">
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
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "systematicInquiry")}>
    Done adding Systematic Inquiry
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientSystematicInquiryForm;
