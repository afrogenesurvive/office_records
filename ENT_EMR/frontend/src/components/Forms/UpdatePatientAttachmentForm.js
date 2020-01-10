import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientAttachmentForm = (props) => {

console.log("UpdatePatientAttachmentForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientAttachmentForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridPatientAttachmentFormat">
    <Form.Label>Format</Form.Label>
    <Form.Control type="text" placeholder="PatientAttachmentFormat"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridAttachmentFile">
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
  <Button variant="success" type="submit">Add</Button>
)}

</Form>
{// <Form.Group as={Col} controlId="formGridPatientAttachmentName">
//   <Form.Label>PatientAttachmentName</Form.Label>
//   <Form.Control type="text" placeholder="PatientAttachmentName"/>
// </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientAttachmentForm;
