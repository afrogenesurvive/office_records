import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert'
import TimeField from 'react-simple-timefield';
// import FormCheck from 'react-bootstrap/FormCheck'
// import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const CreateAppointmentForm = (props) => {

  // console.log({...props});
  console.log("CreateAppointmentForm:  ", AuthContext.token);

return (
<div className="CreateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
<Alert variant="primary">
  Create an appointment for: {props.selectedPatient.name}
</Alert>
</Form.Row>
<Form.Row>
  <Form.Group as={Col} controlId="formGridTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Title"/>
  </Form.Group>

<Form.Group as={Col} controlId="formGridType">
  <Form.Label>Type</Form.Label>
  <Form.Control type="text" placeholder="Type" />
</Form.Group>

<Form.Group as={Col} controlId="formGridLocation">
  <Form.Label>Location</Form.Label>
  <Form.Control type="text" placeholder="Location" />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDate">
  <Form.Label>Date</Form.Label>
  <Form.Control type="date" placeholder="Date" />
</Form.Group>
<Form.Group as={Col} controlId="formGridTime">
  <Form.Label>Time</Form.Label>
    <Form.Control type="time" placeholder="Time" />
</Form.Group>
<Form.Group as={Col} controlId="formGridCheckinTime">
  <Form.Label>CheckinTime</Form.Label>
    <Form.Control type="time" placeholder="CheckinTime" />
</Form.Group>
<Form.Group as={Col} controlId="formGridSeenTime">
  <Form.Label>SeenTime</Form.Label>
    <Form.Control type="time" placeholder="SeenTime" />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control as="textarea" rows="2" placeholder="Description" />
</Form.Group>

<Form.Group as={Col} controlId="formGridInProgress">
      <Form.Label>InProgress</Form.Label>
      <Form.Control as="select">
        <option>false</option>
        <option>true</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridAttended">
          <Form.Label>Attended</Form.Label>
          <Form.Control as="select">
            <option>false</option>
            <option>true</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridImportant">
              <Form.Label>Important</Form.Label>
              <Form.Control as="select">
                <option>false</option>
                <option>true</option>
              </Form.Control>
            </Form.Group>
</Form.Row>

{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="4" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Button variant="success" type="submit">Create New</Button>
)}

</Form>
</div>

)};

export default CreateAppointmentForm;
