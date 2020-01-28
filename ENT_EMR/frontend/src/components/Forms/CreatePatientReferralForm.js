import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientReferralForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onCreateReferral}>

<Form.Row>
  <Form.Group as={Col} controlId="formGridDocGenReferralVisitDate">
    <Form.Label>Visit Date</Form.Label>
    <Form.Control type="date" placeholder="VisitDate"/>
  </Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridDocGenReferralFindings">
    <Form.Label>Findings</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="Findings"/>
  </Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridDocGenReferralRecommendation">
    <Form.Label>Recommendation</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="Recommendation"/>
  </Form.Group>
</Form.Row>


<Form.Row>

  <Button variant="primary" className="formButton" type="submit">
  No no! Create Referral
  </Button>
</Form.Row>

</Form>
</div>

)};

export default CreatePatientReferralForm;
