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
    <Form.Label>InvestigationDate</Form.Label>
    <Form.Control type="date" placeholder="InvestigationDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationTitle">
    <Form.Label>InvestigationTitle</Form.Label>
    <Form.Control type="text" placeholder="InvestigationTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationTypeSelect">
    <Form.Label>InvestigationType Options</Form.Label>
    <Form.Control as="select">
    <option>select</option>
    <option>procedure</option>
    <option>prescription</option>
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationType">
    <Form.Label>InvestigationType</Form.Label>
    <Form.Control type="text" placeholder="InvestigationType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInvestigationDescription">
    <Form.Label>InvestigationDescription</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="InvestigationDescription"/>
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
  <Form.Group as={Col} controlId="formGridInvestigationAttachmentFile">
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

export default UpdatePatientInvestigationForm;
