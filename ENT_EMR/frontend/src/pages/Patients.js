import React, { Component } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import PatientList from '../components/Patients/PatientList/PatientList';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

import CreatePatientForm from '../components/Forms/CreatePatientForm';
import UpdatePatientForm from '../components/Forms/UpdatePatientForm';
import UpdatePatientArrayForm from '../components/Forms/UpdatePatientArrayForm';
import './Users.css';

class PatientsPage extends Component {
  state = {
    creating: false,
    updating: false,
    updatingArray: false,
    deleting: false,
    patients: [],
    isLoading: false,
    selectedPatient: null
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
    let insuranceCompany = event.target.formGridInsuranceCompany.value;
    let insuranceNumber = event.target.formGridInsuranceNumber.value;
    let insuranceDescription = event.target.formGridInsuranceDescription.value;
    let insuranceExpiry = event.target.formGridInsuranceExpiry.value;
    let insuranceSubscriberCompany = event.target.formGridInsuranceSubscriberCompany.value;
    let insuranceSubscriberDescription = event.target.formGridInsuranceSubscriberDescription.value;

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
      occupationEmployerContactEmail.trim().length === 0 ||
      insuranceCompany.trim().length === 0 ||
      insuranceNumber.trim().length === 0 ||
      insuranceDescription.trim().length === 0 ||
      insuranceExpiry.trim().length === 0 ||
      insuranceSubscriberCompany.trim().length === 0 ||
      insuranceSubscriberDescription.trim().length === 0

    ) {
      console.log("blank fields detected!!!...Please try again...");
      return;
    }

    const patient = { name, dob, address, contactPhone, contactEmail, registrationDate, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail, insuranceCompany, insuranceNumber, insuranceDescription, insuranceExpiry, insuranceSubscriberCompany, insuranceSubscriberDescription };
    console.log("creating patient.. " + JSON.stringify(patient));

