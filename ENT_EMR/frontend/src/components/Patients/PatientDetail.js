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
import PatientVitalsList from './PatientList/PatientVitalsList';
import PatientExaminationList from './PatientList/PatientExaminationList';
import PatientHistoryList from './PatientList/PatientHistoryList';
import PatientAllergiesList from './PatientList/PatientAllergiesList';
import PatientMedicationList from './PatientList/PatientMedicationList';
import PatientInvestigationList from './PatientList/PatientInvestigationList';
import PatientDiagnosisList from './PatientList/PatientDiagnosisList';
import PatientTreatmentList from './PatientList/PatientTreatmentList';
import PatientBillingList from './PatientList/PatientBillingList';
import PatientAttachmentsList from './PatientList/PatientAttachmentsList';
import PatientNotesList from './PatientList/PatientNotesList';
import PatientTagsList from './PatientList/PatientTagsList';



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
  const patientVitals = patient.vitals;
  const patientExamination = patient.examination;
  const patientHistory = patient.history;
  const patientAllergies = patient.allergies;
  const patientMedication = patient.medication;
  const patientInvestigation = patient.investigation;
  const patientDiagnosis = patient.diagnosis;
  const patientTreatment = patient.treatment;
  const patientBilling = patient.billing;
  const patientAttachments = patient.attachments;
  const patientNotes = patient.notes;
  const patientTags = patient.tags;
  const patientRegistrationDate = new Date(patient.registrationDate.substr(0,10)*1000).toLocaleString();
  const patientDob = new Date(patient.dob.substr(0,10)*1000).toLocaleString();
  const patientReferralDate = new Date(patient.referralDate*1000).toUTCString();
  // const patientReferralDate = new Date(patient.referralDate.substr(0,10)*1000).toLocaleString();
  let patientExpirationDate = undefined;
  if (patient.expirationDate !== null)
  {patientExpirationDate = new Date(patient.expirationDate.substr(0,10)*1000).toLocaleString();}
  else {patientExpirationDate = patient.expirationDate;}

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
        Title: {patient.title}
      </Card.Text>
      <Card.Text>
        Name: {patient.name}
      </Card.Text>
      <Card.Text>
        Address:
      </Card.Text>
      <Card.Text>
        Street No: {patient.address.number}
      </Card.Text>
      <Card.Text>
        Street Name: {patient.address.name}
      </Card.Text>
      <Card.Text>
        Town: {patient.address.town}
      </Card.Text>
      <Card.Text>
        Parish: {patient.address.parish}
      </Card.Text>
      <Card.Text>
        PO: {patient.address.postOffice}
      </Card.Text>
      <Card.Text>
        D.O.B: {patientDob}
      </Card.Text>
      <Card.Text>
        Age: {patient.age}
      </Card.Text>
      <Card.Text>
        Gender: {patient.gender}
      </Card.Text>
      <Card.Text>
        Phone: {patient.contact.phone}
      </Card.Text>
      <Card.Text>
        Email: {patient.contact.email}
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
        Job Position: {patient.occupation.role}
      </Card.Text>
      <Card.Text>
        Employer: {patient.occupation.employer}
      </Card.Text>
      <Card.Text>
        Employer Phone: {patient.occupation.contact.phone}
      </Card.Text>
      <Card.Text>
        Employer Email: {patient.occupation.contact.email}
      </Card.Text>
      <Card.Text>
        Referring Doctor:
      </Card.Text>
      <Card.Text>
        Name: {patient.referringDoctor.name}
      </Card.Text>
      <Card.Text>
        Phone: {patient.referringDoctor.phone}
      </Card.Text>
      <Card.Text>
        Email: {patient.referringDoctor.email}
      </Card.Text>
      <Card.Text>
        Attending Physician:
      </Card.Text>
      <Card.Text>
        Name: {patient.attendingPhysician.name}
      </Card.Text>
      <Card.Text>
        Phone: {patient.attendingPhysician.phone}
      </Card.Text>
      <Card.Text>
        Email: {patient.attendingPhysician.email}
      </Card.Text>
      { props.canDelete === true && (
        <Button variant="danger" onClick={props.onDelete}>
          Delete Patient !!??
        </Button>
      )}
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
      { patientConsultant !== null &&
        (<PatientConsultantList
          patientConsultant={patientConsultant}
          authUserId={props.authUserId}
          />)
      }
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
      <Tab eventKey="Vitals" title="Vitals">
      <Card.Text>
        Vitals:
      </Card.Text>
      <PatientVitalsList
        patientVitals={patientVitals}
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
      <Tab eventKey="Attachments" title="Attachments">
      <Card.Text>
        Attachments:
      </Card.Text>
      <PatientAttachmentsList
        patientAttachments={patientAttachments}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Notes" title="Notes">
      <Card.Text>
        Notes:
      </Card.Text>
      <PatientNotesList
        patientNotes={patientNotes}
        authUserId={props.authUserId}
        />
      </Tab>
      <Tab eventKey="Tags" title="Tags">
      <Card.Text>
        Tags:
      </Card.Text>
      <PatientTagsList
        patientTags={patientTags}
        authUserId={props.authUserId}
        />
      </Tab>
    </Tabs>
  </div>
  );
}

export default PatientDetail;
