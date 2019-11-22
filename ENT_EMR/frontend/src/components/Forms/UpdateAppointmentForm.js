import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck'
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
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDate">
  <Form.Label>Date</Form.Label>
  <Form.Control type="date" placeholder={appointment.date} />
</Form.Group>

<Form.Group as={Col} controlId="formGridLocation">
  <Form.Label>Location</Form.Label>
  <Form.Control type="text" placeholder={appointment.location} />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control type="text" placeholder={appointment.description} />
</Form.Group>

<Form.Group as={Col} controlId="formGridNotes">
  <Form.Label>Notes</Form.Label>
  <Form.Control type="textarea" placeholder={appointment.notes} />
</Form.Group>

<Form.Group as={Col} controlId="formGridInProgress">
      <Form.Label>InProgress</Form.Label>
      <Form.Control as="select">
        <option>true</option>
        <option>false</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridAttended">
          <Form.Label>Attended</Form.Label>
          <Form.Control as="select">
            <option>true</option>
            <option>false</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridImportant">
              <Form.Label>Important</Form.Label>
              <Form.Control as="select">
                <option>true</option>
                <option>false</option>
              </Form.Control>
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

export default UpdateAppointmentForm;
