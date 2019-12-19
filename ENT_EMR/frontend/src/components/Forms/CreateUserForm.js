import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import FormCheck from 'react-bootstrap/FormCheck'
// import { NavLink } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const CreateUserForm = (props) => {

  // console.log({...props});
  console.log("CreateUserForm:  ", AuthContext.token);
  // const [startDate, setStartDate] = useState(new Date());
return (
<div className="CreateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"/>
  </Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridName">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder="Name" />
</Form.Group>


<Form.Group as={Col} controlId="formGridRole">
  <Form.Label>Role</Form.Label>
  <Form.Control as="select">
  <option>guest</option>
  <option>nurse</option>
  <option>doctor</option>
  <option>staff</option>

  </Form.Control>
</Form.Group>

<Form.Group as={Col} controlId="formGridPhone">
  <Form.Label>Phone</Form.Label>
  <Form.Control type="number" placeholder="phone"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDob">
  <Form.Label>D.O.B</Form.Label>
  <Form.Control type="date" placeholder="dob"/>
</Form.Group>

  {
    // <DatePicker className="calendarDob"
    //   selected={startDate}
    //   onChange={date => setStartDate(date)}
    // />
  }

<Form.Group as={Col} controlId="formGridEmploymentDate">
  <Form.Label>Employment Date</Form.Label>
  <Form.Control type="date" placeholder="employmentDate" />
</Form.Group>

<Form.Group as={Col} controlId="formGridTerminationDate">
  <Form.Label>Termination Date</Form.Label>
  <Form.Control type="date" placeholder="terminationDate" />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressNumber">
  <Form.Label>addressNumber</Form.Label>
  <Form.Control type="number" placeholder="addressNumber"/>
</Form.Group>

<Form.Group as={Col} controlId="formGridAddressStreet">
  <Form.Label>addressStreet</Form.Label>
  <Form.Control type="text" placeholder="addressStreet"/>
</Form.Group>

<Form.Group as={Col} controlId="formGridAddressTown">
  <Form.Label>addressTown</Form.Label>
  <Form.Control type="text" placeholder="addressTown"/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressParish">
  <Form.Label>addressParish</Form.Label>
  <Form.Control type="text" placeholder="addressParish"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridAddressPostOffice">
  <Form.Label>addressPostOffice</Form.Label>
  <Form.Control type="text" placeholder="addressPostOffice"/>
</Form.Group>
</Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="0" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Button variant="success" type="submit">Create</Button>
)}
<p>{props.successText}</p>

</Form>
{
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default CreateUserForm;
