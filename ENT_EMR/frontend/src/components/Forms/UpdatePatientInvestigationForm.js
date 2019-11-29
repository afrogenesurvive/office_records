import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
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
    <Form.Label>InvestigationDate</Form.Label>
    <Form.Control type="date" placeholder="InvestigationDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationTitle">
    <Form.Label>InvestigationTitle</Form.Label>
    <Form.Control type="text" placeholder="InvestigationTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationDescription">
    <Form.Label>InvestigationDescription</Form.Label>
    <Form.Control type="text" placeholder="InvestigationDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInvestigationAttachmentName">
    <Form.Label>InvestigationAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="InvestigationAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationAttachmentFormat">
    <Form.Label>InvestigationAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="InvestigationAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationAttachmentPath">
    <Form.Label>InvestigationAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="InvestigationAttachmentPath"/>
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

export default UpdatePatientInvestigationForm;
