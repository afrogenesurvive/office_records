// import {parse, stringify} from 'flatted/esm';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import AuthContext from '../../context/auth-context';


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
import PatientVisitList from './PatientList/PatientVisitList';
import PatientVisit from './PatientVisit';

import SearchPatientVisitForm from '../../components/Forms/SearchPatientVisitForm';


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

  console.log(`
    patient.registrationDate: ${patient.registrationDate},
    patient.dob: ${patient.dob},
    patient.referralDate: ${patient.referralDate},
    `);

  let patientRegistrationDate = 0;
  if (patient.registrationDate !== null &&
      patient.registrationDate !== undefined
  )
  {
    patientRegistrationDate = new Date(patient.registrationDate.substr(0,10)*1000).toISOString().slice(0,10);
  }

  let patientDob = 0;
  if (patient.dob !== null &&
      patient.dob !== undefined
  ) {
    patientDob = new Date(patient.dob.substr(0,10)*1000).toISOString().slice(0,10);
  }

  // const patientReferralDate = new Date(patient.referralDate*1000).toUTCString();
  let patientReferralDate = 0;
  if (patient.referralDate !== null &&
      patient.referralDate !== undefined
  ) {
    patientReferralDate = new Date(patient.referralDate.substr(0,10)*1000).toISOString().slice(0,10);
  }
  let patientExpirationDate = 0;
  if (patient.expirationDate !== null &&
      patient.expirationDate !== undefined
  ) {
    patientExpirationDate = new Date(patient.expirationDate.substr(0,10)*1000).toISOString().slice(0,10);}
  else {patientExpirationDate = patient.expirationDate;}
  const visitList = props.visitList;
  // let selectedVisit = {
  //   // date: 0,
  //   // patientName: "",
  //   // consultant: "",
  //   // complaint: "",
  //   // examination: "",
  //   // survey: "",
  //   // vitals: "",
  //   // history: "",
  //   // investigation: "",
  //   // diagnosis: "",
  //   // treatment: "",
  //   // billing: "",
  // };
  // function onSelectVisit (props) {
  //   // console.log("patient detail selected visit:  ", JSON.stringify(props));
  //   console.log("bang!!");
  //   selectedVisit = props;
  // }
  // let visit = "noVisit";
  // if (props.visit) {
  //   visit = props.visit;
  // }

  // const token = props.token;
  // const userId = props.authUserId;
  // const patientId = patient._id;

  console.log("PatientDetail.props.patient:  ", {...patient}, "visitList", visitList);
  // console.log("patientExamination[1].date:  ", new Date(patientExamination[1].date.substr(0,10)*1000).toISOString());
  // console.log("patientConsultant[1].date:  ", patientConsultant[1].date);
  // console.log("patientComplaint[1].date:  ", patientComplaint[1].date);
  // console.log("patientComplaint[1].date:  ", new Date(patientComplaint[1].date.substr(0,10)*1000).toLocaleString());



  return (
    <div className="PatientDetailBox1">


    <Tab.Container id="left-tabs-example" defaultActiveKey="20">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="1">Demographics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">Appointments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">Consultants</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="4">Insurance</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="5">Next Of Kin</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="6">History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="7">Surveys</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="8">Vitals</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="9">Examination</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="10">Past History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="11">Allergies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="12">Medication</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="13">Investigation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="14">Diagnosis</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="15">Treatment</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="16">Billing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="17">Attachments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="18">Notes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="19">Tags</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="20">Visit List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="21">Visit Search</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="1">
                <Card className="PatientDetailCard">
                <Card.Body>
                <Card.Title><span className="ul">Patient Details</span></Card.Title>
                <Row className="detailCardRow">
                  <Col md={4} className="detailCardCol">
                    <Card.Text>
                      <span className="bold">ID :</span> {patient._id}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Title :</span> {patient.title}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Name :</span> {patient.name}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">D.O.B :</span> {patientDob}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Age :</span> {patient.age}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Gender :</span> {patient.gender}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Reg Date :</span> {patientRegistrationDate}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Ref Date :</span> {patientReferralDate}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Exp Date :</span> {patientExpirationDate}
                    </Card.Text>
                  </Col>

                  <Col md={4} className="detailCardCol">
                    <Card.Text>
                      <span className="bold">Phone :</span> {patient.contact.phone}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Email :</span> {patient.contact.email}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Address :</span>
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Street No :</span> {patient.address.number}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Street Name :</span> {patient.address.street}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Town :</span> {patient.address.town}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Parish :</span> {patient.address.parish}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">PO :</span> {patient.address.postOffice}
                    </Card.Text>
                  </Col>

                  <Col md={4} className="detailCardCol">
                    <Card.Text>
                      <span className="bold">Job Position :</span> {patient.occupation.role}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Employer :</span> {patient.occupation.employer}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Employer Phone :</span> {patient.occupation.contact.phone}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Employer Email :</span> {patient.occupation.contact.email}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Referring Doctor :</span>
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Name :</span> {patient.referringDoctor.name}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Phone :</span> {patient.referringDoctor.phone}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Email :</span> {patient.referringDoctor.email}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Attending Physician :</span>
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Name :</span> {patient.attendingPhysician.name}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Phone :</span> {patient.attendingPhysician.phone}
                    </Card.Text>
                    <Card.Text>
                      <span className="bold">Email :</span> {patient.attendingPhysician.email}
                    </Card.Text>
                  </Col>
                </Row>

                <Row className="detailCardRow">
                  <Col className="detailCardCol">
                    { props.canDelete === true && (
                      <Button variant="danger" onClick={props.onDelete}>
                        Delete Patient !!??
                      </Button>
                    )}
                  </Col>

                  <Col className="detailCardCol">
                    <Button variant="warning" onClick={props.onCreatePdf.bind(this, patient)}>
                      Create Pdf
                    </Button>
                  </Col>
                </Row>

                </Card.Body>
                </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="2">
              <Card.Text>
                Appointments:
              </Card.Text>
              <PatientAppointmentList
                patientAppointment={patientAppointment}
                authUserId={props.authUserId}
                canDelete={props.canDelete}
                onDelete={props.appointmentDelete}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="3">
              <Card.Text>
                Consultants:
              </Card.Text>
              { patientConsultant !== null &&
                (<PatientConsultantList
                  patientConsultant={patientConsultant}
                  authUserId={props.authUserId}
                  canDelete={props.canDelete}
                  onDelete={props.consultantDelete}
                  />)
              }
            </Tab.Pane>
            <Tab.Pane eventKey="4">
            <Card.Text>
              Insurance:
            </Card.Text>
            <PatientInsuranceList
              patientInsurance={patientInsurance}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.insuranceDelete}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="5">
              <Card.Text>
                NextOfKin:
              </Card.Text>
              <PatientNextOfKinList
                patientNextOfKin={patientNextOfKin}
                authUserId={props.authUserId}
                canDelete={props.canDelete}
                onDelete={props.nextOfKinDelete}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="6">
              <Card.Text>
                Complaint:
              </Card.Text>
              <PatientComplaintList
                patientComplaint={patientComplaint}
                authUserId={props.authUserId}
                canDelete={props.canDelete}
                onDelete={props.complaintDelete}
                onViewAttachment={props.onViewAttachment}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="7">
              <Card.Text>
                Surveys:
              </Card.Text>
              <PatientSurveyList
                patientSurvey={patientSurvey}
                authUserId={props.authUserId}
                canDelete={props.canDelete}
                onDelete={props.surveyDelete}
                onViewAttachment={props.onViewAttachment}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="8">
              <Card.Text>
                Vitals:
              </Card.Text>
              <PatientVitalsList
                patientVitals={patientVitals}
                authUserId={props.authUserId}
                canDelete={props.canDelete}
                onDelete={props.vitalsDelete}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="9">
            <Card.Text>
              Examination:
            </Card.Text>
            <PatientExaminationList
              patientExamination={patientExamination}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.examinationDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="10">
            <Card.Text>
              Past History:
            </Card.Text>
            <PatientHistoryList
              patientHistory={patientHistory}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.historyDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="11">
            <Card.Text>
              Allergies:
            </Card.Text>
            <PatientAllergiesList
              patientAllergies={patientAllergies}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.allergiesDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="12">
            <Card.Text>
              Medication:
            </Card.Text>
            <PatientMedicationList
              patientMedication={patientMedication}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.medicationDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="13">
            <Card.Text>
              Investigation:
            </Card.Text>
            <PatientInvestigationList
              patientInvestigation={patientInvestigation}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.investigationDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="14">
            <Card.Text>
              Diagnosis:
            </Card.Text>
            <PatientDiagnosisList
              patientDiagnosis={patientDiagnosis}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.diagnosisDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="15">
            <Card.Text>
              Treatment:
            </Card.Text>
            <PatientTreatmentList
              patientTreatment={patientTreatment}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.treatmentDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="16">
            <Card.Text>
              Billing:
            </Card.Text>
            <PatientBillingList
              patientBilling={patientBilling}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.billingDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="17">
            <Card.Text>
              Attachments:
            </Card.Text>
            <PatientAttachmentsList
              patientAttachments={patientAttachments}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.attachmentDelete}
              onViewAttachment={props.onViewAttachment}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="18">
            <Card.Text>
              Notes:
            </Card.Text>
            <PatientNotesList
              patientNotes={patientNotes}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.noteDelete}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="19">
            <Card.Text>
              Tags:
            </Card.Text>
            <PatientTagsList
              patientTags={patientTags}
              authUserId={props.authUserId}
              canDelete={props.canDelete}
              onDelete={props.tagDelete}
              />
            </Tab.Pane>

            <Tab.Pane eventKey="20">
            <Button variant="warning" className="formButton" onClick={props.onGetVisitList}>
              Get Visit List
            </Button>

            <Card.Text>
              <span className="bold ul">Selected Visit :</span>
            </Card.Text>

            { props.selectedVisit !== null &&
            (<Card.Text>
              <PatientVisit
                authUserId={props.authUserId}
                visit={props.selectedVisit}
                onViewAttachment={props.onViewAttachment}
                onCloseVisit={props.onCloseVisit}
                />
              </Card.Text>
            )}

            <Card.Text>
              <span className="bold ul">Visit List :</span>
            </Card.Text>
            <Row>
            <Button variant="primary" size="sm" onClick={props.onSortVisitListAsc}>
              Sort List Asc
            </Button>
            <Button variant="info" size="sm" onClick={props.onSortVisitListDesc}>
              Sort List Desc
            </Button>
            </Row>
            <PatientVisitList
              authUserId={props.authUserId}
              visitList={visitList}
              onSelectVisit={props.onSelectVisit}
            />
            </Tab.Pane>

            <Tab.Pane eventKey="21">
            <Card.Text>
            </Card.Text>
            <SearchPatientVisitForm
                  authUserId={props.authUserId}
                    canConfirm
                    onGetVisit={props.onGetVisit}
                    confirmText="Search"
                    patient={props.patient}
                  />
            { props.visit !== null && (
              <PatientVisit
                authUserId={props.authUserId}
                visit={props.visit}
                onViewAttachment={props.onViewAttachment}
                onCloseVisit={props.onCloseVisit}
                />
              )}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>


  </div>
  );
}

export default PatientDetail;
