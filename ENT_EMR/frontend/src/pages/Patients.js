import React, { Component } from 'react';
import S3 from 'react-aws-s3';
// import S3FileUpload from 'react-s3';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SidebarPage from './Sidebar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import TabContainer from 'react-bootstrap/TabContainer';
// import TabContent from 'react-bootstrap/TabContent';
// import TabPane from 'react-bootstrap/TabPane';
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
// import SearchPatientVisitForm from '../components/Forms/SearchPatientVisitForm';

import AlertBox from '../components/AlertBox';
import AttachmentViewer from '../components/AttachmentViewer';
import PdfCreator from '../components/PdfCreator';

import CreatePatientForm from '../components/Forms/CreatePatientForm';
import UpdatePatientForm from '../components/Forms/UpdatePatientForm';
import UpdatePatientFieldForm from '../components/Forms/UpdatePatientFieldForm';
import UpdatePatientConsultantForm from '../components/Forms/UpdatePatientConsultantForm';
import UpdatePatientInsuranceForm from '../components/Forms/UpdatePatientInsuranceForm';
import UpdatePatientNextOfKinForm from '../components/Forms/UpdatePatientNextOfKinForm';
import UpdatePatientComplaintForm from '../components/Forms/UpdatePatientComplaintForm';
import UpdatePatientSurveyForm from '../components/Forms/UpdatePatientSurveyForm';
import UpdatePatientVitalsForm from '../components/Forms/UpdatePatientVitalsForm';
import UpdatePatientExaminationForm from '../components/Forms/UpdatePatientExaminationForm';
import UpdatePatientHistoryForm from '../components/Forms/UpdatePatientHistoryForm';
import UpdatePatientAllergiesForm from '../components/Forms/UpdatePatientAllergiesForm';
import UpdatePatientMedicationForm from '../components/Forms/UpdatePatientMedicationForm';
import UpdatePatientInvestigationForm from '../components/Forms/UpdatePatientInvestigationForm';
import UpdatePatientDiagnosisForm from '../components/Forms/UpdatePatientDiagnosisForm';
import UpdatePatientTreatmentForm from '../components/Forms/UpdatePatientTreatmentForm';
import UpdatePatientBillingForm from '../components/Forms/UpdatePatientBillingForm';
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
      treatment: false,
      vitals: false,
      billing: false,
    },
    newVisit: false,
    userAlert: null,
    showAttachment: false,
    showThisAttachmentFile: null,
    showThisAttachmentType: null,
    createPdf: false,
    pdfData: null,
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchPatients();
    if (this.context.user.name === "Lord-of-the-Manor"){
      this.setState({canDelete: true})
    }
    // if (this.context.user.name === 'admin579'){
    //   this.setState({canDelete: true})
    // }
  }


  startCreatePatientHandler = () => {
    this.setState({ creating: true });
    console.log("CreatePatientForm...");
  };
  startCreateVisitHandler = () => {
    this.setState({ newVisit: true });
    console.log("CreateVisitForm...");
  };
  startUpdatePatientHandler = () => {
    this.setState({ updating: true, updatingArray: true });
    console.log("UpdatePatientForm...");
  };
  startSearchPatientHandler = () => {
    this.setState({ searching: true });
    console.log("SearchPatientForm...");
  };

  modalConfirmHandler = (event) => {

    console.log("CreatePatientFormData:  ", event.target.formGridName.value);

    this.setState({ creating: false });
    const userId = this.context.userId;

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

    let registrationDate = event.target.formGridRegistrationDate.value;
    if (event.target.formGridRegistrationDateTodayCheckbox.checked === true) {
      registrationDate = new Date().toISOString().slice(0,10);
    }
    let referralDate = event.target.formGridReferralDate.value;
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
      // title.trim().length === 0 ||
      // name.trim().length === 0 ||
      // dob.trim().length === 0 ||
      age.trim().length === 0 ||
      // gender.trim().length === 0 ||
      addressNumber.trim().length === 0 ||
      addressStreet.trim().length === 0 ||
      // addressTown.trim().length === 0 ||
      // addressParish.trim().length === 0 ||
      // addressPostOffice.trim().length === 0 ||
      contactPhone.trim().length === 0 ||
      // contactEmail.trim().length === 0 ||
      registrationDate.trim().length === 0
      // referralDate.trim().length === 0 ||
      // expirationDate.trim().length === 0 ||
      // attendingPhysicianName.trim().length === 0 ||
      // attendingPhysicianEmail.trim().length === 0 ||
      // attendingPhysicianPhone.trim().length === 0 ||
      // referringDoctorName.trim().length === 0 ||
      // referringDoctorEmail.trim().length === 0 ||
      // referringDoctorPhone.trim().length === 0 ||
      // occupationRole.trim().length === 0 ||
      // occupationEmployer.trim().length === 0 ||
      // occupationEmployerContactPhone.trim().length === 0 ||
      // occupationEmployerContactEmail.trim().length === 0

    ) {
      console.log("patient must have at least: Name, Age, Contact Number, Street Name & Number and Registration Date!!!...Please try again...");
      this.setState({userAlert: "patient must have at least: Name, Age, Contact Number, Street Name & Number and Registration Date!!!...Please try again..."});
      return;
    }

    console.log(`
      creating patient...
      title: ${title},
      name: ${name},
      dob: ${dob},
      age: ${age},
      gender: ${gender},
      addressNumber: ${addressNumber},
      addressStreet: ${addressStreet},
      addressTown: ${addressTown},
      addressParish: ${addressParish},
      addressPostOffice: ${addressPostOffice},
      contactPhone: ${contactPhone},
      contactEmail: ${contactEmail},
      registrationDate: ${registrationDate},
      referralDate: ${referralDate},
      expirationDate: ${expirationDate},
      attendingPhysicianName: ${attendingPhysicianName},
      attendingPhysicianEmail: ${attendingPhysicianEmail},
      attendingPhysicianPhone: ${attendingPhysicianPhone},
      referringDoctorName: ${referringDoctorName},
      referringDoctorEmail: ${referringDoctorEmail},
      referringDoctorPhone: ${referringDoctorPhone},
      occupationRole: ${occupationRole},
      occupationEmployer: ${occupationEmployer},
      occupationEmployerContactPhone: ${occupationEmployerContactPhone},
      occupationEmployerContactEmail: ${occupationEmployerContactEmail},
      `);

    const requestBody = {
      query: `
        mutation {createPatient(userId:"${userId}", patientInput:{title:"${title}",name:"${name}",dob:"${dob}",age:${age},gender:"${gender}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}",addressPostOffice:"${addressPostOffice}",contactPhone:"${contactPhone}",contactEmail:"${contactEmail}",registrationDate:"${registrationDate}",referralDate:"${referralDate}",expirationDate:"${expirationDate}",referringDoctorName:"${referringDoctorName}",referringDoctorEmail:"${referringDoctorEmail}",referringDoctorPhone:"${referringDoctorPhone}",attendingPhysicianName:"${attendingPhysicianName}",attendingPhysicianEmail:"${attendingPhysicianEmail}",attendingPhysicianPhone:"${attendingPhysicianPhone}",occupationRole:"${occupationRole}",occupationEmployer:"${occupationEmployer}",occupationEmployerContactPhone:"${occupationEmployerContactPhone}",occupationEmployerContactEmail:"${occupationEmployerContactEmail}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
        `};

    const token = this.context.token;

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
        console.log(`
          response data:
          ${JSON.stringify(resData.data.createPatient)}
          `);
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

        const newPatient = resData.data.createPatient;
        this.setState(prevState => {
          const updatedPatients = [...prevState.patients];
          updatedPatients.push(newPatient);

          return { patients: updatedPatients };
        });

      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, selectedPatient: null });
  };


  modalConfirmUpdateHandler = (event) => {

    // if(this.context.user.role !== 'admin') {
    //   console.log("Not the Admin! No edit permission!!");
    // }

    const userId = this.context.userId;
    const selectedPatientId = this.context.selectedPatient._id;

    console.log("UpdatePatientFormData:  ", event.target.formGridName.value);


    this.setState({ updating: false });

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

    let registrationDate = event.target.formGridRegistrationDate.value;
    if (event.target.formGridRegistrationDateTodayCheckbox.checked === true) {
      registrationDate = new Date().toISOString().slice(0,10);
    }

    let referralDate = event.target.formGridReferralDate.value;
    if (event.target.formGridReferralDateTodayCheckbox.checked === true) {
      referralDate = new Date().toISOString().slice(0,10);
    }

    let expirationDate = event.target.formGridExpirationDate.value;
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
      console.log("blank fields detected!!!...filling w/ previous data...");
      title = this.context.selectedPatient.title;
    }
    if (name.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      name = this.context.selectedPatient.name;
    }
    if (dob.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      dob = this.context.selectedPatient.dob;
    }
    if (gender.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      gender = this.context.selectedPatient.gender;
    }
    if (age.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      age = this.context.selectedPatient.age;
    }
    if (addressNumber.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressNumber = this.context.selectedPatient.address.number;
    }
    if (addressStreet.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressStreet = this.context.selectedPatient.address.street;
    }
    if (addressTown.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressTown = this.context.selectedPatient.address.town;
    }
    if (addressParish.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressParish = this.context.selectedPatient.address.parish;
    }
    if (addressPostOffice.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressPostOffice = this.context.selectedPatient.address.postOffice;
    }
    if (contactPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      contactPhone = this.context.selectedPatient.contact.phone;
    }
    if (contactEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      contactEmail = this.context.selectedPatient.contact.email;
    }
    if (registrationDate.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      registrationDate = this.context.selectedPatient.registrationDate;
    }
    if (attendingPhysicianName.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendingPhysicianName = this.context.selectedPatient.attendingPhysician.name;
    }
    if (attendingPhysicianEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendingPhysicianEmail = this.context.selectedPatient.attendingPhysician.email;
    }
    if (attendingPhysicianPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendingPhysicianPhone = this.context.selectedPatient.attendingPhysician.phone;
    }
    if (referringDoctorName.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorName = this.context.selectedPatient.referringDoctor.name;
    }
    if (referringDoctorEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorEmail = this.context.selectedPatient.referringDoctor.email;
    }
    if (referringDoctorPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorPhone = this.context.selectedPatient.referringDoctor.phone;
    }
    if (occupationRole.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationRole = this.context.selectedPatient.occupation.role;
    }
    if (occupationEmployer.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployer = this.context.selectedPatient.occupation.employer;
    }
    if (occupationEmployerContactEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployerContactEmail = this.context.selectedPatient.occupation.contact.email;
    }
    if (occupationEmployerContactPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployerContactPhone = this.context.selectedPatient.occupation.contact.phone;
    }


    console.log(`
      updating patient...
      title: ${title},
      name: ${name},
      dob: ${dob},
      age: ${age},
      gender: ${gender},
      addressNumber: ${addressNumber},
      addressStreet: ${addressStreet},
      addressTown: ${addressTown},
      addressParish: ${addressParish},
      addressPostOffice: ${addressPostOffice},
      contactPhone: ${contactPhone},
      contactEmail: ${contactEmail},
      registrationDate: ${registrationDate},
      referralDate: ${referralDate},
      expirationDate: ${expirationDate},
      attendingPhysicianName: ${attendingPhysicianName},
      attendingPhysicianEmail: ${attendingPhysicianEmail},
      attendingPhysicianPhone: ${attendingPhysicianPhone},
      referringDoctorName: ${referringDoctorName},
      referringDoctorEmail: ${referringDoctorEmail},
      referringDoctorPhone: ${referringDoctorPhone},
      occupationRole: ${occupationRole},
      occupationEmployer: ${occupationEmployer},
      occupationEmployerContactPhone: ${occupationEmployerContactPhone},
      occupationEmployerContactEmail: ${occupationEmployerContactEmail},
      `);
      this.setState({userAlert: "updating patient..."});

    const requestBody = {
      query: `
          mutation {updatePatient(userId:"${userId}",patientId:"${selectedPatientId}", patientInput:{title:"${title}",name:"${name}",dob:"${dob}",age:${age},gender:"${gender}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}",addressPostOffice:"${addressPostOffice}",contactPhone:"${contactPhone}",contactEmail:"${contactEmail}",registrationDate:"${registrationDate}",referralDate:"${referralDate}",expirationDate:"${expirationDate}",referringDoctorName:"${referringDoctorName}",referringDoctorEmail:"${referringDoctorEmail}",referringDoctorPhone:"${referringDoctorPhone}",attendingPhysicianName:"${attendingPhysicianName}",attendingPhysicianEmail:"${attendingPhysicianEmail}",attendingPhysicianPhone:"${attendingPhysicianPhone}",occupationRole:"${occupationRole}",occupationEmployer:"${occupationEmployer}",occupationEmployerContactPhone:"${occupationEmployerContactPhone}",occupationEmployerContactEmail:"${occupationEmployerContactPhone}"})
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
        `};

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
        console.log("response data... " + JSON.stringify(resData));

        const updatedPatientId = resData.data.updatePatient._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatient);

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();

      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });
  };


  modalConfirmUpdateFieldHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedPatientId = this.context.selectedPatient._id;

    // if( this.context.user.role !== 'admin') {
    //   console.log("Not the creator or Admin! No edit permission!!");
    //   selectedPatientId = null;
    // }

      console.log("UpdatePatientFieldFormData:  ", event.target.formGridField.value);
      this.setState({ updating: false });

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
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
          console.log("response data... " + JSON.stringify(resData.data.updatePatientField));

          const updatedPatientId = resData.data.updatePatientField._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientField);
          this.context.patients = this.state.patients;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert})
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }


