import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientInsuranceForm = (props) => {

console.log("UpdatePatientLeaveForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientLeaveForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridInsuranceCompany">
    <Form.Label>insuranceCompany</Form.Label>
    <Form.Control type="text" placeholder="insuranceCompany"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInsuranceNumber">
    <Form.Label>insuranceNumber</Form.Label>
    <Form.Control type="number" placeholder="insuranceNumber"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInsuranceDescription">
    <Form.Label>insuranceDescription</Form.Label>
    <Form.Control type="text" placeholder="insuranceDescription"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridInsuranceExpiry">
    <Form.Label>insuranceExpiry</Form.Label>
    <Form.Control type="date" placeholder="insuranceExpiry"/>
  </Form.Group>

</Form.Row>

<Form.Row>

<Form.Group as={Col} controlId="formGridInsuranceSubscriberCompany">
  <Form.Label>insuranceSubscriberCompany</Form.Label>
  <Form.Control type="text" placeholder="insuranceSubscriberCompany"/>
</Form.Group>
<Form.Group as={Col} controlId="formGridInsuranceSubscriberDescription">
  <Form.Label>insuranceSubscriberDescription</Form.Label>
  <Form.Control type="text" placeholder="insuranceSubscriberDescription"/>
</Form.Group>

</Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

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

export default UpdatePatientInsuranceForm;