    const requestBody = {
      query: `
          mutation CreatePatient($userId: ID!, $name: String!, $dob: String!, $address: String!, $contactPhone: String!, $contactEmail: String!, $registrationDate: String!, $referringDoctorName: String!, $referringDoctorEmail: String!, $referringDoctorPhone: String!, $occupationRole: String!, $occupationEmployer: String!, $occupationEmployerContactPhone: String!, $occupationEmployerContactEmail: String!, $insuranceCompany: String!, $insuranceNumber: String!, $insuranceDescription: String!, $insuranceExpiry: String!, $insuranceSubscriberCompany: String!, $insuranceSubscriberDescription: String!) {
            createPatient(userId: $userId, patientInput: { name: $name, dob: $dob, address: $address, contactPhone: $contactPhone, contactEmail: $contactEmail, registrationDate: $registrationDate, referringDoctorName: $referringDoctorName, referringDoctorEmail: $referringDoctorEmail, referringDoctorPhone: $referringDoctorPhone, occupationRole: $occupationRole, occupationEmployer: $occupationEmployer, occupationEmployerContactPhone: $occupationEmployerContactPhone, occupationEmployerContactEmail: $occupationEmployerContactEmail, insuranceCompany: $insuranceCompany, insuranceNumber: $insuranceNumber, insuranceDescription: $insuranceDescription, insuranceExpiry: $insuranceExpiry, insuranceSubscriberCompany: $insuranceSubscriberCompany, insuranceSubscriberDescription: $insuranceSubscriberDescription, }) {
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
              nextOfKin
              {
                name
                phone
                email
              }
              insurance
              {
                company
                number
                description
                expiry
                subscriber
                {
                    company
                    description
                }
              }
              complaints
              {
                date
                title
                description
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
          occupationEmployerContactEmail: occupationEmployerContactEmail,
          insuranceCompany: insuranceCompany,
          insuranceNumber: insuranceNumber,
          insuranceDescription: insuranceDescription,
          insuranceExpiry: insuranceExpiry,
          insuranceSubscriberCompany: insuranceSubscriberCompany,
          insuranceSubscriberDescription: insuranceSubscriberDescription,
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
            },
            insurance: {
              company: resData.data.createPatient.insuranceCompany,
              number: resData.data.createPatient.insuranceNumber,
              description: resData.data.createPatient.insuranceDescription,
              expiry:  resData.data.createPatient.insuranceExpiry,
              subscriber: {
                company: resData.data.createPatient.insuranceSubscriberCompany,
                description: resData.data.createPatient.insuranceSubscriberDescription
              }
            },
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
    let insuranceCompany = event.target.formGridInsuranceCompany.value;
    let insuranceNumber = event.target.formGridInsuranceNumber.value;
    let insuranceDescription = event.target.formGridInsuranceDescription.value;
    let insuranceExpiry = event.target.formGridInsuranceExpiry.value;
    let insuranceSubscriberCompany = event.target.formGridInsuranceSubscriberCompany.value;
    let insuranceSubscriberDescription = event.target.formGridInsuranceSubscriberDescription.value;


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
    if (insuranceCompany.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      insuranceCompany  = this.context.selectedUser.insuranceCompany;
    }
    if (insuranceExpiry.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      insuranceExpiry  = this.context.selectedUser.insuranceExpiry;
    }
    if (insuranceNumber.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      insuranceNumber  = this.context.selectedUser.insuranceNumber;
    }
    if (insuranceSubscriberCompany.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      insuranceSubscriberCompany  = this.context.selectedUser.insuranceSubscriberCompany;
    }
    if (insuranceSubscriberDescription.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      insuranceSubscriberDescription  = this.context.selectedUser.insuranceSubscriberDescription;
    }



    const patient = { name, dob, address, contactPhone, contactEmail, registrationDate, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail, insuranceCompany, insuranceNumber, insuranceDescription, insuranceExpiry, insuranceSubscriberCompany, insuranceSubscriberDescription };
    console.log("updating patient.. " + JSON.stringify(patient));

    const requestBody = {
      query: `
          mutation UpdatePatient($userId: ID!, $patientId: ID!, $name: String!, $dob: String!, $address: String!, $contactPhone: String!, $contactEmail: String!, $registrationDate: String!, $referringDoctorName: String!, $referringDoctorEmail: String!, $referringDoctorPhone: String!, $occupationRole: String!, $occupationEmployer: String!, $occupationEmployerContactPhone: String!, $occupationEmployerContactEmail: String!, $insuranceCompany: String!, $insuranceNumber: String!, $insuranceDescription: String!, $insuranceExpiry: String!, $insuranceSubscriberCompany: String!, $insuranceSubscriberDescription: String!) {
            updatePatient(userId: $userId, patientId: $patientId, patientInput: { name: $name, dob: $dob, address: $address, contactPhone: $contactPhone, contactEmail: $contactEmail, registrationDate: $registrationDate, referringDoctorName: $referringDoctorName, referringDoctorEmail: $referringDoctorEmail, referringDoctorPhone: $referringDoctorPhone, occupationRole: $occupationRole, occupationEmployer: $occupationEmployer, occupationEmployerContactPhone: $occupationEmployerContactPhone, occupationEmployerContactEmail: $occupationEmployerContactEmail, insuranceCompany: $insuranceCompany, insuranceNumber: $insuranceNumber, insuranceDescription: $insuranceDescription, insuranceExpiry: $insuranceExpiry, insuranceSubscriberCompany: $insuranceSubscriberCompany, insuranceSubscriberDescription: $insuranceSubscriberDescription }){
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
              nextOfKin
              {
                name
                phone
                email
              }
              insurance
              {
                company
                number
                description
                expiry
                subscriber
                {
                    company
                    description
                }
              }
              complaints
              {
                date
                title
                description
              }
            }
          }
        `,
        variables: {
          userId: userId,
          patientId: patientId,
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
          occupationEmployerContactEmail: occupationEmployerContactEmail,
          insuranceCompany: insuranceCompany,
          insuranceNumber: insuranceNumber,
          insuranceDescription: insuranceDescription,
          insuranceExpiry: insuranceExpiry,
          insuranceSubscriberCompany: insuranceSubscriberCompany,
          insuranceSubscriberDescription: insuranceSubscriberDescription
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
          },
          insurance: {
            company: resData.data.updatePatient.insuranceCompany,
            number: resData.data.updatePatient.insuranceNumber,
            description: resData.data.updatePatient.insuranceDescription,
            expiry:  resData.data.updatePatient.insuranceExpiry,
            subscriber: {
              company: resData.data.updatePatient.insuranceSubscriberCompany,
              description: resData.data.updatePatient.insuranceSubscriberDescription
            }
          }
        }
        );

        if (this.state.updatingArray === false && this.state.updating === false) {
          console.log("update and updateArray complete...now fetching users");

        }
        // this.fetchPatients();

      })
      .catch(err => {
        console.log(err);
      });
  };


modalConfirmUpdateArrayHandler = (event) => {

  if(this.context.user.role !== 'admin') {
    console.log("Not the Admin! No edit permission!!");

  }

  const userId = this.context.userId;
  const patientId = this.context.selectedPatient._id;

  console.log("UpdatePatientArrayFormData:  ", event.target);

  this.setState({ updatingArray: false });


  let nextOfKinName = event.target.formGridNextOfKinName.value
  let nextOfKinPhone = event.target.formGridNextOfKinPhone.value
  let nextOfKinEmail = event.target.formGridNextOfKinEmail.value
  let complaintDate = event.target.formGridComplaintDate.value
  let complaintTitle = event.target.formGridComplaintTitle.value
  let complaintDescription = event.target.formGridComplaintDescription.value
  let historyTitle = event.target.formGridHistoryTitle.value
  let historyType = event.target.formGridHistoryType.value
  let historyDate = event.target.formGridHistoryDate.value
  let historyDescription = event.target.formGridHistoryDescription.value
  let allergiesTitle = event.target.formGridAllergiesTitle.value
  let allergiesDescription = event.target.formGridAllergiesDescription.value
  let medicationTitle  = event.target.formGridMedicationTitle .value
  let medicationDescription  = event.target.formGridMedicationDescription .value
  let investigationDate  = event.target.formGridInvestigationDate .value
  let investigationTitle  = event.target.formGridInvestigationTitle .value
  let investigationDescription  = event.target.formGridInvestigationDescription .value
  let diagnosisDate  = event.target.formGridDiagnosisDate.value
  let diagnosisTitle  = event.target.formGridDiagnosisTitle.value
  let diagnosisDescription  = event.target.formGridDiagnosisDescription.value
  let treatmentDate  = event.target.formGridTreatmentDate.value
  let treatmentTitle  = event.target.formGridTreatmentTitle.value
  let treatmentType  = event.target.formGridTreatmentType.value
  let treatmentDescription  = event.target.formGridTreatmentDescription.value
  let treatmentDose  = event.target.formGridTreatmentDose.value
  let treatmentFrequency  = event.target.formGridTreatmentFrequency.value
  let billingDate  = event.target.formGridBillingDate.value
  let billingTitle  = event.target.formGridBillingTitle.value
  let billingType  = event.target.formGridBillingType.value
  let billingDescription  = event.target.formGridBillingDescription.value
  let billingAmount  = event.target.formGridBillingAmount.value
  let billingPaid  = event.target.formGridBillingPaid.value
  let billingNotes  = event.target.formGridBillingNotes.value
  // request body args shouldn't be required/non-nullable

  const patientArray = { nextOfKinName, nextOfKinPhone, nextOfKinEmail, complaintDate, complaintTitle, complaintDescription, historyTitle, historyType, historyDate, historyDescription, allergiesTitle, allergiesDescription, medicationTitle, medicationDescription, investigationDate, investigationTitle, investigationDescription, diagnosisDate, diagnosisTitle, diagnosisDescription, treatmentDate, treatmentTitle, treatmentType, treatmentDescription, treatmentDose, treatmentFrequency, billingDate, billingTitle, billingType, billingDescription, billingAmount, billingPaid , billingNotes }

  console.log("updating patientArray.. " + JSON.stringify(patientArray));

  const requestBody = {
    query: `
        mutation UpdatePatientArray($userId: ID!, $patientId: ID!, $nextOfKinName: String, $nextOfKinPhone: String, $nextOfKinEmail: String, $complaintDate: String, $complaintTitle: String, $complaintDescription: String, $historyTitle: String, $historyType: String, $historyDate: String, $historyDescription: String, $allergiesTitle: String, $allergiesDescription: String, $medicationTitle: String, $medicationDescription: String, $investigationDate: String, $investigationTitle: String, $investigationDescription: String, $diagnosisDate: String, $diagnosisTitle: String, $diagnosisDescription: String, $treatmentDate: String, $treatmentTitle: String, $treatmentType: String, $treatmentDescription: String, $treatmentDose: String, $treatmentFrequency: String, $billingDate: String, $billingTitle: String, $billingType: String, $billingDescription: String, $billingAmount: Float, $billingPaid: String , $billingNotes: String) {
          updatePatientArray(userId: $userId, patientId: $patientId, patientInput: { nextOfKinName: $nextOfKinName, nextOfKinPhone: $nextOfKinPhone, nextOfKinEmail: $nextOfKinEmail, complaintDate: $complaintDate, complaintTitle: $complaintTitle, complaintDescription: $complaintDescription, historyTitle: $historyTitle, historyType: $historyType, historyDate: $historyDate, historyDescription: $historyDescription, allergiesTitle: $allergiesTitle, allergiesDescription: $allergiesDescription, medicationTitle: $medicationTitle, medicationDescription: $medicationDescription, investigationDate: $investigationDate, investigationTitle: $investigationTitle, investigationDescription: $investigationDescription, diagnosisDate: $diagnosisDate, diagnosisTitle: $diagnosisTitle, diagnosisDescription: $diagnosisDescription, treatmentDate: $treatmentDate, treatmentTitle: $treatmentTitle, treatmentType: $treatmentType, treatmentDescription: $treatmentDescription, treatmentDose: $treatmentDose, treatmentFrequency: $treatmentFrequency, billingDate: $billingDate, billingTitle: $billingTitle, billingType: $billingType, billingDescription: $billingDescription, billingAmount: $billingAmount, billingPaid: $billingPaid, billingNotes: $billingNotes }){
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
            nextOfKin
            {
              name
              phone
              email
            }
            insurance
            {
              company
              number
              description
              expiry
              subscriber
              {
                  company
                  description
              }
            }
            complaints
            {
              date
              title
              description
            }
          }
        }
      `,
      variables: {
        userId: userId,
        patientId: patientId,
        nextOfKinName: nextOfKinName,
        nextOfKinPhone: nextOfKinPhone,
        nextOfKinEmail: nextOfKinEmail,
        complaintDate: complaintDate,
        complaintTitle: complaintTitle,
        complaintDescription: complaintDescription,
        historyTitle: historyTitle,
        historyType: historyType,
        historyDate: historyDate,
        historyDescription: historyDescription,
        allergiesTitle: allergiesTitle,
        allergiesDescription: allergiesDescription,
        medicationTitle: medicationTitle,
        medicationDescription: medicationDescription,
        investigationDate: investigationDate,
        investigationTitle: investigationTitle,
        investigationDescription: investigationDescription,
        diagnosisDate: diagnosisDate,
        diagnosisTitle: diagnosisTitle,
        diagnosisDescription: diagnosisDescription,
        treatmentDate: treatmentDate,
        treatmentTitle: treatmentTitle,
        treatmentType: treatmentType,
        treatmentDescription: treatmentDescription,
        treatmentDose: treatmentDose,
        treatmentFrequency: treatmentFrequency,
        billingDate: billingDate,
        billingTitle: billingTitle,
        billingType: billingType,
        billingDescription: billingDescription,
        billingAmount: billingAmount,
        billingPaid: billingPaid,
        billingNotes: billingNotes
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

      const updatedPatientArrayId = resData.data.updatePatientArray._id;
      const updatedPatientArray = this.state.patients.find(e => e._id === updatedPatientArrayId);
      const updatedPatientArrayPos = this.state.patients.indexOf(updatedPatientArray);
      const slicedArray = this.state.patients.splice(updatedPatientArrayPos, 1);
      console.log("updatedPatientArray:  ", JSON.stringify(updatedPatientArray),"  updatedPatientPos:  ", updatedPatientArrayPos, "  slicedArray:  ", slicedArray);

      this.state.patients.push(updatedPatientArray);

      if (this.state.updatingArray === false && this.state.updating === false) {
        console.log("update and updateArray complete...now fetching users");

      }
      // this.fetchPatients();

    })
    .catch(err => {
      console.log(err);
    });


}



  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, selectedPatient: null });
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
        )
      }
        {this.state.updating && (
          <UpdatePatientForm
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmUpdateHandler}
            confirmText="Confirm"
            patient={this.context.selectedPatient}
          />
        )}
        {this.state.updating && (
          <UpdatePatientArrayForm
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmUpdateArrayHandler}
            confirmText="Confirm"
            patient={this.context.selectedPatient}
          />
        )}
        {this.state.isLoading === false &&
          (<PatientDetail
            canEdit
            canDelete
            authUserId={this.context.userId}
            patient={this.state.selectedPatient}
            onEdit={this.startUpdatePatientHandler}
            onDelete={this.modalDeleteHandler}
            className="PatientDetailBox"
        />)}

        {this.context.token &&
          (<div className="users-control">
            <p>Add New Patient</p>
            <button className="btn" onClick={this.startCreatePatientHandler}>
              +
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <PatientList
            patients={this.state.patients}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default PatientsPage;
