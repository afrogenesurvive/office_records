import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientForm = (props) => {

console.log("UpdatePatientForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientForm.props.patient:  ", {...patient});


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

  <Form.Group as={Col} controlId="formGridDob">
    <Form.Label>D.O.B</Form.Label>
    <Form.Control type="date" placeholder={patient.dob}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAge">
    <Form.Label>Age</Form.Label>
    <Form.Control type="number" placeholder={patient.age}/>
  </Form.Group>
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

  <Form.Group as={Col} controlId="formGridContactPhone">
    <Form.Label>Phone</Form.Label>
    <Form.Control type="number" placeholder={patient.contact.phone}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAddressNumber">
    <Form.Label>AddressNumber</Form.Label>
    <Form.Control type="number" placeholder={patient.address.number}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAddressStreet">
    <Form.Label>AddressStreet</Form.Label>
    <Form.Control type="text" placeholder={patient.address.street}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAddressTown">
    <Form.Label>AddressTown</Form.Label>
    <Form.Control type="text" placeholder={patient.address.town}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAddressParish">
    <Form.Label>AddressParish</Form.Label>
    <Form.Control type="text" placeholder={patient.address.parish}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAddressPostOffice">
    <Form.Label>AddressPostOffice</Form.Label>
    <Form.Control type="text" placeholder={patient.address.postOffice}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridRegistrationDate">
    <Form.Label>RegistrationDate</Form.Label>
    <Form.Control type="date" placeholder={patient.registrationDate}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridReferralDate">
    <Form.Label>ReferralDate</Form.Label>
    <Form.Control type="date" placeholder={patient.referralDate}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExpirationDate">
    <Form.Label>ExpirationDate</Form.Label>
    <Form.Control type="date" placeholder={patient.expirationDate}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridReferringDoctorName">
    <Form.Label>ReferringDoctorName</Form.Label>
    <Form.Control type="text" placeholder={patient.referringDoctor.name}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridReferringDoctorEmail">
    <Form.Label>ReferringDoctorEmail</Form.Label>
    <Form.Control type="email" placeholder={patient.referringDoctor.email}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridReferringDoctorPhone">
    <Form.Label>ReferringDoctorPhone</Form.Label>
    <Form.Control type="number" placeholder={patient.referringDoctor.phone}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridAttendingPhysicianName">
    <Form.Label>AttendingPhysicianName</Form.Label>
    <Form.Control type="text" placeholder={patient.attendingPhysician.name}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAttendingPhysicianEmail">
    <Form.Label>AttendingPhysicianEmail</Form.Label>
    <Form.Control type="email" placeholder={patient.attendingPhysician.email}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAttendingPhysicianPhone">
    <Form.Label>AttendingPhysicianPhone</Form.Label>
    <Form.Control type="number" placeholder={patient.attendingPhysician.phone}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridOccupationRole">
    <Form.Label>OccupationRole</Form.Label>
    <Form.Control type="text" placeholder={patient.occupation.role}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridOccupationEmployer">
    <Form.Label>OccupationEmployer</Form.Label>
    <Form.Control type="text" placeholder={patient.occupation.employer}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridOccupationEmployerContactPhone">
    <Form.Label>OccupationEmployerContactPhone</Form.Label>
    <Form.Control type="number" placeholder={patient.occupation.contact.phone}/>
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridOccupationEmployerContactEmail">
    <Form.Label>OccupationEmployerContactEmail</Form.Label>
    <Form.Control type="email" placeholder={patient.occupation.contact.email}/>
  </Form.Group>
  </Form.Row>


  {props.canCancel && (
    <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
  )}

  {props.canConfirm && (
    <Button variant="success" type="submit">Edit Patient</Button>
  )}

  </Form>
  {
    // <AuthContext.Consumer>
  // </AuthContext.Consumer>
  }
  </div>
)};

export default UpdatePatientForm;
