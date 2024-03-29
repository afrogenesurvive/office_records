import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const SearchAppointmentDateRangeForm = (props) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChangeStartDate = date => {
    setStartDate(date);
    console.log(`startDate ${startDate}`);
   }
  const handleChangeEndDate = date => {
    setEndDate(date);
    console.log(`endDate ${endDate}`);
   }

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="">
  <Form.Label>Fancy Start Date</Form.Label>
  <DatePicker className="" id="appointmentCalendarStartDate"
    selected={startDate}
    onChange={handleChangeStartDate}
  />
</Form.Group>


<Form.Group controlId="">
  <Form.Label>Fancy End Date</Form.Label>
  <DatePicker className="" id="appointmentCalendarEndDate"
    selected={endDate}
    onChange={handleChangeEndDate}
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

export default SearchAppointmentDateRangeForm;
