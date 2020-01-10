import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientBillingForm = (props) => {

console.log("UpdatePatientBillingForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientBillingForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridBillingDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="BillingDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingDateTodayCheckbox">
    <Form.Label>Today's Date?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridBillingTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="BillingTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="BillingType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="BillingDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridBillingAmount">
    <Form.Label>Amount</Form.Label>
    <Form.Control type="text" placeholder="BillingAmount"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingPaid">
        <Form.Label>Paid ?</Form.Label>
        <Form.Control as="select">
          <option>true</option>
          <option>false</option>
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridBillingNotes">
        <Form.Label>Notes</Form.Label>
        <Form.Control as="textarea" rows="3" placeholder="BillingNotes"/>
      </Form.Group>

  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridBillingAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="BillingAttachmentFormat"/>
  </Form.Group>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridBillingAttachmentFile">
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
  // <Form.Group as={Col} controlId="formGridBillingAttachmentName">
  //   <Form.Label>BillingAttachmentName</Form.Label>
  //   <Form.Control type="text" placeholder="BillingAttachmentName"/>
  // </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientBillingForm;
