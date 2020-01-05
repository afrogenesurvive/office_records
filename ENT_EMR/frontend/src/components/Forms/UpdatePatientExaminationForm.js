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
    <Form.Label>ExaminationDate</Form.Label>
    <Form.Control type="date" placeholder="ExaminationDate"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationAreaSelect">
    <Form.Label>ExaminationArea Options</Form.Label>
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
    <Form.Label>ExaminationArea</Form.Label>
    <Form.Control type="text" placeholder="ExaminationArea"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationGeneral">
    <Form.Label>ExaminationGeneral</Form.Label>
    <Form.Control type="text" placeholder="ExaminationGeneral"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationType">
    <Form.Label>ExaminationType</Form.Label>
    <Form.Control type="text" placeholder="ExaminationType"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationMeasure">
    <Form.Label>ExaminationMeasure</Form.Label>
    <Form.Control type="text" placeholder="ExaminationMeasure"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationValue">
    <Form.Label>ExaminationValue</Form.Label>
    <Form.Control type="text" placeholder="ExaminationValue"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridExaminationDescription">
    <Form.Label>ExaminationDescription</Form.Label>
    <Form.Control as="textarea" rows="3" placeholder="ExaminationDescription"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationFollowUp">
    <Form.Label>ExaminationFollowUp</Form.Label>
    <Form.Control as="select">
      <option>true</option>
      <option>false</option>
    </Form.Control>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridExaminationAttachmentFormat">
    <Form.Label>ExaminationAttachmentFormat</Form.Label>
    <Form.Control type="text" placeholder="ExaminationAttachmentFormat"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationAttachmentPath">
    <Form.Label>ExaminationAttachmentPath</Form.Label>
    <Form.Control type="text" placeholder="ExaminationAttachmentPath"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridExaminationAttachmentFile">
    <Form.Label>File</Form.Label>
    <Form.Control type="file" placeholder="File" onChange={(e) => {console.log(e.target.files[0]);AuthContext._currentValue.file = e.target.files[0];console.log(AuthContext._currentValue.file);}}/>
  </Form.Group>
  </Form.Row>


{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="9" className="btn" onClick={props.onCancel}>
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
  // <Form.Group as={Col} controlId="formGridExaminationAttachmentName">
  //   <Form.Label>ExaminationAttachmentName</Form.Label>
  //   <Form.Control type="text" placeholder="ExaminationAttachmentName"/>
  // </Form.Group>
  // <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</div>

)};

export default UpdatePatientExaminationForm;
