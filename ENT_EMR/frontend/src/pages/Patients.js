import React, { Component } from 'react';
// import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SidebarPage from './Sidebar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';

import PatientList from '../components/Patients/PatientList/PatientList';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import SearchPatientList from '../components/Patients/PatientList/SearchPatientList';
import SearchPatientForm from '../components/Forms/SearchPatientForm';
import SearchPatientIdForm from '../components/Forms/SearchPatientIdForm';
import SearchPatientNameForm from '../components/Forms/SearchPatientNameForm';
import SearchPatientVisitForm from '../components/Forms/SearchPatientVisitForm';

import AlertBox from '../components/AlertBox';

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
    userAlert: null,
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchPatients();
    if (this.context.user.name === 'admin579'){
      this.setState({canDelete: true})
    }
  }


  startCreatePatientHandler = () => {
    this.setState({ creating: true });
    console.log("CreatePatientForm...");
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
    let referralDate = event.target.formGridReferralDate.value;
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
      // age.trim().length === 0 ||
      // gender.trim().length === 0 ||
      // addressNumber.trim().length === 0 ||
      // addressStreet.trim().length === 0 ||
      // addressTown.trim().length === 0 ||
      // addressParish.trim().length === 0 ||
      // addressPostOffice.trim().length === 0 ||
      contactPhone.trim().length === 0
      // contactEmail.trim().length === 0 ||
      // registrationDate.trim().length === 0 ||
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
      console.log("patient must have at least a Name and Contact Number!!!...Please try again...");
      this.setState({userAlert: "patient requires Name and Contact Number!!!... Try again..."});
      return;
    }

    const patient = { title, name, dob, age, gender, addressNumber, addressStreet, addressTown, addressParish, addressPostOffice, contactPhone, contactEmail, registrationDate, referralDate, expirationDate, attendingPhysicianName, attendingPhysicianEmail, attendingPhysicianPhone, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail };
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
          mutation {createPatient(userId:\"${userId}\", patientInput:{title:\"${title}\",name:\"${name}\",dob:\"${dob}\",age:${age},gender:\"${gender}\",addressNumber:${addressNumber},addressStreet:\"${addressStreet}\",addressTown:\"${addressTown}\",addressParish:\"${addressParish}\",addressPostOffice:\"${addressPostOffice}\",contactPhone:\"${contactPhone}\",contactEmail:\"${contactEmail}\",registrationDate:\"${registrationDate}\",referralDate:\"${referralDate}\",expirationDate:\"${expirationDate}\",referringDoctorName:\"${referringDoctorName}\",referringDoctorEmail:\"${referringDoctorEmail}\",referringDoctorPhone:\"${referringDoctorPhone}\",attendingPhysicianName:\"${attendingPhysicianName}\",attendingPhysicianEmail:\"${attendingPhysicianEmail}\",attendingPhysicianPhone:\"${attendingPhysicianPhone}\",occupationRole:\"${occupationRole}\",occupationEmployer:\"${occupationEmployer}\",occupationEmployerContactPhone:\"${occupationEmployerContactPhone}\",occupationEmployerContactEmail:\"${occupationEmployerContactEmail}\"})
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
    let referralDate = event.target.formGridReferralDate.value;
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

    const patient = { title, name, dob, age, gender, addressNumber, addressStreet, addressTown, addressParish, addressPostOffice, contactPhone, contactEmail, registrationDate, referralDate, expirationDate, attendingPhysicianName, attendingPhysicianEmail, attendingPhysicianPhone, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail };
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatient._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatient);

        // FIX ME!!!
        // Add everywhere
        this.setState({ selectedPatient: resData.data.updatePatient})
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
          mutation {updatePatientField(userId:\"${userId}\",patientId:\"${selectedPatientId}\",field:\"${field}\",query:\"${query}\")
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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const updatedPatientId = resData.data.updatePatientField._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientField);
          this.context.patients = this.state.patients;
          // this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }


updatePatientConsultantHandler = (event) => {

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

  const patientConsultant = { consultantDate, patientConsultantReference };
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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const updatedPatientId = resData.data.updatePatientConsultant._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientConsultant);
          this.context.patients = this.state.patients;
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

  const patientInsurance = { insuranceCompany, insuranceNumber, insuranceExpiry, insuranceDescription, insuranceSubscriberCompany, insuranceSubscriberDescription };
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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const updatedPatientId = resData.data.updatePatientInsurance._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientInsurance);
          this.context.patients = this.state.patients;
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

  const patientNextOfKin = { nextOfKinName, nextOfKinPhone, nextOfKinEmail };
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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const updatedPatientId = resData.data.updatePatientNextOfKin._id;
          const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
          const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
          const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
          console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

          this.state.patients.push(resData.data.updatePatientNextOfKin);
          this.context.patients = this.state.patients;
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
}


