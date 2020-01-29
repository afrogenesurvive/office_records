import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientInsuranceForm = (props) => {

  const [insuranceExpDate, setInsuranceExpDate] = useState(new Date());

  const handleChangeInsuranceExpDate = date => {
    setInsuranceExpDate(date);
    console.log(`insuranceExpDate ${insuranceExpDate}`);
   }

const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridInsuranceCompany">
    <Form.Label>Company</Form.Label>
    <Form.Control type="text" placeholder="insuranceCompany"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInsuranceNumber">
    <Form.Label>Number</Form.Label>
    <Form.Control type="number" placeholder="insuranceNumber"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInsuranceExpiry">
    <Form.Label>Expiry</Form.Label>
    <Form.Control type="date" placeholder="insuranceExpiry"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Expiry Date</Form.Label>
    <DatePicker className="" id="patientCalendarInsuranceExpiryDate"
      selected={insuranceExpDate}
      onChange={handleChangeInsuranceExpDate}
    />
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridInsuranceDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="insuranceDescription"/>
  </Form.Group>

</Form.Row>

<Form.Row>

<Form.Group as={Col} controlId="formGridInsuranceSubscriberCompany">
  <Form.Label>Subscriber Company</Form.Label>
  <Form.Control type="text" placeholder="insuranceSubscriberCompany"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridInsuranceSubscriberDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control tas="textarea" rows="5" placeholder="insuranceSubscriberDescription"/>
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
</Form.Row>

</Form>
</div>

)};

export default UpdatePatientInsuranceForm;