updatePatientConsultantHandler = (event) => {
  event.preventDefault();

  let token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  const patientConsultantReference = this.context.selectedUser._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }
  if (patientConsultantReference === undefined) {
    console.log(`
      select a Staff member before adding a Patient Consultant!!
      `);
      this.setState({userAlert: "select a Staff member before adding a Patient Consultant!!..."});
      token = null;
  }

  console.log("UpdatePatientConsultantFormData:  ", event.target.formGridConsultantDate.value);

  this.setState({ updating: false , patientUpdateField: null });

  let consultantDate = event.target.formGridConsultantDate.value;
  if (event.target.formGridConsultantDateTodayCheckbox.checked === true) {
    consultantDate = new Date().toISOString().slice(0,10);
  }

  console.log(`
    adding patient consultant item...
    userId: ${userId},
    selectedPatientId: ${selectedPatientId},
    consultantDate: ${consultantDate},
    consultantReference: ${patientConsultantReference},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientConsultant(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{consultantDate:" ${consultantDate}",consultantReference: "${patientConsultantReference}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
          console.log("response data... " + JSON.stringify(resData.data));

          const updatedPatientId = resData.data.updatePatientConsultant._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientConsultant);
          this.context.patients = this.state.patients;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert})
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

}
updatePatientInsuranceHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientInsuranceFormData:  ", event.target.formGridInsuranceCompany.value);

  this.setState({ updating: false , patientUpdateField: null });

  let insuranceCompany = event.target.formGridInsuranceCompany.value;
  let insuranceNumber = event.target.formGridInsuranceNumber.value;

  let insuranceExpiry = event.target.formGridInsuranceExpiry.value;

  let insuranceDescription = event.target.formGridInsuranceDescription.value;
  let insuranceSubscriberCompany = event.target.formGridInsuranceSubscriberCompany.value;
  let insuranceSubscriberDescription = event.target.formGridInsuranceSubscriberDescription.value;


  console.log(`
    adding patient insurance item...
    userId: ${userId},
    selectedPatientId: ${selectedPatientId},
    insuranceCompany: ${insuranceCompany},
    insuranceNumber: ${insuranceNumber},
    insuranceExpiry: ${insuranceExpiry},
    insuranceDescription: ${insuranceDescription},
    insuranceSubscriberCompany: ${insuranceSubscriberCompany},
    insuranceSubscriberDescription: ${insuranceSubscriberDescription},
    `);
    this.setState({userAlert: "adding patient insurance item..."});

    const requestBody = {
      query:`
        mutation {updatePatientInsurance(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{insuranceCompany:"${insuranceCompany}",insuranceNumber:"${insuranceNumber}",insuranceDescription:"${insuranceDescription}",insuranceExpiry:"${insuranceExpiry}",insuranceSubscriberCompany:"${insuranceSubscriberCompany}",insuranceSubscriberDescription:"${insuranceSubscriberDescription}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
          console.log("response data... " + JSON.stringify(resData.data));

          const updatedPatientId = resData.data.updatePatientInsurance._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientInsurance);
          this.context.patients = this.state.patients;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert})
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

}

updatePatientNextOfKinHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientNextOfKinFormData:  ", event.target.formGridNextOfKinName.value);

  this.setState({ updating: false , patientUpdateField: null });

  let nextOfKinName = event.target.formGridNextOfKinName.value;
  let nextOfKinPhone = event.target.formGridNextOfKinPhone.value;
  let nextOfKinEmail = event.target.formGridNextOfKinEmail.value;


  console.log(`
    adding patient nextOfKin item...
    userId: ${userId},
    selectedPatientId: ${selectedPatientId},
    nextOfKinName: ${nextOfKinName},
    nextOfKinPhone: ${nextOfKinPhone},
    nextOfKinEmail: ${nextOfKinEmail},
    `);
    this.setState({userAlert: "adding patient nextOfKin item..."});

    const requestBody = {
      query:`
        mutation {updatePatientNextOfKin(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{nextOfKinName:"${nextOfKinName}",nextOfKinEmail:"${nextOfKinEmail}",nextOfKinPhone:"${nextOfKinPhone}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
          console.log("response data... " + JSON.stringify(resData.data));

          const updatedPatientId = resData.data.updatePatientNextOfKin._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientNextOfKin);
          this.context.patients = this.state.patients;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert})
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
}


updatePatientComplaintHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientComplaintFormData:  ", event.target.formGridComplaintTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let complaintTitle = event.target.formGridComplaintTitle.value;

  let complaintDate = event.target.formGridComplaintDate.value;
  if (event.target.formGridComplaintDateTodayCheckbox.checked === true) {
    complaintDate = new Date().toISOString().slice(0,10);
  }

  let complaintDescription = event.target.formGridComplaintDescription.value;
  let complaintAnamnesis = event.target.formGridComplaintAnamnesis.value;
  // let complaintAttachmentName = event.target.formGridComplaintAttachmentName.value;
  let complaintAttachmentFormat = event.target.formGridComplaintAttachmentFormat.value;
  // let complaintAttachmentPath = event.target.formGridComplaintAttachmentPath.value;
  let complaintAttachmentPath = "uploads/patients/"+selectedPatientId+"/complaints";
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: complaintAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }

  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const complaintAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient complaint...
    userId: ${userId},
    patientId: ${selectedPatientId},
    complaintTitle: ${complaintTitle},
    complaintDate: ${complaintDate},
    complaintDescription: ${complaintDescription},
    complaintAnamnesis: ${complaintAnamnesis},
    complaintAttachmentName: ${complaintAttachmentName},
    complaintAttachmentFormat: ${complaintAttachmentFormat},
    complaintAttachmentPath: ${complaintAttachmentPath},
    `);
    this.setState({userAlert: "adding patient complaint..."});

    const requestBody = {
      query:`
        mutation {updatePatientComplaint(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{complaintDate:"${complaintDate}",complaintTitle:"${complaintTitle}",complaintDescription:"${complaintDescription}",complaintAnamnesis:"${complaintAnamnesis}",complaintAttachmentName:"${complaintAttachmentName}",complaintAttachmentFormat:"${complaintAttachmentFormat}",complaintAttachmentPath:"${complaintAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientComplaint._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientComplaint);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        // this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}

updatePatientSurveyHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientSurveyFormData:  ", event.target.formGridSurveyTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let surveyDate = event.target.formGridSurveyDate.value;
  if (event.target.formGridSurveyDateTodayCheckbox.checked === true) {
    surveyDate = new Date().toISOString().slice(0,10);
  }

  let surveyTitle = event.target.formGridSurveyTitle.value;
  let surveyDescription = event.target.formGridSurveyDescription.value;
  // let surveyAttachmentName = event.target.formGridSurveyAttachmentName.value;
  let surveyAttachmentFormat = event.target.formGridSurveyAttachmentFormat.value;
  let surveyAttachmentPath = "uploads/patients/"+selectedPatientId+"/surveys";
  // let surveyAttachmentPath = event.target.formGridSurveyAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);

    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: surveyAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }

  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const surveyAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient survey...
    userId: ${userId},
    patientId: ${selectedPatientId},
    surveyDate: ${surveyDate},
    surveyTitle: ${surveyTitle},
    surveyDescription: ${surveyDescription},
    surveyAttachmentName: ${surveyAttachmentName},
    surveyAttachmentFormat: ${surveyAttachmentFormat},
    surveyAttachmentPath: ${surveyAttachmentPath},
    `);
    this.setState({userAlert: "adding patient survey..."});

    const requestBody = {
      query:`
        mutation {updatePatientSurvey(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{surveyDate:"${surveyDate}",surveyTitle:"${surveyTitle}",surveyDescription:"${surveyDescription}",surveyAttachmentName:"${surveyAttachmentName}",surveyAttachmentFormat:"${surveyAttachmentFormat}",surveyAttachmentPath:"${surveyAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientSurvey._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientSurvey);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}

updatePatientVitalsHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientVitalsFormData:  ", event.target.formGridVitalsDate.value);

  this.setState({ updating: false , patientUpdateField: null });

  let vitalsDate = event.target.formGridVitalsDate.value;
  if (event.target.formGridVitalsDateTodayCheckbox.checked === true) {
    vitalsDate = new Date().toISOString().slice(0,10);
  }

  let vitalsPr = event.target.formGridVitalsPr.value;
  let vitalsBp1 = event.target.formGridVitalsBp1.value;
  let vitalsBp2 = event.target.formGridVitalsBp2.value;
  let vitalsRr = event.target.formGridVitalsRr.value;
  let vitalsTemp = event.target.formGridVitalsTemp.value;
  let vitalsPs02 = event.target.formGridVitalsPs02.value;
  let vitalsHeight = event.target.formGridVitalsHeight.value;
  let vitalsWeight = event.target.formGridVitalsWeight.value;
  let vitalsBmi = event.target.formGridVitalsBmi.value;
  let vitalsUrineType = event.target.formGridVitalsUrineType.value;
  let vitalsUrineValue = event.target.formGridVitalsUrineValue.value;

  console.log(`
    adding patient vitals...
    userId: ${userId},
    patientId: ${selectedPatientId},
    `);
    this.setState({userAlert: "adding patient vitals..."});

    const requestBody = {
      query:`
        mutation {updatePatientVitals(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{vitalsDate:"${vitalsDate}",vitalsPr:${vitalsPr},vitalsBp1:${vitalsBp1},vitalsBp2:${vitalsBp2},vitalsRr:${vitalsRr},vitalsTemp:${vitalsTemp},vitalsPs02:${vitalsPs02},vitalsHeight:${vitalsHeight},vitalsWeight:${vitalsWeight},vitalsBmi:${vitalsBmi},vitalsUrineType:"${vitalsUrineType}",vitalsUrineValue:"${vitalsUrineValue}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientVitals._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientVitals);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientExaminationHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientExaminationFormData:  ", event.target.formGridExaminationArea.value);

  this.setState({ updating: false , patientUpdateField: null });

  let examinationDate = event.target.formGridExaminationDate.value;
  if (event.target.formGridExaminationDateTodayCheckbox.checked === true) {
    examinationDate = new Date().toISOString().slice(0,10);
  }

  let examinationGeneral = event.target.formGridExaminationGeneral.value;
  let examinationArea = undefined;
  if (event.target.formGridExaminationAreaSelect === "select") {
    examinationArea = event.target.formGridExaminationArea.value;
  } else {
    examinationArea = event.target.formGridExaminationAreaSelect.value;
  }
  let examinationType = event.target.formGridExaminationType.value;
  let examinationMeasure = event.target.formGridExaminationMeasure.value;
  let examinationValue = event.target.formGridExaminationValue.value;
  let examinationDescription = event.target.formGridExaminationDescription.value;
  let examinationFollowUp = event.target.formGridExaminationFollowUp.value;
  // let examinationAttachmentName = event.target.formGridExaminationAttachmentName.value;
  let examinationAttachmentFormat = event.target.formGridExaminationAttachmentFormat.value;
  let examinationAttachmentPath = "uploads/patients/"+selectedPatientId+"/examinations";
  // let examinationAttachmentPath = event.target.formGridExaminationAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: examinationAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const examinationAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient examination...
    userId: ${userId},
    patientId: ${selectedPatientId},
    examinationDate: ${examinationDate},
    examinationGeneral: ${examinationGeneral},
    examinationArea: ${examinationArea},
    examinationType: ${examinationType},
    examinationMeasure: ${examinationMeasure},
    examinationValue: ${examinationValue},
    examinationDescription: ${examinationDescription},
    examinationFollowUp: ${examinationFollowUp},
    examinationAttachmentName: ${examinationAttachmentName},
    examinationAttachmentFormat: ${examinationAttachmentFormat},
    examinationAttachmentPath: ${examinationAttachmentPath},
    `);
    this.setState({userAlert: "adding patient examination..."});

    const requestBody = {
      query:`
        mutation {updatePatientExamination(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{examinationDate:"${examinationDate}",examinationGeneral:"${examinationGeneral}",examinationArea:"${examinationArea}",examinationType:"${examinationType}",examinationMeasure:"${examinationMeasure}",examinationValue:"${examinationValue}",examinationDescription:"${examinationDescription}",examinationFollowUp:${examinationFollowUp},examinationAttachmentName:"${examinationAttachmentName}",examinationAttachmentFormat:"${examinationAttachmentFormat}",examinationAttachmentPath:"${examinationAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientExamination._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientExamination);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientHistoryHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientHistoryFormData:  ", event.target.formGridHistoryTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let historyType = event.target.formGridHistoryType.value;

  let historyDate = event.target.formGridHistoryDate.value;
  if (event.target.formGridHistoryDateTodayCheckbox.checked === true) {
    historyDate = new Date().toISOString().slice(0,10);
  }

  let historyTitle = event.target.formGridHistoryTitle.value;
  let historyDescription = event.target.formGridHistoryDescription.value;
  // let historyAttachmentName = event.target.formGridHistoryAttachmentName.value;
  let historyAttachmentFormat = event.target.formGridHistoryAttachmentFormat.value;
  let historyAttachmentPath = "uploads/patients/"+selectedPatientId+"/history";
  // let historyAttachmentPath = event.target.formGridHistoryAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: historyAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const historyAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient history...
    userId: ${userId},
    patientId: ${selectedPatientId},
    historyType: ${historyType},
    historyDate: ${historyDate},
    historyTitle: ${historyTitle},
    historyDescription: ${historyDescription},
    historyAttachmentName: ${historyAttachmentName},
    historyAttachmentFormat: ${historyAttachmentFormat},
    historyAttachmentPath: ${historyAttachmentPath},
    `);
    this.setState({userAlert: "adding patient history..."});

    const requestBody = {
      query:`
        mutation {updatePatientHistory(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{historyTitle:"${historyTitle}",historyType:"${historyType}",historyDate:"${historyDate}",historyDescription:"${historyDescription}",historyAttachmentName:"${historyAttachmentName}",historyAttachmentFormat:"${historyAttachmentFormat}",historyAttachmentPath:"${historyAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientHistory._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientHistory);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientAllergiesHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientAllergiesFormData:  ", event.target.formGridAllergiesTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let allergiesTitle = event.target.formGridAllergiesTitle.value;
  let allergiesType = undefined;
  if (event.target.formGridAllergiesTypeSelect === "select") {
    allergiesType = event.target.formGridAllergiesType.value;
  } else {
    allergiesType = event.target.formGridAllergiesTypeSelect.value;
  }
  let allergiesDescription = event.target.formGridAllergiesDescription.value;
  // let allergiesAttachmentName = event.target.formGridAllergiesAttachmentName.value;
  let allergiesAttachmentFormat = event.target.formGridAllergiesAttachmentFormat.value;
  let allergiesAttachmentPath = "uploads/patients/"+selectedPatientId+"/allergies";
  // let allergiesAttachmentPath = event.target.formGridAllergiesAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: allergiesAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const allergiesAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient allergies...
    userId: ${userId},
    patientId: ${selectedPatientId},
    allergiesTitle: ${allergiesTitle},
    allergiesType: ${allergiesType},
    allergiesDescription: ${allergiesDescription},
    allergiesAttachmentName: ${allergiesAttachmentName},
    allergiesAttachmentFormat: ${allergiesAttachmentFormat},
    allergiesAttachmentPath: ${allergiesAttachmentPath},
    `);
    this.setState({userAlert: "adding patient allergies..."});

    const requestBody = {
      query:`
        mutation {updatePatientAllergies(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{allergiesTitle:"${allergiesTitle}",allergiesType:"${allergiesType}", allergiesDescription:"${allergiesDescription}",allergiesAttachmentName:"${allergiesAttachmentName}",allergiesAttachmentFormat:"${allergiesAttachmentFormat}",allergiesAttachmentPath:"${allergiesAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientAllergies._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientAllergies);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });


}


updatePatientMedicationHandler = (event) => {


  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientMedicationFormData:  ", event.target.formGridMedicationTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let medicationTitle = event.target.formGridMedicationTitle.value;
  let medicationType = event.target.formGridMedicationType.value;
  let medicationDescription = event.target.formGridMedicationDescription.value;
  // let medicationAttachmentName = event.target.formGridMedicationAttachmentName.value;
  let medicationAttachmentFormat = event.target.formGridMedicationAttachmentFormat.value;
  let medicationAttachmentPath = "uploads/patients/"+selectedPatientId+"/medication";
  // let medicationAttachmentPath = event.target.formGridMedicationAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: medicationAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const medicationAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient medication...
    userId: ${userId},
    patientId: ${selectedPatientId},
    medicationTitle: ${medicationTitle},
    medicationType: ${medicationType},
    medicationDescription: ${medicationDescription},
    medicationAttachmentName: ${medicationAttachmentName},
    medicationAttachmentFormat: ${medicationAttachmentFormat},
    medicationAttachmentPath: ${medicationAttachmentPath},
    `);
    this.setState({userAlert: "adding patient medication..."});

    const requestBody = {
      query:`
      mutation {updatePatientMedication(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{medicationTitle:"${medicationTitle}",medicationType:"${medicationType}" medicationDescription:"${medicationDescription}",medicationAttachmentName:"${medicationAttachmentName}",medicationAttachmentFormat:"${medicationAttachmentFormat}",medicationAttachmentPath:"${medicationAttachmentPath}"})
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientMedication._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientMedication);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientInvestigationHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientInvestigationFormData:  ", event.target.formGridInvestigationTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let investigationDate = event.target.formGridInvestigationDate.value;
  if (event.target.formGridInvestigationDateTodayCheckbox.checked === true) {
    investigationDate = new Date().toISOString().slice(0,10);
  }

  let investigationTitle = event.target.formGridInvestigationTitle.value;
  let investigationType = undefined;
  if (event.target.formGridInvestigationTypeSelect === "select") {
    investigationType = event.target.formGridInvestigationType.value;
  } else {
    investigationType = event.target.formGridInvestigationTypeSelect.value;
  }
  let investigationDescription = event.target.formGridInvestigationDescription.value;
  // let investigationAttachmentName = event.target.formGridInvestigationAttachmentName.value;
  let investigationAttachmentFormat = event.target.formGridInvestigationAttachmentFormat.value;
  let investigationAttachmentPath = "uploads/patients/"+selectedPatientId+"/investigation";
  // let investigationAttachmentPath = event.target.formGridInvestigationAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: investigationAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const investigationAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient investigation...
    userId: ${userId},
    patientId: ${selectedPatientId},
    investigationDate: ${investigationDate},
    investigationTitle: ${investigationTitle},
    investigationType: ${investigationType},
    investigationDescription: ${investigationDescription},
    investigationAttachmentName: ${investigationAttachmentName},
    investigationAttachmentFormat: ${investigationAttachmentFormat},
    investigationAttachmentPath: ${investigationAttachmentPath},
    `);
    this.setState({userAlert: "adding patient investigation..."});

    const requestBody = {
      query:`
        mutation {updatePatientInvestigation(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{investigationDate:"${investigationDate}",investigationTitle:"${investigationTitle}",investigationType:"${investigationType}",investigationDescription:"${investigationDescription}",investigationAttachmentName:"${investigationAttachmentName}",investigationAttachmentFormat:"${investigationAttachmentFormat}",investigationAttachmentPath:"${investigationAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientInvestigation._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientInvestigation);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientDiagnosisHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientDiagnosisFormData:  ", event.target.formGridDiagnosisTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let diagnosisDate = event.target.formGridDiagnosisDate.value;
  if (event.target.formGridDiagnosisDateTodayCheckbox.checked === true) {
    diagnosisDate = new Date().toISOString().slice(0,10);
  }

  let diagnosisTitle = event.target.formGridDiagnosisTitle.value;
  let diagnosisType = event.target.formGridDiagnosisType.value;
  let diagnosisDescription = event.target.formGridDiagnosisDescription.value;
  // let diagnosisAttachmentName = event.target.formGridDiagnosisAttachmentName.value;
  let diagnosisAttachmentFormat = event.target.formGridDiagnosisAttachmentFormat.value;
  let diagnosisAttachmentPath = "uploads/patients/"+selectedPatientId+"/diagnosis";
  // let diagnosisAttachmentPath = event.target.formGridDiagnosisAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: diagnosisAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const diagnosisAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient diagnosis...
    userId: ${userId},
    patientId: ${selectedPatientId},
    diagnosisDate: ${diagnosisDate},
    diagnosisTitle: ${diagnosisTitle},
    diagnosisType: ${diagnosisType},
    diagnosisDescription: ${diagnosisDescription},
    diagnosisAttachmentName: ${diagnosisAttachmentName},
    diagnosisAttachmentFormat: ${diagnosisAttachmentFormat},
    diagnosisAttachmentPath: ${diagnosisAttachmentPath},
    `);
    this.setState({userAlert: "adding patient diagnosis..."});

    const requestBody = {
      query:`
        mutation {updatePatientDiagnosis(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{diagnosisDate:"${diagnosisDate}",diagnosisTitle:"${diagnosisTitle}",diagnosisType:"${diagnosisType}",diagnosisDescription:"${diagnosisDescription}",diagnosisAttachmentName:"${diagnosisAttachmentName}",diagnosisAttachmentFormat:"${diagnosisAttachmentFormat}",diagnosisAttachmentPath:"${diagnosisAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientDiagnosis._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientDiagnosis);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientTreatmentHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientTreatmentFormData:  ", event.target.formGridTreatmentTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let treatmentDate = event.target.formGridTreatmentDate.value;
  if (event.target.formGridTreatmentDateTodayCheckbox.checked === true) {
    treatmentDate = new Date().toISOString().slice(0,10);
  }

  let treatmentTitle = event.target.formGridTreatmentTitle.value;
  let treatmentDescription = event.target.formGridTreatmentDescription.value;
  let treatmentDose = event.target.formGridTreatmentDose.value;
  let treatmentFrequency = event.target.formGridTreatmentFrequency.value;
  let treatmentType = undefined;
  if (event.target.formGridInvestigationTypeSelect === "select") {
    treatmentType = event.target.formGridTreatmentType.value;
  } else {
    treatmentType = event.target.formGridTreatmentTypeSelect.value;
  }
  // let treatmentAttachmentName = event.target.formGridTreatmentAttachmentName.value;
  let treatmentAttachmentFormat = event.target.formGridTreatmentAttachmentFormat.value;
  let treatmentAttachmentPath = "uploads/patients/"+selectedPatientId+"/treatment";
  // let treatmentAttachmentPath = event.target.formGridTreatmentAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: treatmentAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const treatmentAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient treatment...
    userId: ${userId},
    patientId: ${selectedPatientId},
    treatmentDate: ${treatmentDate},
    treatmentTitle: ${treatmentTitle},
    treatmentDescription: ${treatmentDescription},
    treatmentDose: ${treatmentDose},
    treatmentFrequency: ${treatmentFrequency},
    treatmentType: ${treatmentType},
    treatmentAttachmentName: ${treatmentAttachmentName},
    treatmentAttachmentFormat: ${treatmentAttachmentFormat},
    treatmentAttachmentPath: ${treatmentAttachmentPath},
    `);
    this.setState({userAlert: "adding patient treatment..."});

    const requestBody = {
      query:`
        mutation {updatePatientTreatment(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{treatmentDate:"${treatmentDate}",treatmentTitle:"${treatmentTitle}",treatmentType:"${treatmentType}",treatmentDescription:"${treatmentDescription}",treatmentDose:"${treatmentDose}",treatmentFrequency:"${treatmentFrequency}",treatmentAttachmentName:"${treatmentAttachmentName}",treatmentAttachmentFormat:"${treatmentAttachmentFormat}",treatmentAttachmentPath:"${treatmentAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientTreatment._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientTreatment);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}



updatePatientBillingHandler = (event) => {
  event.preventDefault();

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log("UpdatePatientBillingFormData:  ", event.target.formGridBillingTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let billingDate = event.target.formGridBillingDate.value;
  if (event.target.formGridBillingDateTodayCheckbox.checked === true) {
    billingDate = new Date().toISOString().slice(0,10);
  }

  let billingTitle = event.target.formGridBillingTitle.value;
  let billingType = event.target.formGridBillingType.value;
  let billingDescription = event.target.formGridBillingDescription.value;
  let billingAmount = event.target.formGridBillingAmount.value;
  let billingPaid = event.target.formGridBillingPaid.value;
  let billingNotes = event.target.formGridBillingNotes.value;
  // let billingAttachmentName = event.target.formGridBillingAttachmentName.value;
  let billingAttachmentFormat = event.target.formGridBillingAttachmentFormat.value;
  let billingAttachmentPath = "uploads/patients/"+selectedPatientId+"/billing";
  // let billingAttachmentPath = event.target.formGridBillingAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: billingAttachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
    }
  const ReactS3Client = new S3(config);
  const newFileName = file.name;
  const billingAttachmentName = newFileName;

  ReactS3Client
      .uploadFile(file, newFileName)
      .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
      .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})


  console.log(`
    adding patient billing...
    userId: ${userId},
    patientId: ${selectedPatientId},
    billingDate: ${billingDate},
    billingTitle: ${billingTitle},
    billingType: ${billingType},
    billingDescription: ${billingDescription},
    billingAmount: ${billingAmount},
    billingPaid: ${billingPaid},
    billingNotes: ${billingNotes},
    billingAttachmentName: ${billingAttachmentName},
    billingAttachmentFormat: ${billingAttachmentFormat},
    billingAttachmentPath: ${billingAttachmentPath},
    `);
    this.setState({userAlert: "adding patient billing..."});

    const requestBody = {
      query:`
        mutation {updatePatientBilling(userId:"${userId}", patientId:"${selectedPatientId}",patientInput:{billingDate:"${billingDate}",billingTitle:"${billingTitle}",billingType:"${billingType}",billingDescription:"${billingDescription}",billingAmount:${billingAmount},billingPaid:${billingPaid},billingNotes:"${billingNotes}",billingAttachmentName:"${billingAttachmentName}",billingAttachmentFormat:"${billingAttachmentFormat}",billingAttachmentPath:"${billingAttachmentPath}"})
        {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("response data... " + JSON.stringify(resData.data));

        const updatedPatientId = resData.data.updatePatientBilling._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientBilling);
        this.context.patients = this.state.patients;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });


}

updatePatientAttachmentHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedPatientId = this.context.selectedPatient._id;

    // if(this.context.user.role !== 'admin') {
    //   console.log("No edit permission!!");
    //   return;
    // }

    console.log(`
        UpdatePatientAttachmentFormData:
      `);

    this.setState({ updating: false , patientUpdateField: null });

    // let attachmentName = event.target.formGridPatientAttachmentName.value;
    let attachmentFormat = event.target.formGridPatientAttachmentFormat.value;
    let attachmentPath = "uploads/patients/"+selectedPatientId+"/attachments";
    // let attachmentPath = event.target.formGridPatientAttachmentPath.value;
    let file = AuthContext._currentValue.file;

    console.log(`
      uploading to s3...
      file.name: ${file.name},
      AuthContext._currentValue.file: ${AuthContext._currentValue.file},
      `);
      const config = {
        bucketName: this.context.creds.s3.bucketName,
        dirName: attachmentPath,
        region: this.context.creds.s3.region,
        accessKeyId: this.context.creds.s3.accessKeyId,
        secretAccessKey: this.context.creds.s3.secretAccessKey,
      }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const attachmentName = newFileName;

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})

    if (
      attachmentName.trim().length === 0 ||
      attachmentFormat.trim().length === 0 ||
      attachmentPath.trim().length === 0
    ) {
      console.log("blank fields detected!!!...Please try again...");
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
      return;
    }

    this.setState({userAlert: "adding patient attachment"});

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
            console.log("response data... " + JSON.stringify(resData.data));

            const updatedPatientId = resData.data.updatePatientAttachment._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.updatePatientAttachment);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            // this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientAttachment})
            this.fetchPatients();
          })
          .catch(err => {
            console.log(err);
            this.setState({userAlert: err});
          });

}

updatePatientNoteHandler = (event) => {
  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log(`
      UpdatePatientNoteFormData:
      ${event.target.formGridNote.value}
    `);

  this.setState({ updating: false , patientUpdateField: null });

    let note = event.target.formGridNote.value;

    if (
      note.trim().length === 0
    ) {
      console.log("Can't Submit a blank form!!!...Please try again...");
      this.setState({userAlert: "Can't Submit a blank form!!!...Please try again..."});
      return;
    }

    this.setState({userAlert: "adding patient note"});

    const requestBody = {
              query:`
              mutation {updatePatientNotes(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{notes:"${note}"})
              {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log("response data... " + JSON.stringify(resData.data));

            const updatedPatientId = resData.data.updatePatientNotes._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.updatePatientNotes);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            // this.setState({ userAlert: responseAlert, selectedPatient: resData.data.updatePatientNotes})
            this.fetchPatients();
          })
          .catch(err => {
            console.log(err);
            this.setState({userAlert: err});
          });

}
updatePatientTagHandler = (event) => {
  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;

  // if(this.context.user.role !== 'admin') {
  //   console.log("No edit permission!!");
  //   return;
  // }

  console.log(`
      UpdatePatientTagFormData:
      ${event.target.formGridTag.value}
    `);

  this.setState({ updating: false , patientUpdateField: null });

    let tag = event.target.formGridTag.value;

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
                    {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
            `}
    this.setState({userAlert: "adding patient tag"});


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
            console.log("response data... " + JSON.stringify(resData.data));

            const updatedPatientId = resData.data.updatePatientTags._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.updatePatientTags);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();
          })
          .catch(err => {
            console.log(err);
            this.setState({userAlert: err});
          });


}


modalConfirmSearchHandler = (event) => {
  console.log("SearchPatientForm:  ");


  let userId = this.context.userId;

    console.log("SearchPatientFormData:  ", event.target.formBasicField.value);
    this.setState({ searching: false });

    let field = null;
    let query = event.target.formBasicQuery.value;
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
      console.log("blank fields detected!!!...Please try again...");
      return;
    }


    this.setState({userAlert: "Searching for Patient:  "});

    const requestBody = {
      query: `
        query {
          getPatientField(userId: "${userId}", field: "${field}", query: "${query}" )
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
      `
    }

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
        console.log("response data... " + JSON.stringify(resData));
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const searchPatients = resData.data.getPatientField;

        this.setState({ searchPatients: searchPatients})
        console.log("state.searchPatients:  ", this.state.searchPatients);
        // this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });
}

modalConfirmSearchIdHandler = (event) => {
  console.log("SearchPatientIdFormData");

  let userId = this.context.userId;
  this.setState({ searching: false });

  const patientId = event.target.formBasicId.value;

  const requestBody = {
    query: `
      query {getPatientId(userId:"${userId}",patientId:"${patientId}")
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{_id,title,time,location},consultant{date,reference{_id,name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
      console.log("response data... " + JSON.stringify(resData));
      const responseAlert = JSON.stringify(resData.data).slice(2,25);
      this.setState({userAlert: responseAlert});

      const searchPatients = resData.data.getPatientId;

      this.setState({ searchPatients: [searchPatients]})
      console.log("state.searchPatients:  ", this.state.searchPatients);
      // this.fetchUsers();
    })
    .catch(err => {
      console.log(err);
      this.setState({userAlert: err});
    });
}


modalConfirmSearchNameHandler = (event) => {
  console.log("SearchPatientNameFormData:", event.target.formBasicName.value);

  // let userId = this.context.userId;
  this.setState({ searching: false });

  let patients = this.state.patients;
  const regex = new RegExp(event.target.formBasicName.value,"i");
  console.log(`
    regex: ${regex},
    `);
    let result = patients.filter(patient => patient.name.match(regex))
    console.log(`
      result: ${JSON.stringify(result)}
      `);

      this.setState({ searchPatients: result})

}

  getPatientVisit = (event) => {

    const selectedPatient = this.state.selectedPatient;
    event.preventDefault();
    console.log(`
        getUserVisit function:
        selectedPatient.consultant: ${JSON.stringify(selectedPatient.consultant)},
        selectedPatient.complaints: ${JSON.stringify(selectedPatient.complaints)},
        visitDate: ${new Date(event.target.formBasicVisitDate.value)},
      `);

    let visitDate = new Date(event.target.formBasicVisitDate.value).toISOString().substring(0, 10);
    let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitConsultants = selectedPatient.consultant.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitComplaints = selectedPatient.complaints.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    // let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitVitals = selectedPatient.vitals.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitExaminations = selectedPatient.examination.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitHistory = selectedPatient.history.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitInvestigations = selectedPatient.investigation.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitDiagnosis = selectedPatient.diagnosis.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitTreatments = selectedPatient.treatment.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
    let visitBilling = selectedPatient.billing.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);

      const visit = {
        date: visitDate,
        patientName: this.context.selectedPatient.name,
        consultant: visitConsultants,
        complaint: visitComplaints,
        examination: visitExaminations,
        survey: visitSurveys,
        vitals: visitVitals,
        history: visitHistory,
        investigation: visitInvestigations,
        diagnosis: visitDiagnosis,
        treatment: visitTreatments,
        billing: visitBilling,
      };

      console.log(`
        visit: ${JSON.stringify(visit)},
        `);
        // this.context.visit = visit;
        this.setState({visit: visit});

  }

  getVisitList = () => {

    const selectedPatient = this.state.selectedPatient;
    const patientName = this.state.selectedPatient.name;
    let selectedPatientAppointmentDateArray = [];
    let selectedPatientAppointmentVisitArray = [];
    let selectedPatientAppointments = this.state.selectedPatient.appointments.map(appointments => {
      console.log("appointments.date", appointments.date);
      selectedPatientAppointmentDateArray.push(new Date(appointments.date.substr(0,10)*1000).toISOString().substring(0, 10))
    })
    console.log(`
        getVisitList function:
        selectedPatientAppointments: ${selectedPatientAppointmentDateArray}
      `);

      selectedPatientAppointmentDateArray.map(appointmentDate => {
        console.log(`
          retriveing visit for ${appointmentDate} ...selectedPatientAppointmentVisitArray: ${JSON.stringify(selectedPatientAppointmentVisitArray)},
          `);
          thisGetVisit(appointmentDate, patientName)
      })

      function thisGetVisit (argsDate, argsPatientName) {
        console.log("thisGetVisit function...");

        let visitDate = argsDate


        let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitConsultants = selectedPatient.consultant.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitComplaints = selectedPatient.complaints.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        // let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
        let visitVitals = selectedPatient.vitals.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitExaminations = selectedPatient.examination.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitHistory = selectedPatient.history.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitInvestigations = selectedPatient.investigation.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitDiagnosis = selectedPatient.diagnosis.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitTreatments = selectedPatient.treatment.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);
        let visitBilling = selectedPatient.billing.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString().substring(0, 10) === visitDate);

        const visit = {
          date: visitDate,
          patientName: argsPatientName,
          consultant: visitConsultants,
          complaint: visitComplaints,
          examination: visitExaminations,
          survey: visitSurveys,
          vitals: visitVitals,
          history: visitHistory,
          investigation: visitInvestigations,
          diagnosis: visitDiagnosis,
          treatment: visitTreatments,
          billing: visitBilling,
        };

        selectedPatientAppointmentVisitArray.push(visit)
      }
      // console.log(`
      //     ...final selectedPatientAppointmentVisitArray: ${JSON.stringify(selectedPatientAppointmentVisitArray)}
      //   `);

      this.setState({ visitList: selectedPatientAppointmentVisitArray})

  }


  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, searching: false, selectedPatient: null });
  };


  fetchPatients() {
    console.log("fetch patients function:  ");
    const userId = this.context.userId;
    const token = this.context.token;

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {patients(userId:"${userId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{_id,title,time,location,date},consultant{date,reference{_id,name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("resData", resData);
        const patients = resData.data.patients;
        console.log(patients);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});

        this.context.patients = this.state.patients;
        if (this.isActive) {
          this.setState({ patients: patients, isLoading: false });
        }

      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  fetchPatientsAsc = () => {
    console.log("fetch patients function:  ");
    const userId = this.context.userId;
    const token = this.context.token;

    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {patientsNameAsc(userId:"${userId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{_id,title,time,location,date},consultant{date,reference{_id,name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("resData", resData);
        const patients = resData.data.patientsNameAsc;
        console.log(patients);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});

        this.context.patients = patients;
        this.setState({ patients: patients});
        // if (this.isActive) {
        //   this.setState({ patients: patients, isLoading: false });
        // }

      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });
  }

  fetchPatientsDesc = () => {
    console.log("fetch patients function:  ");
    const userId = this.context.userId;
    const token = this.context.token;

    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {patientsNameDesc(userId:"${userId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{_id,title,time,location,date},consultant{date,reference{_id,name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log("resData", resData);
        const patients = resData.data.patientsNameDesc;
        console.log(patients);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});

        this.context.patients = patients
        // if (this.isActive) {
        //   this.setState({ patients: patients, isLoading: false });
        // }
        this.setState({ patients: patients});

      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });
  }


  modalDeleteHandler = () => {
    console.log("deleting patient...selectedPatient:  ", this.context.selectedPatient);

    const selectedPatientId = this.context.selectedPatient._id;
    const userId = this.context.selectedUser._id;

    if(this.context.user.role !== 'admin') {
      console.log("Not the Admin! No edit permission!!");
    }

    this.setState({deleting: true});


    const requestBody = {
      query: `
          mutation {deletePatient(userId:"${userId}",patientId:"${selectedPatientId}")
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
        console.log(deletedPatient);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});

        let deletedPatientId = deletedPatient._id;
        deletedPatient = this.state.patients.find(e => e._id === deletedPatientId);
        const deletedPatientPos = this.state.patients.indexOf(deletedPatient);
        const slicedArray = this.state.patients.splice(deletedPatientPos, 1);
        console.log("deletedPatient:  ", JSON.stringify(deletedPatient),"  deletedUserPos:  ", deletedPatientPos, "  slicedArray:  ", slicedArray);

        this.setState({ deleting: false });

        this.fetchPatients();

      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ deleting: false });
        }
      });
  }


  deletePatientInsuranceItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;
    let patientId = this.state.selectedPatient._id;

    console.log(`
      delete patient insurance item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      patientId: ${patientId},
      `);

      const requestBody = {
        query: `
         mutation {deletePatientInsurance (userId:"${userId}", patientId:"${patientId}",insuranceCompany:"${props.company}",insuranceNumber:"${props.number}")
         {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
              console.log(deletedPatient);

              const updatedPatientId = resData.data.deletePatientInsurance._id;
              const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
              const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
              const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
              console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

              this.state.patients.push(resData.data.deletePatientInsurance);
              this.context.patients = this.state.patients;
              const responseAlert = JSON.stringify(resData.data).slice(2,25);
              this.setState({ userAlert: responseAlert})
              // this.setState({ userAlert: responseAlert, selectedPatient: resData.data.deletePatientInsurance})
              this.fetchPatients();

            })
            .catch(err => {
              console.log(err);
            });

  }

  deletePatientAppointmentItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;
    let patientId = this.state.selectedPatient._id;
    let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

    console.log(`
      delete patient appointment item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      patientId: ${patientId},
      appointment date: ${date},
      `);

      const requestBody = {
        query: `
         mutation {deletePatientAppointment (userId:"${userId}", patientId:"${patientId}",appointmentId:"${props._id}",appointmentDate:"${date}")
         {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
              console.log(deletedPatient);

              const updatedPatientId = resData.data.deletePatientAppointment._id;
              const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
              const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
              const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
              console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

              this.state.patients.push(resData.data.deletePatientAppointment);
              this.context.patients = this.state.patients;
              const responseAlert = JSON.stringify(resData.data).slice(2,25);
              this.setState({ userAlert: responseAlert})
              this.fetchPatients();

            })
            .catch(err => {
              console.log(err);
            });
}

  deletePatientConsultantItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;
    let patientId = this.state.selectedPatient._id;
    let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

    console.log(`
      delete patient consultant item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      patientId: ${patientId},
      consultant date: ${date},
      `);

      const requestBody = {
        query: `
         mutation {deletePatientConsultant (userId:"${userId}", patientId:"${patientId}",consultantId:"${props.reference.id}",consultantDate:"${date}")
         {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
              let deletedPatient = resData.data.deletePatientConsultant;
              console.log(deletedPatient);

              const updatedPatientId = resData.data.deletePatientConsultant._id;
              const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
              const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
              const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
              console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

              this.state.patients.push(resData.data.deletePatientConsultant);
              this.context.patients = this.state.patients;
              const responseAlert = JSON.stringify(resData.data).slice(2,25);
              this.setState({ userAlert: responseAlert})
              this.fetchPatients();

            })
            .catch(err => {
              console.log(err);
            });
}

deletePatientNextOfKinItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;

  console.log(`
    delete patient nextOfKin item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientNextOfKin (userId:"${userId}", patientId:"${patientId}",nextOfKinName:"${props.name}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientNextOfKin._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientNextOfKin);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientComplaintItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Complaint item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    complaint date: ${date},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientComplaint (userId:"${userId}", patientId:"${patientId}",complaintTitle:"${props.title}",complaintDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            let deletedPatient = resData.data.deletePatientComplaint;
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientComplaint._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientComplaint);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientSurveyItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Survey item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    survey date: ${date}
    `);

    const requestBody = {
      query: `
       mutation {deletePatientSurvey (userId:"${userId}", patientId:"${patientId}",surveyTitle:"${props.title}",surveyDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientSurvey._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientSurvey);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientVitalsItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Vitals item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    vitals date: ${date},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientVitals (userId:"${userId}", patientId:"${patientId}",vitalsDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientVitals._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientVitals);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientExaminationItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Examination item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    examination date: ${date},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientExamination (userId:"${userId}", patientId:"${patientId}",examinationType:"${props.type}",examinationDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientExamination._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientExamination);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientHistoryItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient History item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    history date: ${date},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientHistory (userId:"${userId}", patientId:"${patientId}",historyTitle:"${props.title}",historyDate:"${date}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientHistory._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientHistory);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientAllergiesItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;

  console.log(`
    delete patient Allergies item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientAllergies (userId:"${userId}", patientId:"${patientId}",allergiesTitle:"${props.title}",allergiesType:"${props.type}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientAllergies._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientAllergies);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientMedicationItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;

  console.log(`
    delete patient Medication item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientMedication (userId:"${userId}", patientId:"${patientId}",medicationTitle:"${props.title}",medicationType:"${props.type}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientMedication._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientMedication);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientInvestigationItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Investigation item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    investigation date: ${date},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientInvestigation (userId:"${userId}", patientId:"${patientId}",investigationDate:"${date}",investigationTitle:"${props.title}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            let deletedPatient = resData.data.deletePatientInvestigation;
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientInvestigation._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientInvestigation);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientDiagnosisItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Diagnosis item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    diagnosis date: ${date}
    `);

    const requestBody = {
      query: `
       mutation {deletePatientDiagnosis (userId:"${userId}",patientId:"${patientId}",diagnosisDate:"${date}",diagnosisTitle:"${props.title}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            let deletedPatient = resData.data.deletePatientDiagnosis;
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientDiagnosis._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientDiagnosis);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientTreatmentItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Treatment item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    treatment date: ${date},
    `);

    const requestBody = {
      query: `
       mutation {deletePatientTreatment (userId:"${userId}", patientId:"${patientId}",treatmentDate:"${date}",treatmentTitle:"${props.title}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            let deletedPatient = resData.data.deletePatientTreatment;
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientTreatment._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientTreatment);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientBillingItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete patient Billing item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    billing date: ${date},
    `);

    const requestBody = {
      query:`
       mutation {deletePatientBilling (userId:"${userId}", patientId:"${patientId}",billingDate:"${date}",billingTitle:"${props.title}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            let deletedPatient = resData.data.deletePatientBilling;
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientBilling._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientBilling);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientAttachmentItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;

  // console.log(`
  //   deleting from s3...
  //   file.name: ${props.name},
  //   `);
  //
  //   const config = {
  //     bucketName: this.context.creds.s3.bucketName,
  //     dirName: props.path,
  //     region: this.context.creds.s3.region,
  //     accessKeyId: this.context.creds.s3.accessKeyId,
  //     secretAccessKey: this.context.creds.s3.secretAccessKey,
  //   }
  // const ReactS3Client = new S3(config);
  // const filename = props.name;
  // // const attachmentName = newFileName;
  // //
  // S3FileUpload
  // .deleteFile(filename, config)
  // .then(response => console.log(response))
  // .catch(err => console.error(err))

  console.log(`
    delete patient Attachment item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    `);

    const requestBody = {
      query:`
       mutation {deletePatientAttachment (userId:"${userId}", patientId:"${patientId}",attachmentName:"${props.name}")
       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            let deletedPatient = resData.data.deletePatientAttachment;
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientAttachment._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientAttachment);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientNoteItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;

  console.log(`
    delete patient Note item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    `);

    const requestBody = {
      query:`
      mutation {deletePatientNote (userId:"${userId}", patientId:"${patientId}",note:"${props}")
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientNote._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientNote);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
          });
}

deletePatientTagItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let patientId = this.state.selectedPatient._id;

  console.log(`
    delete patient Tag item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    patientId: ${patientId},
    `);

    const requestBody = {
      query:`
      mutation {deletePatientTag (userId:"${userId}", patientId:"${patientId}",tag:"${props}")
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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
            console.log(deletedPatient);

            const updatedPatientId = resData.data.deletePatientTag._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.deletePatientTag);
            this.context.patients = this.state.patients;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert});
            this.fetchPatients();

          })
          .catch(err => {
            console.log(err);
            this.setState({ userAlert: err})
          });
}


  updatePatientSpecial (event) {

    console.log("special field to update:  ", event.target.value);
    const field = event.target.value;
    this.setState({ patientUpdateField: field});

  }

  onViewAttachment = (attachment) => {
    console.log(`
      setting up attachment viewer...
      attachment: ${JSON.stringify(attachment)}
      `);
      this.setState({showAttachment: true})

      const file = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+attachment.path+"/"+attachment.name;
      const type = attachment.format;

      this.setState({showThisAttachmentFile: file, showThisAttachmentType: type})
  }

  closeAttachmentView = () => {
    console.log(`
      closing attachment viewer...
      `);
      this.setState({showAttachment: false})
  }

  createPdf = (patient) => {
    console.log(`
        creating pdf...
        user: ${JSON.stringify(patient)}
      `);

      const pdfData = {
        title: "This pdf is supplied with Patient data...",
        patient: {
          _id: patient._id,
          title: patient.title,
          name: patient.name,
          dob: patient.dob,
          age: patient.age,
          gender: patient.gender,
          address:{
            number: patient.number,
            street: patient.street,
            town: patient.town,
            parish: patient.parish,
            postOffice: patient.postOffice
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
            vitals: patient.vitals,
            examination: patient.examination,
            history: patient.history,
            allergies: patient.allergies,
            medication: patient.medication,
            investigation: patient.investigation,
            diagnosis: patient.diagnosis,
            treatment: patient.treatment,
            billing: patient.billing,
            attachments: patient.attachments,
            notes: patient.notes,
            tags: patient.tags
          }
        }

    this.setState({createPdf: true, pdfData: pdfData})
  }

  closePdfCreator = () => {
    console.log(`
      closing pdf creator...
      `);
      this.setState({createPdf: false, pdfData: null} )
  }


  showDetailHandler = patientId => {

    this.setState({ visitList: [] })

    this.setState(prevState => {
      const selectedPatient = prevState.patients.find(e => e._id === patientId);
      this.context.selectedPatient = selectedPatient;
      this.context.selectedPatientId = selectedPatient._id;
      console.log("selectedPatient:  ", selectedPatient);
      return { selectedPatient: selectedPatient };
    });
  };

  selectVisit = (props) => {
    console.log(`
      changing selected visit ...
      event: ${JSON.stringify(props)},
      `);
      this.setState({ selectedVisit: props })

  }

  closeVisit = () => {
    console.log(`
      clearing selected visits...
      `);

    this.setState({
      visit: null,
      selectedVisit: null,
    })
  }

  createVisitChecklistUpdate = (props) => {
    console.log(`
      updating create-visit checklist...
      props: ${props},
      `);
      this.setState({ userAlert: `creating visit: ${props} addedd...`})

      let newState = Object.assign({}, this.state);
      newState.createVisitChecklist[props] = true;
      this.setState(newState);

  }

  newVisitComplete = () => {
    console.log(`
      finished adding new visit...
      `);
      this.setState({
          newVisit: false,
          createVisitChecklist: {
            consultant: true,
            complaint: true,
            diagnosis: true,
            examination: true,
            investigation: true,
            survey: true,
            treatment: true,
            vitals: true,
            billing: true,
          }
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

    {this.state.createPdf === true && (
        <PdfCreator
          pdfData={this.state.pdfData}
          onClosePdfCreator={this.closePdfCreator}
        />
    )}

    <Accordion>

    <Row>
    <Col md={3} className="MasterCol1">

    <AlertBox
          authUserId={this.context.userId}
          alert={this.state.userAlert}
        />
      <SidebarPage/>
    </Col>

    <Col md={9} className="MasterCol2">
    <Container className="containerCombinedDetail">

    <Tab.Container id="left-tabs-example" defaultActiveKey="patientDetail">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="MasterList">MASTER LIST</Nav.Link>
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
              <Nav.Link eventKey="patientEditComplaint">Complaint</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="patientEditSurvey">Survey</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="patientEditVitals">Vitals</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="patientEditExamination">Examination</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="patientEditHistory">History</Nav.Link>
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
              <Nav.Link eventKey="patientEditAttachment">Attachment</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="patientEditNote">Note</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="patientEditTag">Tag</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>Search:</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="SearchInput">Input</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="SearchResult">Search</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="patientDetail">
              {this.state.selectedPatient === null && (
                <Button variant="outline-warning" size="lg" className="confirmEditButton">
                  Select a Patient from the Master List
                </Button>
              )}
              {this.state.isLoading === false &&
                this.state.selectedPatient !== null
                &&
                (<PatientDetail
                  authUserId={this.context.userId}
                  token={this.context.token}
                  patient={this.state.selectedPatient}
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
                  vitalsDelete={this.deletePatientVitalsItem}
                  examinationDelete={this.deletePatientExaminationItem}
                  historyDelete={this.deletePatientHistoryItem}
                  allergiesDelete={this.deletePatientAllergiesItem}
                  medicationDelete={this.deletePatientMedicationItem}
                  investigationDelete={this.deletePatientInvestigationItem}
                  diagnosisDelete={this.deletePatientDiagnosisItem}
                  treatmentDelete={this.deletePatientTreatmentItem}
                  billingDelete={this.deletePatientBillingItem}
                  attachmentDelete={this.deletePatientAttachmentItem}
                  noteDelete={this.deletePatientNoteItem}
                  tagDelete={this.deletePatientTagItem}
                  onViewAttachment={this.onViewAttachment}
                  onCreatePdf={this.createPdf}
                  onGetVisitList={this.getVisitList}
                  visitList={this.state.visitList}
                  onSelectVisit={this.selectVisit}
                  onCloseVisit={this.closeVisit}
                  />
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="patientCreate">
              <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startCreatePatientHandler} >Create NEW Patient Profile</Button>
              {
                this.state.creating && (
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
                        {this.state.createVisitChecklist.consultant === true &&
                        (
                          <Button variant="warning" size="lg" className="formButton">
                          Consultant for this Visit has already been added!!
                          </Button>
                        )}

                        {this.state.createVisitChecklist.consultant === false &&
                        this.context.selectedUser === null && (
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
                        {this.state.createVisitChecklist.complaint === true &&
                        (
                          <Button variant="warning" size="lg" className="formButton">
                          Complaint for this Visit has already been added!!
                          </Button>
                        )}
                        {this.state.createVisitChecklist.complaint === false &&
                        (<UpdatePatientComplaintForm
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
                        {this.state.createVisitChecklist.vitals === true &&
                        (
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
                        {this.state.createVisitChecklist.examination === true &&
                        (
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
                        {this.state.createVisitChecklist.billing === true &&
                        (
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
                this.state.selectedPatient !== null
                && (
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
                this.state.selectedPatient !== null
                && (
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
              this.context.selectedUser === null &&
              (
                <Row>
                <Button variant="outline-warning" size="lg" className="confirmEditButton">
                  Select someone from the Staff page
                </Button>
                </Row>
              )}
              {this.state.patientUpdateField === 'consultant' &&
              this.state.selectedPatient !== null &&
              (
                <Row>
                <p>Add Consultant: {this.context.selectedUser.name}  ...</p>
                <p> To Paitient: {this.state.selectedPatient.name} ??</p>

                </Row>
              )}
              {this.state.patientUpdateField === 'consultant' &&
              this.state.selectedPatient !== null
              && (
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
              this.state.selectedPatient !== null
              && (
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
                <Button variant="outline-primary" value='complaint' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add Complaint</Button>
              )}
              {this.state.patientUpdateField === 'complaint' &&
              this.state.selectedPatient !== null
              && (
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
              this.state.selectedPatient !== null
              && (
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
              this.state.selectedPatient !== null
              && (
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
              this.state.selectedPatient !== null
              && (
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
                <Button variant="outline-primary" value='history' size="lg" className="confirmEditButton" onClick={this.updatePatientSpecial.bind(this)}>Add History</Button>
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

    <Col md={3} className="MasterCol3">


    </Col>
    </Row>

</Accordion>

      </React.Fragment>
    );
  }
}

export default PatientsPage;
