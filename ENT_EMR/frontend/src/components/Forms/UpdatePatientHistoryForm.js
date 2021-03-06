import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientHistoryForm = (props) => {

  const [historyDate, setHistoryDate] = useState(new Date());

  const handleChangeHistoryDate = date => {
    setHistoryDate(date);
    console.log(`historyDate ${historyDate}`);
   }

const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="Past History Type"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy History Date</Form.Label>
    <DatePicker className="" id="patientHistoryCalendarDate"
      selected={historyDate}
      onChange={handleChangeHistoryDate}
    />
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Past History Title"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridHistoryDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="Past History Description"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridHistoryAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="Past History AttachmentFormat"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridHistoryAttachmentFile">
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
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientHistoryForm;
