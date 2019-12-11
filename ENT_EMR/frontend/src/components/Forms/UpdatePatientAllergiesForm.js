import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientAllergiesForm = (props) => {

console.log("UpdatePatientAllergiesForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientAllergiesForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridAllergiesTitle">
    <Form.Label>AllergiesTitle</Form.Label>
    <Form.Control type="text" placeholder="AllergiesTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesTypeSelect">
    <Form.Label>AllergiesType Options</Form.Label>
    <Form.Control as="select">
    <option>select</option>
    <option>food</option>
    <option>drug</option>
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesType">
    <Form.Label>AllergiesType</Form.Label>
    <Form.Control type="text" placeholder="AllergiesType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesDescription">
    <Form.Label>AllergiesDescription</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="AllergiesDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAllergiesAttachmentName">
    <Form.Label>AllergiesAttachmentName</Form.Label>
    <Form.Control type="text" placeholder="AllergiesAttachmentName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesAttachmentFormat">
    <Form.Label>AllergiesAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="AllergiesAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesAttachmentPath">
    <Form.Label>AllergiesAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="AllergiesAttachmentPath"/>
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

export default UpdatePatientAllergiesForm;
