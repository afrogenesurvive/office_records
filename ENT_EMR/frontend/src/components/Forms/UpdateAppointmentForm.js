import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdateAppointmentForm = (props) => {

console.log("UpdateAppointmentForm.props:  ", {...props});
const {...appointment} = props.appointment;
console.log("UpdateAppointmentForm.props.appointment:  ", {...appointment});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder={appointment.title}/>
  </Form.Group>

<Form.Group as={Col} controlId="formGridType">
  <Form.Label>Type</Form.Label>
  <Form.Control type="text" placeholder={appointment.type} />
</Form.Group>

<Form.Group as={Col} controlId="formGridLocation">
  <Form.Label>Location</Form.Label>
  <Form.Control type="text" placeholder={appointment.location} />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDate">
  <Form.Label>Date</Form.Label>
  <Form.Control type="date" placeholder={appointment.date} />
</Form.Group>
<Form.Group as={Col} controlId="formGridDateTodayCheckbox">
  <Form.Label>Today's Date?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridTime">
  <Form.Label>Scheduled Time</Form.Label>
    <Form.Control type="time" placeholder={appointment.time}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridCheckinTime">
  <Form.Label>Check-in Time</Form.Label>
    <Form.Control type="time" placeholder={appointment.checkinTime}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridSeenTime">
  <Form.Label>Seen Time</Form.Label>
    <Form.Control type="time" placeholder={appointment.seenTime}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control as="textarea" rows="2" placeholder={appointment.description} />
</Form.Group>

<Form.Group as={Col} controlId="formGridInProgress">
      <Form.Label>In Progress ?</Form.Label>
      <Form.Control as="select">
        <option>false</option>
        <option>true</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridAttended">
          <Form.Label>Attended ?</Form.Label>
          <Form.Control as="select">
            <option>false</option>
            <option>true</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridImportant">
              <Form.Label>Important ?</Form.Label>
              <Form.Control as="select">
                <option>false</option>
                <option>true</option>
              </Form.Control>
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

export default UpdateAppointmentForm;
