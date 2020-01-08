import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateUserAttendanceForm = (props) => {

console.log("UpdateUserAttendanceForm.props:  ", {...props});
const {...user} = props.user;
console.log("UpdateUserAttendanceForm.props.user:  ", {...user});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>

<Form.Row>
  <Form.Group as={Col} controlId="formGridAttendanceDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="Date"/>
  </Form.Group>
  <Form.Group id="formGridTodayCheckbox">
    <Form.Check type="checkbox" label="Today" />
  </Form.Group>
  {
    // <DatePicker className="calendarDob"
    //   selected={AuthContext._currentValue.fancyDate}
    //   onChange={(e) => {console.log(e);AuthContext._currentValue.fancyDate = e}}
    // />
  }
  <Form.Group as={Col} controlId="formGridAttendanceStatus">
    <Form.Label>Status</Form.Label>
    <Form.Control type="text" placeholder="Attendance Status"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAttendanceDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="Attendance Description"/>
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
  <Button variant="success" type="submit">Add Attendance</Button>
)}

</Form>
{
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdateUserAttendanceForm;
