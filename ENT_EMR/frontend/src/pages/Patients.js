import React, { Component } from 'react';
// import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import PatientList from '../components/Patients/PatientList/PatientList';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import SearchPatientList from '../components/Patients/PatientList/SearchPatientList';
import SearchPatientForm from '../components/Forms/SearchPatientForm';

import CreatePatientForm from '../components/Forms/CreatePatientForm';
import UpdatePatientForm from '../components/Forms/UpdatePatientForm';
import UpdatePatientInsuranceForm from '../components/Forms/UpdatePatientInsuranceForm';
import UpdatePatientNextOfKinForm from '../components/Forms/UpdatePatientNextOfKinForm';
import UpdatePatientComplaintForm from '../components/Forms/UpdatePatientComplaintForm';
import UpdatePatientExaminationForm from '../components/Forms/UpdatePatientExaminationForm';
import UpdatePatientHistoryForm from '../components/Forms/UpdatePatientHistoryForm';
import UpdatePatientAllergiesForm from '../components/Forms/UpdatePatientAllergiesForm';
import UpdatePatientMedicationForm from '../components/Forms/UpdatePatientMedicationForm';
import UpdatePatientInvestigationForm from '../components/Forms/UpdatePatientInvestigationForm';
import UpdatePatientDiagnosisForm from '../components/Forms/UpdatePatientDiagnosisForm';
import UpdatePatientTreatmentForm from '../components/Forms/UpdatePatientTreatmentForm';
import UpdatePatientBillingForm from '../components/Forms/UpdatePatientBillingForm';
// import UpdatePatientArrayForm from '../components/Forms/UpdatePatientArrayForm';
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
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
    this.dobElRef = React.createRef();
    this.addressElRef = React.createRef();
    this.contactPhoneElRef = React.createRef();
    this.contactEmailElRef = React.createRef();
    this.registrationDateElRef = React.createRef();
    this.referringDoctorNameElRef = React.createRef();
    this.referringDoctorEmailElRef = React.createRef();
    this.referringDoctorPhoneElRef = React.createRef();
    this.occupationRoleElRef = React.createRef();
    this.occupationEmployerElRef = React.createRef();
    this.occupationEmployerContactPhoneElRef = React.createRef();
    this.occupationEmployerContactEmailElRef = React.createRef();
    this.nextOfKinNameELRef = React.createRef();
    this.nextOfKinPhoneELRef = React.createRef();
    this.nextOfKinEmailELRef = React.createRef();
    this.insuranceCompanyELRef = React.createRef();
    this.insuranceNumberELRef = React.createRef();
    this.insuranceDescriptionELRef = React.createRef();
    this.insuranceExpiryELRef = React.createRef();
    this.insuranceSubscriberCompanyELRef = React.createRef();
    this.insuranceSubscriberDescriptionELRef = React.createRef();
    this.complaintDateELRef = React.createRef();
    this.complaintTitleELRef = React.createRef();
    this.complaintDescriptionELRef = React.createRef();
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

    let name = event.target.formGridName.value;
    let dob = event.target.formGridDob.value;
    let address = event.target.formGridAddress.value;
    let contactPhone = event.target.formGridContactPhone.value;
    let contactEmail = event.target.formGridContactEmail.value;
    let registrationDate = event.target.formGridRegistrationDate.value;
    let referringDoctorName = event.target.formGridReferringDoctorName.value;
    let referringDoctorEmail = event.target.formGridReferringDoctorEmail.value;
    let referringDoctorPhone = event.target.formGridReferringDoctorPhone.value;
    let occupationRole = event.target.formGridOccupationRole.value;
    let occupationEmployer = event.target.formGridOccupationEmployer.value;
    let occupationEmployerContactPhone = event.target.formGridOccupationEmployerContactPhone.value;
    let occupationEmployerContactEmail = event.target.formGridOccupationEmployerContactEmail.value;

    if (
      name.trim().length === 0 ||
      dob.trim().length === 0 ||
      address.trim().length === 0 ||
      contactPhone.trim().length === 0 ||
      contactEmail.trim().length === 0 ||
      registrationDate.trim().length === 0 ||
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

    const patient = { name, dob, address, contactPhone, contactEmail, registrationDate, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail };
    console.log("creating patient.. " + JSON.stringify(patient));

    const requestBody = {
      query: `
          mutation CreatePatient($userId: ID!, $name: String!, $dob: String!, $address: String!, $contactPhone: String!, $contactEmail: String!, $registrationDate: String!, $referringDoctorName: String!, $referringDoctorEmail: String!, $referringDoctorPhone: String!, $occupationRole: String!, $occupationEmployer: String!, $occupationEmployerContactPhone: String!, $occupationEmployerContactEmail: String!) {
            createPatient(userId: $userId, patientInput: { name: $name, dob: $dob, address: $address, contactPhone: $contactPhone, contactEmail: $contactEmail, registrationDate: $registrationDate, referringDoctorName: $referringDoctorName, referringDoctorEmail: $referringDoctorEmail, referringDoctorPhone: $referringDoctorPhone, occupationRole: $occupationRole, occupationEmployer: $occupationEmployer, occupationEmployerContactPhone: $occupationEmployerContactPhone, occupationEmployerContactEmail: $occupationEmployerContactEmail }) {
              _id
              name
              address
              contact{
                email
                phone
              }
              registrationDate
              referringDoctor
              {
                name
                email
                phone
              }
              occupation
              {
                role
                employer
                contact
                {
                  email
                  phone
                }
              }
            }
          }
        `,
        variables: {
          userId: userId,
          name: name,
          dob: dob,
          address: address,
          contactPhone: contactPhone,
          contactEmail: contactEmail,
          registrationDate: registrationDate,
          referringDoctorName: referringDoctorName,
          referringDoctorEmail: referringDoctorEmail,
          referringDoctorPhone: referringDoctorPhone,
          occupationRole: occupationRole,
          occupationEmployer: occupationEmployer,
          occupationEmployerContactPhone: occupationEmployerContactPhone,
          occupationEmployerContactEmail: occupationEmployerContactEmail
        }
    };

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

        this.setState(prevState => {
          const updatedPatients = [...prevState.patients];
          updatedPatients.push(
            {
            _id: resData.data.createPatient._id,
            name: resData.data.createPatient.name,
            dob: resData.data.createPatient.dob,
            address: resData.data.createPatient.address,
            contact:{
              phone: resData.data.createPatient.contactPhone,
              email: resData.data.createPatient.contactEmail
            },
            registrationDate: resData.data.createPatient.registrationDate,
            referringDoctor: {
              name: resData.data.createPatient.referringDoctorName,
              email: resData.data.createPatient.referringDoctorEmail,
              phone: resData.data.createPatient.referringDoctorPhone,
            },
            occupation: {
              role: resData.data.createPatient.occupationRole,
              employer: resData.data.createPatient.occupationEmployer,
              contact: {
                phone: resData.data.createPatient.occupationEmployerContactPhone,
                email: resData.data.createPatient.occupationEmployerContactEmail
              }
            }
          }
        );

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
    const patientId = this.context.selectedPatient._id;

    // console.log("UpdateUserFormData:  ", event);
    console.log("UpdatePatientFormData:  ", event.target.formGridName.value);


    this.setState({ updating: false });
    let name = event.target.formGridName.value;
    let dob = event.target.formGridDob.value;
    let address = event.target.formGridAddress.value;
    let contactPhone = event.target.formGridContactPhone.value;
    let contactEmail = event.target.formGridContactEmail.value;
    let registrationDate = event.target.formGridRegistrationDate.value;
    let referringDoctorName = event.target.formGridReferringDoctorName.value;
    let referringDoctorEmail = event.target.formGridReferringDoctorEmail.value;
    let referringDoctorPhone = event.target.formGridReferringDoctorPhone.value;
    let occupationRole = event.target.formGridOccupationRole.value;
    let occupationEmployer = event.target.formGridOccupationEmployer.value;
    let occupationEmployerContactPhone = event.target.formGridOccupationEmployerContactPhone.value;
    let occupationEmployerContactEmail = event.target.formGridOccupationEmployerContactEmail.value;


    if (name.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      name  = this.context.selectedUser.name;
      // return;
    }
    if (dob.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      dob  = this.context.selectedUser.dob;
    }
    if (address.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      address  = this.context.selectedUser.address;
    }
    if (contactPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      contactPhone  = this.context.selectedUser.contactPhone;
    }
    if (contactEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      contactEmail  = this.context.selectedUser.contactEmail;
    }
    if (registrationDate.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      registrationDate  = this.context.selectedUser.registrationDate;
    }
    if (referringDoctorName.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorName  = this.context.selectedUser.referringDoctorName;
    }
    if (referringDoctorEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorEmail  = this.context.selectedUser.referringDoctorEmail;
    }
    if (referringDoctorPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      referringDoctorPhone  = this.context.selectedUser.referringDoctorPhone;
    }
    if (occupationRole.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationRole  = this.context.selectedUser.occupationRole;
    }
    if (occupationEmployer.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployer  = this.context.selectedUser.occupationEmployer;
    }
    if (occupationEmployerContactEmail.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployerContactEmail  = this.context.selectedUser.occupationEmployerContactEmail;
    }
    if (occupationEmployerContactPhone.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      occupationEmployerContactPhone  = this.context.selectedUser.occupationEmployerContactPhone;
    }


    const patient = { name, dob, address, contactPhone, contactEmail, registrationDate, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail};
    console.log(`
      updating patient...
      userId: ${userId},
      patientId: ${patientId},
      name: ${name},
      dob: ${dob},
      address: ${address},
      contactPhone: ${contactPhone},
      contactEmail: ${contactEmail},
      registrationDate: ${registrationDate},
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
          mutation {
            updatePatient(userId:\"${userId}\", patientId: "${patientId}", patientInput: { name: "${name}", dob: "${dob}", address: "${address}", contactPhone: "${contactPhone}", contactEmail: "${contactEmail}", registrationDate: "${registrationDate}", referringDoctorName: "${referringDoctorName}", referringDoctorEmail: "${referringDoctorEmail}", referringDoctorPhone: "${referringDoctorPhone}", occupationRole: "${occupationRole}", occupationEmployer: "${occupationEmployer}", occupationEmployerContactPhone: "${occupationEmployerContactPhone}", occupationEmployerContactEmail: "${occupationEmployerContactEmail}" }){
              _id
              name
              address
              contact{
                email
                phone
              }
              registrationDate
              referralDate
              expirationDate
              referringDoctor{
                name
                email
                phone
              }
                occupation{
                  role
                  employer
                  contact{
                    email
                    phone
                  }
                }
                insurance
                {
                  company
                  number
                  description
                  expiry
                  subscriber{
                    company
                    description
                  }
                }
                nextOfKin{
                  name
                  contact{
                    email
                    phone
                  }
                }
                complaints{
                  date
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                examination{
                  area
                  type
                  measure
                  value
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                history{
                  title
                  type
                  date
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                allergies{
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                medication{
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                investigation{
                  date
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                  diagnosis{
                    date
                    title
                    description
                    attachment{
                      name
                      format
                      path
                    }
                  }
                  treatment{
                    date
                    title
                    type
                    description
                    dose
                    frequency
                    attachment{
                      name
                      format
                      path
                    }
                  }
                  billing{
                    date
                    title
                    type
                    description
                    amount
                    paid
                    notes
                    attachment
                    {
                      name
                      format
                      path
                    }
                  }
            }
          }
        `
    };

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

        this.state.patients.push(
          {
          _id: resData.data.updatePatient._id,
          name: resData.data.updatePatient.name,
          dob: resData.data.updatePatient.dob,
          address: resData.data.updatePatient.address,
          contact:{
            phone: resData.data.updatePatient.contactPhone,
            email: resData.data.updatePatient.contactEmail
          },
          registrationDate: resData.data.updatePatient.registrationDate,
          referringDoctor: {
            name: resData.data.updatePatient.referringDoctorName,
            email: resData.data.updatePatient.referringDoctorEmail,
            phone: resData.data.updatePatient.referringDoctorPhone,
          },
          occupation: {
            role: resData.data.updatePatient.occupationRole,
            employer: resData.data.updatePatient.occupationEmployer,
            contact: {
              phone: resData.data.updatePatient.occupationEmployerContactPhone,
              email: resData.data.updatePatient.occupationEmployerContactEmail
            }
          }
        }
        );

        // if (this.state.updatingArray === false && this.state.updating === false) {
        //   console.log("update and updateArray complete...now fetching users");
        //
        // }
        this.fetchPatients();

      })
      .catch(err => {
        console.log(err);
      });
  };

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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        mutation {updatePatientExamination(userId:\"${userId}\", patientId:\"${selectedPatientId}\",patientInput:{examinationArea:\"${examinationArea}\",examinationType:\"${examinationType}\",examinationMeasure:\"${examinationMeasure}\",examinationValue:\"${examinationValue}\",examinationDescription:\"${examinationDescription}\",examinationAttachmentName:\"${examinationAttachmentName}\",examinationAttachmentFormat:\"${examinationAttachmentFormat}\",examinationAttachmentPath:\"${examinationAttachmentPath}\"})
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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

        this.state.patients.push(updatedPatient);
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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

        this.state.patients.push(updatedPatient);
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        {_id,name,address,contact{email,phone},registrationDate,referralDate,expirationDate,referringDoctor{name,email,phone},occupation{role,employer,contact{email,phone}},insurance{company,number,description,expiry,subscriber{company,description}},nextOfKin{name,contact{email,phone}},complaints{date,title,description,attachment{name,format,path}},examination{area,type,measure,value,description,attachment{name,format,path}},history{title,type,date,description,attachment{name,format,path}},allergies{title,description,attachment{name,format,path}},medication{title,description,attachment{name,format,path}},investigation{date,title,description,attachment{name,format,path}},diagnosis{date,title,description,attachment{name,format,path}},treatment{date,title,type,description,dose,frequency,attachment{name,format,path}},billing{date,title,type,description,amount,paid,notes,attachment{name,format,path}}}}
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
        query GetPatientField($userId: ID!, $field: String!, $query: String!)
        {getPatientField(userId: $userId, field: $field, query: $query ){
          _id
          name
          address
          contact{
            email
            phone
          }
          registrationDate
          referralDate
          expirationDate
          referringDoctor{
            name
            email
            phone
          }
            occupation{
              role
              employer
              contact{
                email
                phone
              }
            }
            insurance
            {
              company
              number
              description
              expiry
              subscriber{
                company
                description
              }
            }
            nextOfKin{
              name
              contact{
                email
                phone
              }
            }
            complaints{
              date
              title
              description
              attachment{
                name
                format
                path
              }
            }
            examination{
              area
              type
              measure
              value
              description
              attachment{
                name
                format
                path
              }
            }
            history{
              title
              type
              date
              description
              attachment{
                name
                format
                path
              }
            }
            allergies{
              title
              description
              attachment{
                name
                format
                path
              }
            }
            medication{
              title
              description
              attachment{
                name
                format
                path
              }
            }
            investigation{
              date
              title
              description
              attachment{
                name
                format
                path
              }
            }
              diagnosis{
                date
                title
                description
                attachment{
                  name
                  format
                  path
                }
              }
              treatment{
                date
                title
                type
                description
                dose
                frequency
                attachment{
                  name
                  format
                  path
                }
              }
              billing{
                date
                title
                type
                description
                amount
                paid
                notes
                attachment
                {
                  name
                  format
                  path
                }
              }
        }
      }
      `,
      variables: {
        userId: userId,
        field: field,
        query: query
      }
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
    console.log("'fetch patients function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query patients($userId: ID!) {
            patients(userId: $userId) {
              _id
              name
              address
              contact{
                email
                phone
              }
              registrationDate
              referralDate
              expirationDate
              referringDoctor{
                name
                email
                phone
              }
                occupation{
                  role
                  employer
                  contact{
                    email
                    phone
                  }
                }
                insurance
                {
                  company
                  number
                  description
                  expiry
                  subscriber{
                    company
                    description
                  }
                }
                nextOfKin{
                  name
                  contact{
                    email
                    phone
                  }
                }
                complaints{
                  date
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                examination{
                  area
                  type
                  measure
                  value
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                history{
                  title
                  type
                  date
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                allergies{
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                medication{
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                investigation{
                  date
                  title
                  description
                  attachment{
                    name
                    format
                    path
                  }
                }
                  diagnosis{
                    date
                    title
                    description
                    attachment{
                      name
                      format
                      path
                    }
                  }
                  treatment{
                    date
                    title
                    type
                    description
                    dose
                    frequency
                    attachment{
                      name
                      format
                      path
                    }
                  }
                  billing{
                    date
                    title
                    type
                    description
                    amount
                    paid
                    notes
                    attachment
                    {
                      name
                      format
                      path
                    }
                  }
            }
          }
        `,
        variables: {
          userId: userId
        }
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

    if(this.context.user.role !== 'admin') {
      console.log("Not the Admin! No edit permission!!");
    }

    this.setState({deleting: true});


    const requestBody = {
      query: `
          mutation DeletePatient($userId: ID!, $patientId: ID!) {
            deletePatient(userId: $userId, patientId: $patientId) {
              _id
              name
              address
              contact{
                email
                phone
              }
              registrationDate
              referringDoctor
              {
                name
                email
                phone
              }
              occupation
              {
                role
                employer
                contact
                {
                  email
                  phone
                }
              }
            }
          }
        `,
        variables: {
          userId: this.context.userId,
          patientId: selectedPatientId
        }
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

    <Container className="containerUserDetail">

    <Row className="createUserRowAdd">
    <Col md={4} className="createUserColAdd">
    <p>Patient Detail</p>
    </Col>
    <Col md={6} className="createUserColAdd">
    <Accordion.Toggle as={Button} variant="link" eventKey="6" className="btn">
    Details
    </Accordion.Toggle>
    </Col>
    </Row>

    <Accordion.Collapse eventKey="6">
    <Row className="createUserRowForm">
    <Col md={11} className="createUserColForm">
    {this.state.isLoading === false &&
      this.state.selectedPatient !== null
      &&
      (<PatientDetail
        authUserId={this.context.userId}
        patient={this.state.selectedPatient}
        onEdit={this.startUpdatePatientHandler}
        onDelete={this.modalDeleteHandler}
    />)
  }
    </Col>
    </Row>
    </Accordion.Collapse>

    </Container>

    <Container className="containerCreateuser">
    <Row className="createUserRowAdd">
    <Col md={4} className="createUserColAdd">
      <p>Add Patient</p>
    </Col>
    <Col md={4}>
      {this.context.token && (
        <Accordion.Toggle as={Button} variant="link" eventKey="7" className="btn" onClick={this.startCreatePatientHandler}>
        Add
        </Accordion.Toggle>
      )}
    </Col>
    </Row>

    <Accordion.Collapse eventKey="7">
    <Row className="createUserRowForm">
    <Col md={12} className="createUserColForm">
    {
      this.state.creating && (
        <CreatePatientForm
        canCancel
          canConfirm
          onCancel={this.modalCancelHandler}
          onConfirm={this.modalConfirmHandler}
          onSubmit={this.modalConfirmHandler}
          confirmText="Confirm"
        />
    )}
    </Col>
    </Row>
    </Accordion.Collapse>


    <Row className="updateUserRowAdd">
    <Col md={2} className="updateUserCol">
    <p>Edit Patient</p>
    </Col>
    <Col md={4} className="updateUserCol">
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="8" className="btn" onClick={this.startUpdatePatientHandler}>
      Basic Info & Demographics
      </Accordion.Toggle>
    )}
    </Col>
    <Col md={2}>
      <p>Patient</p>
    </Col>
    <Col md={4}>
      {this.context.selectedPatient && (
        <p>{this.context.selectedPatient.name}</p>
      )}
    </Col>
    </Row>

    <Row className="createUserRowAdd">
    <Col md={1} className="updateUserCol2">
    <p>Edit Patient</p>
    </Col>
    <Col md={11} className="updateUserCol2">
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='insurance' onClick={this.updatePatientSpecial.bind(this)}>
      Insurance
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='nextOfKin' onClick={this.updatePatientSpecial.bind(this)}>
      Next Of Kin
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='complaint' onClick={this.updatePatientSpecial.bind(this)}>
      Complaint
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='examination' onClick={this.updatePatientSpecial.bind(this)}>
      Examination
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='history' onClick={this.updatePatientSpecial.bind(this)}>
      History
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='allergies' onClick={this.updatePatientSpecial.bind(this)}>
      Allergies
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='medication' onClick={this.updatePatientSpecial.bind(this)}>
      Medication
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='investigation' onClick={this.updatePatientSpecial.bind(this)}>
      Investigation
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='diagnosis' onClick={this.updatePatientSpecial.bind(this)}>
      Diagnosis
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='treatment' onClick={this.updatePatientSpecial.bind(this)}>
      Treatment
      </Accordion.Toggle>
    )}
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="9" className="btn" value='billing' onClick={this.updatePatientSpecial.bind(this)}>
      Billing
      </Accordion.Toggle>
    )}
    </Col>
    </Row>

    <Accordion.Collapse eventKey="8">
    <Row className="updateUserRowForm">
    <Col md={10} className="updateUserColForm">
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
    </Col>
    </Row>
    </Accordion.Collapse>

    <Accordion.Collapse eventKey="9">
    <Row className="updateUserRowForm">
    <Col md={10} className="updateUserColForm">
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
    {this.state.patientUpdateField === 'examination' &&
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
    </Col>
    </Row>
    </Accordion.Collapse>

    </Container>



    <Container className="containerSearchuser">
  <Row className="createUserRowAdd">
  <Col md={4} className="createUserColAdd">
    <p>Search for a Patient</p>
  </Col>
  <Col md={8}>
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="10" className="btn" onClick={this.startSearchPatientHandler}>
      Search
      </Accordion.Toggle>
    )}

  </Col>
  </Row>

  <Accordion.Collapse eventKey="10">
  <Row className="createUserRowForm">
  <Col md={10} className="createUserColForm">
  {
    this.state.searching === true &&
    <SearchPatientForm
    authUserId={this.context.userId}
    canCancel
      canConfirm
      onCancel={this.modalCancelHandler}
      onConfirm={this.modalConfirmSearchHandler}
      confirmText="Search"
      patient={this.context.selectedPatient}
    />
  }
  </Col>
  <Col md={10}>

  </Col>
  </Row>
  </Accordion.Collapse>
  </Container>

<Accordion.Collapse eventKey="10">
  <Container className="containerSearchuser">
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
  </Accordion.Collapse>


  <Container className="containerSearchuser">
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
</Accordion>

      </React.Fragment>
    );
  }
}

export default PatientsPage;
