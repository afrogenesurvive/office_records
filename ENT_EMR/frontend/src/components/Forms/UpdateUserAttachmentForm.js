import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdateUserAttachmentForm = (props) => {

console.log("UpdateUserLeaveForm.props:  ", {...props});
const {...user} = props.user;
console.log("UpdateUserLeaveForm.props.user:  ", {...user});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridAttachmentName">
    <Form.Label>Filename</Form.Label>
    <Form.Control type="text" placeholder="Filename"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAttachmentFormat">
    <Form.Label>Format</Form.Label>
    <Form.Control type="string" placeholder="File format"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAttachmentPath">
    <Form.Label>File path</Form.Label>
    <Form.Control type="string" placeholder="File path"/>
  </Form.Group>

</Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="2" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}
{props.canCancelProfile && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="5" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="2" className="btn" type="submit">
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

export default UpdateUserAttachmentForm;
