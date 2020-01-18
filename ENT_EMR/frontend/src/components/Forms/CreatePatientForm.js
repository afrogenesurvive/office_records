import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import './CreateUserForm.css';

const CreatePatientForm = (props) => {

return (
<div className="CreateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Patient Title"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Patient Name"/>
  </Form.Group>
  </Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDob">
  <Form.Label>D.O.B</Form.Label>
  <Form.Control type="date" placeholder="Date of Birth"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridAge">
  <Form.Label>Age</Form.Label>
  <Form.Control type="number" placeholder="Age"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridGender">
  <Form.Label>Gender</Form.Label>
  <Form.Control as="select">
    <option>Male</option>
    <option>Female</option>
  </Form.Control>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridContactEmail">
  <Form.Label>Email</Form.Label>
  <Form.Control type="email" placeholder="Patient Email"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridContactPhone">
  <Form.Label>Phone</Form.Label>
  <Form.Control type="number" placeholder="Address Phone"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressNumber">
  <Form.Label>Street No.</Form.Label>
  <Form.Control type="number" placeholder="Address Street No."/>
</Form.Group>
<Form.Group as={Col} controlId="formGridAddressStreet">
  <Form.Label>Street Name</Form.Label>
  <Form.Control type="text" placeholder="Address Street Name"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressTown">
  <Form.Label>Town</Form.Label>
  <Form.Control type="text" placeholder="Address Town"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridAddressParish">
  <Form.Label>Parish</Form.Label>
  <Form.Control type="text" placeholder="Address Parish"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressPostOffice">
  <Form.Label>Post Office</Form.Label>
  <Form.Control type="text" placeholder="Address PostOffice"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridRegistrationDate">
  <Form.Label>Registration Date</Form.Label>
  <Form.Control type="date" placeholder="Registration Date"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridRegistrationDateTodayCheckbox">
  <Form.Label>Today ?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridReferralDate">
  <Form.Label>Referral Date</Form.Label>
  <Form.Control type="date" placeholder="Referral Date"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridReferralDateTodayCheckbox">
  <Form.Label>Today ?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridExpirationDate">
  <Form.Label>Expiration Date</Form.Label>
  <Form.Control type="date" placeholder="Expiration Date"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridReferringDoctorName">
  <Form.Label>Referring Doctor: Name</Form.Label>
  <Form.Control type="text" placeholder='Ref Doctor Name' />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridReferringDoctorEmail">
  <Form.Label>Referring Doctor: Email</Form.Label>
  <Form.Control type="email" placeholder='Ref Doctor Email'/>
</Form.Group>
<Form.Group as={Col} controlId="formGridReferringDoctorPhone">
  <Form.Label>Referring Doctor: Phone</Form.Label>
  <Form.Control type="number" placeholder="Ref Doctor Phone"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAttendingPhysicianName">
  <Form.Label>Attending Physician: Name</Form.Label>
  <Form.Control type="text" placeholder='Attending Physician Name' />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAttendingPhysicianEmail">
  <Form.Label>Attending Physician: Email</Form.Label>
  <Form.Control type="email" placeholder='Attending Physician Email'/>
</Form.Group>
<Form.Group as={Col} controlId="formGridAttendingPhysicianPhone">
  <Form.Label>Attending Physician: Phone</Form.Label>
  <Form.Control type="number" placeholder="Attending Physician Phone"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridOccupationRole">
  <Form.Label>Job Role</Form.Label>
  <Form.Control type="text" placeholder="Job Role"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridOccupationEmployer">
  <Form.Label>Employer</Form.Label>
  <Form.Control type="text" placeholder="Employer Name"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridOccupationEmployerContactPhone">
  <Form.Label>Employer: Phone</Form.Label>
  <Form.Control type="number" placeholder="Employer Phone"/>
</Form.Group>

<Form.Group as={Col} controlId="formGridOccupationEmployerContactEmail">
  <Form.Label>Employer: Email</Form.Label>
  <Form.Control type="email" placeholder="Employer Email" />
</Form.Group>
</Form.Row>

<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
    <Button variant="success" className="formButton" type="submit">Create New</Button>
)}
</Form.Row>

</Form>
</div>

)};

export default CreatePatientForm;
