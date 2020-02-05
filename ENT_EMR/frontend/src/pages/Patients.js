import React, { Component } from 'react';
import S3 from 'react-aws-s3';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

import PatientList from '../components/Patients/PatientList/PatientList';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import SearchPatientList from '../components/Patients/PatientList/SearchPatientList';
import SearchPatientForm from '../components/Forms/SearchPatientForm';
import SearchPatientIdForm from '../components/Forms/SearchPatientIdForm';
import SearchPatientNameForm from '../components/Forms/SearchPatientNameForm';

import AlertBox from '../components/AlertBox';
import AttachmentViewer from '../components/AttachmentViewer';
import PdfCreator from '../components/PdfCreator';
import LoadingOverlay from '../components/LoadingOverlay';
import SidebarPage from './Sidebar';
import SidebarControl from '../components/SidebarControl';

import CreatePatientForm from '../components/Forms/CreatePatientForm';
import UpdatePatientForm from '../components/Forms/UpdatePatientForm';
import UpdatePatientFieldForm from '../components/Forms/UpdatePatientFieldForm';
import UpdatePatientConsultantForm from '../components/Forms/UpdatePatientConsultantForm';
import UpdatePatientInsuranceForm from '../components/Forms/UpdatePatientInsuranceForm';
import UpdatePatientNextOfKinForm from '../components/Forms/UpdatePatientNextOfKinForm';
import UpdatePatientComplaintForm from '../components/Forms/UpdatePatientComplaintForm';
import UpdatePatientSurveyForm from '../components/Forms/UpdatePatientSurveyForm';
import UpdatePatientSystematicInquiryForm from '../components/Forms/UpdatePatientSystematicInquiryForm';
import UpdatePatientVitalsForm from '../components/Forms/UpdatePatientVitalsForm';
import UpdatePatientExaminationForm from '../components/Forms/UpdatePatientExaminationForm';
import UpdatePatientHistoryForm from '../components/Forms/UpdatePatientHistoryForm';
import UpdatePatientAllergiesForm from '../components/Forms/UpdatePatientAllergiesForm';
import UpdatePatientMedicationForm from '../components/Forms/UpdatePatientMedicationForm';
import UpdatePatientInvestigationForm from '../components/Forms/UpdatePatientInvestigationForm';
import UpdatePatientDiagnosisForm from '../components/Forms/UpdatePatientDiagnosisForm';
import UpdatePatientTreatmentForm from '../components/Forms/UpdatePatientTreatmentForm';
import UpdatePatientBillingForm from '../components/Forms/UpdatePatientBillingForm';
import UpdatePatientVigilanceForm from '../components/Forms/UpdatePatientVigilanceForm';
import UpdatePatientAttachmentForm from '../components/Forms/UpdatePatientAttachmentForm';
import UpdatePatientNoteForm from '../components/Forms/UpdatePatientNoteForm';
import UpdatePatientTagForm from '../components/Forms/UpdatePatientTagForm';

import './Users.css';

class PatientsPage extends Component {
  state = {
    creating: false,
    updating: false,
    searching: false,
    updatingArray: false,
    deleting: false,
    patients: [],
    searchPatients: [],
    isLoading: false,
    selectedPatient: null,
    selectedUser: null,
    patientUpdateField: null,
    patientSearchField: null,
    patientSearchQuery: null,
    canDelete: null,
    visit: null,
    visitList: [],
    selectedVisit: null,
    newVisit: false,
    createVisitChecklist: {
      consultant: false,
      complaint: false,
      diagnosis: false,
      examination: false,
      investigation: false,
      survey: false,
      systematicInquiry: false,
      treatment: false,
      vitals: false,
      billing: false,
      vigilance: false
    },
    newVisit: false,
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
    showAttachment: false,
    showThisAttachmentFile: null,
    showThisAttachmentType: null,
    creatingDocument: false,
    createPdf: false,
    pdfData: null,
    pdfType: null,
    sidebarShow: true,
    mCol1Size: 3,
    mCol2Size: 9,
    creds: null
  };
  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    if (this.context.user.name === "Lord-of-the-Manor"){
      this.setState({canDelete: true})
    }

    if (JSON.stringify(this.context.selectedPatient) !== "{}") {
      this.setState({ selectedPatient: this.context.selectedPatient })
    }
    console.log(`this.context.selectedUser, ${JSON.stringify(this.context.selectedUser)}`);

    this.fetchPatients();
    this.getCreds();
  }


  startCreatePatientHandler = () => {
    this.setState({ creating: true });
  };
  startCreateVisitHandler = () => {
    this.setState({ newVisit: true });
  };
  startUpdatePatientHandler = () => {
    this.setState({ updating: true, updatingArray: true });
  };
  startSearchPatientHandler = () => {
    this.setState({ searching: true });
  };

  modalConfirmHandler = (event) => {

    this.setState({ creating: false, userAlert: "Creating New Patient ..." });
    const userId = this.context.userId;
    const token = this.context.token;
    let title = event.target.formGridTitle.value;
    let name = event.target.formGridName.value;
    let dob = event.target.formGridDob.value;
    let age = event.target.formGridAge.value;
    let gender = event.target.formGridGender.value;
    let addressNumber = event.target.formGridAddressNumber.value;
    let addressStreet = event.target.formGridAddressStreet.value;
    let addressTown = event.target.formGridAddressTown.value;
    let addressParish = event.target.formGridAddressParish.value;
    let addressPostOffice = event.target.formGridAddressPostOffice.value;
    let contactPhone = event.target.formGridContactPhone.value;
    let contactEmail = event.target.formGridContactEmail.value;

    let registrationDate = new Date(event.target.patientCalendarRegistrationDate.value).toISOString().slice(0,10);
    if (event.target.formGridRegistrationDateTodayCheckbox.checked === true) {
      registrationDate = new Date().toISOString().slice(0,10);
    }


    let referralDate = new Date(event.target.patientCalendarReferralDate.value).toISOString().slice(0,10);
    if (event.target.formGridReferralDateTodayCheckbox.checked === true) {
      referralDate = new Date().toISOString().slice(0,10);
    }

    let expirationDate = event.target.formGridExpirationDate.value;
    let attendingPhysicianName = event.target.formGridAttendingPhysicianName.value;
    let attendingPhysicianEmail = event.target.formGridAttendingPhysicianEmail.value;
    let attendingPhysicianPhone = event.target.formGridAttendingPhysicianPhone.value;
    let referringDoctorName = event.target.formGridReferringDoctorName.value;
    let referringDoctorEmail = event.target.formGridReferringDoctorEmail.value;
    let referringDoctorPhone = event.target.formGridReferringDoctorPhone.value;
    let occupationRole = event.target.formGridOccupationRole.value;
    let occupationEmployer = event.target.formGridOccupationEmployer.value;
    let occupationEmployerContactPhone = event.target.formGridOccupationEmployerContactPhone.value;
    let occupationEmployerContactEmail = event.target.formGridOccupationEmployerContactEmail.value;

    if (
      name.trim().length === 0 ||
      age.trim().length === 0 ||
      addressNumber.trim().length === 0 ||
      addressStreet.trim().length === 0 ||
      contactPhone.trim().length === 0 ||
      registrationDate.trim().length === 0
    ) {
      this.setState({userAlert: "patient must have at least: Name, Age, Contact Number, Street Name & Number and Registration Date!!!...Please try again..."});
      return;
    }

    const requestBody = {
      query: `
        mutation {createPatient(userId:"${userId}", patientInput:{title:"${title}",name:"${name}",dob:"${dob}",age:${age},gender:"${gender}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}",addressPostOffice:"${addressPostOffice}",contactPhone:"${contactPhone}",contactEmail:"${contactEmail}",registrationDate:"${registrationDate}",referralDate:"${referralDate}",expirationDate:"${expirationDate}",referringDoctorName:"${referringDoctorName}",referringDoctorEmail:"${referringDoctorEmail}",referringDoctorPhone:"${referringDoctorPhone}",attendingPhysicianName:"${attendingPhysicianName}",attendingPhysicianEmail:"${attendingPhysicianEmail}",attendingPhysicianPhone:"${attendingPhysicianPhone}",occupationRole:"${occupationRole}",occupationEmployer:"${occupationEmployer}",occupationEmployerContactPhone:"${occupationEmployerContactPhone}",occupationEmployerContactEmail:"${occupationEmployerContactEmail}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
        `};

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});
        const newPatient = resData.data.createPatient;
        this.setState(prevState => {
          const updatedPatients = [...prevState.patients];
          updatedPatients.push(newPatient);
          return { patients: updatedPatients };
        });
        this.setState({selecteAppointment: resData.data.createPatient})
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false });
  };


  modalConfirmUpdateHandler = (event) => {

    const userId = this.context.userId;
    const selectedPatientId = this.context.selectedPatient._id;
    const token = this.context.token;

    this.setState({ updating: false , userAlert: "Updating selected Patient..."});

    let title = event.target.formGridTitle.value;
    let name = event.target.formGridName.value;
    let dob = event.target.formGridDob.value;
    let age = event.target.formGridAge.value;
    let gender = event.target.formGridGender.value;
    let addressNumber = event.target.formGridAddressNumber.value;
    let addressStreet = event.target.formGridAddressStreet.value;
    let addressTown = event.target.formGridAddressTown.value;
    let addressParish = event.target.formGridAddressParish.value;
    let addressPostOffice = event.target.formGridAddressPostOffice.value;
    let contactPhone = event.target.formGridContactPhone.value;
    let contactEmail = event.target.formGridContactEmail.value;

    let registrationDate = new Date(event.target.patientCalendarRegistrationDate.value).toISOString().slice(0,10);
    if (event.target.formGridRegistrationDateTodayCheckbox.checked === true) {
      registrationDate = new Date().toISOString().slice(0,10);
    }

    let referralDate = new Date(event.target.patientCalendarReferralDate.value).toISOString().slice(0,10);
    if (event.target.formGridReferralDateTodayCheckbox.checked === true) {
      referralDate = new Date().toISOString().slice(0,10);
    }

    let expirationDate = new Date(event.target.patientCalendarExpirationDate.value).toISOString().slice(0,10);
    if (event.target.formGridExpirationDateTodayCheckbox.checked === true) {
      expirationDate = new Date().toISOString().slice(0,10);
    }

    let attendingPhysicianName = event.target.formGridAttendingPhysicianName.value;
    let attendingPhysicianEmail = event.target.formGridAttendingPhysicianEmail.value;
    let attendingPhysicianPhone = event.target.formGridAttendingPhysicianPhone.value;
    let referringDoctorName = event.target.formGridReferringDoctorName.value;
    let referringDoctorEmail = event.target.formGridReferringDoctorEmail.value;
    let referringDoctorPhone = event.target.formGridReferringDoctorPhone.value;
    let occupationRole = event.target.formGridOccupationRole.value;
    let occupationEmployer = event.target.formGridOccupationEmployer.value;
    let occupationEmployerContactPhone = event.target.formGridOccupationEmployerContactPhone.value;
    let occupationEmployerContactEmail = event.target.formGridOccupationEmployerContactEmail.value;

    if (title.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      title = this.context.selectedPatient.title;
    }
    if (name.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      name = this.context.selectedPatient.name;
    }
    if (dob.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      dob = this.context.selectedPatient.dob;
    }
    if (gender.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      gender = this.context.selectedPatient.gender;
    }
    if (age.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      age = this.context.selectedPatient.age;
    }
    if (addressNumber.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressNumber = this.context.selectedPatient.address.number;
    }
    if (addressStreet.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressStreet = this.context.selectedPatient.address.street;
    }
    if (addressTown.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressTown = this.context.selectedPatient.address.town;
    }
    if (addressParish.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressParish = this.context.selectedPatient.address.parish;
    }
    if (addressPostOffice.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressPostOffice = this.context.selectedPatient.address.postOffice;
    }
    if (contactPhone.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      contactPhone = this.context.selectedPatient.contact.phone;
    }
    if (contactEmail.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      contactEmail = this.context.selectedPatient.contact.email;
    }
    if (registrationDate.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      registrationDate = this.context.selectedPatient.registrationDate;
    }
    if (attendingPhysicianName.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      attendingPhysicianName = this.context.selectedPatient.attendingPhysician.name;
    }
    if (attendingPhysicianEmail.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      attendingPhysicianEmail = this.context.selectedPatient.attendingPhysician.email;
    }
    if (attendingPhysicianPhone.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      attendingPhysicianPhone = this.context.selectedPatient.attendingPhysician.phone;
    }
    if (referringDoctorName.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      referringDoctorName = this.context.selectedPatient.referringDoctor.name;
    }
    if (referringDoctorEmail.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      referringDoctorEmail = this.context.selectedPatient.referringDoctor.email;
    }
    if (referringDoctorPhone.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      referringDoctorPhone = this.context.selectedPatient.referringDoctor.phone;
    }
    if (occupationRole.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      occupationRole = this.context.selectedPatient.occupation.role;
    }
    if (occupationEmployer.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      occupationEmployer = this.context.selectedPatient.occupation.employer;
    }
    if (occupationEmployerContactEmail.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      occupationEmployerContactEmail = this.context.selectedPatient.occupation.contact.email;
    }
    if (occupationEmployerContactPhone.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      occupationEmployerContactPhone = this.context.selectedPatient.occupation.contact.phone;
    }

    const requestBody = {
      query: `
          mutation {updatePatient(userId:"${userId}",patientId:"${selectedPatientId}", patientInput:{title:"${title}",name:"${name}",dob:"${dob}",age:${age},gender:"${gender}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}",addressPostOffice:"${addressPostOffice}",contactPhone:"${contactPhone}",contactEmail:"${contactEmail}",registrationDate:"${registrationDate}",referralDate:"${referralDate}",expirationDate:"${expirationDate}",referringDoctorName:"${referringDoctorName}",referringDoctorEmail:"${referringDoctorEmail}",referringDoctorPhone:"${referringDoctorPhone}",attendingPhysicianName:"${attendingPhysicianName}",attendingPhysicianEmail:"${attendingPhysicianEmail}",attendingPhysicianPhone:"${attendingPhysicianPhone}",occupationRole:"${occupationRole}",occupationEmployer:"${occupationEmployer}",occupationEmployerContactPhone:"${occupationEmployerContactPhone}",occupationEmployerContactEmail:"${occupationEmployerContactPhone}"})
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const updatedPatientId = resData.data.updatePatient._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.updatePatient);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);

        this.fetchPatients();
        this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatient })
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };


  modalConfirmUpdateFieldHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedPatientId = this.context.selectedPatient._id;
    this.setState({ updating: false, userAlert: "Updating selected Patient by Field..." });

    let field = null;
    let query = event.target.formGridQuery.value;
    if (event.target.formGridFieldSelect.value === "select") {
      field = event.target.formGridField.value;
    } else {
      field = event.target.formGridFieldSelect.value;
    }

    const requestBody = {
      query:`
        mutation {updatePatientField(userId:"${userId}",patientId:"${selectedPatientId}",field:"${field}",query:"${query}")
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
      `};


    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const updatedPatientId = resData.data.updatePatientField._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.updatePatientField);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);

        this.fetchPatients();
        this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientField })
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }


updatePatientConsultantHandler = (event) => {

  event.preventDefault();
  let token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  const patientConsultantReference = this.context.selectedUser._id;
  if (patientConsultantReference === undefined) {
      this.setState({userAlert: "select a Staff member before adding a Patient Consultant!!..."});
      token = null;
  }

  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Consultant..." });

  let consultantDate = new Date(event.target.patientConsultantCalendarDate.value).toISOString().slice(0,10);
  if (event.target.formGridConsultantDateTodayCheckbox.checked === true) {
    consultantDate = new Date().toISOString().slice(0,10);
  }

  const requestBody = {
    query:`
      mutation {updatePatientConsultant(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{consultantDate:" ${consultantDate}",consultantReference: "${patientConsultantReference}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  };


    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientConsultant._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientConsultant);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientConsultant })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientInsuranceHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Insurance..." });
  let insuranceCompany = event.target.formGridInsuranceCompany.value;
  let insuranceNumber = event.target.formGridInsuranceNumber.value;
  let insuranceExpiry = event.target.patientCalendarInsuranceExpiryDate.value;
  let insuranceDescription = event.target.formGridInsuranceDescription.value;
  let insuranceSubscriberCompany = event.target.formGridInsuranceSubscriberCompany.value;
  let insuranceSubscriberDescription = event.target.formGridInsuranceSubscriberDescription.value;

    const requestBody = {
      query:`
        mutation {updatePatientInsurance(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{insuranceCompany:"${insuranceCompany}",insuranceNumber:"${insuranceNumber}",insuranceDescription:"${insuranceDescription}",insuranceExpiry:"${insuranceExpiry}",insuranceSubscriberCompany:"${insuranceSubscriberCompany}",insuranceSubscriberDescription:"${insuranceSubscriberDescription}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
      `
    };

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientInsurance._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientInsurance);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientInsurance })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientNextOfKinHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Next of Kin..." });
  let nextOfKinName = event.target.formGridNextOfKinName.value;
  let nextOfKinPhone = event.target.formGridNextOfKinPhone.value;
  let nextOfKinEmail = event.target.formGridNextOfKinEmail.value;

    const requestBody = {
      query:`
        mutation {updatePatientNextOfKin(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{nextOfKinName:"${nextOfKinName}",nextOfKinEmail:"${nextOfKinEmail}",nextOfKinPhone:"${nextOfKinPhone}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
      `
    };

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const updatedPatientId = resData.data.updatePatientNextOfKin._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.updatePatientNextOfKin);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);

        this.fetchPatients();
        this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientNextOfKin })
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
}

