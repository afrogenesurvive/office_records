import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const CreatePatientUnfitToFlyForm = (props) => {
const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateUnfitToFly}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenUnfitToFlyClinicalFeatures">
        <Form.Label>Clinical Features</Form.Label>
        <Form.Control as="textarea" rows="9" placeholder="Clinical Features"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenUnfitToFlyProvisonalInvestigation">
        <Form.Label>Provisional Investigation</Form.Label>
        <Form.Control as="textarea" rows="9" placeholder="Provisional Investigation"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenUnfitToFlyConclusion">
        <Form.Label>Conclusion</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Conclusion"/>
      </Form.Group>
    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    No no Create Unfit to Fly Authorization
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientUnfitToFlyForm;
