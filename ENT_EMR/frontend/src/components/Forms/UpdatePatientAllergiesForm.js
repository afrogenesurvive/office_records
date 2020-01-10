import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
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
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="AllergiesTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesTypeSelect">
    <Form.Label>Type Options</Form.Label>
    <Form.Control as="select">
    <option>select</option>
    <option>food</option>
    <option>drug</option>
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="AllergiesType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAllergiesDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="AllergiesDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridAllergiesAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="AllergiesAttachmentFormat"/>
  </Form.Group>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridAllergiesAttachmentFile">
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
  // <Form.Group as={Col} controlId="formGridAllergiesAttachmentName">
  //   <Form.Label>AllergiesAttachmentName</Form.Label>
  //   <Form.Control type="text" placeholder="AllergiesAttachmentName"/>
  // </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientAllergiesForm;
