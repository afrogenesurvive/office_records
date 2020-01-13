import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdateUserAttachmentForm = (props) => {

console.log("UpdateUserAttachmentForm.props:  ", {...props}, " AuthContext: ", AuthContext);
const {...user} = props.user;
console.log("UpdateUserAttachmentForm.props.user:  ", {...user});
// let file = null;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>

  <Form.Group as={Col} controlId="formGridAttachmentFormat">
    <Form.Label>Format</Form.Label>
    <Form.Control type="string" placeholder="File format"/>
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
{
  // (e) => console.log(e.target.files[0])

  // <Form.Group as={Col} controlId="formGridAttachmentName">
  //   <Form.Label>Filename</Form.Label>
  //   <Form.Control type="text" placeholder="Filename"/>
  // </Form.Group>
}
</Form.Row>

<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}
{props.canCancelProfile && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" className="formButton" type="submit">
  Submit
  </Button>
)}
</Form.Row>

</Form>
{
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdateUserAttachmentForm;
