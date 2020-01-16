import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
// import FormCheck from 'react-bootstrap/FormCheck'
import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientVigilanceForm = (props) => {

console.log("UpdatePatientVigilanceForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientVigilanceForm.props.patient:  ", {...patient});


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>

  {!props.visit && (
  <Form.Group as={Col} controlId="formGridVigilanceDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="VigilanceDate"/>
  </Form.Group>
  )}

  {!props.visit && (
  <Form.Group as={Col} controlId="formGridVigilanceDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}

  {props.visit && (
  <Form.Group as={Col} controlId="formGridVigilanceDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" defaultChecked={true}/>
  </Form.Group>
  )}

  </Form.Row>

  <Form.Row>
  <h6>Chronic Illness </h6>
  <h6>Diabetes : </h6>
  <Form.Group as={Col} controlId="formGridVigilance">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilance">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilance">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridBillingTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="BillingTitle"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="BillingType"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridBillingDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="7" placeholder="BillingDescription"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridBillingAmount">
    <Form.Label>Amount</Form.Label>
    <Form.Control type="text" placeholder="BillingAmount"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridBillingPaid">
        <Form.Label>Paid ?</Form.Label>
        <Form.Control as="select">
          <option>true</option>
          <option>false</option>
        </Form.Control>
      </Form.Group>
      </Form.Row>

      <Form.Row>
      <Form.Group as={Col} controlId="formGridBillingNotes">
        <Form.Label>Notes</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="BillingNotes"/>
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
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "vigilance")}>
    Done adding Billing
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientBillingForm;
