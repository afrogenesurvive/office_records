import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientSurveyForm = (props) => {

  const [surveyDate, setSurveyDate] = useState(new Date());

  const handleChangeSurveyDate = date => {
    setSurveyDate(date);
    console.log(`surveyDate ${surveyDate}`);
   }

const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>

  {!props.visit && (
  <Form.Group as={Col} controlId="formGridSurveyDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}

  {props.visit && (
  <Form.Group as={Col} controlId="formGridSurveyDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" defaultChecked={true}/>
  </Form.Group>
  )}
  </Form.Row>

  {!props.visit && (
  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Date</Form.Label>
    <DatePicker className="" id="patientSurveyCalendarDate"
      selected={surveyDate}
      onChange={handleChangeSurveyDate}
    />
  </Form.Group>
  </Form.Row>
  )}

  <Form.Row>
  <Form.Group as={Col} controlId="formGridSurveyTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="SurveyTitle"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridSurveyDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="SurveyDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridSurveyAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="SurveyAttachmentFormat"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridSurveyAttachmentFile">
    <Form.Label>File</Form.Label>
    <Form.Control type="file" placeholder="File" id="fileInput" onChange={(e) => {console.log(e.target.files[0]);AuthContext._currentValue.file = e.target.files[0];console.log(AuthContext._currentValue.file);}}/>
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
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "survey")}>
    Done adding Survey
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientSurveyForm;
