import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientVitalsForm = (props) => {

  const [vitalsDate, setVitalsDate] = useState(new Date());

  const handleChangeVitalsDate = date => {
    setVitalsDate(date);
    console.log(`vitalsDate ${vitalsDate}`);
   }

const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridVitalsDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="VitalsDate"/>
  </Form.Group>
  )}
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridVitalsDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}

  {props.visit && (
  <Form.Group as={Col} controlId="formGridVitalsDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" defaultChecked={true}/>
  </Form.Group>
  )}
  </Form.Row>
  
  {!props.visit && (
  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Date</Form.Label>
    <DatePicker className="" id="patientVitalsCalendarDate"
      selected={vitalsDate}
      onChange={handleChangeVitalsDate}
    />
  </Form.Group>
  </Form.Row>
  )}

  <Form.Row>
  <Form.Group as={Col} controlId="formGridVitalsPr">
    <Form.Label>Pulse rate (unit)</Form.Label>
    <Form.Control type="number" placeholder="VitalsPr"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group controlId="formGridVitalsBp1" className="bpInputGroup">
    <Form.Label>Blood /</Form.Label>
    <Form.Control type="number" className="bpInput" placeholder="0/"/>
  </Form.Group>
  <Form.Group controlId="formGridVitalsBp2" className="bpInputGroup">
    <Form.Label>Pressure</Form.Label>
    <Form.Control type="number" className="bpInput" placeholder="0"/>
  </Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridVitalsRr">
  <Form.Label>Respiratory rate (unit)</Form.Label>
  <Form.Control type="number" placeholder="VitalsRr"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridVitalsTemp">
  <Form.Label>Temperature (unit) </Form.Label>
  <Form.Control type="number" placeholder="VitalsTemp"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridVitalsPs02">
  <Form.Label>02 saturation (unit)</Form.Label>
  <Form.Control type="number" placeholder="VitalsPs02"/>
</Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridVitalsHeight">
    <Form.Label>Height (unit)</Form.Label>
    <Form.Control type="number" placeholder="VitalsHeight"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridVitalsWeight">
    <Form.Label>Weight (unit)</Form.Label>
    <Form.Control type="number" placeholder="VitalsWeight"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridVitalsBmi">
    <Form.Label>Bmi</Form.Label>
    <Form.Control type="number" placeholder="VitalsBmi"/>
  </Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridVitalsUrineType">
  <Form.Label>Urine type</Form.Label>
  <Form.Control type="text" placeholder="VitalsUrineType"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridVitalsUrineValue">
  <Form.Label>Urine value</Form.Label>
  <Form.Control type="text" placeholder="VitalsUrineValue"/>
</Form.Group>
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
  <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "vitals")}>
  Done adding Vitals
  </Button>
)}
</Form.Row>

</Form>
</div>

)};

export default UpdatePatientVitalsForm;
