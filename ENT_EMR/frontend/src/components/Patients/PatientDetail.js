import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import PatientAppointmentList from './PatientList/PatientAppointmentList';
import PatientInsuranceList from './PatientList/PatientInsuranceList';
import PatientConsultantList from './PatientList/PatientConsultantList';
import PatientNextOfKinList from './PatientList/PatientNextOfKinList';
import PatientComplaintList from './PatientList/PatientComplaintList';
import PatientSurveyList from './PatientList/PatientSurveyList';
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
  const patientConsultant = patient.consultant;
  const patientNextOfKin = patient.nextOfKin;
  const patientComplaint = patient.complaints;
  const patientSurvey = patient.surveys;
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
    <div className="PatientDetailBox1">

    <Tabs defaultActiveKey="Demographics" id="uncontrolled-tab-example" className="tab">
      <Tab eventKey="" title="Details:" disabled>
      </Tab>
      <Tab eventKey="Demographics" title="Demographics">
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
        Age: {patient.age}
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
      </Card.Body>
      </Card>

      </Tab>
      <Tab eventKey="Appointments" title="Appointments">
      <Card.Text>
        Appointments:
      </Card.Text>
      <PatientAppointmentList
      patientAppointment={patientAppointment}
      authUserId={props.authUserId}
      />
      </Tab>
      <Tab eventKey="Consultant" title="Consultant">
      <Card.Text>
        Consultants:
      </Card.Text>
      <PatientConsultantList
        patientConsultant={patientConsultant}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Insurance" title="Insurance">
      <Card.Text>
        Insurance:
      </Card.Text>
      <PatientInsuranceList
        patientInsurance={patientInsurance}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="NextOfKin" title="NextOfKin">
      <Card.Text>
        NextOfKin:
      </Card.Text>
      <PatientNextOfKinList
        patientNextOfKin={patientNextOfKin}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Complaint" title="Complaint">
      <Card.Text>
        Complaint:
      </Card.Text>
      <PatientComplaintList
        patientComplaint={patientComplaint}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Survey" title="Survey">
      <Card.Text>
        Surveys:
      </Card.Text>
      <PatientSurveyList
        patientSurvey={patientSurvey}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Examination" title="Examination">
      <Card.Text>
        Examination:
      </Card.Text>
      <PatientExaminationList
        patientExamination={patientExamination}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="History" title="History">
      <Card.Text>
        History:
      </Card.Text>
      <PatientHistoryList
        patientHistory={patientHistory}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Allergies" title="Allergies">
      <Card.Text>
        Allergies:
      </Card.Text>
      <PatientAllergiesList
        patientAllergies={patientAllergies}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Medication" title="Medication">
      <Card.Text>
        Medication:
      </Card.Text>
      <PatientMedicationList
        patientMedication={patientMedication}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Investigation" title="Investigation">
      <Card.Text>
        Investigation:
      </Card.Text>
      <PatientInvestigationList
        patientInvestigation={patientInvestigation}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Diagnosis" title="Diagnosis">
      <Card.Text>
        Diagnosis:
      </Card.Text>
      <PatientDiagnosisList
        patientDiagnosis={patientDiagnosis}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Treatment" title="Treatment">
      <Card.Text>
        Treatment:
      </Card.Text>
      <PatientTreatmentList
        patientTreatment={patientTreatment}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Billing" title="Billing">
      <Card.Text>
        Billing:
      </Card.Text>
      <PatientBillingList
        patientBilling={patientBilling}
        authUserId={props.authUserId}
        />
      </Tab>
    </Tabs>
  </div>
  );
}

export default PatientDetail;
