import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import FormCheck from 'react-bootstrap/FormCheck'
// import { NavLink } from 'react-router-dom';
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const CreatePatientForm = (props) => {

  // console.log({...props});
  // console.log("CreatePatientForm:  ", AuthContext.token);

return (
<div className="CreateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridName">
  {
    // <Form.Label>name</Form.Label>
    <Form.Control type="text" placeholder="Enter name"/>
  }
  </Form.Group>

  <Form.Group as={Col} controlId="formGridAddress">
  {
    // <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder="Address"/>
  }
  </Form.Group>

<Form.Group as={Col} controlId="formGridDob">
  {
  // <Form.Label>D.O.B</Form.Label>
  <Form.Control type="date" placeholder="D.O.B" />
}
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridContactEmail">
  {
  // <Form.Label>Email</Form.Label>
  <Form.Control type="email" placeholder="Email" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridContactPhone">
  {
  // <Form.Label>Phone</Form.Label>
  <Form.Control type="number" placeholder="Phone" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridRegistrationDate">
  {
  // <Form.Label>RegistrationDate</Form.Label>
  <Form.Control type="date" placeholder="RegistrationDate" />
}
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridReferringDoctorName">
  {
  // <Form.Label>ReferringDoctorName</Form.Label>
  <Form.Control type="text" placeholder="ReferringDoctorName" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridReferringDoctorEmail">
  {
  // <Form.Label>ReferringDoctorEmail</Form.Label>
  <Form.Control type="email" placeholder="ReferringDoctorEmail" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridReferringDoctorPhone">
  {
  // <Form.Label>ReferringDoctorPhone</Form.Label>
  <Form.Control type="number" placeholder="ReferringDoctorPhone" />
}
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridOccupationRole">
  {
  // <Form.Label>OccupationRole</Form.Label>
  <Form.Control type="text" placeholder="OccupationRole" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridOccupationEmployer">
  {
  // <Form.Label>OccupationEmployer</Form.Label>
  <Form.Control type="text" placeholder="OccupationEmployer" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridOccupationEmployerContactPhone">
  {
  // <Form.Label>OccupationEmployerContactPhone</Form.Label>
  <Form.Control type="number" placeholder="OccupationEmployerContactPhone" />
}
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridOccupationEmployerContactEmail">
  {
  // <Form.Label>OccupationEmployerContactEmail</Form.Label>
  <Form.Control type="email" placeholder="OccupationEmployerContactEmail" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridInsuranceCompany">
  {
  // <Form.Label>InsuranceCompany</Form.Label>
  <Form.Control type="text" placeholder="InsuranceCompany" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridInsuranceNumber">
  {
  // <Form.Label>InsuranceNumber</Form.Label>
  <Form.Control type="number" placeholder="InsuranceNumber" />
}
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridInsuranceDescription">
  {
  // <Form.Label>InsuranceDescription</Form.Label>
  <Form.Control type="text" placeholder="InsuranceDescription" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridInsuranceExpiry">
  {
  // <Form.Label>InsuranceExpiry</Form.Label>
  <Form.Control type="date" placeholder="InsuranceExpiry" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridInsuranceSubscriberCompany">
  {
  // <Form.Label>InsuranceSubscriberCompany</Form.Label>
  <Form.Control type="text" placeholder="InsuranceSubscriberCompany" />
}
</Form.Group>

<Form.Group as={Col} controlId="formGridInsuranceSubscriberDescription">
  {
  // <Form.Label>InsuranceSubscriberDescription</Form.Label>
  <Form.Control type="text" placeholder="InsuranceSubscriberDescription" />
}
</Form.Group>
</Form.Row>


{props.canCancel && (
  <Button variant="primary" onClick={props.onCancel}>
  Cancel
  </Button>
)}

{props.canConfirm && (
  <Button variant="secondary" type="submit" >
  Submit
  </Button>
)}

</Form>
{
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default CreatePatientForm;
