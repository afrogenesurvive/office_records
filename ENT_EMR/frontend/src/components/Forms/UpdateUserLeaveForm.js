import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdateUserLeaveForm = (props) => {

console.log("UpdateUserLeaveForm.props:  ", {...props});
const {...user} = props.user;
console.log("UpdateUserLeaveForm.props.user:  ", {...user});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridLeaveType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="Leave Type"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridLeaveTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Leave Title"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridLeaveStartDate">
    <Form.Label>Start Date</Form.Label>
    <Form.Control type="date" placeholder="Start Date"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridLeaveStartDateTodayCheckbox">
    <Form.Label>Today's Date?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridLeaveEndDate">
    <Form.Label>End Date</Form.Label>
    <Form.Control type="date" placeholder="End Date"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridLeaveEndDateTodayCheckbox">
    <Form.Label>Today's Date?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>

</Form.Row>


{props.canCancel && (
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}
{props.canCancelProfile && (
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" type="submit">
  Submit
  </Button>
)}

</Form>
</div>

)};

export default UpdateUserLeaveForm;
