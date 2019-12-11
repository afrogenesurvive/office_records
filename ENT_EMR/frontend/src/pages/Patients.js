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

import CreatePatientForm from '../components/Forms/CreatePatientForm';
import UpdatePatientForm from '../components/Forms/UpdatePatientForm';
import UpdatePatientConsultantForm from '../components/Forms/UpdatePatientConsultantForm';
import UpdatePatientInsuranceForm from '../components/Forms/UpdatePatientInsuranceForm';
import UpdatePatientNextOfKinForm from '../components/Forms/UpdatePatientNextOfKinForm';
import UpdatePatientComplaintForm from '../components/Forms/UpdatePatientSurveyForm';
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
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchPatients();
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
    let gender = event.target.formGridgender.value;
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
      title.trim().length === 0 ||
      name.trim().length === 0 ||
      dob.trim().length === 0 ||
      age.trim().length === 0 ||
      gender.trim().length === 0 ||
      addressNumber.trim().length === 0 ||
      addressStreet.trim().length === 0 ||
      addressTown.trim().length === 0 ||
      addressParish.trim().length === 0 ||
      addressPostOffice.trim().length === 0 ||
      contactPhone.trim().length === 0 ||
      contactEmail.trim().length === 0 ||
      registrationDate.trim().length === 0 ||
      referralDate.trim().length === 0 ||
      expirationDate.trim().length === 0 ||
      attendingPhysicianName.trim().length === 0 ||
      attendingPhysicianEmail.trim().length === 0 ||
      attendingPhysicianPhone.trim().length === 0 ||
      referringDoctorName.trim().length === 0 ||
      referringDoctorEmail.trim().length === 0 ||
      referringDoctorPhone.trim().length === 0 ||
      occupationRole.trim().length === 0 ||
      occupationEmployer.trim().length === 0 ||
      occupationEmployerContactPhone.trim().length === 0 ||
      occupationEmployerContactEmail.trim().length === 0

    ) {
      console.log("blank fields detected!!!...Please try again...");
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
          mutation {createPatient(userId:"${userId}", patientInput:{title:"${title}",name:"${name}",dob:"${dob}",age:${age},gender:"${gender}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}",addressPostOffice:"${addressPostOffice}",contactPhone:"${contactPhone}",contactEmail:"${contactEmail}",registrationDate:"${registrationDate}",referralDate:"${referralDate}",expirationDate:"${expirationDate}",referringDoctorName:"${referringDoctorName}",referringDoctorEmail:"${referringDoctorEmail}",referringDoctorPhone:"${referringDoctorPhone}",attendingPhysicianName:"${attendingPhysicianName}",attendingPhysicianEmail:"${attendingPhysicianEmail}",attendingPhysicianPhone:"${attendingPhysicianPhone}",occupationRole:"${occupationRole}",occupationEmployer:"${occupationEmployer}",occupationEmployerContactPhone:"${occupationEmployerContactPhone}",occupationEmployerContactEmail:"${occupationEmployerContactEmail}"})
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
        const newPatient = resData.data.createPatient;
        this.setState(prevState => {
          const updatedPatients = [...prevState.patients];
          updatedPatients.push(newPatient);

          return { patients: updatedPatients };
        });

      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, selectedPatient: null });
  };


  modalConfirmUpdateHandler = (event) => {

    if(this.context.user.role !== 'admin') {
      console.log("Not the Admin! No edit permission!!");

    }

    const userId = this.context.userId;
    const selectedPatientId = this.context.selectedPatient._id;

    console.log("UpdatePatientFormData:  ", event.target.formGridName.value);


    this.setState({ updating: false });

    let title = event.target.formGridTitle.value;
    let name = event.target.formGridName.value;
    let dob = event.target.formGridDob.value;
    let age = event.target.formGridAge.value;
    let gender = event.target.formGridgender.value;
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
      title = this.context.selectedUser.title;
    }
    if (name.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      name = this.context.selectedUser.name;
    }
    if (dob.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      dob = this.context.selectedUser.dob;
    }
    if (gender.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      gender = this.context.selectedUser.gender;
    }
    if (age.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      age = this.context.selectedUser.age;
    }
    if (addressNumber.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressNumber = this.context.selectedUser.address.number;
    }
    if (addressStreet.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressStreet = this.context.selectedUser.address.street;
    }
    if (addressTown.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressTown = this.context.selectedUser.address.town;
    }
    if (addressParish.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressParish = this.context.selectedUser.address;
    }
    if (addressPostOffice.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressPostOffice = this.context.selectedUser.address.postOffice;
    }
    if (contactPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      contactPhone = this.context.selectedUser.contact.phone;
    }
    if (contactEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      contactEmail = this.context.selectedUser.contact.email;
    }
    if (registrationDate.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      registrationDate = this.context.selectedUser.registrationDate;
    }
    if (attendingPhysicianName.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendingPhysicianName = this.context.selectedUser.attendingPhysician.name;
    }
    if (attendingPhysicianEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendingPhysicianEmail = this.context.selectedUser.attendingPhysician.email;
    }
    if (attendingPhysicianPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendingPhysicianPhone = this.context.selectedUser.attendingPhysician.phone;
    }
    if (referringDoctorName.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorName = this.context.selectedUser.referringDoctor.name;
    }
    if (referringDoctorEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorEmail = this.context.selectedUser.referringDoctor.email;
    }
    if (referringDoctorPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorPhone = this.context.selectedUser.referringDoctor.phone;
    }
    if (occupationRole.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationRole = this.context.selectedUser.occupation.role;
    }
    if (occupationEmployer.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployer = this.context.selectedUser.occupation.employer;
    }
    if (occupationEmployerContactEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployerContactEmail = this.context.selectedUser.occupation.contact.email;
    }
    if (occupationEmployerContactPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployerContactPhone = this.context.selectedUser.occupation.contact.phone;
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
        this.fetchPatients();

      })
      .catch(err => {
        console.log(err);
      });
  };

updatePatientConsultantHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  const patientConsultantReference = this.context.selectedUser._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
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
        mutation {updatePatientConsultant(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{consultantDate:" ${consultantDate}",consultantReference: "${patientConsultantReference}"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
      }
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

          this.state.patients.push(updatedPatient);
          this.context.patients = this.state.patients;
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
        });

}
updatePatientInsuranceHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

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

    const requestBody = {
      query:`
        mutation {updatePatientInsurance(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{insuranceCompany:\"${insuranceCompany}\",insuranceNumber:\"${insuranceNumber}\",insuranceDescription:\"${insuranceDescription}\",insuranceExpiry:\"${insuranceExpiry}\",insuranceSubscriberCompany:\"${insuranceSubscriberCompany}\",insuranceSubscriberDescription:\"${insuranceSubscriberDescription}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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

          this.state.patients.push(updatedPatient);
          this.context.patients = this.state.patients;
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
        });

}

updatePatientNextOfKinHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

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

    const requestBody = {
      query:`
        mutation {updatePatientNextOfKin(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{nextOfKinName:\"${nextOfKinName}\",nextOfKinEmail:\"granny@kin.mail\",nextOfKinPhone:\"1234566\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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

          this.state.patients.push(updatedPatient);
          this.context.patients = this.state.patients;
          this.fetchPatients();
        })
        .catch(err => {
          console.log(err);
        });
}


updatePatientComplaintHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientComplaintFormData:  ", event.target.formGridComplaintTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let complaintTitle = event.target.formGridComplaintTitle.value;
  let complaintDate = event.target.formGridComplaintDate.value;
  let complaintDescription = event.target.formGridComplaintDescription.value;
  let complaintAttachmentName = event.target.formGridComplaintAttachmentName.value;
  let complaintAttachmentFormat = event.target.formGridComplaintAttachmentFormat.value;
  let complaintAttachmentPath = event.target.formGridComplaintAttachmentPath.value;

  const patientComplaint = { complaintTitle, complaintDate, complaintDescription, complaintAttachmentName, complaintAttachmentFormat, complaintAttachmentPath };
  console.log(`
    adding patient complaint...
    userId: ${userId},
    patientId: ${selectedPatientId},
    complaintTitle: ${complaintTitle},
    complaintDate: ${complaintDate},
    complaintDescription: ${complaintDescription},
    complaintAttachmentName: ${complaintAttachmentName},
    complaintAttachmentFormat: ${complaintAttachmentFormat},
    complaintAttachmentPath: ${complaintAttachmentPath},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientComplaint(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{complaintDate:\"${complaintDate}\",complaintTitle:\"${complaintTitle}\",complaintDescription:\"${complaintDescription}\",complaintAttachmentName:\"${complaintAttachmentName}\",complaintAttachmentFormat:\"${complaintAttachmentFormat}\",complaintAttachmentPath:\"${complaintAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
      }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}

updatePatientSurveyHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientComplaintFormData:  ", event.target.formGridComplaintTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let complaintTitle = event.target.formGridComplaintTitle.value;
  let complaintDate = event.target.formGridComplaintDate.value;
  let complaintDescription = event.target.formGridComplaintDescription.value;
  let complaintAttachmentName = event.target.formGridComplaintAttachmentName.value;
  let complaintAttachmentFormat = event.target.formGridComplaintAttachmentFormat.value;
  let complaintAttachmentPath = event.target.formGridComplaintAttachmentPath.value;

  const patientComplaint = { complaintTitle, complaintDate, complaintDescription, complaintAttachmentName, complaintAttachmentFormat, complaintAttachmentPath };
  console.log(`
    adding patient complaint...
    userId: ${userId},
    patientId: ${selectedPatientId},
    complaintTitle: ${complaintTitle},
    complaintDate: ${complaintDate},
    complaintDescription: ${complaintDescription},
    complaintAttachmentName: ${complaintAttachmentName},
    complaintAttachmentFormat: ${complaintAttachmentFormat},
    complaintAttachmentPath: ${complaintAttachmentPath},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientComplaint(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{complaintDate:\"${complaintDate}\",complaintTitle:\"${complaintTitle}\",complaintDescription:\"${complaintDescription}\",complaintAttachmentName:\"${complaintAttachmentName}\",complaintAttachmentFormat:\"${complaintAttachmentFormat}\",complaintAttachmentPath:\"${complaintAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
      }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}

updatePatientVitalsHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientComplaintFormData:  ", event.target.formGridComplaintTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let complaintTitle = event.target.formGridComplaintTitle.value;
  let complaintDate = event.target.formGridComplaintDate.value;
  let complaintDescription = event.target.formGridComplaintDescription.value;
  let complaintAttachmentName = event.target.formGridComplaintAttachmentName.value;
  let complaintAttachmentFormat = event.target.formGridComplaintAttachmentFormat.value;
  let complaintAttachmentPath = event.target.formGridComplaintAttachmentPath.value;

  const patientComplaint = { complaintTitle, complaintDate, complaintDescription, complaintAttachmentName, complaintAttachmentFormat, complaintAttachmentPath };
  console.log(`
    adding patient complaint...
    userId: ${userId},
    patientId: ${selectedPatientId},
    complaintTitle: ${complaintTitle},
    complaintDate: ${complaintDate},
    complaintDescription: ${complaintDescription},
    complaintAttachmentName: ${complaintAttachmentName},
    complaintAttachmentFormat: ${complaintAttachmentFormat},
    complaintAttachmentPath: ${complaintAttachmentPath},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientComplaint(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{complaintDate:\"${complaintDate}\",complaintTitle:\"${complaintTitle}\",complaintDescription:\"${complaintDescription}\",complaintAttachmentName:\"${complaintAttachmentName}\",complaintAttachmentFormat:\"${complaintAttachmentFormat}\",complaintAttachmentPath:\"${complaintAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
      }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}


updatePatientExaminationHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientExaminationFormData:  ", event.target.formGridExaminationArea.value);

  this.setState({ updating: false , patientUpdateField: null });

  let examinationDate = event.target.formGridExaminationDate.value;
  let examinationArea = event.target.formGridExaminationArea.value;
  let examinationType = event.target.formGridExaminationType.value;
  let examinationMeasure = event.target.formGridExaminationMeasure.value;
  let examinationValue = event.target.formGridExaminationValue.value;
  let examinationDescription = event.target.formGridExaminationDescription.value;
  let examinationAttachmentName = event.target.formGridExaminationAttachmentName.value;
  let examinationAttachmentFormat = event.target.formGridExaminationAttachmentFormat.value;
  let examinationAttachmentPath = event.target.formGridExaminationAttachmentPath.value;

  const patientExamination = { examinationArea, examinationType, examinationMeasure, examinationValue, examinationAttachmentName, examinationAttachmentFormat, examinationAttachmentPath };

  console.log(`
    adding patient examination...
    userId: ${userId},
    patientId: ${selectedPatientId},
    examinationDate: ${examinationDate},
    examinationArea: ${examinationArea},
    examinationType: ${examinationType},
    examinationMeasure: ${examinationMeasure},
    examinationValue: ${examinationValue},
    examinationDescription: ${examinationDescription},
    examinationAttachmentName: ${examinationAttachmentName},
    examinationAttachmentFormat: ${examinationAttachmentFormat},
    examinationAttachmentPath: ${examinationAttachmentPath},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientExamination(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{examinationDate:\"${examinationDate}\",examinationArea:\"${examinationArea}\",examinationType:\"${examinationType}\",examinationMeasure:\"${examinationMeasure}\",examinationValue:\"${examinationValue}\",examinationDescription:\"${examinationDescription}\",examinationAttachmentName:\"${examinationAttachmentName}\",examinationAttachmentFormat:\"${examinationAttachmentFormat}\",examinationAttachmentPath:\"${examinationAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
      }
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
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}


updatePatientHistoryHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

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

    const requestBody = {
      query:`
        mutation {updatePatientHistory(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{historyTitle:\"${historyTitle}\",historyType:\"${historyType}\",historyDate:\"${historyDate}\",historyDescription:\"${historyDescription}\",historyAttachmentName:\"${historyAttachmentName}\",historyAttachmentFormat:\"${historyAttachmentFormat}\",historyAttachmentPath:\"${historyAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}


updatePatientAllergiesHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientAllergiesFormData:  ", event.target.formGridAllergiesTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let allergiesTitle = event.target.formGridAllergiesTitle.value;
  let allergiesDescription = event.target.formGridAllergiesDescription.value;
  let allergiesAttachmentName = event.target.formGridAllergiesAttachmentName.value;
  let allergiesAttachmentFormat = event.target.formGridAllergiesAttachmentFormat.value;
  let allergiesAttachmentPath = event.target.formGridAllergiesAttachmentPath.value;

  const patientAllergies = { allergiesTitle, allergiesDescription, allergiesAttachmentName, allergiesAttachmentFormat, allergiesAttachmentPath };

  console.log(`
    adding patient allergies...
    userId: ${userId},
    patientId: ${selectedPatientId},
    allergiesTitle: ${allergiesTitle},
    allergiesDescription: ${allergiesDescription},
    allergiesAttachmentName: ${allergiesAttachmentName},
    allergiesAttachmentFormat: ${allergiesAttachmentFormat},
    allergiesAttachmentPath: ${allergiesAttachmentPath},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientAllergies(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{allergiesTitle:\"${allergiesTitle}\", allergiesDescription:\"${allergiesDescription}\",allergiesAttachmentName:\"${allergiesAttachmentName}\",allergiesAttachmentFormat:\"${allergiesAttachmentFormat}\",allergiesAttachmentPath:\"${allergiesAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
      }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });


}


updatePatientMedicationHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientMedicationFormData:  ", event.target.formGridMedicationTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let medicationTitle = event.target.formGridMedicationTitle.value;
  let medicationDescription = event.target.formGridMedicationDescription.value;
  let medicationAttachmentName = event.target.formGridMedicationAttachmentName.value;
  let medicationAttachmentFormat = event.target.formGridMedicationAttachmentFormat.value;
  let medicationAttachmentPath = event.target.formGridMedicationAttachmentPath.value;

  const patientMedication = { medicationTitle, medicationDescription, medicationAttachmentName, medicationAttachmentFormat, medicationAttachmentPath };

  console.log(`
    adding patient medication...
    userId: ${userId},
    patientId: ${selectedPatientId},
    medicationTitle: ${medicationTitle},
    medicationDescription: ${medicationDescription},
    medicationAttachmentName: ${medicationAttachmentName},
    medicationAttachmentFormat: ${medicationAttachmentFormat},
    medicationAttachmentPath: ${medicationAttachmentPath},
    `);

    const requestBody = {
      query:`
      mutation {updatePatientMedication(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{medicationTitle:\"${medicationTitle}\", medicationDescription:\"${medicationDescription}\",medicationAttachmentName:\"${medicationAttachmentName}\",medicationAttachmentFormat:\"${medicationAttachmentFormat}\",medicationAttachmentPath:\"${medicationAttachmentPath}\"})
      {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}


updatePatientInvestigationHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientInvestigationFormData:  ", event.target.formGridInvestigationTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let investigationDate = event.target.formGridInvestigationDate.value;
  let investigationTitle = event.target.formGridInvestigationTitle.value;
  let investigationDescription = event.target.formGridInvestigationDescription.value;
  let investigationAttachmentName = event.target.formGridInvestigationAttachmentName.value;
  let investigationAttachmentFormat = event.target.formGridInvestigationAttachmentFormat.value;
  let investigationAttachmentPath = event.target.formGridInvestigationAttachmentPath.value;

  const patientInvestigation = { investigationDate, investigationTitle, investigationDescription, investigationAttachmentName, investigationAttachmentFormat, investigationAttachmentPath };

  console.log(`
    adding patient investigation...
    userId: ${userId},
    patientId: ${selectedPatientId},
    investigationDate: ${investigationDate},
    investigationTitle: ${investigationTitle},
    investigationDescription: ${investigationDescription},
    investigationAttachmentName: ${investigationAttachmentName},
    investigationAttachmentFormat: ${investigationAttachmentFormat},
    investigationAttachmentPath: ${investigationAttachmentPath},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientInvestigation(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{investigationDate:\"${investigationDate}\",investigationTitle:\"${investigationTitle}\",investigationDescription:\"${investigationDescription}\",investigationAttachmentName:\"${investigationAttachmentName}\",investigationAttachmentFormat:\"${investigationAttachmentFormat}\",investigationAttachmentPath:\"${investigationAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}


updatePatientDiagnosisHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientDiagnosisFormData:  ", event.target.formGridDiagnosisTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let diagnosisDate = event.target.formGridDiagnosisDate.value;
  let diagnosisTitle = event.target.formGridDiagnosisTitle.value;
  let diagnosisDescription = event.target.formGridDiagnosisDescription.value;
  let diagnosisAttachmentName = event.target.formGridDiagnosisAttachmentName.value;
  let diagnosisAttachmentFormat = event.target.formGridDiagnosisAttachmentFormat.value;
  let diagnosisAttachmentPath = event.target.formGridDiagnosisAttachmentPath.value;

  const patientDiagnosis = { diagnosisDate, diagnosisTitle, diagnosisDescription, diagnosisAttachmentName, diagnosisAttachmentFormat, diagnosisAttachmentPath };

  console.log(`
    adding patient diagnosis...
    userId: ${userId},
    patientId: ${selectedPatientId},
    diagnosisDate: ${diagnosisDate},
    diagnosisTitle: ${diagnosisTitle},
    diagnosisDescription: ${diagnosisDescription},
    diagnosisAttachmentName: ${diagnosisAttachmentName},
    diagnosisAttachmentFormat: ${diagnosisAttachmentFormat},
    diagnosisAttachmentPath: ${diagnosisAttachmentPath},
    `);

    const requestBody = {
      query:`
        mutation {updatePatientDiagnosis(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{diagnosisDate:\"${diagnosisDate}\",diagnosisTitle:\"${diagnosisTitle}\",diagnosisDescription:\"${diagnosisDescription}\",diagnosisAttachmentName:\"${diagnosisAttachmentName}\",diagnosisAttachmentFormat:\"${diagnosisAttachmentFormat}\",diagnosisAttachmentPath:\"${diagnosisAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}


updatePatientTreatmentHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

  console.log("UpdatePatientTreatmentFormData:  ", event.target.formGridTreatmentTitle.value);

  this.setState({ updating: false , patientUpdateField: null });

  let treatmentDate = event.target.formGridTreatmentDate.value;
  let treatmentTitle = event.target.formGridTreatmentTitle.value;
  let treatmentDescription = event.target.formGridTreatmentDescription.value;
  let treatmentDose = event.target.formGridTreatmentDose.value;
  let treatmentFrequency = event.target.formGridTreatmentFrequency.value;
  let treatmentType = event.target.formGridTreatmentType.value;
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

    const requestBody = {
      query:`
        mutation {updatePatientTreatment(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{treatmentDate:\"${treatmentDate}\",treatmentTitle:\"${treatmentTitle}\",treatmentType:\"${treatmentType}\",treatmentDescription:\"${treatmentDescription}\",treatmentDose:\"${treatmentDose}\",treatmentFrequency:\"${treatmentFrequency}\",treatmentAttachmentName:\"${treatmentAttachmentName}\",treatmentAttachmentFormat:\"${treatmentAttachmentFormat}\",treatmentAttachmentPath:\"${treatmentAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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

        const updatedPatientId = resData.data.updatePatientTreatment._id;
        const updatedPatient = this.state.patients.find(e => e._id === updatedPatientId);
        const updatedPatientPos = this.state.patients.indexOf(updatedPatient);
        const slicedArray = this.state.patients.splice(updatedPatientPos, 1);
        console.log("updatedPatient:  ", JSON.stringify(updatedPatient),"  updatedPatientPos:  ", updatedPatientPos, "  slicedArray:  ", slicedArray);

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });

}



updatePatientBillingHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedPatientId = this.context.selectedPatient._id;
  if(
    this.context.user.role !== 'admin'
  ) {
    console.log("No edit permission!!");
    return;
  }

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
    adding patient treatment...
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

    const requestBody = {
      query:`
        mutation {updatePatientBilling(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{billingDate:\"${billingDate}\",billingTitle:\"${billingTitle}\",billingType:\"${billingType}\",billingDescription:\"${billingDescription}\",billingAmount:${billingAmount},billingPaid:${billingPaid},billingNotes:\"${billingNotes}\",billingAttachmentName:\"${billingAttachmentName}\",billingAttachmentFormat:\"${billingAttachmentFormat}\",billingAttachmentPath:\"${billingAttachmentPath}\"})
        {_id,name,address,dob,age,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},appointments{date,title,type},consultant{date,reference{name,role}},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},examination{date,area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}
        }
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

        this.state.patients.push(updatedPatient);
        this.context.patients = this.state.patients;
        this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });


}




modalConfirmSearchHandler = (event) => {
  console.log("SearchPatientForm:  ");


  let userId = this.context.userId;

    console.log("SearchPatientFormData:  ", event.target.formBasicField.value);
    this.setState({ searching: false });

    let field = event.target.formBasicField.value;
    let query = event.target.formBasicQuery.value;

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

    const requestBody = {
      query: `
        query {
          getPatientField(userId: "${userId}", field: "${field}", query: "${query}" )
          {_id,title,name,dob,age,gender,address{number,street,town,parish,postOffice},registrationDate,referralDate,expirationDate,attendingPhysician{name,email,phone},referringDoctor{name,email,phone},contact{phone,email},occupation{role,employer,contact{phone,email}},appointments{_id,title,time,location,date},consultant{date,reference{_id,name,role}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{phone,email}},complaints{date,title,description,anamnesis,attachment{name,format,path}},surveys{date,title,description,attachment{name,format,path}},vitals{date,pr,bp1,bp2,rr,temp,ps02,height,weight,bmi,urine{type,value}},examination{date,general,area,type,measure,value,description,followUp,attachment{name,format,path}},history{type,date,title,description,attachment{name,format,path}},allergies{type,title,description,attachment{name,format,path}},medication{title,type,description,attachment{name,format,path}},investigation{date,type,title,description,attachment{name,format,path}},diagnosis{date,type,title,description,attachment{name,format,path}},treatment{date,type,title,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,attachment{name,format,path},notes},attachments{name,format,path},notes,tags}
      }
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

        const searchPatients = resData.data.getPatientField;

        this.setState({ searchPatients: searchPatients})
        console.log("state.searchPatients:  ", this.state.searchPatients);
        // this.fetchPatients();
      })
      .catch(err => {
        console.log(err);
      });
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

        this.context.patients = this.state.patients;
        if (this.isActive) {
          this.setState({ patients: patients, isLoading: false });
        }

      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
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
        if (this.isActive) {
          this.setState({ deleting: false });
        }
      });
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
      <SidebarPage/>
    </Col>

    <Col md={6} className="MasterCol2">
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
        patient={this.state.selectedPatient}
        onEdit={this.startUpdatePatientHandler}
        onDelete={this.modalDeleteHandler}
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
        <p>Update Patient Field</p>
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
    </Tabs>
    </Container>
    <Container className="containerUserMasterList">
    <Row className="searchListRow">
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

    </Col>

    <Col md={3} className="MasterCol3">

    <Container className="containerSearchUserInput">
    <Row className="searchUserRowAdd">
      {this.context.token && (
      <Accordion.Toggle as={Button} variant="primary" eventKey="10" onClick={this.startSearchPatientHandler}>
      Search
      </Accordion.Toggle>)}
    </Row>

    <Accordion.Collapse eventKey="10">
    <Row className="searchUserRowForm">
    <Col md={10} className="searchUserColForm">
    <Tabs defaultActiveKey="userPatient" id="uncontrolled-tab-example">
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
      />)}
    </Tab>
    <Tab eventKey="Id" title="Id:">
      Search by ID
    </Tab>
    <Tab eventKey="Visit" title="Visit:">
      Search by Visit
    </Tab>
    <Tab eventKey="Name RegEx" title="Name RegEx:">
      Search by Name RegEx
    </Tab>
    </Tabs>
    </Col>
    </Row>
    </Accordion.Collapse>
    </Container>

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

    </Col>
    </Row>

</Accordion>

      </React.Fragment>
    );
  }
}

export default PatientsPage;
