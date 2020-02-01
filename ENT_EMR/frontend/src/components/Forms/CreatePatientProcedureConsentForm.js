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
      <Form.Group as={Col} controlId="formGridDocGenProcedureConsent">
        <Form.Label>Procedure Consent </Form.Label>
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
