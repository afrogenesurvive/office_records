import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const CreatePatientInsuranceNoteForm = (props) => {

  const [date, setDate] = useState(new Date());

  const handleChangeDate = date => {
    setDate(date);
    console.log(`date ${date}`);
   }

const {...patient} = props.patient;

return (
<div className="UpdateFormContainer">
  <Form onSubmit={props.onCreateInsuranceNote}>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenInsuranceNotePolicyNumber">
        <Form.Label>Policy No.</Form.Label>
        <Form.Control type="number" placeholder="Insurance Policy Number"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenInsuranceNoteOperation">
        <Form.Label>Operation (Days)</Form.Label>
        <Form.Control type="text" placeholder="Operation"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenInsuranceNoteOperationDate">
        <Form.Label>Operation Date</Form.Label>
        <Form.Control type="date" placeholder="Operation Date"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="">
      <Form.Label>Fancy Operation Date</Form.Label>
      <DatePicker className="" id="patientInsuranceNoteCalendarOperationDate"
        selected={date}
        onChange={handleChangeDate}
      />
    </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenInsuranceNoteSurgeonFee">
        <Form.Label>Surgeon's Fee</Form.Label>
        <Form.Control type="number" step="0.01" placeholder="Surgeon's Fee"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenInsuranceNoteAssistantSurgeonFee">
        <Form.Label>Assistant Surgeon's Fee</Form.Label>
        <Form.Control type="number" step="0.01" placeholder="AssistantSurgeon's Fee"/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridDocGenInsuranceNoteAnesthetistFee">
        <Form.Label>Anesthetist's Fee</Form.Label>
        <Form.Control type="number" step="0.01" placeholder="Anesthetist's Fee"/>
      </Form.Group>

    </Form.Row>

  <Form.Row>

    <Button variant="primary" className="formButton" type="submit">
    No no! Create Insurance Note
    </Button>
  </Form.Row>

  </Form>
</div>

)};

export default CreatePatientInsuranceNoteForm;
