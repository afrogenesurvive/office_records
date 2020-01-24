import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreateTestPdfForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onCreatePdfTest}>

<Form.Row>
  <Form.Group as={Col} controlId="formGridDocGenUserInput">
    <Form.Label>Field</Form.Label>
    <Form.Control type="text" placeholder="Input"/>
  </Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridDocGenVisitDate">
    <Form.Label>Visit Date</Form.Label>
    <Form.Control type="date" placeholder="VisitDate"/>
  </Form.Group>
</Form.Row>

<Form.Row>

  <Button variant="primary" className="formButton" type="submit">
  No no! Create Pdf
  </Button>
</Form.Row>

</Form>
</div>

)};

export default CreateTestPdfForm;
