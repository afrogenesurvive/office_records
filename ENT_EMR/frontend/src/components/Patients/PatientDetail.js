import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import PatientAppointmentList from './PatientList/PatientAppointmentList';
import PatientInsuranceList from './PatientList/PatientInsuranceList';
import PatientNextOfKinList from './PatientList/PatientNextOfKinList';
import PatientComplaintList from './PatientList/PatientComplaintList';
import PatientExaminationList from './PatientList/PatientExaminationList';
import PatientHistoryList from './PatientList/PatientHistoryList';
import PatientAllergiesList from './PatientList/PatientAllergiesList';
import PatientMedicationList from './PatientList/PatientMedicationList';
import PatientInvestigationList from './PatientList/PatientInvestigationList';
import PatientDiagnosisList from './PatientList/PatientDiagnosisList';
import PatientTreatmentList from './PatientList/PatientTreatmentList';
import PatientBillingList from './PatientList/PatientBillingList';


import './PatientDetail.css';

const PatientDetail = (props) => {
  const {...patient} = props.patient;
  // const authPatientId = props.authUserId;
  const patientAppointment = patient.appointments;
  const patientInsurance = patient.insurance;
  const patientNextOfKin = patient.nextOfKin;
  const patientComplaint = patient.complaints;
  const patientExamination = patient.examination;
  const patientHistory = patient.history;
  const patientAllergies = patient.allergies;
  const patientMedication = patient.medication;
  const patientInvestigation = patient.investigation;
  const patientDiagnosis = patient.diagnosis;
  const patientTreatment = patient.treatment;
  const patientBilling = patient.billing;
  const patientRegistrationDate = new Date(patient.registrationDate*1000).toUTCString();
  const patientDob = new Date(patient.dob*1000).toUTCString();
  const patientReferralDate = new Date(patient.referralDate*1000).toUTCString();
  const patientExpirationDate = new Date(patient.expirationDate*1000).toUTCString();

  console.log("PatientDetail.props.patient:  ", {...patient});

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
        D.O.B: {patientDob}
      </Card.Text>
      <Card.Text>
        Reg Date: {patientRegistrationDate}
      </Card.Text>
      <Card.Text>
        Ref Date: {patientReferralDate}
      </Card.Text>
      <Card.Text>
        Exp Date: {patientExpirationDate}
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
      <Card.Text>
        Appointments:
      </Card.Text>
      
        <PatientAppointmentList
        patientAppointment={patientAppointment}
        authUserId={props.authUserId}
        />
      
      <Card.Text>
      Insurance:
      </Card.Text>
      <PatientInsuranceList
        patientInsurance={patientInsurance}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Next Of Kin:
      </Card.Text>
      <PatientNextOfKinList
        patientNextOfKin={patientNextOfKin}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Complaints:
      </Card.Text>
      <PatientComplaintList
        patientComplaint={patientComplaint}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Examination:
      </Card.Text>
      <PatientExaminationList
        patientExamination={patientExamination}
        authUserId={props.authUserId}
        />
      <Card.Text>
        History:
      </Card.Text>
      <PatientHistoryList
        patientHistory={patientHistory}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Allergies:
      </Card.Text>
      <PatientAllergiesList
        patientAllergies={patientAllergies}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Medication:
      </Card.Text>
      <PatientMedicationList
        patientMedication={patientMedication}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Investigation:
      </Card.Text>
      <PatientInvestigationList
        patientInvestigation={patientInvestigation}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Diagnosis:
      </Card.Text>
      <PatientDiagnosisList
        patientDiagnosis={patientDiagnosis}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Treatment:
      </Card.Text>
      <PatientTreatmentList
        patientTreatment={patientTreatment}
        authUserId={props.authUserId}
        />
      <Card.Text>
        Billing:
      </Card.Text>
      <PatientBillingList
        patientBilling={patientBilling}
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
