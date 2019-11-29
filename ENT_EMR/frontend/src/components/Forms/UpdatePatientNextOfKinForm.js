import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientNextOfKinForm = (props) => {

console.log("UpdatePatientNextOfKinForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientNextOfKinForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridNextOfKinName">
    <Form.Label>NextOfKinName</Form.Label>
    <Form.Control type="text" placeholder="NextOfKinName"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridNextOfKinPhone">
    <Form.Label>NextOfKinPhone</Form.Label>
    <Form.Control type="number" placeholder="NextOfKinPhone"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridNextOfKinEmail">
    <Form.Label>NextOfKinEmail</Form.Label>
    <Form.Control type="email" placeholder="NextOfKinEmail"/>
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

export default UpdatePatientNextOfKinForm;