updatePatientComplaintHandler = (event) => {

  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Complaint..." });

  let complaintTitle = event.target.formGridComplaintTitle.value;

  let complaintDate = new Date(event.target.patientComplaintCalendarDate.value).toISOString().slice(0,10);
  if (event.target.formGridComplaintDateTodayCheckbox.checked === true) {
    complaintDate = new Date().toISOString().slice(0,10);
  }

  let complaintDescription = event.target.formGridComplaintDescription.value;
  let complaintAnamnesis = event.target.formGridComplaintAnamnesis.value;
  let complaintAttachmentFormat = event.target.formGridComplaintAttachmentFormat.value;
  let complaintAttachmentPath = "uploads/patients/"+selectedPatientId+"/complaints";

  let complaintAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: complaintAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const complaintAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }

  const requestBody = {
    query:`
      mutation {updatePatientComplaint(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{complaintDate:"${complaintDate}",complaintTitle:"${complaintTitle}",complaintDescription:"${complaintDescription}",complaintAnamnesis:"${complaintAnamnesis}",complaintAttachmentName:"${complaintAttachmentName}",complaintAttachmentFormat:"${complaintAttachmentFormat}",complaintAttachmentPath:"${complaintAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientComplaint._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientComplaint);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientComplaint })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientSurveyHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Survey..." });

  let surveyDate = new Date(event.target.patientSurveyCalendarDate.value).toISOString().slice(0,10);
  if (event.target.formGridSurveyDateTodayCheckbox.checked === true) {
    surveyDate = new Date().toISOString().slice(0,10);
  }

  let surveyTitle = event.target.formGridSurveyTitle.value;
  let surveyDescription = event.target.formGridSurveyDescription.value;
  let surveyAttachmentFormat = event.target.formGridSurveyAttachmentFormat.value;
  let surveyAttachmentPath = "uploads/patients/"+selectedPatientId+"/surveys";

  let surveyAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {
    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: surveyAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const surveyAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})
  }

  const requestBody = {
    query:`
      mutation {updatePatientSurvey(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{surveyDate:"${surveyDate}",surveyTitle:"${surveyTitle}",surveyDescription:"${surveyDescription}",surveyAttachmentName:"${surveyAttachmentName}",surveyAttachmentFormat:"${surveyAttachmentFormat}",surveyAttachmentPath:"${surveyAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientSurvey._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientSurvey);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientSurvey })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientSystematicInquiryHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Systematic Inquiry..." });

  let systematicInquiryDate = new Date(event.target.patientSystematicInquiryCalendarDate.value).toISOString().slice(0,10);
  if (event.target.formGridSystematicInquiryDateTodayCheckbox.checked === true) {
    systematicInquiryDate = new Date().toISOString().slice(0,10);
  }

  let systematicInquiryTitle = event.target.formGridSystematicInquiryTitle.value;
  let systematicInquiryDescription = event.target.formGridSystematicInquiryDescription.value;
  let systematicInquiryAttachmentFormat = event.target.formGridSystematicInquiryAttachmentFormat.value;
  let systematicInquiryAttachmentPath = "uploads/patients/"+selectedPatientId+"/systematicInquirys";

  let systematicInquiryAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: systematicInquiryAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const systematicInquiryAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    // ReactS3Client
    //     .uploadFile(file, newFileName)
    //     .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
    //     .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }

  const requestBody = {
    query:`
      mutation {updatePatientSystematicInquiry(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{systematicInquiryDate:"${systematicInquiryDate}",systematicInquiryTitle:"${systematicInquiryTitle}",systematicInquiryDescription:"${systematicInquiryDescription}",systematicInquiryAttachmentName:"${systematicInquiryAttachmentName}",systematicInquiryAttachmentFormat:"${systematicInquiryAttachmentFormat}",systematicInquiryAttachmentPath:"${systematicInquiryAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientSystematicInquiry._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientSystematicInquiry);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientSystematicInquiry })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientVitalsHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Vitals..." });

  let vitalsDate = new Date(event.target.patientVitalsCalendarDate.value).toISOString().slice(0,10);

  if (event.target.formGridVitalsDateTodayCheckbox.checked === true) {
    vitalsDate = new Date().toISOString().slice(0,10);
  }

  const vitalsPr = event.target.formGridVitalsPr.value;
  const vitalsBp1 = event.target.formGridVitalsBp1.value;
  const vitalsBp2 = event.target.formGridVitalsBp2.value;
  const vitalsRr = event.target.formGridVitalsRr.value;
  const vitalsTemp = event.target.formGridVitalsTemp.value;
  const vitalsPs02 = event.target.formGridVitalsPs02.value;
  const vitalsHeight = event.target.formGridVitalsHeight.value;
  const vitalsWeight = event.target.formGridVitalsWeight.value;
  const vitalsBmi = event.target.formGridVitalsBmi.value;
  const vitalsUrineType = event.target.formGridVitalsUrineType.value;
  const vitalsUrineValue = event.target.formGridVitalsUrineValue.value;
  const requestBody = {
    query:`
      mutation {updatePatientVitals(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{vitalsDate:"${vitalsDate}",vitalsPr:${vitalsPr},vitalsBp1:${vitalsBp1},vitalsBp2:${vitalsBp2},vitalsRr:${vitalsRr},vitalsTemp:${vitalsTemp},vitalsPs02:${vitalsPs02},vitalsHeight:${vitalsHeight},vitalsWeight:${vitalsWeight},vitalsBmi:${vitalsBmi},vitalsUrineType:"${vitalsUrineType}",vitalsUrineValue:"${vitalsUrineValue}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientVitals._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientVitals);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientVitals })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientExaminationHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Examination..." });

  let examinationDate = new Date(event.target.patientExaminationCalendarDate.value).toISOString().slice(0,10);

  if (event.target.formGridExaminationDateTodayCheckbox.checked === true) {
    examinationDate = new Date().toISOString().slice(0,10);
  }

  const examinationGeneral = event.target.formGridExaminationGeneral.value;
  let examinationArea = undefined;
  if (event.target.formGridExaminationAreaSelect.value === "select") {
    examinationArea = event.target.formGridExaminationArea.value;
  } else {
    examinationArea = event.target.formGridExaminationAreaSelect.value;
  }
  const examinationType = event.target.formGridExaminationType.value;
  const examinationMeasure = event.target.formGridExaminationMeasure.value;
  const examinationValue = event.target.formGridExaminationValue.value;
  const examinationDescription = event.target.formGridExaminationDescription.value;
  const examinationFollowUp = event.target.formGridExaminationFollowUp.value;
  const examinationAttachmentFormat = event.target.formGridExaminationAttachmentFormat.value;
  const examinationAttachmentPath = "uploads/patients/"+selectedPatientId+"/examinations";

  let examinationAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: examinationAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const examinationAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }

  const requestBody = {
    query:`
      mutation {updatePatientExamination(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{examinationDate:"${examinationDate}",examinationGeneral:"${examinationGeneral}",examinationArea:"${examinationArea}",examinationType:"${examinationType}",examinationMeasure:"${examinationMeasure}",examinationValue:"${examinationValue}",examinationDescription:"${examinationDescription}",examinationFollowUp:${examinationFollowUp},examinationAttachmentName:"${examinationAttachmentName}",examinationAttachmentFormat:"${examinationAttachmentFormat}",examinationAttachmentPath:"${examinationAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientExamination._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientExamination);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientExamination })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}


updatePatientHistoryHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient History..." });

  const historyType = event.target.formGridHistoryType.value;

  let historyDate = new Date(event.target.patientHistoryCalendarDate.value).toISOString().slice(0,10);
  if (event.target.formGridHistoryDateTodayCheckbox.checked === true) {
    historyDate = new Date().toISOString().slice(0,10);
  }

  const historyTitle = event.target.formGridHistoryTitle.value;
  const historyDescription = event.target.formGridHistoryDescription.value;
  const historyAttachmentFormat = event.target.formGridHistoryAttachmentFormat.value;
  const historyAttachmentPath = "uploads/patients/"+selectedPatientId+"/history";

  let historyAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: historyAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const historyAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }

  const requestBody = {
    query:`
      mutation {updatePatientHistory(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{historyTitle:"${historyTitle}",historyType:"${historyType}",historyDate:"${historyDate}",historyDescription:"${historyDescription}",historyAttachmentName:"${historyAttachmentName}",historyAttachmentFormat:"${historyAttachmentFormat}",historyAttachmentPath:"${historyAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientHistory._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientHistory);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientHistory })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}


updatePatientAllergiesHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Allergies..." });

  const allergiesTitle = event.target.formGridAllergiesTitle.value;
  let allergiesType = undefined;
  if (event.target.formGridAllergiesTypeSelect === "select") {
    allergiesType = event.target.formGridAllergiesType.value;
  } else {
    allergiesType = event.target.formGridAllergiesTypeSelect.value;
  }
  const allergiesDescription = event.target.formGridAllergiesDescription.value;
  const allergiesAttachmentFormat = event.target.formGridAllergiesAttachmentFormat.value;
  const allergiesAttachmentPath = "uploads/patients/"+selectedPatientId+"/allergies";

  let allergiesAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: allergiesAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const allergiesAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})

  }

  const requestBody = {
    query:`
      mutation {updatePatientAllergies(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{allergiesTitle:"${allergiesTitle}",allergiesType:"${allergiesType}", allergiesDescription:"${allergiesDescription}",allergiesAttachmentName:"${allergiesAttachmentName}",allergiesAttachmentFormat:"${allergiesAttachmentFormat}",allergiesAttachmentPath:"${allergiesAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientAllergies._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientAllergies);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientAllergies })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientMedicationHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Medication..." });

  const medicationTitle = event.target.formGridMedicationTitle.value;
  const medicationType = event.target.formGridMedicationType.value;
  const medicationDescription = event.target.formGridMedicationDescription.value;
  const medicationAttachmentFormat = event.target.formGridMedicationAttachmentFormat.value;
  const medicationAttachmentPath = "uploads/patients/"+selectedPatientId+"/medication";

  let medicationAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: medicationAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const medicationAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }

  const requestBody = {
    query:`
    mutation {updatePatientMedication(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{medicationTitle:"${medicationTitle}",medicationType:"${medicationType}" medicationDescription:"${medicationDescription}",medicationAttachmentName:"${medicationAttachmentName}",medicationAttachmentFormat:"${medicationAttachmentFormat}",medicationAttachmentPath:"${medicationAttachmentPath}"})
    {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientMedication._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientMedication);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientMedication })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });

}


updatePatientInvestigationHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Investigation..." });

  let investigationDate = new Date(event.target.patientInvestigationCalendarDate.value).toISOString().slice(0,10);

  if (event.target.formGridInvestigationDateTodayCheckbox.checked === true) {
    investigationDate = new Date().toISOString().slice(0,10);
  }

  const investigationTitle = event.target.formGridInvestigationTitle.value;
  let investigationType = undefined;
  if (event.target.formGridInvestigationTypeSelect === "select") {
    investigationType = event.target.formGridInvestigationType.value;
  } else {
    investigationType = event.target.formGridInvestigationTypeSelect.value;
  }
  const investigationDescription = event.target.formGridInvestigationDescription.value;
  const investigationAttachmentFormat = event.target.formGridInvestigationAttachmentFormat.value;
  const investigationAttachmentPath = "uploads/patients/"+selectedPatientId+"/investigation";

  let investigationAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: investigationAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const investigationAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }

  const requestBody = {
    query:`
      mutation {updatePatientInvestigation(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{investigationDate:"${investigationDate}",investigationTitle:"${investigationTitle}",investigationType:"${investigationType}",investigationDescription:"${investigationDescription}",investigationAttachmentName:"${investigationAttachmentName}",investigationAttachmentFormat:"${investigationAttachmentFormat}",investigationAttachmentPath:"${investigationAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientInvestigation._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientInvestigation);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientInvestigation })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientDiagnosisHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Diagnosis..." });

  let diagnosisDate = new Date(event.target.patientDiagnosisCalendarDate.value).toISOString().slice(0,10);

  if (event.target.formGridDiagnosisDateTodayCheckbox.checked === true) {
    diagnosisDate = new Date().toISOString().slice(0,10);
  }

  const diagnosisTitle = event.target.formGridDiagnosisTitle.value;
  const diagnosisType = event.target.formGridDiagnosisType.value;
  const diagnosisDescription = event.target.formGridDiagnosisDescription.value;
  const diagnosisAttachmentFormat = event.target.formGridDiagnosisAttachmentFormat.value;
  const diagnosisAttachmentPath = "uploads/patients/"+selectedPatientId+"/diagnosis";

  let diagnosisAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: diagnosisAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const diagnosisAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }

  const requestBody = {
    query:`
      mutation {updatePatientDiagnosis(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{diagnosisDate:"${diagnosisDate}",diagnosisTitle:"${diagnosisTitle}",diagnosisType:"${diagnosisType}",diagnosisDescription:"${diagnosisDescription}",diagnosisAttachmentName:"${diagnosisAttachmentName}",diagnosisAttachmentFormat:"${diagnosisAttachmentFormat}",diagnosisAttachmentPath:"${diagnosisAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientDiagnosis._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientDiagnosis);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientDiagnosis })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientTreatmentHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Treatment..." });

  let treatmentDate = new Date(event.target.patientTreatmentCalendarDate.value).toISOString().slice(0,10);

  if (event.target.formGridTreatmentDateTodayCheckbox.checked === true) {
    treatmentDate = new Date().toISOString().slice(0,10);
  }

  const treatmentTitle = event.target.formGridTreatmentTitle.value;
  const treatmentDescription = event.target.formGridTreatmentDescription.value;
  const treatmentDose = event.target.formGridTreatmentDose.value;
  const treatmentFrequency = event.target.formGridTreatmentFrequency.value;
  let treatmentType = undefined;
  if (event.target.formGridInvestigationTypeSelect === "select") {
    treatmentType = event.target.formGridTreatmentType.value;
  } else {
    treatmentType = event.target.formGridTreatmentTypeSelect.value;
  }
  const treatmentAttachmentFormat = event.target.formGridTreatmentAttachmentFormat.value;
  const treatmentAttachmentPath = "uploads/patients/"+selectedPatientId+"/treatment";

  let treatmentAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: treatmentAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const treatmentAttachmentName = newFileName;
    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})

  }


  const requestBody = {
    query:`
      mutation {updatePatientTreatment(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{treatmentDate:"${treatmentDate}",treatmentTitle:"${treatmentTitle}",treatmentType:"${treatmentType}",treatmentDescription:"${treatmentDescription}",treatmentDose:"${treatmentDose}",treatmentFrequency:"${treatmentFrequency}",treatmentAttachmentName:"${treatmentAttachmentName}",treatmentAttachmentFormat:"${treatmentAttachmentFormat}",treatmentAttachmentPath:"${treatmentAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `}

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientTreatment._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientTreatment);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientTreatment })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientBillingHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Billing..." });

  let billingDate = new Date(event.target.patientBillingCalendarDate.value).toISOString().slice(0,10);

  if (event.target.formGridBillingDateTodayCheckbox.checked === true) {
    billingDate = new Date().toISOString().slice(0,10);
  }

  const billingTitle = event.target.formGridBillingTitle.value;
  const billingType = event.target.formGridBillingType.value;
  const billingDescription = event.target.formGridBillingDescription.value;
  const billingAmount = event.target.formGridBillingAmount.value;
  const billingPaid = event.target.formGridBillingPaid.value;
  const billingNotes = event.target.formGridBillingNotes.value;
  const billingAttachmentFormat = event.target.formGridBillingAttachmentFormat.value;
  const billingAttachmentPath = "uploads/patients/"+selectedPatientId+"/billing";

  let billingAttachmentName = null;

  if (
      event.target.fileInput.value !== ""
  ) {

    const file = AuthContext._currentValue.file;
    const config = {
      bucketName: this.state.creds.s3.bucketName,
      dirName: billingAttachmentPath,
      region: this.state.creds.s3.region,
      accessKeyId: this.state.creds.s3.accessKeyId,
      secretAccessKey: this.state.creds.s3.secretAccessKey,
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    billingAttachmentName = newFileName;

    this.setState({userAlert: "uploading attachment ..."});

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!" });})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err });})
  }

  const requestBody = {
    query:`
      mutation {updatePatientBilling(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{billingDate:"${billingDate}",billingTitle:"${billingTitle}",billingType:"${billingType}",billingDescription:"${billingDescription}",billingAmount:${billingAmount},billingPaid:${billingPaid},billingNotes:"${billingNotes}",billingAttachmentName:"${billingAttachmentName}",billingAttachmentFormat:"${billingAttachmentFormat}",billingAttachmentPath:"${billingAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
  }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientBilling._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientBilling);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientBilling })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientVigilanceHandler = (event) => {

  event.preventDefault();
  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Vigilance..." });

  let vigilanceDate = new Date(event.target.patientVigilanceCalendarDate.value).toISOString().slice(0,10);

  if (event.target.formGridVigilanceDateTodayCheckbox.checked === true) {
    vigilanceDate = new Date().toISOString().slice(0,10);
  }

  const vigilanceChronicIllnessDiabetesMedication = event.target.formGridVigilanceChronicIllnessDiabetesMedication.checked;
  const vigilanceChronicIllnessDiabetesTesting = event.target.formGridVigilanceChronicIllnessDiabetesTesting.checked;
  const vigilanceChronicIllnessDiabetesComment = event.target.formGridVigilanceChronicIllnessDiabetesComment.value;
  const vigilanceChronicIllnessHbpMedication = event.target.formGridVigilanceChronicIllnessHbpMedication.checked;
  const vigilanceChronicIllnessHbpTesting = event.target.formGridVigilanceChronicIllnessHbpTesting.checked;
  const vigilanceChronicIllnessHbpComment = event.target.formGridVigilanceChronicIllnessHbpComment.value;
  const vigilanceChronicIllnessDyslipidemiaMedication = event.target.formGridVigilanceChronicIllnessDyslipidemiaMedication.checked;
  const vigilanceChronicIllnessDyslipidemiaTesting = event.target.formGridVigilanceChronicIllnessDyslipidemiaTesting.checked;
  const vigilanceChronicIllnessDyslipidemiaComment = event.target.formGridVigilanceChronicIllnessDyslipidemiaComment.value;
  const vigilanceChronicIllnessCadMedication = event.target.formGridVigilanceChronicIllnessCadMedication.checked;
  const vigilanceChronicIllnessCadTesting = event.target.formGridVigilanceChronicIllnessCadTesting.checked;
  const vigilanceChronicIllnessCadComment = event.target.formGridVigilanceChronicIllnessCadComment.value;
  const vigilanceLifestyleWeightMedication = event.target.formGridVigilanceLifestyleWeightMedication.checked;
  const vigilanceLifestyleWeightTesting = event.target.formGridVigilanceLifestyleWeightTesting.checked;
  const vigilanceLifestyleWeightComment = event.target.formGridVigilanceLifestyleWeightComment.value;
  const vigilanceLifestyleDietMedication = event.target.formGridVigilanceLifestyleDietMedication.checked;
  const vigilanceLifestyleDietTesting = event.target.formGridVigilanceLifestyleDietTesting.checked;
  const vigilanceLifestyleDietComment = event.target.formGridVigilanceLifestyleDietComment.value;
  const vigilanceLifestyleSmokingMedication = event.target.formGridVigilanceLifestyleSmokingMedication.checked;
  const vigilanceLifestyleSmokingTesting = event.target.formGridVigilanceLifestyleSmokingTesting.checked;
  const vigilanceLifestyleSmokingComment = event.target.formGridVigilanceLifestyleSmokingComment.value;
  const vigilanceLifestyleSubstanceAbuseMedication = event.target.formGridVigilanceLifestyleSubstanceAbuseMedication.checked;
  const vigilanceLifestyleSubstanceAbuseTesting = event.target.formGridVigilanceLifestyleSubstanceAbuseTesting.checked;
  const vigilanceLifestyleSubstanceAbuseComment = event.target.formGridVigilanceLifestyleSubstanceAbuseComment.value;
  const vigilanceLifestyleExerciseMedication = event.target.formGridVigilanceLifestyleExerciseMedication.checked;
  const vigilanceLifestyleExerciseTesting = event.target.formGridVigilanceLifestyleExerciseTesting.checked;
  const vigilanceLifestyleExerciseComment = event.target.formGridVigilanceLifestyleExerciseComment.value;
  const vigilanceLifestyleAllergiesMedication = event.target.formGridVigilanceLifestyleAllergiesMedication.checked;
  const vigilanceLifestyleAllergiesTesting = event.target.formGridVigilanceLifestyleAllergiesTesting.checked;
  const vigilanceLifestyleAllergiesComment = event.target.formGridVigilanceLifestyleAllergiesComment.value;
  const vigilanceLifestyleAsthmaMedication = event.target.formGridVigilanceLifestyleAsthmaMedication.checked;
  const vigilanceLifestyleAsthmaTesting = event.target.formGridVigilanceLifestyleAsthmaTesting.checked;
  const vigilanceLifestyleAsthmaComment = event.target.formGridVigilanceLifestyleAsthmaComment.value;
  const vigilanceScreeningBreastMedication = event.target.formGridVigilanceScreeningBreastMedication.checked;
  const vigilanceScreeningBreastTesting = event.target.formGridVigilanceScreeningBreastTesting.checked;
  const vigilanceScreeningBreastComment = event.target.formGridVigilanceScreeningBreastComment.value;
  const vigilanceScreeningProstateMedication = event.target.formGridVigilanceScreeningProstateMedication.checked;
  const vigilanceScreeningProstateTesting = event.target.formGridVigilanceScreeningProstateTesting.checked;
  const vigilanceScreeningProstateComment = event.target.formGridVigilanceScreeningProstateComment.value;
  const vigilanceScreeningCervixMedication = event.target.formGridVigilanceScreeningCervixMedication.checked;
  const vigilanceScreeningCervixTesting = event.target.formGridVigilanceScreeningCervixTesting.checked;
  const vigilanceScreeningCervixComment = event.target.formGridVigilanceScreeningCervixComment.value;
  const vigilanceScreeningColonMedication = event.target.formGridVigilanceScreeningColonMedication.checked;
  const vigilanceScreeningColonTesting = event.target.formGridVigilanceScreeningColonTesting.checked;
  const vigilanceScreeningColonComment = event.target.formGridVigilanceScreeningColonComment.value;
  const vigilanceScreeningDentalMedication = event.target.formGridVigilanceScreeningDentalMedication.checked;
  const vigilanceScreeningDentalTesting = event.target.formGridVigilanceScreeningDentalTesting.checked;
  const vigilanceScreeningDentalComment = event.target.formGridVigilanceScreeningDentalComment.value;
  const vigilanceVaccinesInfluenzaMedication = event.target.formGridVigilanceVaccinesInfluenzaMedication.checked;
  const vigilanceVaccinesInfluenzaTesting = event.target.formGridVigilanceVaccinesInfluenzaTesting.checked;
  const vigilanceVaccinesInfluenzaComment = event.target.formGridVigilanceVaccinesInfluenzaComment.value;
  const vigilanceVaccinesVaricellaMedication = event.target.formGridVigilanceVaccinesVaricellaMedication.checked;
  const vigilanceVaccinesVaricellaTesting = event.target.formGridVigilanceVaccinesVaricellaTesting.checked;
  const vigilanceVaccinesVaricellaComment = event.target.formGridVigilanceVaccinesVaricellaComment.value;
  const vigilanceVaccinesHpvMedication = event.target.formGridVigilanceVaccinesHpvMedication.checked;
  const vigilanceVaccinesHpvTesting = event.target.formGridVigilanceVaccinesHpvTesting.checked;
  const vigilanceVaccinesHpvComment = event.target.formGridVigilanceVaccinesHpvComment.value;
  const vigilanceVaccinesMmrMedication = event.target.formGridVigilanceVaccinesMmrMedication.checked;
  const vigilanceVaccinesMmrTesting = event.target.formGridVigilanceVaccinesMmrTesting.checked;
  const vigilanceVaccinesMmrComment = event.target.formGridVigilanceVaccinesMmrComment.value;
  const vigilanceVaccinesTetanusMedication = event.target.formGridVigilanceVaccinesTetanusMedication.checked;
  const vigilanceVaccinesTetanusTesting = event.target.formGridVigilanceVaccinesTetanusTesting.checked;
  const vigilanceVaccinesTetanusComment = event.target.formGridVigilanceVaccinesTetanusComment.value;
  const vigilanceVaccinesPneumovaxMedication = event.target.formGridVigilanceVaccinesPneumovaxMedication.checked;
  const vigilanceVaccinesPneumovaxTesting = event.target.formGridVigilanceVaccinesPneumovaxTesting.checked;
  const vigilanceVaccinesPneumovaxComment = event.target.formGridVigilanceVaccinesPneumovaxComment.value;
  const vigilanceVaccinesOtherName = event.target.formGridVigilanceVaccinesOtherName.value;
  const vigilanceVaccinesOtherMedication = event.target.formGridVigilanceVaccinesOtherMedication.checked;
  const vigilanceVaccinesOtherTesting = event.target.formGridVigilanceVaccinesOtherTesting.checked;
  const vigilanceVaccinesOtherComment = event.target.formGridVigilanceVaccinesOtherComment.value;
  const requestBody = {
    query:`
      mutation {updatePatientVigilance(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{
        vigilanceDate:"${vigilanceDate}",
        vigilanceChronicIllnessDiabetesMedication: ${vigilanceChronicIllnessDiabetesMedication},
        vigilanceChronicIllnessDiabetesTesting: ${vigilanceChronicIllnessDiabetesTesting},
        vigilanceChronicIllnessDiabetesComment: "${vigilanceChronicIllnessDiabetesComment}",
        vigilanceChronicIllnessHbpMedication: ${vigilanceChronicIllnessHbpMedication},
        vigilanceChronicIllnessHbpTesting: ${vigilanceChronicIllnessHbpTesting},
        vigilanceChronicIllnessHbpComment: "${vigilanceChronicIllnessHbpComment}",
        vigilanceChronicIllnessDyslipidemiaMedication: ${vigilanceChronicIllnessDyslipidemiaMedication},
        vigilanceChronicIllnessDyslipidemiaTesting: ${vigilanceChronicIllnessDyslipidemiaTesting},
        vigilanceChronicIllnessDyslipidemiaComment: "${vigilanceChronicIllnessDyslipidemiaComment}",
        vigilanceChronicIllnessCadMedication: ${vigilanceChronicIllnessCadMedication},
        vigilanceChronicIllnessCadTesting: ${vigilanceChronicIllnessCadTesting},
        vigilanceChronicIllnessCadComment: "${vigilanceChronicIllnessCadComment}",
        vigilanceLifestyleWeightMedication: ${vigilanceLifestyleWeightMedication},
        vigilanceLifestyleWeightTesting: ${vigilanceLifestyleWeightTesting},
        vigilanceLifestyleWeightComment: "${vigilanceLifestyleWeightComment}",
        vigilanceLifestyleDietMedication: ${vigilanceLifestyleDietMedication},
        vigilanceLifestyleDietTesting: ${vigilanceLifestyleDietTesting},
        vigilanceLifestyleDietComment: "${vigilanceLifestyleDietComment}",
        vigilanceLifestyleSmokingMedication: ${vigilanceLifestyleSmokingMedication},
        vigilanceLifestyleSmokingTesting: ${vigilanceLifestyleSmokingTesting},
        vigilanceLifestyleSmokingComment: "${vigilanceLifestyleSmokingComment}",
        vigilanceLifestyleSubstanceAbuseMedication: ${vigilanceLifestyleSubstanceAbuseMedication},
        vigilanceLifestyleSubstanceAbuseTesting: ${vigilanceLifestyleSubstanceAbuseTesting},
        vigilanceLifestyleSubstanceAbuseComment: "${vigilanceLifestyleSubstanceAbuseComment}",
        vigilanceLifestyleExerciseMedication: ${vigilanceLifestyleExerciseMedication},
        vigilanceLifestyleExerciseTesting: ${vigilanceLifestyleExerciseTesting},
        vigilanceLifestyleExerciseComment: "${vigilanceLifestyleExerciseComment}",
        vigilanceLifestyleAllergiesMedication: ${vigilanceLifestyleAllergiesMedication},
        vigilanceLifestyleAllergiesTesting: ${vigilanceLifestyleAllergiesTesting},
        vigilanceLifestyleAllergiesComment: "${vigilanceLifestyleAllergiesComment}",
        vigilanceLifestyleAsthmaMedication: ${vigilanceLifestyleAsthmaMedication},
        vigilanceLifestyleAsthmaTesting: ${vigilanceLifestyleAsthmaTesting},
        vigilanceLifestyleAsthmaComment: "${vigilanceLifestyleAsthmaComment}",
        vigilanceScreeningBreastMedication: ${vigilanceScreeningBreastMedication},
        vigilanceScreeningBreastTesting: ${vigilanceScreeningBreastTesting},
        vigilanceScreeningBreastComment: "${vigilanceScreeningBreastComment}",
        vigilanceScreeningProstateMedication: ${vigilanceScreeningProstateMedication},
        vigilanceScreeningProstateTesting: ${vigilanceScreeningProstateTesting},
        vigilanceScreeningProstateComment: "${vigilanceScreeningProstateComment}",
        vigilanceScreeningCervixMedication: ${vigilanceScreeningCervixMedication},
        vigilanceScreeningCervixTesting: ${vigilanceScreeningCervixTesting},
        vigilanceScreeningCervixComment: "${vigilanceScreeningCervixComment}",
        vigilanceScreeningColonMedication: ${vigilanceScreeningColonMedication},
        vigilanceScreeningColonTesting: ${vigilanceScreeningColonTesting},
        vigilanceScreeningColonComment: "${vigilanceScreeningColonComment}",
        vigilanceScreeningDentalMedication: ${vigilanceScreeningDentalMedication},
        vigilanceScreeningDentalTesting: ${vigilanceScreeningDentalTesting},
        vigilanceScreeningDentalComment: "${vigilanceScreeningDentalComment}",
        vigilanceVaccinesInfluenzaMedication: ${vigilanceVaccinesInfluenzaMedication},
        vigilanceVaccinesInfluenzaTesting: ${vigilanceVaccinesInfluenzaTesting},
        vigilanceVaccinesInfluenzaComment: "${vigilanceVaccinesInfluenzaComment}",
        vigilanceVaccinesVaricellaMedication: ${vigilanceVaccinesVaricellaMedication},
        vigilanceVaccinesVaricellaTesting: ${vigilanceVaccinesVaricellaTesting},
        vigilanceVaccinesVaricellaComment: "${vigilanceVaccinesVaricellaComment}",
        vigilanceVaccinesHpvMedication: ${vigilanceVaccinesHpvMedication},
        vigilanceVaccinesHpvTesting: ${vigilanceVaccinesHpvTesting},
        vigilanceVaccinesHpvComment: "${vigilanceVaccinesHpvComment}",
        vigilanceVaccinesMmrMedication: ${vigilanceVaccinesMmrMedication},
        vigilanceVaccinesMmrTesting: ${vigilanceVaccinesMmrTesting},
        vigilanceVaccinesMmrComment: "${vigilanceVaccinesMmrComment}",
        vigilanceVaccinesTetanusMedication: ${vigilanceVaccinesTetanusMedication},
        vigilanceVaccinesTetanusTesting: ${vigilanceVaccinesTetanusTesting},
        vigilanceVaccinesTetanusComment: "${vigilanceVaccinesTetanusComment}",
        vigilanceVaccinesPneumovaxMedication: ${vigilanceVaccinesPneumovaxMedication},
        vigilanceVaccinesPneumovaxTesting: ${vigilanceVaccinesPneumovaxTesting},
        vigilanceVaccinesPneumovaxComment: "${vigilanceVaccinesPneumovaxComment}",
        vigilanceVaccinesOtherName: "${vigilanceVaccinesOtherName}",
        vigilanceVaccinesOtherMedication: ${vigilanceVaccinesOtherMedication},
        vigilanceVaccinesOtherTesting: ${vigilanceVaccinesOtherTesting},
        vigilanceVaccinesOtherComment: "${vigilanceVaccinesOtherComment}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
    }

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const updatedPatientId = resData.data.updatePatientVigilance._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.updatePatientVigilance);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);

        this.fetchPatients();
        this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientVigilance })
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
}

