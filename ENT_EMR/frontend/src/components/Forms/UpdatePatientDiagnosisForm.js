import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientDiagnosisForm = (props) => {

  const [diagnosisDate, setDiagnosisDate] = useState(new Date());

  const handleChangeDiagnosisDate = date => {
    setDiagnosisDate(date);
    console.log(`diagnosisDate ${diagnosisDate}`);
   }

const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridDiagnosisDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="DiagnosisDate"/>
  </Form.Group>
  )}
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridDiagnosisDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}
  {props.visit && (
  <Form.Group as={Col} controlId="formGridDiagnosisDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" defaultChecked={true} onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}

  </Form.Row>

  {!props.visit && (
  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Date</Form.Label>
    <DatePicker className="" id="patientDiagnosisCalendarDate"
      selected={diagnosisDate}
      onChange={handleChangeDiagnosisDate}
    />
  </Form.Group>
  </Form.Row>
  )}

  <Form.Row>
  <Form.Group as={Col} controlId="formGridDiagnosisTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridDiagnosisType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisType"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridDiagnosisDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="7" placeholder="DiagnosisDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridDiagnosisAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="DiagnosisAttachmentFormat"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridDiagnosisAttachmentFile">
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

  {props.visit && (
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "diagnosis")}>
    Done adding Diagnosis
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientDiagnosisForm;
