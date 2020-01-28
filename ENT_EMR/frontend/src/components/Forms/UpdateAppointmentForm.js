import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdateAppointmentForm = (props) => {

  const [apptDate, setApptDate] = useState(new Date());

   const handleChangeApptDate = date => {
     setApptDate(date);
     console.log(`apptDate ${apptDate}`);
    }

const {...appointment} = props.appointment;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder={appointment.title}/>
  </Form.Group>
  </Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridType">
  <Form.Label>Type</Form.Label>
  <Form.Control type="text" placeholder={appointment.type} />
</Form.Group>

<Form.Group as={Col} controlId="formGridLocation">
  <Form.Label>Location</Form.Label>
  <Form.Control type="text" placeholder={appointment.location} />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDate">
  <Form.Label>Date</Form.Label>
  <Form.Control type="date" placeholder={appointment.date} />
</Form.Group>
<Form.Group as={Col} controlId="formGridDateTodayCheckbox">
  <Form.Label>Today ?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAppointmentFancyDate">
  <Form.Label>Fancy Appointment Date</Form.Label>
  <DatePicker className="" id="updateAppointmentCalendarDate"
  selected={apptDate}
   onChange={handleChangeApptDate}
  />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridTime">
  <Form.Label>Scheduled Time</Form.Label>
    <Form.Control type="time" placeholder={appointment.time}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridCheckinTime">
  <Form.Label>Check-in Time</Form.Label>
    <Form.Control type="time" placeholder={appointment.checkinTime}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridSeenTime">
  <Form.Label>Seen Time</Form.Label>
    <Form.Control type="time" placeholder={appointment.seenTime}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control as="textarea" rows="7" placeholder={appointment.description} />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridInProgress">
  <Form.Label>In Progress ?</Form.Label>
  <Form.Control as="select">
    <option>false</option>
    <option>true</option>
  </Form.Control>
</Form.Group>

<Form.Group as={Col} controlId="formGridAttended">
  <Form.Label>Attended ?</Form.Label>
  <Form.Control as="select">
    <option>false</option>
    <option>true</option>
  </Form.Control>
</Form.Group>

<Form.Group as={Col} controlId="formGridImportant">
  <Form.Label>Important ?</Form.Label>
  <Form.Control as="select">
    <option>false</option>
    <option>true</option>
  </Form.Control>
</Form.Group>
</Form.Row>

<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" className="formButton" type="submit">
  Edit Appointment
  </Button>
)}
</Form.Row>

</Form>
</div>

)};

export default UpdateAppointmentForm;
