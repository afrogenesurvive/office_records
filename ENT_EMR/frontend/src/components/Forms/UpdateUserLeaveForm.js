import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdateUserLeaveForm = (props) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChangeStart = date => {
    setStartDate(date);
    console.log(`startDate ${startDate}`);
   }
  const handleChangeEnd = date => {
    setEndDate(date);
    console.log(`endDate ${endDate}`);
   }
const {...user} = props.user;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridLeaveType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="Leave Type"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridLeaveTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Leave Title"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridLeaveStartDateTodayCheckbox">
    <Form.Label>Today?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Start Date</Form.Label>
    <DatePicker className="" id="staffLeaveCalendarStartDate"
      selected={startDate}
     onChange={handleChangeStart}
    />
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridLeaveEndDateTodayCheckbox">
    <Form.Label>Today?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy End Date</Form.Label>
    <DatePicker className="" id="staffLeaveCalendarEndDate"
      selected={endDate}
     onChange={handleChangeEnd}
    />
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
</div>

)};

export default UpdateUserLeaveForm;
