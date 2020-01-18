import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import VisitConsultantList from './PatientList/VisitConsultantList';
import VisitComplaintList from './PatientList/VisitComplaintList';
import VisitExaminationList from './PatientList/VisitExaminationList';
import VisitSurveyList from './PatientList/VisitSurveyList';
import VisitSystematicInquiryList from './PatientList/VisitSystematicInquiryList';
import VisitVitalsList from './PatientList/VisitVitalsList';
import VisitInvestigationList from './PatientList/VisitInvestigationList';
import VisitDiagnosisList from './PatientList/VisitDiagnosisList';
import VisitTreatmentList from './PatientList/VisitTreatmentList';
import VisitBillingList from './PatientList/VisitBillingList';
import VisitVigilanceList from './PatientList/VisitVigilanceList';

import './PatientDetail.css';

const PatientVisit = (props) => {
  let visit = {
    date: "",
    patientName: "",
    consultant: "",
    complaint: "",
    examination: "",
    survey: "",
    systematicInquiry: "",
    vitals: "",
    history: "",
    investigation: "",
    diagnosis: "",
    treatment: "",
    billing: "",
    vigilance: "",
  };
  if (props.visit !== null) {
    visit = props.visit;
  }

  const consultant = visit.consultant;
  const complaint = visit.complaint;
  const examination = visit.examination;
  const survey = visit.survey;
  const systematicInquiry = visit.systematicInquiry;
  const vitals = visit.vitals;
  // const history = visit.history;
  const investigation = visit.investigation;
  const diagnosis = visit.diagnosis;
  const treatment = visit.treatment;
  const billing = visit.billing;
  const vigilance = visit.vigilance;

    return (
      <div className="PatientDetailBox1">
      <p>Date: {new Date(visit.date).toISOString().slice(0,10)}</p>
      <p>Patient: {visit.patientName}</p>

      <Button variant="danger" size="sm" onClick={props.onCloseVisit}>
        Close
      </Button>

      <Tabs defaultActiveKey="Visit" id="uncontrolled-tab-example" className="tab">
      <Tab eventKey="" title="Visit:" disabled>
      </Tab>
      <Tab eventKey="Consultant" title="Consultant">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Consultants
      </Card.Text>
      <VisitConsultantList
        consultant={consultant}
        authUserId={props.authUserId}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Complaint" title="Complaint">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Complaints
      </Card.Text>
      <VisitComplaintList
        complaint={complaint}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Examination" title="Examination">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Examinations
      </Card.Text>
      <VisitExaminationList
        examination={examination}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Survey" title="Survey">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Surveys
      </Card.Text>
      <VisitSurveyList
        survey={survey}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="SystematicInquiry" title="SystematicInquiry">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        SystematicInquiry
      </Card.Text>
      <VisitSystematicInquiryList
        systematicInquiry={systematicInquiry}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Vitals" title="Vitals">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Vitals
      </Card.Text>
      <VisitVitalsList
        vitals={vitals}
        authUserId={props.authUserId}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Investigation" title="Investigation">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Investigations
      </Card.Text>
      <VisitInvestigationList
        investigation={investigation}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Diagnosis" title="Diagnosis">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Diagnosis
      </Card.Text>
      <VisitDiagnosisList
        diagnosis={diagnosis}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Treatment" title="Treatment">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Treatment
      </Card.Text>
      <VisitTreatmentList
        treatment={treatment}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Billing" title="Billing">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Billing
      </Card.Text>
      <VisitBillingList
        billing={billing}
        authUserId={props.authUserId}
        onViewAttachment={props.onViewAttachment}
        />
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Vigilance" title="Vigilance">
      <Card className="PatientDetailCard">
      <Card.Body>
      <Card.Text>
        Vigilance
      </Card.Text>
      <VisitVigilanceList
        vigilance={vigilance}
        authUserId={props.authUserId}
        />
      </Card.Body>
      </Card>
      </Tab>
      </Tabs>
      </div>
    )

}

export default PatientVisit;
