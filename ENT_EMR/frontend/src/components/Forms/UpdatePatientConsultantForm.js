import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientConsultantForm = (props) => {

console.log("UpdatePatientConsultantForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientConsultantForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridConsultantDate">
    <Form.Label>Consultation Date</Form.Label>
    <Form.Control type="date" placeholder="ConsultantDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridConsultantDateTodayCheckbox">
    <Form.Label>Today's Date?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>

  </Form.Row>

  <Form.Row>
  {props.canCancel && (
    <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
  )}

  {props.canConfirm && (
    <Button variant="primary" className="formButton" type="submit">
    Submit
    </Button>
  )}

  {props.visit && (
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "consultant")}>
    Done adding Consultant
    </Button>
  )}
  </Form.Row>

</Form>
{
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientConsultantForm;
