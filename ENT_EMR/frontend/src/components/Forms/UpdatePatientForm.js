import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientForm = (props) => {

  const [regDate, setRegDate] = useState(new Date());
  const [refDate, setRefDate] = useState(new Date());
  const [expDate, setExpDate] = useState(new Date());

  const handleChangeRegDate = date => {
    setRegDate(date);
    console.log(`regDate ${regDate}`);
   }

  const handleChangeRefDate = date => {
    setRefDate(date);
    console.log(`refDate ${refDate}`);
   }

  const handleChangeExpDate = date => {
    setExpDate(date);
    console.log(`expDate ${expDate}`);
   }

const {...patient} = props.patient;


return (
  <div className="UpdateFormContainer">
  <Form onSubmit={props.onConfirm}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" placeholder={patient.title}/>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder={patient.name}/>
    </Form.Group>
    </Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridDob">
    <Form.Label>D.O.B</Form.Label>
    <Form.Control type="date" placeholder={patient.dob}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAge">
    <Form.Label>Age</Form.Label>
    <Form.Control type="number" placeholder={patient.age}/>
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
    <Form.Control type="email" placeholder={patient.contact.email}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridContactPhone">
    <Form.Label>Phone</Form.Label>
    <Form.Control type="number" placeholder={patient.contact.phone}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAddressNumber">
    <Form.Label>Street No.</Form.Label>
    <Form.Control type="number" placeholder={patient.address.number}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAddressStreet">
    <Form.Label>Street Name</Form.Label>
    <Form.Control type="text" placeholder={patient.address.street}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAddressTown">
    <Form.Label>Town</Form.Label>
    <Form.Control type="text" placeholder={patient.address.town}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAddressParish">
    <Form.Label>Parish</Form.Label>
    <Form.Control type="text" placeholder={patient.address.parish}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAddressPostOffice">
    <Form.Label>Post Office</Form.Label>
    <Form.Control type="text" placeholder={patient.address.postOffice}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridRegistrationDate">
    <Form.Label>Registration Date</Form.Label>
    <Form.Control type="date" placeholder={patient.registrationDate}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridRegistrationDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Registration Date</Form.Label>
    <DatePicker className="" id="patientCalendarRegistrationDate"
      selected={regDate}
      onChange={handleChangeRegDate}
    />
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridReferralDate">
    <Form.Label>Referral Date</Form.Label>
    <Form.Control type="date" placeholder={patient.referralDate}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridReferralDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Referral Date</Form.Label>
    <DatePicker className="" id="patientCalendarReferralDate"
      selected={refDate}
      onChange={handleChangeRefDate}
    />
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExpirationDate">
    <Form.Label>Expiration Date</Form.Label>
    <Form.Control type="date" placeholder={patient.expirationDate}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExpirationDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Expiration Date</Form.Label>
    <DatePicker className="" id="patientCalendarExpirationDate"
      selected={expDate}
      onChange={handleChangeExpDate}
    />
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridReferringDoctorName">
    <Form.Label>Referring Doctor: Name</Form.Label>
    <Form.Control type="text" placeholder={patient.referringDoctor.name}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridReferringDoctorEmail">
    <Form.Label>Referring Doctor: Email</Form.Label>
    <Form.Control type="email" placeholder={patient.referringDoctor.email}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridReferringDoctorPhone">
    <Form.Label>Referring Doctor: Phone</Form.Label>
    <Form.Control type="number" placeholder={patient.referringDoctor.phone}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAttendingPhysicianName">
    <Form.Label>Attending Physician: Name</Form.Label>
    <Form.Control type="text" placeholder={patient.attendingPhysician.name}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAttendingPhysicianEmail">
    <Form.Label>Attending Physician: Email</Form.Label>
    <Form.Control type="email" placeholder={patient.attendingPhysician.email}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAttendingPhysicianPhone">
    <Form.Label>Attending Physician: Phone</Form.Label>
    <Form.Control type="number" placeholder={patient.attendingPhysician.phone}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridOccupationRole">
    <Form.Label>Job Role</Form.Label>
    <Form.Control type="text" placeholder={patient.occupation.role}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridOccupationEmployer">
    <Form.Label>Employer</Form.Label>
    <Form.Control type="text" placeholder={patient.occupation.employer}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridOccupationEmployerContactPhone">
    <Form.Label>Employer: Phone</Form.Label>
    <Form.Control type="number" placeholder={patient.occupation.contact.phone}/>
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridOccupationEmployerContactEmail">
    <Form.Label>Employer: Email</Form.Label>
    <Form.Control type="email" placeholder={patient.occupation.contact.email}/>
  </Form.Group>
  </Form.Row>


  <Form.Row>
  {props.canCancel && (
    <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
  )}

  {props.canConfirm && (
    <Button variant="primary" className="formButton" type="submit">
    Edit Patient
    </Button>
  )}
  </Form.Row>

  </Form>
  </div>
)};

export default UpdatePatientForm;