updatePatientAttachmentHandler = (event) => {
    event.preventDefault();
    if (event.target.fileInput.value === "") {
      this.setState({ userAlert: "no file chosen. Please try again"})
      return
    }
    const token = this.context.token;
    const userId = this.context.userId;
    const selectedPatientId = this.context.selectedPatient._id;
    this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Attachment..." });
    const attachmentFormat = event.target.formGridPatientAttachmentFormat.value;
    const attachmentPath = "uploads/patients/"+selectedPatientId+"/attachments"

    let attachmentName = null;

    if (
        event.target.fileInput.value !== ""
    ) {
      let file = AuthContext._currentValue.file;

      const config = {
        bucketName: this.state.creds.s3.bucketName,
        dirName: attachmentPath,
        region: this.state.creds.s3.region,
        accessKeyId: this.state.creds.s3.accessKeyId,
        secretAccessKey: this.state.creds.s3.secretAccessKey,
      }
      const ReactS3Client = new S3(config);
      const newFileName = file.name;
      attachmentName = newFileName;
      this.setState({userAlert: "uploading attachment ..."});

      ReactS3Client
          .uploadFile(file, newFileName)
          .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
          .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})
    }


    if (
      attachmentName.trim().length === 0 ||
      attachmentFormat.trim().length === 0 ||
      attachmentPath.trim().length === 0
    ) {
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
      return;
    }

    const requestBody = {
          query:`
            mutation {updatePatientAttachment(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{attachmentName:"${attachmentName}",attachmentFormat:"${attachmentFormat}",attachmentPath:"${attachmentPath}"})
            {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
          `}

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientAttachment._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientAttachment);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);

      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientAttachment })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

updatePatientNoteHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Note ..." });

  const note = event.target.formGridNote.value;

  if (
    note.trim().length === 0
  ) {
    this.setState({userAlert: "Can't Submit a blank form!!!...Please try again..."});
    return;
  }

  const requestBody = {
        query:`
          mutation {updatePatientNotes(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{notes:"${note}"})
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
      `}

  fetch('http://localhost:10000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const updatedPatientId = resData.data.updatePatientNotes._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.updatePatientNotes);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);

        this.fetchPatients();
        this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientNotes })
      })
      .catch(err => {
        this.setState({userAlert: err});
      });

}
updatePatientTagHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const selectedPatientId = this.context.selectedPatient._id;
  this.setState({ updating: false , patientUpdateField: null, userAlert: "Adding selected Patient Tag..." });
  const tag = event.target.formGridTag.value;

  if (
    tag.trim().length === 0
  ) {
    console.log("Can't Submit a blank form!!!...Please try again...");
    this.setState({userAlert: "Can't Submit a blank form!!!...Please try again..."});
    return;
  }

  const requestBody = {
        query:`
          mutation {updatePatientTags(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{tag:"${tag}"})
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
      `}

  fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const updatedPatientId = resData.data.updatePatientTags._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.updatePatientTags);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.fetchPatients();
      this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientTags })
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}


