import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import PatientInsuranceList from './PatientList/PatientInsuranceList';
import PatientNextOfKinList from './PatientList/PatientNextOfKinList';


import './PatientDetail.css';

const PatientDetail = (props) => {
  const {...patient} = props.patient;
  // const authPatientId = props.authUserId;
  const patientInsurance = patient.insurance;
  const patientNextOfKin = patient.nextOfKin;
  console.log("PatientDetail.props.patient:  ", {...patient}, patientNextOfKin)
  // console.log("props.authUserId:  ",authUserId, "props.patient:  ", {...patient});
  return (
    <div className="PatientDetailBox">
    <Card className="PatientDetailCard">
    <Card.Body>
      <Card.Title>Patient Details:</Card.Title>
      <Card.Text>
        ID: {patient._id}
      </Card.Text>
      <Card.Text>
        Name: {patient.name}
      </Card.Text>
      <Card.Text>
        Address: {patient.address}
      </Card.Text>
      <Card.Text>
        D.O.B: {patient.dob}
      </Card.Text>
      <Card.Text>
        Reg Date: {patient.registrationDate}
      </Card.Text>
      <Card.Text>
        Ref Date: {patient.referralDate}
      </Card.Text>
      <Card.Text>
        Exp Date: {patient.expirationDate}
      </Card.Text>
      <Card.Text>
        Work Position: {patient.occupation.role}
      </Card.Text>
      <Card.Text>
        Work Employer: {patient.occupation.employer}
      </Card.Text>
      <Card.Text>
        Employer Phone: {patient.occupation.contact.phone}
      </Card.Text>
      <Card.Text>
        Employer Email: {patient.occupation.contact.email}
      </Card.Text>
      <PatientInsuranceList
        patientInsurance={patientInsurance}
        authUserId={props.authUserId}
        />
      <PatientNextOfKinList
        patientNextOfKin={patientNextOfKin}
        authUserId={props.authUserId}
        />
      {props.canEdit && (
        <Accordion.Toggle as={Button} variant="link" eventKey="8" className="btn" onClick={props.onEdit}>
        Edit
        </Accordion.Toggle>
      )}
      {props.canDelete && (
        <Button variant="warning" onClick={props.onDelete}>Delete</Button>
      )}
    </Card.Body>
  </Card>
  </div>
  );
}

export default PatientDetail;
