import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientProcedureConsentForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateProcedureConsent}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenProcedureConsentGiver">
        <Form.Label>Consent Giver </Form.Label>
        <Form.Control type="text" placeholder="ProcedureConsentGiver"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenProcedureConsentGiverRelation">
        <Form.Label>Consent Giver Relation </Form.Label>
        <Form.Control as="select">
          <option>select</option>
          <option>Myself</option>
          <option>My Daughter</option>
          <option>My Son</option>
          <option>My Spouse</option>
        </Form.Control>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenProcedureConsentProcedure">
        <Form.Label>Procedure </Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="ProcedureConsent"/>
      </Form.Group>
    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    No no Create Procedure Consent
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientProcedureConsentForm;