updatePatientComplaintHandler = (event) => {

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
  let complaintDescription = event.target.formGridComplaintDescription.value;
  let complaintAnamnesis = event.target.formGridComplaintAnamnesis.value;
  let complaintAttachmentName = event.target.formGridComplaintAttachmentName.value;
  let complaintAttachmentFormat = event.target.formGridComplaintAttachmentFormat.value;
  let complaintAttachmentPath = event.target.formGridComplaintAttachmentPath.value;

  const patientComplaint = { complaintTitle, complaintDate, complaintDescription, complaintAnamnesis, complaintAttachmentName, complaintAttachmentFormat, complaintAttachmentPath };
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientComplaint._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientComplaint);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}

updatePatientSurveyHandler = (event) => {

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
  let surveyTitle = event.target.formGridSurveyTitle.value;
  let surveyDescription = event.target.formGridSurveyDescription.value;
  let surveyAttachmentName = event.target.formGridSurveyAttachmentName.value;
  let surveyAttachmentFormat = event.target.formGridSurveyAttachmentFormat.value;
  let surveyAttachmentPath = event.target.formGridSurveyAttachmentPath.value;

  const patientSurvey = { surveyDate, surveyTitle, surveyDescription, surveyAttachmentName, surveyAttachmentFormat, surveyAttachmentPath };
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientSurvey._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientSurvey);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}

updatePatientVitalsHandler = (event) => {

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

  const patientVitals = {  };
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientVitals._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientVitals);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientExaminationHandler = (event) => {

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
  let examinationAttachmentName = event.target.formGridExaminationAttachmentName.value;
  let examinationAttachmentFormat = event.target.formGridExaminationAttachmentFormat.value;
  let examinationAttachmentPath = event.target.formGridExaminationAttachmentPath.value;

  const patientExamination = { examinationArea, examinationGeneral, examinationType, examinationMeasure, examinationValue, examinationAttachmentName, examinationAttachmentFormat, examinationAttachmentPath };

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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientExamination._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientExamination);
        this.context.patients = this.state.patients;
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
  let historyTitle = event.target.formGridHistoryTitle.value;
  let historyDescription = event.target.formGridHistoryDescription.value;
  let historyAttachmentName = event.target.formGridHistoryAttachmentName.value;
  let historyAttachmentFormat = event.target.formGridHistoryAttachmentFormat.value;
  let historyAttachmentPath = event.target.formGridHistoryAttachmentPath.value;

  const patientHistory = { historyType, historyDate, historyTitle, historyDescription, historyAttachmentName, historyAttachmentFormat, historyAttachmentPath };
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientHistory._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientHistory);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientAllergiesHandler = (event) => {

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
  let allergiesAttachmentName = event.target.formGridAllergiesAttachmentName.value;
  let allergiesAttachmentFormat = event.target.formGridAllergiesAttachmentFormat.value;
  let allergiesAttachmentPath = event.target.formGridAllergiesAttachmentPath.value;

  const patientAllergies = { allergiesTitle, allergiesType, allergiesDescription, allergiesAttachmentName, allergiesAttachmentFormat, allergiesAttachmentPath };

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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientAllergies._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientAllergies);
        this.context.patients = this.state.patients;
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
  let medicationAttachmentName = event.target.formGridMedicationAttachmentName.value;
  let medicationAttachmentFormat = event.target.formGridMedicationAttachmentFormat.value;
  let medicationAttachmentPath = event.target.formGridMedicationAttachmentPath.value;

  const patientMedication = { medicationTitle, medicationType, medicationDescription, medicationAttachmentName, medicationAttachmentFormat, medicationAttachmentPath };

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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientMedication._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientMedication);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientInvestigationHandler = (event) => {

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
  let investigationTitle = event.target.formGridInvestigationTitle.value;
  let investigationType = undefined;
  if (event.target.formGridInvestigationTypeSelect === "select") {
    investigationType = event.target.formGridInvestigationType.value;
  } else {
    investigationType = event.target.formGridInvestigationTypeSelect.value;
  }
  let investigationDescription = event.target.formGridInvestigationDescription.value;
  let investigationAttachmentName = event.target.formGridInvestigationAttachmentName.value;
  let investigationAttachmentFormat = event.target.formGridInvestigationAttachmentFormat.value;
  let investigationAttachmentPath = event.target.formGridInvestigationAttachmentPath.value;

  const patientInvestigation = { investigationDate, investigationTitle, investigationType, investigationDescription, investigationAttachmentName, investigationAttachmentFormat, investigationAttachmentPath };

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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientInvestigation._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientInvestigation);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientDiagnosisHandler = (event) => {

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
  let diagnosisTitle = event.target.formGridDiagnosisTitle.value;
  let diagnosisType = event.target.formGridDiagnosisType.value;
  let diagnosisDescription = event.target.formGridDiagnosisDescription.value;
  let diagnosisAttachmentName = event.target.formGridDiagnosisAttachmentName.value;
  let diagnosisAttachmentFormat = event.target.formGridDiagnosisAttachmentFormat.value;
  let diagnosisAttachmentPath = event.target.formGridDiagnosisAttachmentPath.value;

  const patientDiagnosis = { diagnosisDate, diagnosisTitle, diagnosisType, diagnosisDescription, diagnosisAttachmentName, diagnosisAttachmentFormat, diagnosisAttachmentPath };

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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientDiagnosis._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientDiagnosis);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}