modalConfirmSearchHandler = (event) => {

  const userId = this.context.userId;
  const token = this.context.token;
  this.setState({ searching: false, userAlert: "Now Searching Patients..." });
  let field = null;
  const query = event.target.formBasicQuery.value;
  if (event.target.formBasicFieldSelect.value === "select") {
    field = event.target.formBasicField.value;
  } else {
    field = event.target.formBasicFieldSelect.value;
  }
  this.setState({
    patientSearchField: field,
    patientSearchQuery: query,
  })
  if (
    field.trim().length === 0 ||
    query.trim().length === 0
  ) {
    this.setState({ userAlert: "blank fields detected!!!...Please try again..."});
    return;
  }

  const requestBody = {
    query: `
      query {
        getPatientField(userId: "${userId}", field: "${field}", query: "${query}" )
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `
    }

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const responseAlert = JSON.stringify(resData.data).slice(2,15);
      const searchPatients = resData.data.getPatientField;
      this.setState({ searchPatients: searchPatients, userAlert: responseAlert})
      // this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

modalConfirmSearchIdHandler = (event) => {

  const userId = this.context.userId;
  this.setState({ searching: false, userAlert: "Searching Patients by Id..." });
  const patientId = event.target.formBasicId.value;

  const requestBody = {
    query: `
      query {getPatientId(userId:"${userId}",patientId:"${patientId}")
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `}

  const token = this.context.token;

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      const searchPatients = resData.data.getPatientId;
      this.setState({ searchPatients: [searchPatients], userAlert: responseAlert})
      console.log("state.searchPatients:  ", this.state.searchPatients);
      // this.fetchUsers();
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

modalConfirmSearchNameHandler = (event) => {

  this.setState({ searching: false, userAlert: "Searching Patients by Name..." });
  const patients = this.state.patients;
  const regex = new RegExp(event.target.formBasicName.value,"i");
    let result = patients.filter(patient => patient.name.match(regex));
    this.setState({ searchPatients: result})
}

getPatientVisit = (event) => {

    const selectedPatient = this.state.selectedPatient;
    event.preventDefault();
    let visitDate = new Date(event.target.formBasicVisitDate.value).toISOString().substring(0, 10);
    let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitConsultants = selectedPatient.consultant.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitComplaints = selectedPatient.complaints.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    // let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitSystematicInquiry = selectedPatient.systematicInquiry.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitVitals = selectedPatient.vitals.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitExaminations = selectedPatient.examination.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitHistory = selectedPatient.history.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitInvestigations = selectedPatient.investigation.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitDiagnosis = selectedPatient.diagnosis.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitTreatments = selectedPatient.treatment.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitBilling = selectedPatient.billing.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitVigilance = selectedPatient.vigilance.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);

      const visit = {
        date: visitDate,
        patientName: this.context.selectedPatient.name,
        consultant: visitConsultants,
        complaint: visitComplaints,
        examination: visitExaminations,
        survey: visitSurveys,
        systematicInquiry: visitSystematicInquiry,
        vitals: visitVitals,
        history: visitHistory,
        investigation: visitInvestigations,
        diagnosis: visitDiagnosis,
        treatment: visitTreatments,
        billing: visitBilling,
        vigilance: visitVigilance,
      };
    this.setState({visit: visit});
  }

  getVisitList = () => {

    const selectedPatient = this.state.selectedPatient;
    const patientName = this.state.selectedPatient.name;
    let selectedPatientAppointmentDateArray = [];
    let selectedPatientAppointmentVisitArray = [];
    let selectedPatientAppointments = this.state.selectedPatient.appointments.map(appointments => {
      selectedPatientAppointmentDateArray.push(new Date(appointments.date.substr(0,10)*1000).toISOString().substring(0, 10))
    })

      selectedPatientAppointmentDateArray.map(appointmentDate => {
          thisGetVisit(appointmentDate, patientName)
      })
      function thisGetVisit (argsDate, argsPatientName) {

        const visitDate = argsDate
        const visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitConsultants = selectedPatient.consultant.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitComplaints = selectedPatient.complaints.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        // let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
        const visitVitals = selectedPatient.vitals.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitSystematicInquiry = selectedPatient.systematicInquiry.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitExaminations = selectedPatient.examination.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitHistory = selectedPatient.history.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitInvestigations = selectedPatient.investigation.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitDiagnosis = selectedPatient.diagnosis.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitTreatments = selectedPatient.treatment.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitBilling = selectedPatient.billing.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        const visitVigilance = selectedPatient.vigilance.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);

        const visit = {
          date: visitDate,
          patientName: argsPatientName,
          consultant: visitConsultants,
          complaint: visitComplaints,
          examination: visitExaminations,
          survey: visitSurveys,
          systematicInquiry: visitSystematicInquiry,
          vitals: visitVitals,
          history: visitHistory,
          investigation: visitInvestigations,
          diagnosis: visitDiagnosis,
          treatment: visitTreatments,
          billing: visitBilling,
          vigilance: visitVigilance,
        };
        selectedPatientAppointmentVisitArray.push(visit)
      }
    this.setState({ visitList: selectedPatientAppointmentVisitArray})
}


getVisitListAsc = () => {
    let list = this.state.visitList;
    list.sort((a, b) => {
      if (a.date < b.date) return -1
      return a.date > b.date ? 1 : 0
    })
    this.setState({visitList: list})
}

getVisitListDesc = () => {
    let list = this.state.visitList;
    list.sort((a, b) => {
      if (a.date < b.date) return 1
      return a.date > b.date ? -1 : 0
    })
    this.setState({visitList: list})
}


  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, searching: false, selectedPatient: null });
  };

  getCreds() {
    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query {getCreds
        {atlas{user,pw,db},s3{bucketName,region,accessKeyId,secretAccessKey},jwt{encode},gdrive{clientId,developerKey}}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const creds = resData.data.getCreds;
          this.setState({ creds: creds });
          // this.state.creds = creds;
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  fetchPatients() {

    const userId = this.context.userId;
    const token = this.context.token;
    this.setState({ isLoading: true, userAlert: "Fetching Patient Master List..." });
    const requestBody = {
      query: `
          query {patients(userId:"${userId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
        `
      };

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const patients = resData.data.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});
        this.context.patients = this.state.patients;
        if (this.isActive) {
          this.setState({
            patients: patients,
            isLoading: false,
          });
        }
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
    });
  }

  fetchPatientsAsc = () => {
    const userId = this.context.userId;
    const token = this.context.token;

    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {patientsNameAsc(userId:"${userId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
        `
    };

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const patients = resData.data.patientsNameAsc;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});
        this.context.patients = patients;
        this.setState({ patients: patients});
        // if (this.isActive) {
        //   this.setState({ patients: patients, isLoading: false });
        // }
      })
      .catch(err => {
        this.setState({userAlert: err});
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });
  }

  fetchPatientsDesc = () => {
    const userId = this.context.userId;
    const token = this.context.token;
    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {patientsNameDesc(userId:"${userId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
        `
    };

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const patients = resData.data.patientsNameDesc;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});
        this.context.patients = patients
        // if (this.isActive) {
        //   this.setState({ patients: patients, isLoading: false });
        // }
        this.setState({ patients: patients});
      })
      .catch(err => {
        this.setState({userAlert: err});
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });
  }


  modalDeleteHandler = () => {

    const selectedPatientId = this.context.selectedPatient._id;
    const userId = this.context.selectedUser._id;
    if(this.context.user.role !== 'admin') {
      this.setState({ userAlert: "Not the Admin! No edit permission!!"});
    }
    this.setState({deleting: true, userAlert: "Deleting selected Patient..."});
    const requestBody = {
      query: `
          mutation {deletePatient(userId:"${userId}",patientId:"${selectedPatientId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
        `
    };

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      let deletedPatient = resData.data.deletePatient;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({userAlert: responseAlert});
      let deletedPatientId = deletedPatient._id;
      deletedPatient = this.state.patients.find(e => e._id === deletedPatientId);
      const deletedPatientPos = this.state.patients.indexOf(deletedPatient);
      const slicedArray = this.state.patients.splice(deletedPatientPos, 1);
      this.setState({ deleting: false });
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err});
      if (this.isActive) {
        this.setState({ deleting: false });
      }
    });
  }

  deletePatientInsuranceItem = (props) => {

    const token = this.context.token;
    const userId = this.context.userId;
    const patientId = this.state.selectedPatient._id;

    const requestBody = {
      query: `
       mutation {deletePatientInsurance (userId:"${userId}", patientId:"${patientId}",insuranceCompany:"${props.company}",insuranceNumber:"${props.number}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      let deletedPatient = resData.data.deletePatientInsurance;
      const updatedPatientId = resData.data.deletePatientInsurance._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientInsurance);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert})
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({ userAlert: err});
    });
  }

  deletePatientAppointmentItem = (props) => {

    const token = this.context.token;
    const userId = this.context.userId;
    const patientId = this.state.selectedPatient._id;
    const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
    const requestBody = {
        query: `
         mutation {deletePatientAppointment (userId:"${userId}", patientId:"${patientId}",appointmentId:"${props._id}",appointmentDate:"${date}")
         {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
      `};

      fetch('http://localhost:10000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        let deletedPatient = resData.data.deletePatientAppointment;
        const updatedPatientId = resData.data.deletePatientAppointment._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.deletePatientAppointment);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        this.setState({ userAlert: err});
      });
}

  deletePatientConsultantItem = (props) => {

    const token = this.context.token;
    const userId = this.context.userId;
    const patientId = this.state.selectedPatient._id;
    const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
      const requestBody = {
        query: `
         mutation {deletePatientConsultant (userId:"${userId}", patientId:"${patientId}",consultantId:"${props.reference.id}",consultantDate:"${date}")
         {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
      `};

      fetch('http://localhost:10000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const deletedPatient = resData.data.deletePatientConsultant;
        const updatedPatientId = resData.data.deletePatientConsultant._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.deletePatientConsultant);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        this.setState({ userAlert: err});
      });
}

deletePatientNextOfKinItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const requestBody = {
      query: `
       mutation {deletePatientNextOfKin (userId:"${userId}", patientId:"${patientId}",nextOfKinName:"${props.name}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      let deletedPatient = resData.data.deletePatientNextOfKin;
      const updatedPatientId = resData.data.deletePatientNextOfKin._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientNextOfKin);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert})
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientComplaintItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
      query: `
       mutation {deletePatientComplaint (userId:"${userId}", patientId:"${patientId}",complaintTitle:"${props.title}",complaintDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const deletedPatient = resData.data.deletePatientComplaint;
      const updatedPatientId = resData.data.deletePatientComplaint._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientComplaint);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert})
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientSurveyItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
      query: `
       mutation {deletePatientSurvey (userId:"${userId}", patientId:"${patientId}",surveyTitle:"${props.title}",surveyDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      let deletedPatient = resData.data.deletePatientSurvey;
      const updatedPatientId = resData.data.deletePatientSurvey._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientSurvey);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert})
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientSystematicInquiryItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
    const requestBody = {
      query: `
       mutation {deletePatientSystematicInquiry (userId:"${userId}", patientId:"${patientId}",systematicInquiryTitle:"${props.title}",systematicInquiryDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      let deletedPatient = resData.data.deletePatientSystematicInquiry;
      const updatedPatientId = resData.data.deletePatientSystematicInquiry._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientSystematicInquiry);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert})
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientVitalsItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
    const requestBody = {
      query: `
       mutation {deletePatientVitals (userId:"${userId}", patientId:"${patientId}",vitalsDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        let deletedPatient = resData.data.deletePatientVitals;
        const updatedPatientId = resData.data.deletePatientVitals._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        this.state.patients.push(resData.data.deletePatientVitals);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        this.setState({userAlert: err})
      });
}

deletePatientExaminationItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
    const requestBody = {
      query: `
       mutation {deletePatientExamination (userId:"${userId}", patientId:"${patientId}",examinationType:"${props.type}",examinationDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

        fetch('http://localhost:10000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            let deletedPatient = resData.data.deletePatientExamination;
            const updatedPatientId = resData.data.deletePatientExamination._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            this.state.patients.push(resData.data.deletePatientExamination);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();
          })
          .catch(err => {
            this.setState({userAlert: err})
          });
}

deletePatientHistoryItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
    const requestBody = {
      query: `
       mutation {deletePatientHistory (userId:"${userId}", patientId:"${patientId}",historyTitle:"${props.title}",historyDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

        fetch('http://localhost:10000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            let deletedPatient = resData.data.deletePatientHistory;
            const updatedPatientId = resData.data.deletePatientHistory._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            this.state.patients.push(resData.data.deletePatientHistory);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();
          })
          .catch(err => {
            this.setState({userAlert: err})
          });
}

deletePatientAllergiesItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
    const requestBody = {
      query: `
       mutation {deletePatientAllergies (userId:"${userId}", patientId:"${patientId}",allergiesTitle:"${props.title}",allergiesType:"${props.type}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

        fetch('http://localhost:10000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            let deletedPatient = resData.data.deletePatientAllergies;
            const updatedPatientId = resData.data.deletePatientAllergies._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            this.state.patients.push(resData.data.deletePatientAllergies);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();
          })
          .catch(err => {
            this.setState({userAlert: err})
          });
}

deletePatientMedicationItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
    const requestBody = {
      query: `
       mutation {deletePatientMedication (userId:"${userId}", patientId:"${patientId}",medicationTitle:"${props.title}",medicationType:"${props.type}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

        fetch('http://localhost:10000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            let deletedPatient = resData.data.deletePatientMedication;
            const updatedPatientId = resData.data.deletePatientMedication._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            this.state.patients.push(resData.data.deletePatientMedication);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();
          })
          .catch(err => {
            this.setState({userAlert: err})
          });
}

deletePatientInvestigationItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
      query: `
         mutation {deletePatientInvestigation (userId:"${userId}", patientId:"${patientId}",investigationDate:"${date}",investigationTitle:"${props.title}")
         {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const deletedPatient = resData.data.deletePatientInvestigation;
      const updatedPatientId = resData.data.deletePatientInvestigation._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientInvestigation);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert})
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientDiagnosisItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
    query: `
       mutation {deletePatientDiagnosis (userId:"${userId}",patientId:"${patientId}",diagnosisDate:"${date}",diagnosisTitle:"${props.title}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
       `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const deletedPatient = resData.data.deletePatientDiagnosis;
      const updatedPatientId = resData.data.deletePatientDiagnosis._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientDiagnosis);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert});
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientTreatmentItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
  query: `
     mutation {deletePatientTreatment (userId:"${userId}", patientId:"${patientId}",treatmentDate:"${date}",treatmentTitle:"${props.title}")
     {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
  `};

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const deletedPatient = resData.data.deletePatientTreatment;
      const updatedPatientId = resData.data.deletePatientTreatment._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientTreatment);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert});
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err});
    });
}

deletePatientBillingItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
      query:`
       mutation {deletePatientBilling (userId:"${userId}", patientId:"${patientId}",billingDate:"${date}",billingTitle:"${props.title}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const deletedPatient = resData.data.deletePatientBilling;
      const updatedPatientId = resData.data.deletePatientBilling._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientBilling);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert});
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientVigilanceItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
    query:`
       mutation {deletePatientVigilance (userId:"${userId}", patientId:"${patientId}",vigilanceDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
     `};

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const deletedPatient = resData.data.deletePatientVigilance;
      const updatedPatientId = resData.data.deletePatientVigilance._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientVigilance);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert});
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientAttachmentItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  //   const config = {
  //     bucketName: this.state.creds.s3.bucketName,
  //     dirName: props.path,
  //     region: this.state.creds.s3.region,
  //     accessKeyId: this.state.creds.s3.accessKeyId,
  //     secretAccessKey: this.state.creds.s3.secretAccessKey,
  //   }
  // const ReactS3Client = new S3(config);
  // const filename = props.name;
  // // const attachmentName = newFileName;
  // //
  // S3FileUpload
  // .deleteFile(filename, config)
  // .then(response => console.log(response))
  // .catch(err => console.error(err))

    const requestBody = {
      query:`
       mutation {deletePatientAttachment (userId:"${userId}", patientId:"${patientId}",attachmentName:"${props.name}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
    `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const deletedPatient = resData.data.deletePatientAttachment;
      const updatedPatientId = resData.data.deletePatientAttachment._id;
      const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
      const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
      const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
      this.state.patients.push(resData.data.deletePatientAttachment);
      this.context.patients = this.state.patients;
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({ userAlert: responseAlert});
      this.fetchPatients();
    })
    .catch(err => {
      this.setState({userAlert: err})
    });
}

deletePatientNoteItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const requestBody = {
    query:`
    mutation {deletePatientNote (userId:"${userId}", patientId:"${patientId}",note:"${props}")
    {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
  `};

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Failed!');
    }
    return res.json();
  })
  .then(resData => {
    let deletedPatient = resData.data.deletePatientNote;
    const updatedPatientId = resData.data.deletePatientNote._id;
    const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
    const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
    const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
    this.state.patients.push(resData.data.deletePatientNote);
    this.context.patients = this.state.patients;
    const responseAlert = JSON.stringify(resData.data).slice(2,25);
    this.setState({ userAlert: responseAlert});
    this.fetchPatients();
  })
  .catch(err => {
    this.setState({userAlert: err})
  });
}

