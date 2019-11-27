import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdateUserForm = (props) => {

console.log("UpdateUserForm.props:  ", {...props});
const {...user} = props.user;
console.log("UpdateUserForm.props.user:  ", {...user});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder={user.email}/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder={user.password}/>
  </Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridName">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder={user.name}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridRole">
  <Form.Label>Role</Form.Label>
  <Form.Control type="text" placeholder={user.role}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridEmploymentDate">
  <Form.Label>Employment Date</Form.Label>
  <Form.Control type="date" placeholder={user.employmentDate}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridTerminationDate">
  <Form.Label>Termination Date</Form.Label>
  <Form.Control type="date" placeholder={user.terminationDate}/>
</Form.Group>
</Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="1" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}
{props.canCancelProfile && (
  <Button variant="danger" onClick={props.onCancel} >
  Cancel
  </Button>
)}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="0" className="btn" type="submit">
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

export default UpdateUserForm;
