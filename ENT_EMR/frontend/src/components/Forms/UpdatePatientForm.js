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
    <Form.Group as={Col} controlId="formGridName">

      <Form.Label>name</Form.Label>
      <Form.Control type="text" placeholder={patient.name}/>

    </Form.Group>

    <Form.Group as={Col} controlId="formGridAddress">

      <Form.Label>Address</Form.Label>
      <Form.Control type="text" placeholder={patient.address}/>

    </Form.Group>

  <Form.Group as={Col} controlId="formGridDob">

    <Form.Label>D.O.B</Form.Label>
    <Form.Control type="date" placeholder={patient.dob} />

  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridContactEmail">

    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder='{patient.contact.email}' />

  </Form.Group>

  <Form.Group as={Col} controlId="formGridContactPhone">

    <Form.Label>Phone</Form.Label>
    <Form.Control type="number" placeholder={patient.phone} />

  </Form.Group>

  <Form.Group as={Col} controlId="formGridRegistrationDate">

    <Form.Label>RegistrationDate</Form.Label>
    <Form.Control type="date" placeholder={patient.registrationDate} />

  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridReferringDoctorName">

    <Form.Label>ReferringDoctorName</Form.Label>
    <Form.Control type="text" placeholder='{patient.referringDoctor.name}' />

  </Form.Group>

  <Form.Group as={Col} controlId="formGridReferringDoctorEmail">

    <Form.Label>ReferringDoctorEmail</Form.Label>
    <Form.Control type="email" placeholder='{patient.referringDoctor.email} '/>

  </Form.Group>

  <Form.Group as={Col} controlId="formGridReferringDoctorPhone">

    <Form.Label>ReferringDoctorPhone</Form.Label>
    <Form.Control type="number" placeholder="ReferringDoctorPhone" />

  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridOccupationRole">

    <Form.Label>OccupationRole</Form.Label>
    <Form.Control type="text" placeholder="OccupationRole" />

  </Form.Group>

  <Form.Group as={Col} controlId="formGridOccupationEmployer">

    <Form.Label>OccupationEmployer</Form.Label>
    <Form.Control type="text" placeholder="OccupationEmployer" />

  </Form.Group>

  <Form.Group as={Col} controlId="formGridOccupationEmployerContactPhone">

    <Form.Label>OccupationEmployerContactPhone</Form.Label>
    <Form.Control type="number" placeholder="OccupationEmployerContactPhone" />

  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridOccupationEmployerContactEmail">

    <Form.Label>OccupationEmployerContactEmail</Form.Label>
    <Form.Control type="email" placeholder="OccupationEmployerContactEmail" />

  </Form.Group>

  </Form.Row>



  {props.canCancel && (
    <Accordion.Toggle as={Button} variant="danger" eventKey="2" className="btn" onClick={props.onCancel}>
    Cancel
    </Accordion.Toggle>
  )}

  {props.canConfirm && (
    <Accordion.Toggle as={Button} variant="success" eventKey="2" className="btn" type="submit">
    Submit
    </Accordion.Toggle>
  )}

  </Form>
  {
    // <AuthContext.Consumer>
  // </AuthContext.Consumer>
  }
  </div>
)};

export default UpdatePatientForm;
