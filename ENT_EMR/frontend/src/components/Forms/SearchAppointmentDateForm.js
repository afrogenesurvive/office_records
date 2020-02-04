import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const SearchAppointmentDateForm = (props) => {

  const [appointmentDate, setAppointmentDate] = useState(new Date());

  const handleChangeAppointmentDate = date => {
    setAppointmentDate(date);
    console.log(`appointmentDate ${appointmentDate}`);
   }

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="formBasicDate">
<Form.Label>Appointment Date</Form.Label>
<Form.Control type="date" placeholder="Appointment Date"/>
</Form.Group>

<Form.Group controlId="">
  <Form.Label>Fancy Date</Form.Label>
  <DatePicker className="" id="appointmentCalendarDate"
    selected={appointmentDate}
    onChange={handleChangeAppointmentDate}
  />
</Form.Group>

{props.canCancel && (
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="success" type="submit">Search</Button>
)}
</Form>
</div>


)};

export default SearchAppointmentDateForm;