updatePatientTreatmentHandler = (event) => {

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
  let treatmentAttachmentName = event.target.formGridTreatmentAttachmentName.value;
  let treatmentAttachmentFormat = event.target.formGridTreatmentAttachmentFormat.value;
  let treatmentAttachmentPath = event.target.formGridTreatmentAttachmentPath.value;

  const patientTreatment = { treatmentDate, treatmentTitle, treatmentDescription, treatmentDose, treatmentFrequency, treatmentType, treatmentAttachmentName, treatmentAttachmentFormat, treatmentAttachmentPath };

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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientTreatment._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientTreatment);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

}



updatePatientBillingHandler = (event) => {

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
  let billingTitle = event.target.formGridBillingTitle.value;
  let billingType = event.target.formGridBillingType.value;
  let billingDescription = event.target.formGridBillingDescription.value;
  let billingAmount = event.target.formGridBillingAmount.value;
  let billingPaid = event.target.formGridBillingPaid.value;
  let billingNotes = event.target.formGridBillingNotes.value;
  let billingAttachmentName = event.target.formGridBillingAttachmentName.value;
  let billingAttachmentFormat = event.target.formGridBillingAttachmentFormat.value;
  let billingAttachmentPath = event.target.formGridBillingAttachmentPath.value;

  const patientBilling = { billingDate, billingTitle, billingType, billingDescription, billingAmount, billingPaid, billingNotes, billingAttachmentName, billingAttachmentFormat, billingAttachmentPath };

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
        mutation {updatePatientBilling(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{billingDate:\"${billingDate}\",billingTitle:\"${billingTitle}\",billingType:\"${billingType}\",billingDescription:\"${billingDescription}\",billingAmount:${billingAmount},billingPaid:${billingPaid},billingNotes:\"${billingNotes}\",billingAttachmentName:\"${billingAttachmentName}\",billingAttachmentFormat:\"${billingAttachmentFormat}\",billingAttachmentPath:\"${billingAttachmentPath}\"})
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedPatientId = resData.data.updatePatientBilling._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(resData.data.updatePatientBilling);
        this.context.patients = this.state.patients;
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
        ${event.target.formGridPatientAttachmentName.value}
      `);

    this.setState({ updating: false , patientUpdateField: null });

    let attachmentName = event.target.formGridPatientAttachmentName.value;
    let attachmentFormat = event.target.formGridPatientAttachmentFormat.value;
    let attachmentPath = event.target.formGridPatientAttachmentPath.value;

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
                    mutation {updatePatientAttachment(userId:"${userId}",patientId:"${selectedPatientId}",patientInput:{attachmentName:"${attachmentName}",attachmentFormat:"${attachmentFormat}",attachmentPath:"${attachmentFormat}"})
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
            const responseAlert = JSON.stringify(resData.data).slice(2,15);
            this.setState({userAlert: responseAlert});

            const updatedPatientId = resData.data.updatePatientAttachment._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.updatePatientAttachment);
            this.context.patients = this.state.patients;
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
            const responseAlert = JSON.stringify(resData.data).slice(2,15);
            this.setState({userAlert: responseAlert});

            const updatedPatientId = resData.data.updatePatientNotes._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.updatePatientNotes);
            this.context.patients = this.state.patients;
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
            const responseAlert = JSON.stringify(resData.data).slice(2,15);
            this.setState({userAlert: responseAlert});

            const updatedPatientId = resData.data.updatePatientTags._id;
            const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
            const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
            const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
            console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

            this.state.patients.push(resData.data.updatePatientTags);
            this.context.patients = this.state.patients;
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



    const search = { field, query }
    console.log("Searching for Patient:  ", JSON.stringify(search));
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
      query {getPatientId(userId:\"${userId}\",patientId:\"${patientId}\")
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

modalConfirmSearchVisitHandler = (event) => {
  console.log("SearchPatientVisitFormData");

  let userId = this.context.userId;
  this.setState({ searching: false });

  const requestBody = {
    query: `
      {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{_id,title,time,location,date},consultant{date,reference{_id,name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
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

      const searchPatients = resData.data.getPatientId;

      this.setState({ searchPatients: searchPatients})
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

  let userId = this.context.userId;
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
        selectedPatient.consultant: ${JSON.stringify(selectedPatient.consultant)}
        selectedPatient.complaints: ${JSON.stringify(selectedPatient.complaints)}
      `);
    let visitDate = new Date(event.target.formBasicVisitDate.value).toISOString();
    let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitConsultants = selectedPatient.consultant.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitComplaints = selectedPatient.complaints.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    // let visitSurveys = selectedPatient.surveys.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitVitals = selectedPatient.vitals.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitExaminations = selectedPatient.examination.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitHistory = selectedPatient.history.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitInvestigations = selectedPatient.investigation.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitDiagnosis = selectedPatient.diagnosis.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitTreatments = selectedPatient.treatment.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);
    let visitBilling = selectedPatient.billing.filter(x=> new Date(x.date.substr(0,10)*1000).toISOString() === visitDate);

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
        this.context.visit = visit;
        this.setState({visit: visit});

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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
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


  deletePatientInsurance = (event) => {
    event.preventDefault();
    console.log(`
      delete patient insurance item:
      event: ${event}
      token: ${this.context.token},
      userId: ${this.context.userId}
      patientId: ${this.state.selectedPatientId},
      `);

      // const requestBody = {
      //   query: `
      //       mutation {deletePatientInsurance(userId:"${userId}",patientId:"${patientId}",patientInput:{insuranceCompany:"${insuranceItem.company}",insuranceNumber:"${insuranceItem.number}",insuranceDescription:"${insuranceItem.description}",insuranceExpiry:"${insuranceItem.expiry}",insuranceSubscriberCompany:"${insuranceItem.subscriber.company}",insuranceSubscriberDescription:"${insuranceItem.subscriber.description}",})
      //       {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{title,time,location},consultant{date,reference{name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}}
      //     `};
      //
      //     fetch('http://localhost:10000/graphql', {
      //       method: 'POST',
      //       body: JSON.stringify(requestBody),
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: 'Bearer ' + token
      //       }
      //     })
      //       .then(res => {
      //         if (res.status !== 200 && res.status !== 201) {
      //           throw new Error('Failed!');
      //         }
      //         return res.json();
      //       })
      //       .then(resData => {
      //         let deletedPatient = resData.data.deletePatientInsurance;
      //         console.log(deletedPatient);
      //         props.fetchUsers();
      //         // props.fetchUsers;
      //
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });

  }


  updatePatientSpecial (event) {

    console.log("special field to update:  ", event.target.value);
    const field = event.target.value;
    this.setState({ patientUpdateField: field});

  }


  showDetailHandler = patientId => {

    this.setState(prevState => {
      const selectedPatient = prevState.patients.find(e => e._id === patientId);
      this.context.selectedPatient = selectedPatient;
      this.context.selectedPatientId = selectedPatient._id;
      console.log("selectedPatient:  ", selectedPatient);
      return { selectedPatient: selectedPatient };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (

    <React.Fragment>

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
    <Tabs defaultActiveKey="" id="uncontrolled-tab-example">
    <Tab eventKey="" title="Edit:" disabled>
    </Tab>
    <Tab eventKey="patientDetail" title="Details">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
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
        visit={this.context.visit}
        fetchUsers={this.fetchUsers}
        insuranceDelete={this.deletePatientInsuranceItem}
        />
    )}
    </Tab>

    <Tab eventKey="patientCreate" title="Create">
    <Button variant="outline-primary" onClick={this.startCreatePatientHandler} >Create</Button>
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
    </Tab>

    <Tab eventKey="patientEditDemographics" title="Demographics">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" onClick={this.startUpdatePatientHandler}>Edit Demographics</Button>
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
    </Tab>

    <Tab eventKey="patientEditField" title="Single Field">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" onClick={this.startUpdatePatientHandler}>Edit Field</Button>
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
    </Tab>

    <Tab eventKey="patientEditConsultant" title="Consultant">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='consultant' onClick={this.updatePatientSpecial.bind(this)}>Add Consultant</Button>
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
    {this.state.patientUpdateField === 'consultant' &&
    this.state.selectedPatient !== null &&
    (
      <Row>
      <p>Add Consultant: {this.context.selectedUser.name}</p>
      <p> To Paitient: {this.state.selectedPatient.name} ??</p>
      <hr/>
      </Row>
    )}
    {this.state.patientUpdateField === 'consultant' &&
    this.state.selectedPatient !== null &&
    (
      <Row>
      <Button variant="outline-warning" size="lg">
        Select a doctor from the Staff page
      </Button>
      </Row>
    )}
    </Tab>
    <Tab eventKey="patientEditInsurance" title="Insurance">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='insurance' onClick={this.updatePatientSpecial.bind(this)}>Add Insurance</Button>
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
    </Tab>
    <Tab eventKey="patientEditNextOfKin" title="NextOfKin">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='nextOfKin' onClick={this.updatePatientSpecial.bind(this)}>Add NextOfKin</Button>
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
    </Tab>
    <Tab eventKey="patientEditComplaint" title="Complaint">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='complaint' onClick={this.updatePatientSpecial.bind(this)}>Add Complaint</Button>
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
    </Tab>
    <Tab eventKey="patientEditSurvey" title="Survey">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='survey' onClick={this.updatePatientSpecial.bind(this)}>Add Survey</Button>
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
    </Tab>
    <Tab eventKey="patientEditVitals" title="Vitals">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='vitals' onClick={this.updatePatientSpecial.bind(this)}>Add Vitals</Button>
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
    </Tab>
    <Tab eventKey="patientEditExamination" title="Examination">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='examintion' onClick={this.updatePatientSpecial.bind(this)}>Add Examination</Button>
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
    </Tab>
    <Tab eventKey="patientEditHistory" title="History">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='history' onClick={this.updatePatientSpecial.bind(this)}>Add History</Button>
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
    </Tab>
    <Tab eventKey="patientEditAllergies" title="Allergies">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='allergies' onClick={this.updatePatientSpecial.bind(this)}>Add Allergies</Button>
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
    </Tab>
    <Tab eventKey="patientEditMedication" title="Medication">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='medication' onClick={this.updatePatientSpecial.bind(this)}>Add Medication</Button>
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
    </Tab>
    <Tab eventKey="patientEditInvestigation" title="Investigation">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='investigation' onClick={this.updatePatientSpecial.bind(this)}>Add Investigation</Button>
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
    </Tab>
    <Tab eventKey="patientEditDiagnosis" title="Diagnosis">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='diagnosis' onClick={this.updatePatientSpecial.bind(this)}>Add Diagnosis</Button>
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
    </Tab>
    <Tab eventKey="patientEditTreatment" title="Treatment">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='treatment' onClick={this.updatePatientSpecial.bind(this)}>Add Treatment</Button>
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
    </Tab>
    <Tab eventKey="patientEditBilling" title="Billing">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='billing' onClick={this.updatePatientSpecial.bind(this)}>Add Billing</Button>
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
    </Tab>

    <Tab eventKey="patientEditAttachment" title="Attachment">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='attachment' onClick={this.updatePatientSpecial.bind(this)}>Add Attachment</Button>
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
    </Tab>
    <Tab eventKey="patientEditNote" title="Note">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='notes' onClick={this.updatePatientSpecial.bind(this)}>Add Note</Button>
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
    </Tab>
    <Tab eventKey="patientEditTag" title="Tag">
    {this.state.selectedPatient === null && (
      <Button variant="outline-warning" size="lg">
        Select a Patient from the Master List below
      </Button>
    )}
    {this.state.selectedPatient !== null && (
      <Button variant="outline-primary" value='tags' onClick={this.updatePatientSpecial.bind(this)}>Add Tag</Button>
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
    </Tab>

    <Tab eventKey="MasterList" title="Master List">
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
    </Tab>

    <Tab eventKey="SearchInput" title="Search">
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
    <Tab eventKey="Field" title="Field:">
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
    <Tab eventKey="Id" title="Id:">
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
    {
    //   <Tab eventKey="Visit" title="Visit:">
    // {this.state.searching === true && (
    //   <SearchPatientVisitForm
    //   authUserId={this.context.userId}
    //   canCancel
    //     canConfirm
    //     onCancel={this.modalCancelHandler}
    //     onConfirm={this.modalConfirmSearchVisitHandler}
    //     confirmText="Search"
    //     patient={this.context.selectedPatient}
    //   />
    // )}
    // </Tab>
  }
    <Tab eventKey="Name" title="Name:">
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
    </Tab>

    <Tab eventKey="SearchResult" title="Search Results">
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
    </Tab>

    </Tabs>
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
