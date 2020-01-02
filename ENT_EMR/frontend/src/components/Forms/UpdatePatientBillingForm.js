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
    <Form.Label>BillingDate</Form.Label>
    <Form.Control type="date" placeholder="BillingDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingTitle">
    <Form.Label>BillingTitle</Form.Label>
    <Form.Control type="text" placeholder="BillingTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingType">
    <Form.Label>BillingType</Form.Label>
    <Form.Control type="text" placeholder="BillingType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingDescription">
    <Form.Label>BillingDescription</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="BillingDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridBillingAmount">
    <Form.Label>BillingAmount</Form.Label>
    <Form.Control type="text" placeholder="BillingAmount"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingPaid">
        <Form.Label>BillingPaid</Form.Label>
        <Form.Control as="select">
          <option>true</option>
          <option>false</option>
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridBillingNotes">
        <Form.Label>BillingNotes</Form.Label>
        <Form.Control as="textarea" rows="3" placeholder="BillingNotes"/>
      </Form.Group>

  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridBillingAttachmentName">
    <Form.Label>BillingAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="BillingAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingAttachmentFormat">
    <Form.Label>BillingAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="BillingAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingAttachmentPath">
    <Form.Label>BillingAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="BillingAttachmentPath"/>
  </Form.Group>
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
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientBillingForm;
