import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientComplaintForm = (props) => {


const {...patient} = props.patient;

const [complaintDate, setComplaintDate] = useState(new Date());

const handleChangeComplaintDate = date => {
  setComplaintDate(date);
  console.log(`complaintDate ${complaintDate}`);
 }

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridComplaintDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="ComplaintDate"/>
  </Form.Group>
  )}
  {!props.visit && (
  <Form.Group as={Col} controlId="formGridComplaintDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}
  {!props.visit && (
    <Form.Group as={Col} controlId="">
      <Form.Label>Fancy Complaint Date</Form.Label>
      <DatePicker className="" id="patientComplaintCalendarDate"
        selected={complaintDate}
        onChange={handleChangeComplaintDate}
      />
    </Form.Group>
  )}
  {props.visit && (
  <Form.Group as={Col} controlId="formGridComplaintDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" defaultChecked={true}/>
  </Form.Group>
  )}

  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridComplaintTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="HistoryTitle"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridComplaintDescription">
    <Form.Label>Complaint</Form.Label>
    <Form.Control as="textarea" rows="7" placeholder="HistoryComplaint"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridComplaintAnamnesis">
    <Form.Label>Anamnesis</Form.Label>
    <Form.Control as="textarea" rows="7" placeholder="HistoryAnamnesis"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>

  <Form.Group as={Col} controlId="formGridComplaintAttachmentFormat">
    <Form.Label>Attachment Format</Form.Label>
    <Form.Control type="text" placeholder="historyAttachmentFormat"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridComplaintAttachmentFile">
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
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "complaint")}>
    Done adding Complaint
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientComplaintForm;
