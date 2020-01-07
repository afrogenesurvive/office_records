import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientVitalsForm = (props) => {

console.log("UpdatePatientVitalsForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientVitalsForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridVitalsDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="VitalsDate"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVitalsPr">
    <Form.Label>Pulse rate (unit)</Form.Label>
    <Form.Control type="number" placeholder="VitalsPr"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridVitalsBp1">
    <Form.Label>Blood pressure 1 </Form.Label>
    <Form.Control type="number" placeholder="VitalsBp1"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridVitalsBp2">
    <Form.Label>Blood pressure 2</Form.Label>
    <Form.Control type="number" placeholder="VitalsBp2"/>
  </Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridVitalsRr">
  <Form.Label>Respiratory rate (unit)</Form.Label>
  <Form.Control type="number" placeholder="VitalsRr"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridVitalsTemp">
  <Form.Label>Temperature (unit) </Form.Label>
  <Form.Control type="number" placeholder="VitalsTemp"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridVitalsPs02">
  <Form.Label>02 saturation (unit)</Form.Label>
  <Form.Control type="number" placeholder="VitalsPs02"/>
</Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridVitalsHeight">
    <Form.Label>Height (unit)</Form.Label>
    <Form.Control type="number" placeholder="VitalsHeight"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridVitalsWeight">
    <Form.Label>Weight (unit)</Form.Label>
    <Form.Control type="number" placeholder="VitalsWeight"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridVitalsBmi">
    <Form.Label>Bmi</Form.Label>
    <Form.Control type="number" placeholder="VitalsBmi"/>
  </Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridVitalsUrineType">
  <Form.Label>Urine type</Form.Label>
  <Form.Control type="text" placeholder="VitalsUrineType"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridVitalsUrineValue">
  <Form.Label>Urine value</Form.Label>
  <Form.Control type="text" placeholder="VitalsUrineValue"/>
</Form.Group>
</Form.Row>

{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="9" className="btn">
  Cancel
  </Accordion.Toggle>
)
// <Button variant="danger" onClick={props.onCancel}>
// Cancel
// </Button>
}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="9" className="btn" type="submit">
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

export default UpdatePatientVitalsForm;
