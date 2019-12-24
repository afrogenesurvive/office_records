import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";

import './CreateUserForm.css';

const UpdateUserForm = (props) => {

console.log("UpdateUserForm.props:  ", {...props});
const {...user} = props.user;
console.log("UpdateUserForm.props.user:  ", {...user});
// const [startDate, setStartDate] = useState(new Date());

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder={user.email}/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder={user.password}/>
  </Form.Group>
</Form.Row>

<Form.Row>

<Form.Group as={Col} controlId="formGridName">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder={user.name}/>
</Form.Group>
{
  // <Form.Group as={Col} controlId="formGridRole">
  //   <Form.Label>Role</Form.Label>
  //   <Form.Control type="text" placeholder={user.role}/>
  // </Form.Group>
}

<Form.Group as={Col} controlId="formGridPhone">
  <Form.Label>Phone</Form.Label>
  <Form.Control type="number" placeholder={user.phone}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDob">
  <Form.Label>D.O.B</Form.Label>
  <Form.Control type="date" placeholder={user.dob}/>
</Form.Group>

{
  // <DatePicker className="calendarDob"
  //   selected={startDate}
  //   onChange={date => setStartDate(date)}
  // />
}

<Form.Group as={Col} controlId="formGridEmploymentDate">
  <Form.Label>Employment Date</Form.Label>
  <Form.Control type="date" placeholder={user.employmentDate}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridTerminationDate">
  <Form.Label>Termination Date</Form.Label>
  <Form.Control type="date" placeholder={user.terminationDate}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressNumber">
  <Form.Label>addressNumber</Form.Label>
  <Form.Control type="number" placeholder={user.address.number}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridAddressStreet">
  <Form.Label>addressStreet</Form.Label>
  <Form.Control type="text" placeholder={user.address.street}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridAddressTown">
  <Form.Label>addressTown</Form.Label>
  <Form.Control type="text" placeholder={user.address.town}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressParish">
  <Form.Label>addressParish</Form.Label>
  <Form.Control type="text" placeholder={user.address.parish}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridAddressPostOffice">
  <Form.Label>addressPostOffice</Form.Label>
  <Form.Control type="text" placeholder={user.address.postOffice}/>
</Form.Group>
</Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="1" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}
{props.canCancelProfile && (
  <Button variant="danger" onClick={props.onCancel} >
  Cancel
  </Button>
)}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="0" className="btn" type="submit">
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

export default UpdateUserForm;