deletePatientTagItem = (props) => {

  const token = this.context.token;
  const userId = this.context.userId;
  const patientId = this.state.selectedPatient._id;
  const requestBody = {
    query:`
    mutation {deletePatientTag (userId:"${userId}", patientId:"${patientId}",tag:"${props}")
    {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,date,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},systematicInquiry{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},vigilance{date,chronicIllness{diabetes{medication,testing,comment},hbp{medication,testing,comment},dyslipidemia{medication,testing,comment},cad{medication,testing,comment}},lifestyle{weight{medication,testing,comment},diet{medication,testing,comment},smoking{medication,testing,comment},substanceAbuse{medication,testing,comment},exercise{medication,testing,comment},allergies{medication,testing,comment},asthma{medication,testing,comment}},screening{breast{medication,testing,comment},prostate{medication,testing,comment},cervix{medication,testing,comment},colon{medication,testing,comment},dental{medication,testing,comment}},vaccines{influenza{medication,testing,comment},varicella{medication,testing,comment},hpv{medication,testing,comment},mmr{medication,testing,comment},tetanus{medication,testing,comment},pneumovax{medication,testing,comment},other{name,medication,testing,comment}}},attachments{name,format,path},notes,tags}}
  `};

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Failed!');
    }
    return res.json();
  })
  .then(resData => {
    let deletedPatient = resData.data.deletePatientTag;
    const updatedPatientId = resData.data.deletePatientTag._id;
    const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
    const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
    const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
    this.state.patients.push(resData.data.deletePatientTag);
    this.context.patients = this.state.patients;
    const responseAlert = JSON.stringify(resData.data).slice(2,25);
    this.setState({ userAlert: responseAlert});
    this.fetchPatients();
  })
  .catch(err => {
    this.setState({ userAlert: err})
  });
}


updatePatientSpecial (event) {
  const field = event.target.value;
  this.setState({ patientUpdateField: field});
}

onViewAttachment = (attachment) => {
    this.setState({showAttachment: true})
    const file = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+attachment.path+"/"+attachment.name;
    const type = attachment.format;
    this.setState({showThisAttachmentFile: file, showThisAttachmentType: type})
}

closeAttachmentView = () => {
    this.setState({showAttachment: false})
}

createPdfTest = (event) => {
  event.preventDefault();
  console.log(`
      create pdf user otf input here...
      ${event.target.formGridDocGenUserInput.value}
      ${event.target.formGridDocGenVisitDate.value}
    `);

    const patient = this.state.selectedPatient;
    const pdfData = {
    title: "This pdf is supplied with Patient data...",
    date: new Date(),
    test: event.target.formGridDocGenUserInput.value,
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      },
      occupation:{
        role: patient.occupation.role,
        employer: patient.occupation.employer,
        contact:{
          phone: patient.occupation.contact.phone,
          email: patient.occupation.contact.email
        }},
        appointments: patient.appointments,
        consultant: patient.consultant,
        insurance: patient.insurance,
        nextOfKin: patient.nextOfKin,
        complaints: patient.complaints,
        surveys: patient.surveys,
        systematicInquiry: patient.systematicInquiry,
        vitals: patient.vitals,
        examination: patient.examination,
        history: patient.history,
        allergies: patient.allergies,
        medication: patient.medication,
        investigation: patient.investigation,
        diagnosis: patient.diagnosis,
        treatment: patient.treatment,
        billing: patient.billing,
        vigilance: patient.vigilance,
        attachments: patient.attachments,
        notes: patient.notes,
        tags: patient.tags
      }
    }
  this.setState({creatingDocument: true, pdfType: "test", pdfData: pdfData})
}


createReferralInput = (event) => {
  event.preventDefault();

  if (
    event.target.patientReferralCalendarVisitDate.value.trim().length === 0 ||
    event.target.formGridDocGenReferralFindings.value.trim().length === 0 ||
    event.target.formGridDocGenReferralRecommendation.value.trim().length === 0
  ) {
    this.setState({userAlert: "Blank fields detected... please check your info and try again"});
    return;
  }

    const visitDate = new Date(event.target.patientReferralCalendarVisitDate.value).toISOString().substring(0, 10);
    const patient = this.state.selectedPatient;
    const visitDiagnosis = patient.diagnosis.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    const visitTreatment = patient.treatment.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    console.log(`
        create referral user otf input here...
        ${visitDate}
        ${event.target.patientReferralCalendarVisitDate.value},
        ${event.target.formGridDocGenReferralRecommendation.value},
        ${event.target.formGridDocGenReferralFindings.value},
        visitDiagnosis: ${JSON.stringify(visitDiagnosis)},
      `);

    if (
      JSON.stringify(visitTreatment) === "[]" ||
      JSON.stringify(visitDiagnosis) === "[]"
    ) {
      this.setState({userAlert: `Incomplete or No Visit found for : ${visitDate}. Check your info and try again.`});
      return;
    }

    const pdfData = {
    title: "Referral",
    visitDate: visitDate,
    findings: event.target.formGridDocGenReferralFindings.value,
    recommendation: event.target.formGridDocGenReferralRecommendation.value,
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      },
      occupation:{
        role: patient.occupation.role,
        employer: patient.occupation.employer,
        contact:{
          phone: patient.occupation.contact.phone,
          email: patient.occupation.contact.email
        }},
        appointments: patient.appointments,
        consultant: patient.consultant,
        insurance: patient.insurance,
        nextOfKin: patient.nextOfKin,
        complaints: patient.complaints,
        surveys: patient.surveys,
        systematicInquiry: patient.systematicInquiry,
        vitals: patient.vitals,
        examination: patient.examination,
        history: patient.history,
        allergies: patient.allergies,
        medication: patient.medication,
        investigation: patient.investigation,
        diagnosis: patient.diagnosis,
        treatment: patient.treatment,
        billing: patient.billing,
        vigilance: patient.vigilance,
        attachments: patient.attachments,
        notes: patient.notes,
        tags: patient.tags
      },
      date: new Date(),
      referral: "test referral... now w/ input",
      visitDiagnosis: visitDiagnosis,
      visitTreatment: visitTreatment,
      letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
    };

  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "patientReferral" })
}


createOperationReminderInput = (event) => {

  event.preventDefault();

  if (
    event.target.formGridDocGenOperationReminderName.value.trim().length === 0 ||
    event.target.patientOperationReminderCalendarOperationDate.value.trim().length === 0 ||
    event.target.formGridDocGenOperationReminderTime.value.trim().length === 0 ||
    event.target.formGridDocGenOperationReminderHospitalName.value.trim().length === 0 ||
    event.target.formGridDocGenOperationReminderHopsitalAddress.value.trim().length === 0 ||
    event.target.patientOperationReminderCalendarFastDate.value.trim().length === 0 ||
    event.target.formGridDocGenOperationReminderFastTime.value.trim().length === 0 ||
    event.target.formGridDocGenOperationReminderEstimateCost.value.trim().length === 0
  ) {
    this.setState({userAlert: "Blank fields detected... please check your info and try again"});
    return;
  }

  const date = new Date(event.target.patientOperationReminderCalendarOperationDate.value).toISOString().substring(0, 10);
  const fastDate = new Date(event.target.patientOperationReminderCalendarFastDate.value).toISOString().substring(0, 10);
  const patient = this.state.selectedPatient;
    console.log(`
        create operation reminder user otf input here...
      `);

    const pdfData = {
    title: "Operation Reminder",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      },
      occupation:{
        role: patient.occupation.role,
        employer: patient.occupation.employer,
        contact:{
          phone: patient.occupation.contact.phone,
          email: patient.occupation.contact.email
        }},
        appointments: patient.appointments,
        consultant: patient.consultant,
        insurance: patient.insurance,
        nextOfKin: patient.nextOfKin,
        complaints: patient.complaints,
        surveys: patient.surveys,
        systematicInquiry: patient.systematicInquiry,
        vitals: patient.vitals,
        examination: patient.examination,
        history: patient.history,
        allergies: patient.allergies,
        medication: patient.medication,
        investigation: patient.investigation,
        diagnosis: patient.diagnosis,
        treatment: patient.treatment,
        billing: patient.billing,
        vigilance: patient.vigilance,
        attachments: patient.attachments,
        notes: patient.notes,
        tags: patient.tags
      },
      today: new Date(),
      date: date,
      name: event.target.formGridDocGenOperationReminderName.value,
      time: event.target.formGridDocGenOperationReminderTime.value,
      hospitalName: event.target.formGridDocGenOperationReminderHospitalName.value,
      hospitalAddress: event.target.formGridDocGenOperationReminderHopsitalAddress.value,
      fastDate: fastDate,
      fastTime: event.target.formGridDocGenOperationReminderFastTime.value,
      estimateCost: event.target.formGridDocGenOperationReminderEstimateCost.value,
      letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
    };

  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "operationReminder" })
}


createMiscNoteInput = (event) => {

  event.preventDefault();

  if (
    event.target.formGridDocGenMiscNote1.value.trim().length === 0 ||
    event.target.formGridDocGenMiscNote2.value.trim().length === 0
  ) {
    this.setState({userAlert: "Blank fields detected... please check your info and try again"});
    return;
  }

  const patient = this.state.selectedPatient;
    console.log(`
        create misc note user otf input here...
      `);

    const pdfData = {
    title: "Miscellaneous Note",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      },
      occupation:{
        role: patient.occupation.role,
        employer: patient.occupation.employer,
        contact:{
          phone: patient.occupation.contact.phone,
          email: patient.occupation.contact.email
        }},
        appointments: patient.appointments,
        consultant: patient.consultant,
        insurance: patient.insurance,
        nextOfKin: patient.nextOfKin,
        complaints: patient.complaints,
        surveys: patient.surveys,
        systematicInquiry: patient.systematicInquiry,
        vitals: patient.vitals,
        examination: patient.examination,
        history: patient.history,
        allergies: patient.allergies,
        medication: patient.medication,
        investigation: patient.investigation,
        diagnosis: patient.diagnosis,
        treatment: patient.treatment,
        billing: patient.billing,
        vigilance: patient.vigilance,
        attachments: patient.attachments,
        notes: patient.notes,
        tags: patient.tags
      },
      date: new Date(),
      note1: event.target.formGridDocGenMiscNote1.value,
      note2: event.target.formGridDocGenMiscNote2.value,
      letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
    };

  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "miscNote" })
}


createSickNoteInput = (event) => {

    event.preventDefault();

    if (
      event.target.formGridDocGenSickNoteAddress.value.trim().length === 0 ||
      event.target.formGridDocGenSickNoteDuration.value.trim().length === 0 ||
      event.target.patientSickNoteCalendarStartDate.value.trim().length === 0
    ) {
      this.setState({userAlert: "Blank fields detected... please check your info and try again"});
      return;
    }

    const date = new Date().toISOString().substring(0, 10);
    const startDate = new Date(event.target.patientSickNoteCalendarStartDate.value).toISOString().substring(0, 10);
    const patient = this.state.selectedPatient;
    console.log(`
        create Sick note user otf input here...
      `);

    const pdfData = {
    title: "Sick Note",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      },
      occupation:{
        role: patient.occupation.role,
        employer: patient.occupation.employer,
        contact:{
          phone: patient.occupation.contact.phone,
          email: patient.occupation.contact.email
        }},
        appointments: patient.appointments,
        consultant: patient.consultant,
        insurance: patient.insurance,
        nextOfKin: patient.nextOfKin,
        complaints: patient.complaints,
        surveys: patient.surveys,
        systematicInquiry: patient.systematicInquiry,
        vitals: patient.vitals,
        examination: patient.examination,
        history: patient.history,
        allergies: patient.allergies,
        medication: patient.medication,
        investigation: patient.investigation,
        diagnosis: patient.diagnosis,
        treatment: patient.treatment,
        billing: patient.billing,
        vigilance: patient.vigilance,
        attachments: patient.attachments,
        notes: patient.notes,
        tags: patient.tags
      },
      receiverAddress: event.target.formGridDocGenSickNoteAddress.value,
      date: date,
      duration: event.target.formGridDocGenSickNoteDuration.value,
      startDate: startDate,
      letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
    };

  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "sickNote" })
}

createDiagTestInput = (event) => {

    event.preventDefault();

    if (
      event.target.patientDiagTestCalendarVisitDate.value.trim().length === 0 ||
      event.target.formGridDocGenDiagTestReceiver.value.trim().length === 0 ||
      event.target.formGridDocGenDiagTestRequired.value.trim().length === 0
    ) {
      this.setState({userAlert: "Blank fields detected... please check your info and try again"});
      return;
    }

    const patient = this.state.selectedPatient;
    const date = new Date().toISOString().substring(0, 10);
    const visitDate = new Date(event.target.patientDiagTestCalendarVisitDate.value).toISOString().substring(0, 10);
    const visitDiagnosis = patient.diagnosis.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);

    console.log(`
        create tests & screening user otf input here...
        ${visitDate}
      `);

    if (
      JSON.stringify(visitDiagnosis) === "[]"
    ) {
      this.setState({userAlert: `Incomplete or No Visit found for : ${visitDate}. Check your info and try again.`});
      return;
    }

    const pdfData = {
    title: "Tests & Screenings",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      },
      occupation:{
        role: patient.occupation.role,
        employer: patient.occupation.employer,
        contact:{
          phone: patient.occupation.contact.phone,
          email: patient.occupation.contact.email
        }},
        appointments: patient.appointments,
        consultant: patient.consultant,
        insurance: patient.insurance,
        nextOfKin: patient.nextOfKin,
        complaints: patient.complaints,
        surveys: patient.surveys,
        systematicInquiry: patient.systematicInquiry,
        vitals: patient.vitals,
        examination: patient.examination,
        history: patient.history,
        allergies: patient.allergies,
        medication: patient.medication,
        investigation: patient.investigation,
        diagnosis: patient.diagnosis,
        treatment: patient.treatment,
        billing: patient.billing,
        vigilance: patient.vigilance,
        attachments: patient.attachments,
        notes: patient.notes,
        tags: patient.tags
      },
      visitDate: visitDate,
      visitDiagnosis: visitDiagnosis,
      receiver: event.target.formGridDocGenDiagTestReceiver.value,
      requiredTests: event.target.formGridDocGenDiagTestReceiver.value,
      date: date,
      letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
    };

  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "DiagTest" })
}


