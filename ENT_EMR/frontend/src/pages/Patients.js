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
      <p>Add New Patient</p>
    </Col>
    <Col md={8}>
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
    <Col md={4} className="updateUserCol">
    <p>Edit Selected Patient</p>
    </Col>
    <Col md={4} className="updateUserCol">
    {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="8" className="btn" onClick={this.startUpdatePatientHandler}>
      Basic Info & Demographics
      </Accordion.Toggle>
    )}
    </Col>
    </Row>

    <Row className="createUserRowAdd">
    <Col md={3} className="updateUserCol2">
    <p>Edit Selected Patient</p>
    </Col>
    <Col md={9} className="updateUserCol2">
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
      <p>nextOfKin</p>
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
