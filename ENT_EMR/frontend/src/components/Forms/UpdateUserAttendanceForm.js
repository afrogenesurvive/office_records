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
<Form.Group as={Col} controlId="formGridAttendanceDateTodayCheckbox">
  <Form.Label>Today's Date?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridAttendanceDate">
    <Form.Label>Other Date</Form.Label>
    <Form.Control type="date" placeholder="Date"/>
  </Form.Group>

  {
    // <DatePicker className="calendarDob"
    //   selected={AuthContext._currentValue.fancyDate}
    //   onChange={(e) => {console.log(e);AuthContext._currentValue.fancyDate = e}}
    // />
  }
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAttendanceStatus">
    <Form.Label>Status</Form.Label>
    <Form.Control type="text" placeholder="Attendance Status"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAttendanceDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="7" placeholder="Attendance Description"/>
  </Form.Group>
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

export default UpdateUserAttendanceForm;