createInsuranceNoteInput = (event) => {

    event.preventDefault();

    if (
      event.target.formGridDocGenInsuranceNotePolicyNumber.value.trim().length === 0 ||
      event.target.formGridDocGenInsuranceNoteOperation.value.trim().length === 0 ||
      event.target.patientInsuranceNoteCalendarOperationDate.value.trim().length === 0 ||
      event.target.formGridDocGenInsuranceNoteSurgeonFee.value.trim().length === 0 ||
      event.target.formGridDocGenInsuranceNoteAssistantSurgeonFee.value.trim().length === 0 ||
      event.target.formGridDocGenInsuranceNoteAnesthetistFee.value.trim().length === 0
    ) {
      this.setState({userAlert: "Blank fields detected... please check your info and try again"});
      return;
    }

    const date = new Date().toISOString().substring(0, 10);
    const operationDate = new Date(event.target.patientInsuranceNoteCalendarOperationDate.value).toISOString().substring(0, 10);
    const patient = this.state.selectedPatient;
    const policyNumber = event.target.formGridDocGenInsuranceNotePolicyNumber.value;
    const patientInsurance = patient.insurance.filter(x=> x.number === policyNumber);
    console.log(`
        create Insurance note user otf input here...
        ${JSON.stringify(patientInsurance)}
      `);
      if (JSON.stringify(patientInsurance) === "[]") {
        this.setState({userAlert: `No Insurance w/ policy No. ${policyNumber} found for Patient! Check your info and try again.`});
        return;
      }


    const pdfData = {
    title: "Insurance Note",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      },
      occupation:{
        role: patient.occupation.role,
        employer: patient.occupation.employer,
        contact:{
          phone: patient.occupation.contact.phone,
          email: patient.occupation.contact.email
        }},
        appointments: patient.appointments,
        consultant: patient.consultant,
        insurance: patient.insurance,
        nextOfKin: patient.nextOfKin,
        complaints: patient.complaints,
        surveys: patient.surveys,
        systematicInquiry: patient.systematicInquiry,
        vitals: patient.vitals,
        examination: patient.examination,
        history: patient.history,
        allergies: patient.allergies,
        medication: patient.medication,
        investigation: patient.investigation,
        diagnosis: patient.diagnosis,
        treatment: patient.treatment,
        billing: patient.billing,
        vigilance: patient.vigilance,
        attachments: patient.attachments,
        notes: patient.notes,
        tags: patient.tags
      },
      date: date,
      patientInsurance: patientInsurance,
      operation: event.target.formGridDocGenInsuranceNoteOperation.value,
      operationDate: operationDate,
      surgeonFee: event.target.formGridDocGenInsuranceNoteSurgeonFee.value,
      assistantSurgeonFee: event.target.formGridDocGenInsuranceNoteAssistantSurgeonFee.value,
      anesthetistsFee: event.target.formGridDocGenInsuranceNoteAnesthetistFee.value,
      letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
    };

  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "insuranceNote" })
}


createPrescriptionInput = (event) => {

  event.preventDefault();

  if (
    event.target.formGridDocGenPrescriptionPescription.value.trim().length === 0 ||
    event.target.formGridDocGenPrescriptionGeneric.value.trim().length === 0 ||
    event.target.formGridDocGenPrescriptionRepeat.value.trim().length === 0
  ) {
    this.setState({userAlert: "Blank fields detected... please check your info and try again"});
    return;
  }

  let generic = null;
  if (event.target.formGridDocGenPrescriptionGeneric.checked === true) {
    generic = "yes"
  }
  if (event.target.formGridDocGenPrescriptionGeneric.checked !== true) {
    generic = "no"
  }

  const date = new Date().toISOString().substring(0, 10);
  const patient = this.state.selectedPatient;
  const pdfData = {
    title: "Prescription",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      }
    },
    date: date,
    prescription: event.target.formGridDocGenPrescriptionPescription.value,
    generic: generic,
    repeat: event.target.formGridDocGenPrescriptionRepeat.value,
    consultantName: this.context.selectedUser.name,
    letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
  }
  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "prescription" })
}


createProcedureConsentInput = (event) => {

  event.preventDefault();

  if (
    event.target.formGridDocGenProcedureConsentGiver.value.trim().length === 0 ||
    event.target.formGridDocGenProcedureConsentGiverRelation.value.trim().length === 0 ||
    event.target.formGridDocGenProcedureConsentProcedure.value.trim().length === 0
  ) {
    this.setState({userAlert: "Blank fields detected... please check your info and try again"});
    return;
  }

  const date = new Date().toISOString().substring(0, 10);
  const patient = this.state.selectedPatient;
  const pdfData = {
    title: "Consent for Medical/Surgical Treatment",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      }
    },
    date: date,
    consentGiver: event.target.formGridDocGenProcedureConsentGiver.value,
    consentGiverRelation: event.target.formGridDocGenProcedureConsentGiverRelation.value,
    consentProcedure: event.target.formGridDocGenProcedureConsentProcedure.value,
    referral: "test procedure consent...",
    letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
  }
  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "procedureConsent" })
}


createUnfitToFlyInput = (event) => {

  event.preventDefault();
  if (
    event.target.formGridDocGenUnfitToFlyClinicalFeatures.value.trim().length === 0 ||
    event.target.formGridDocGenUnfitToFlyProvisonalInvestigation.value.trim().length === 0 ||
    event.target.formGridDocGenUnfitToFlyConclusion.value.trim().length === 0
  ) {
    this.setState({userAlert: "Blank fields detected... please check your info and try again"});
    return;
  }

  const date = new Date().toISOString().substring(0, 10);
  const patient = this.state.selectedPatient;
  const pdfData = {
    title: "Unfit-to-Fly Authorization",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      }
    },
    date: date,
    clinicalFeatures: event.target.formGridDocGenUnfitToFlyClinicalFeatures.value,
    provisionalInvestigation: event.target.formGridDocGenUnfitToFlyProvisonalInvestigation.value,
    conclusion: event.target.formGridDocGenUnfitToFlyConclusion.value,
    referral: "test fit-to-fly authorization...",
    letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
  }
  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "fitToFlyAuthorization" })
}

createTreatmentInstructionInput = (event) => {

  event.preventDefault();

  if (
    event.target.formGridDocGenTreatmentInstruction.value.trim().length === 0
  ) {
    this.setState({userAlert: "Blank fields detected... please check your info and try again"});
    return;
  }

  const date = new Date().toISOString().substring(0, 10);
  const patient = this.state.selectedPatient;
  const pdfData = {
    title: "Treatment Instructions",
    patient: {
      _id: patient._id,
      title: patient.title,
      name: patient.name,
      dob: patient.dob,
      age: patient.age,
      gender: patient.gender,
      address:{
        number: patient.address.number,
        street: patient.address.street,
        town: patient.address.town,
        parish: patient.address.parish,
        postOffice: patient.address.postOffice
      },
      registrationDate: patient.registrationDate,
      referralDate: patient.referralDate,
      expirationDate: patient.expirationDate,
      attendingPhysician:{
        name: patient.attendingPhysician.name,
        email: patient.attendingPhysician.email,
        phone: patient.attendingPhysician.phone
      },
      referringDoctor: {
        name: patient.referringDoctor.name,
        email: patient.referringDoctor.email,
        phone: patient.referringDoctor.phone
      },
      contact: {
        phone: patient.contact.phone,
        email: patient.contact.email
      }
    },
    date: date,
    treatmentInstruction: event.target.formGridDocGenTreatmentInstruction.value,
    referral: "test Treatment Instruction...",
    letterheadImage: "https://photos.app.goo.gl/SrVuahmr14khGBoM9"
  }
  this.setState({ creatingDocument: true, pdfData: pdfData, pdfType: "treatmentInstruction" })
}

closePdfCreator = () => {
  this.setState({creatingDocument: false, pdfData: null, pdfType: null } )
}

showDetailHandler = patientId => {
  this.setState({ visitList: [] })
  this.setState(prevState => {
    const selectedPatient = prevState.patients.find(e => e._id === patientId);
    this.context.selectedPatient = selectedPatient;
    this.context.selectedPatientId = selectedPatient._id;
    return { selectedPatient: selectedPatient };
  });
};

selectVisit = (props) => {
  this.setState({ selectedVisit: props })
}

closeVisit = () => {
  this.setState({
    visit: null,
    selectedVisit: null,
  })
}

createVisitChecklistUpdate = (props) => {
  this.setState({ userAlert: `creating visit: ${props} addedd...`})
  let newState = Object.assign({}, this.state);
  newState.createVisitChecklist[props] = true;
  this.setState(newState);
}

newVisitComplete = () => {
  this.setState({
      userAlert: "New Visit creation complete...",
      newVisit: false,
      createVisitChecklist: {
        consultant: true,
        complaint: true,
        diagnosis: true,
        examination: true,
        investigation: true,
        survey: true,
        systematicInquiry: true,
        treatment: true,
        vitals: true,
        billing: true,
        vigilance: true
      }
  })
}

showSidebar = () => {
  console.log(`
    showing sidebar...
    `);
    this.setState({
      sidebarShow: true,
      mCol2Size: 9
    })
}

hideSidebar = () => {
  console.log(`
    hiding sidebar...
    `);
    this.setState({
      sidebarShow: false,
      mCol2Size: 11
    })
}

componentWillUnmount() {
  this.isActive = false;
}

