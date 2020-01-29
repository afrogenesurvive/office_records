import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientConsultantForm = (props) => {

  const [consultantDate, setConsultantDate] = useState(new Date());

  const handleChangeConsultantDate = date => {
    setConsultantDate(date);
    console.log(`consultantDate ${consultantDate}`);
   }


const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>

  {!props.visit && (
    <Form.Group as={Col} controlId="formGridConsultantDate">
    <Form.Label>Consultation Date</Form.Label>
    <Form.Control type="date" placeholder="ConsultantDate"/>
    </Form.Group>
    )}
  {!props.visit && (

    <Form.Row>
    <Form.Group as={Col} controlId="formGridConsultantDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridAppointmentFancyDate">
      <Form.Label>Fancy Consultant Date</Form.Label>
      <DatePicker className="" id="patientConsultantCalendarDate"
      selected={consultantDate}
       onChange={handleChangeConsultantDate}
      />
    </Form.Group>
    </Form.Row>
  )}
  {props.visit && (
    <Form.Group as={Col} controlId="formPatientGridConsultantDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox"  defaultChecked={true}/>
    </Form.Group>
  )}

  </Form.Row>

  <Form.Row>
  {props.canCancel && (
    <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
  )}

  {props.canConfirm && (
    <Button variant="primary" className="formButton" type="submit">
    Submit
    </Button>
  )}

  {props.visit && (
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "consultant")}>
    Done adding Consultant
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientConsultantForm;
