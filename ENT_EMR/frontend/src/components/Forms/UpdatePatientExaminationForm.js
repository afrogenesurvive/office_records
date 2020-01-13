import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientExaminationForm = (props) => {

console.log("UpdatePatientExaminationForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientExaminationForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="ExaminationDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationAreaSelect">
    <Form.Label>Area Options</Form.Label>
    <Form.Control as="select">
    <option>select</option>
    <option>nose</option>
    <option>fauces</option>
    <option>ears</option>
    <option>larynx</option>
    <option>neck</option>
    <option>chest</option>
    <option>cvs</option>
    <option>abdomen</option>
    </Form.Control>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridExaminationArea">
    <Form.Label>Area</Form.Label>
    <Form.Control type="text" placeholder="ExaminationArea"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationGeneral">
    <Form.Label>General</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="ExaminationGeneral"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="ExaminationType"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationMeasure">
    <Form.Label>Measure</Form.Label>
    <Form.Control type="text" placeholder="ExaminationMeasure"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationValue">
    <Form.Label>Value</Form.Label>
    <Form.Control type="text" placeholder="ExaminationValue"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="7" placeholder="ExaminationDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationFollowUp">
    <Form.Label>FollowUp ?</Form.Label>
    <Form.Control as="select">
      <option>true</option>
      <option>false</option>
    </Form.Control>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridExaminationAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="ExaminationAttachmentFormat"/>
  </Form.Group>
  {
  //   <Form.Group as={Col} controlId="formGridAttachmentPath">
  //   <Form.Label>Path</Form.Label>
  //   <Form.Control type="string" placeholder="File path"/>
  // </Form.Group>
}
  <Form.Group as={Col} controlId="formGridExaminationAttachmentFile">
    <Form.Label>File</Form.Label>
    <Form.Control type="file" placeholder="File" onChange={(e) => {console.log(e.target.files[0]);AuthContext._currentValue.file = e.target.files[0];console.log(AuthContext._currentValue.file);}}/>
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
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientExaminationForm;