render() {
    return (
    <React.Fragment>
    {this.state.showAttachment === true && (
      <AttachmentViewer
        onCloseAttachmentView={this.closeAttachmentView}
        attachmentFile={this.state.showThisAttachmentFile}
        attachmentType={this.state.showThisAttachmentType}
      />
    )}
    {this.state.creatingDocument === true && (
    <PdfCreator
      pdfType={this.state.pdfType}
      pdfData={this.state.pdfData}
      onClosePdfCreator={this.closePdfCreator}
    />
    )}
    <AlertBox
      authUserId={this.context.userId}
      alert={this.state.userAlert}
    />
    <SidebarControl
      onShowSidebar={this.showSidebar}
      onHideSidebar={this.hideSidebar}
    />

    <Accordion>
    <Row>

    {this.state.sidebarShow === true && (
      <Col md={3} className="MasterCol1">
      <SidebarPage/>
      </Col>
    )}

    <Col md={this.state.mCol2Size} className="MasterCol2">
    <Container className="containerCombinedDetail">
      <Tab.Container id="left-tabs-example" defaultActiveKey="patientDetail">
        <Row>
          <Col md={2} className="vertMenu">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="MasterList">MASTER LIST</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>Search:</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="SearchInput">Input</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="SearchResult">Results</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientDetail">Selected</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientCreate">Create New</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>Edit:</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditDemographics">Demographics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditField">Single Field</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>Add:</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientAddVisit">Visit</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditConsultant">Consultant</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditInsurance">Insurance</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditNextOfKin">Next of Kin</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditComplaint">History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditSurvey">Survey</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditSystematicInquiry">Systematic Inquiry</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditVitals">Vitals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditExamination">Examination</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditHistory">Past History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditAllergies">Allergies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditMedication">Medication</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditInvestigation">Investigation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditDiagnosis">Diagnosis</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditTreatment">Treatment</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditBilling">Billing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditVigilance">Vigilance</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditAttachment">Attachment</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditNote">Note</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="patientEditTag">Tag</Nav.Link>
              </Nav.Item>

            </Nav>
          </Col>

          <Col md={10}>
            <Tab.Content>
              <Tab.Pane eventKey="patientDetail">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient === null && (
                  <Button variant="outline-danger" size="lg" className="confirmEditButton">
                      Don't forget to select someone from the Staff page before editing Patient Consultant information !!!
                  </Button>
                )}
                {this.state.isLoading === false &&
                  this.state.selectedPatient !== null && (
                    <PatientDetail
                    authUserId={this.context.userId}
                    token={this.context.token}
                    patient={this.state.selectedPatient}
                    users={this.context.users}
                    onEdit={this.startUpdatePatientHandler}
                    canDelete={this.state.canDelete}
                    onDelete={this.modalDeleteHandler}
                    onGetVisit={this.getPatientVisit}
                    visit={this.state.visit}
                    selectedVisit={this.state.selectedVisit}
                    fetchUsers={this.fetchUsers}
                    appointmentDelete={this.deletePatientAppointmentItem}
                    consultantDelete={this.deletePatientConsultantItem}
                    insuranceDelete={this.deletePatientInsuranceItem}
                    nextOfKinDelete={this.deletePatientNextOfKinItem}
                    complaintDelete={this.deletePatientComplaintItem}
                    surveyDelete={this.deletePatientSurveyItem}
                    systematicInquiryDelete={this.deletePatientSystematicInquiryItem}
                    vitalsDelete={this.deletePatientVitalsItem}
                    examinationDelete={this.deletePatientExaminationItem}
                    historyDelete={this.deletePatientHistoryItem}
                    allergiesDelete={this.deletePatientAllergiesItem}
                    medicationDelete={this.deletePatientMedicationItem}
                    investigationDelete={this.deletePatientInvestigationItem}
                    diagnosisDelete={this.deletePatientDiagnosisItem}
                    treatmentDelete={this.deletePatientTreatmentItem}
                    billingDelete={this.deletePatientBillingItem}
                    vigilanceDelete={this.deletePatientVigilanceItem}
                    attachmentDelete={this.deletePatientAttachmentItem}
                    noteDelete={this.deletePatientNoteItem}
                    tagDelete={this.deletePatientTagItem}
                    onViewAttachment={this.onViewAttachment}
                    onCreatePdfTest={this.createPdfTest}
                    onCreateReferralInput={this.createReferralInput}
                    onCreateOperationReminderInput={this.createOperationReminderInput}
                    onCreateMiscNoteInput={this.createMiscNoteInput}
                    onCreateSickNoteInput={this.createSickNoteInput}
                    onCreateDiagTestInput={this.createDiagTestInput}
                    onCreateInsuranceNoteInput={this.createInsuranceNoteInput}
                    onCreatePrescriptionInput={this.createPrescriptionInput}
                    onCreateProcedureConsentInput={this.createProcedureConsentInput}
                    onCreateUnfitToFlyInput={this.createUnfitToFlyInput}
                    onCreateTreatmentInstructionInput={this.createTreatmentInstructionInput}
                    onGetVisitList={this.getVisitList}
                    visitList={this.state.visitList}
                    onSelectVisit={this.selectVisit}
                    onCloseVisit={this.closeVisit}
                    onSortVisitListAsc={this.getVisitListAsc}
                    onSortVisitListDesc={this.getVisitListDesc}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientCreate">
                <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startCreatePatientHandler} >Create NEW Patient Profile</Button>
                {this.state.creating && (
                  <CreatePatientForm
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                    confirmText="Confirm"
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientAddVisit">
              {this.state.selectedPatient === null && (
                <Button variant="outline-warning" size="lg" className="confirmEditButton">
                  Select a Patient from the Master List
                </Button>
              )}
              { this.state.selectedPatient !== null &&
                this.state.newVisit !== true &&
              (<Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startCreateVisitHandler} >Add NEW Visit</Button>
              )}
                {this.state.selectedPatient !== null &&
                  this.state.newVisit === true && (
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Guide:
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                          <Card.Text>
                            To create a NEW Patient Visit, fill in the forms below.
                          </Card.Text>
                          <Card.Text>
                            Everytime you submit a form with new info, a new item is added to the current Patient visit.
                          </Card.Text>
                          <Card.Text>
                            When you are done with a section click the GREEN Done adding Complaints, Vitals etc and continue to the next form.
                          </Card.Text>
                          <Card.Text>
                            Once you have submitted all the information required scroll to the bottom and click the green button.
                          </Card.Text>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Consultant
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                          Add Consultant form:
                          {this.state.createVisitChecklist.consultant === true && (
                            <Button variant="warning" size="lg" className="formButton">
                              Consultant for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.consultant === false &&
                          JSON.stringify(this.context.selectedUser) === "{}" && (
                            <Button variant="outline-warning" size="lg" className="confirmEditButton">
                              Select someone from the Staff page
                            </Button>
                          )}
                          {this.state.createVisitChecklist.consultant === false &&
                          this.context.selectedUser !== null && (
                            <Row>
                            <Card.Text>Add Consultant: {this.context.selectedUser.name}  ...</Card.Text>
                            <Card.Text> To Paitient: {this.state.selectedPatient.name} ??</Card.Text>
                            </Row>
                          )}
                          {this.state.createVisitChecklist.consultant === false &&
                          this.context.selectedUser !== null && (
                            <UpdatePatientConsultantForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientConsultantHandler}
                              confirmText="Confirm"
                              consultant={this.context.selectedUser}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Complaint
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                          Add Complaint form:
                          {this.state.createVisitChecklist.complaint === true && (
                            <Button variant="warning" size="lg" className="formButton">
                              Complaint for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.complaint === false && (
                            <UpdatePatientComplaintForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientComplaintHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            Vitals
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body>
                          Add Vitals form:
                          {this.state.createVisitChecklist.vitals === true && (
                            <Button variant="warning" size="lg" className="formButton">
                            Vitals for this Visit have already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.vitals === false && (
                            <UpdatePatientVitalsForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientVitalsHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="4">
                            Examination
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                          <Card.Body>
                          Add Examination form:
                          {this.state.createVisitChecklist.examination === true && (
                            <Button variant="warning" size="lg" className="formButton">
                            Examination for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.examination === false && (
                            <UpdatePatientExaminationForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientExaminationHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="5">
                            Survey
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="5">
                          <Card.Body>
                          Add Survey form:
                          {this.state.createVisitChecklist.survey === true && (
                            <Button variant="warning" size="lg" className="formButton">
                            Survey for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.survey === false && (
                            <UpdatePatientSurveyForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientSurveyHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="22">
                            SystematicInquiry
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="22">
                          <Card.Body>
                          Add Systematic Inquiry form:
                          {this.state.createVisitChecklist.systematicInquiry === true && (
                            <Button variant="warning" size="lg" className="formButton">
                            Systematic Inquiry for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.systematicInquiry === false && (
                            <UpdatePatientSystematicInquiryForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientSystematicInquiryHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="6">
                            Investigation
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="6">
                          <Card.Body>
                          Add Investigation form:
                          {this.state.createVisitChecklist.investigation === true && (
                            <Button variant="warning" size="lg" className="formButton">
                            Investigation for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.investigation === false && (
                            <UpdatePatientInvestigationForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientInvestigationHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="7">
                            Diagnosis
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="7">
                          <Card.Body>
                          Add Diagnosis form:
                          {this.state.createVisitChecklist.diagnosis === true && (
                            <Button variant="warning" size="lg" className="formButton">
                              Diagnosis for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.diagnosis === false && (
                            <UpdatePatientDiagnosisForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientDiagnosisHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="8">
                            Treatment
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="8">
                          <Card.Body>
                          Add Treatment form:
                          {this.state.createVisitChecklist.treatment === true && (
                            <Button variant="warning" size="lg" className="formButton">
                            Treatment for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.treatment === false && (
                            <UpdatePatientTreatmentForm
                              authUserId={this.context.userId}
                              canCancel
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientTreatmentHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="9">
                            Billing
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="9">
                          <Card.Body>
                          Add Billing form:
                          {this.state.createVisitChecklist.billing === true && (
                            <Button variant="warning" size="lg" className="formButton">
                              Billing for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.billing === false && (
                          <UpdatePatientBillingForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientBillingHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="23">
                            Vigilance
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="23">
                          <Card.Body>
                          Add Vigilance form:
                          {this.state.createVisitChecklist.vigilance === true && (
                            <Button variant="warning" size="lg" className="formButton">
                            Vigilance for this Visit has already been added!!
                            </Button>
                          )}
                          {this.state.createVisitChecklist.vigilance === false && (
                            <UpdatePatientVigilanceForm
                              authUserId={this.context.userId}
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.updatePatientVigilanceHandler}
                              confirmText="Confirm"
                              patient={this.state.selectedPatient}
                              visit
                              onCreateVisitChecklistUpdate={this.createVisitChecklistUpdate}
                            />
                          )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="10">
                            Finished ?
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="10">
                          <Card.Body>
                          <Button variant="success" className="formButton" onClick={this.newVisitComplete}>
                          Done creating Visit
                          </Button>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditDemographics">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdatePatientHandler}>Edit Demographics</Button>
                )}
                {this.state.updating &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmUpdateHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditField">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdatePatientHandler}>Edit a Single Field</Button>
                )}
                {this.state.updating &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientFieldForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmUpdateFieldHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditConsultant">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='consultant' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add a Consultant</Button>
                )}
                {this.state.patientUpdateField === 'consultant' &&
                this.state.selectedPatient !== null &&
                this.context.selectedUser === null && (
                  <Row>
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select someone from the Staff page
                  </Button>
                  </Row>
                )}
                {this.state.patientUpdateField === 'consultant' &&
                this.state.selectedPatient !== null && (
                  <Row>
                  <p>Add Consultant: {this.context.selectedUser.name}  ...</p>
                  <p> To Paitient: {this.state.selectedPatient.name} ??</p>
                  </Row>
                )}
                {this.state.patientUpdateField === 'consultant' &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientConsultantForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientConsultantHandler}
                    confirmText="Confirm"
                    consultant={this.context.selectedUser}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditInsurance">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='insurance' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Insurance</Button>
                )}
                {this.state.patientUpdateField === 'insurance' &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientInsuranceForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientInsuranceHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditNextOfKin">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='nextOfKin' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add NextOfKin</Button>
                )}
                {this.state.patientUpdateField === 'nextOfKin' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientNextOfKinForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientNextOfKinHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditComplaint">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='complaint' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add History</Button>
                )}
                {this.state.patientUpdateField === 'complaint' &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientComplaintForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientComplaintHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditSurvey">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='survey' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Survey</Button>
                )}
                {this.state.patientUpdateField === 'survey' &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientSurveyForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientSurveyHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditSystematicInquiry">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='systematicInquiry' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Systematic Inquiry</Button>
                )}
                {this.state.patientUpdateField === 'systematicInquiry' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientSystematicInquiryForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientSystematicInquiryHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditVitals">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='vitals' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Vitals</Button>
                )}
                {this.state.patientUpdateField === 'vitals' &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientVitalsForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientVitalsHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditExamination">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='examintion' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Examination</Button>
                )}
                {this.state.patientUpdateField === 'examintion' &&
                this.state.selectedPatient !== null && (
                  <UpdatePatientExaminationForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientExaminationHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditHistory">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='history' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Past History</Button>
                )}
                {this.state.patientUpdateField === 'history' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientHistoryForm
                  authUserId={this.context.userId}
                  canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientHistoryHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditAllergies">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='allergies' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Allergies</Button>
                )}
                {this.state.patientUpdateField === 'allergies' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientAllergiesForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientAllergiesHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditMedication">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='medication' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Medication</Button>
                )}
                {this.state.patientUpdateField === 'medication' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientMedicationForm
                  authUserId={this.context.userId}
                  canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.updatePatientMedicationHandler}
                    confirmText="Confirm"
                    patient={this.state.selectedPatient}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditInvestigation">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='investigation' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Investigation</Button>
                )}
                {this.state.patientUpdateField === 'investigation' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientInvestigationForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientInvestigationHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditDiagnosis">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='diagnosis' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Diagnosis</Button>
                )}
                {this.state.patientUpdateField === 'diagnosis' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientDiagnosisForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientDiagnosisHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditTreatment">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='treatment' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Treatment</Button>
                )}
                {this.state.patientUpdateField === 'treatment' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientTreatmentForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientTreatmentHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditBilling">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='billing' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Billing</Button>
                )}
                {this.state.patientUpdateField === 'billing' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientBillingForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientBillingHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditVigilance">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='vigilance' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Vigilance</Button>
                )}
                {this.state.patientUpdateField === 'vigilance' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientVigilanceForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientVigilanceHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditAttachment">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='attachment' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Attachment</Button>
                )}
                {this.state.patientUpdateField === 'attachment' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientAttachmentForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientAttachmentHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                      )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditNote">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='notes' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Note</Button>
                )}
                {this.state.patientUpdateField === 'notes' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientNoteForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientNoteHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                      )}
              </Tab.Pane>

              <Tab.Pane eventKey="patientEditTag">
                {this.state.selectedPatient === null && (
                  <Button variant="outline-warning" size="lg" className="confirmEditButton">
                    Select a Patient from the Master List
                  </Button>
                )}
                {this.state.selectedPatient !== null && (
                  <Button variant="outline-primary" value='tags' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Tag</Button>
                )}
                {this.state.patientUpdateField === 'tags' &&
                this.state.selectedPatient !== null
                && (
                  <UpdatePatientTagForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updatePatientTagHandler}
                          confirmText="Confirm"
                          patient={this.state.selectedPatient}
                        />
                      )}
              </Tab.Pane>

              <Tab.Pane eventKey="MasterList">
                <Container className="containerUserMasterList">
                <Row className="searchListRow">
                <Button variant="primary" size="sm" onClick={this.fetchPatientsAsc}>
                   Sort Asc
                 </Button>
                <Button variant="info" size="sm" onClick={this.fetchPatientsDesc}>
                   Sort Desc
                 </Button>
                {this.state.isLoading ? (
                  <Spinner />
                ) : (
                  <PatientList
                    patients={this.state.patients}
                    authUserId={this.context.userId}
                    onViewDetail={this.showDetailHandler}
                  />
                )}
                </Row>
                </Container>
              </Tab.Pane>

              <Tab.Pane eventKey="SearchInput">
                <Container className="containerSearchUserInput">
                  {this.context.token && (
                  <Row className="searchUserRowAdd">
                  <Button variant="primary" onClick={this.startSearchPatientHandler}>Search</Button>
                  </Row>
                )}

                <Row className="searchUserRowForm">
                <Col md={10} className="searchUserColForm">
                <Tabs defaultActiveKey="Field" id="uncontrolled-tab-example">
                <Tab eventKey="Search" title="Search:" disabled>
                </Tab>
                <Tab eventKey="Field" title="Search by Field:">
                {this.state.searching !== true && (
                  <Button variant="outline-warning" className="confirmEditButton" size="lg">
                    Click the 'Search' Button start
                  </Button>
                )}
                {this.state.searching === true && (
                  <SearchPatientForm
                  authUserId={this.context.userId}
                  canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmSearchHandler}
                    confirmText="Search"
                    patient={this.context.selectedPatient}
                  />
                )}
                </Tab>
                <Tab eventKey="Id" title="Search by ID:">
                {this.state.searching !== true && (
                  <Button variant="outline-warning" className="confirmEditButton" size="lg">
                    Click the 'Search' Button start
                  </Button>
                )}
                {this.state.searching === true && (
                  <SearchPatientIdForm
                  authUserId={this.context.userId}
                  canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmSearchIdHandler}
                    confirmText="Search"
                    patient={this.context.selectedPatient}
                  />
                )}
                </Tab>

                <Tab eventKey="Name" title="Search by Name:">
                {this.state.searching !== true && (
                  <Button variant="outline-warning" className="confirmEditButton" size="lg">
                    Click the 'Search' Button start
                  </Button>
                )}
                {this.state.searching === true && (
                  <SearchPatientNameForm
                  authUserId={this.context.userId}
                  canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmSearchNameHandler}
                    confirmText="Search"
                    patient={this.context.selectedPatient}
                  />
                )}
                </Tab>
                </Tabs>
                </Col>
                </Row>
                </Container>
              </Tab.Pane>

              <Tab.Pane eventKey="SearchResult">
                <Container className="containerSearchUserResults">
                <Row>
                  <Card className="searchCard">
                    <Card.Body className="searchCardBody">
                      <Card.Title>Your Search</Card.Title>
                      <Card.Text>
                        Field: {this.state.patientSearchField}
                      </Card.Text>
                      <Card.Text>
                        Query: {this.state.patientSearchQuery}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Row>
                <Row className="searchListRow">
                {
                  this.state.searchPatients !== [] &&
                  <SearchPatientList
                    searchPatients={this.state.searchPatients}
                    authUserId={this.context.userId}
                    onCancel={this.modalCancelHandler}
                      onViewDetail={this.showDetailHandler}
                  />
                }
                </Row>
                </Container>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
    </Col>
    </Row>

</Accordion>

      </React.Fragment>
    );
  }
}

export default PatientsPage;
