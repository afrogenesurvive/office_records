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
import './Users.css';

class PatientsPage extends Component {
  state = {
    creating: false,
    updating: false,
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
  }

  componentDidMount() {
    this.fetchPatients();
  }


  startCreatePatientHandler = () => {
    this.setState({ creating: true });
    console.log("CreatePatientForm...");
  };
  startUpdatePatientHandler = () => {
    this.setState({ updating: true });
    console.log("UpdatePatientForm...");
  };

  modalConfirmHandler = (event) => {

    console.log("CreatePatientFormData:  ", event.target.formGridName.value);

    this.setState({ creating: false });
    const userId = this.context.userId;

    const name = event.target.formGridName.value;
    const dob = event.target.formGridDob.value;
    const address = event.target.formGridAddress.value;
    const contactPhone = 'test';
    const contactEmail = 'test';
    const registrationDate = 'test';
    const referringDoctorName = 'test';
    const referringDoctorEmail = 'test';
    const referringDoctorPhone = 'test';
    const occupationRole = 'test';
    const occupationEmployer = 'test';
    const occupationEmployerContactPhone = 'test';
    const occupationEmployerContactEmail = 'test';

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
      return;
    }

    const patient = { name, dob, address, contactPhone, contactEmail, registrationDate, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail };
    console.log("creating patient.. " + JSON.stringify(patient));

    const requestBody = {
      query: `
          mutation CreatePatient($userId: ID!, $name: String!, $dob: String!, $address: String!, $contactPhone: String!, $contactEmail: String!, $registrationDate: String!, $referringDoctorName: String!, $referringDoctorEmail: String!, $referringDoctorPhone: String!, $occupationRole: String!, $occupationEmployer: String!, $occupationEmployerContactPhone: String!, $occupationEmployerContactEmail: String!) {
            createPatient(userId: $userId, patientInput: { name: $name, dob: $dob, address: $address, contactPhone: $contactPhone, contactEmail: $contactEmail, registrationDate: $registrationDate, referringDoctorName: $referringDoctorName, referringDoctorEmail: $referringDoctorEmail, referringDoctorPhone: $referringDoctorPhone, occupationRole: $occupationRole, occupationEmployer: $occupationEmployer, occupationEmployerContactPhone: $occupationEmployerContactPhone, occupationEmployerContactEmail: $occupationEmployerContactEmail}) {
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
    const patientId = this.state.selectedPatient._id;

    // console.log("UpdateUserFormData:  ", event);
    console.log("UpdatePatientFormData:  ", event.target.formGridName.value);


    this.setState({ updating: false });
    let name = event.target.formGridName.value;
    let dob = event.target.formGridDob.value;
    let address = event.target.formGridAddress.value;
    let contactPhone = 'test';
    let contactEmail = 'test';
    let registrationDate = 'test';
    let referringDoctorName = 'test';
    let referringDoctorEmail = 'test';
    let referringDoctorPhone = 'test';
    let occupationRole = 'test';
    let occupationEmployer = 'test';
    let occupationEmployerContactPhone = 'test';
    let occupationEmployerContactEmail = 'test';



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
      console.log(`
        blank data fields detected!!...
        name: ${name}
        dob: ${dob}
        address: ${address}
        contactPhone: ${contactPhone}
        contactEmail: ${contactEmail}
        registrationDate: ${registrationDate}
        referringDoctorName: ${referringDoctorName}
        referringDoctorEmail: ${referringDoctorEmail}
        referringDoctorPhone: ${referringDoctorPhone}
        occupationRole: ${occupationRole}
        occupationEmployer: ${occupationEmployer}
        occupationEmployerContactPhone: ${occupationEmployerContactPhone}
        occupationEmployerContactEmail: ${occupationEmployerContactEmail}
        `);

      name = this.state.selectedPatient.name;
      dob = this.state.selectedPatient.dob;
      address = this.state.selectedPatient.address;
      contactPhone = this.state.selectedPatient.contactPhone;
      contactEmail = this.state.selectedPatient.contactEmail;
      registrationDate = this.state.selectedPatient.registrationDate;
      referringDoctorName = this.state.selectedPatient.referringDoctorName;
      referringDoctorEmail = this.state.selectedPatient.referringDoctorEmail;
      referringDoctorPhone = this.state.selectedPatient.referringDoctorPhone;
      occupationRole = this.state.selectedPatient.occupationRole;
      occupationEmployer = this.state.selectedPatient.occupationEmployer;
      occupationEmployerContactPhone = this.state.selectedPatient.occupationEmployerContactPhone;
      occupationEmployerContactEmail = this.state.selectedPatient.occupationEmployerContactEmail;

      console.log(`
        inputting previous data...
        name: ${name}
        dob: ${dob}
        address: ${address}
        contactPhone: ${contactPhone}
        contactEmail: ${contactEmail}
        registrationDate: ${registrationDate}
        referringDoctorName: ${referringDoctorName}
        referringDoctorEmail: ${referringDoctorEmail}
        referringDoctorPhone: ${referringDoctorPhone}
        occupationRole: ${occupationRole}
        occupationEmployer: ${occupationEmployer}
        occupationEmployerContactPhone: ${occupationEmployerContactPhone}
        occupationEmployerContactEmail: ${occupationEmployerContactEmail}
        `);

      // return;
    }



    const patient = { name, dob, address, contactPhone, contactEmail, registrationDate, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail };
    console.log("updating patient.. " + JSON.stringify(patient));

    const requestBody = {
      query: `
          mutation UpdatePatient($userId: ID!, $patientId: ID!, $name: String!, $dob: String!, $address: String!, $contactPhone: String!, $contactEmail: String!, $registrationDate: String!, $referringDoctorName: String!, $referringDoctorEmail: String!, $referringDoctorPhone: String!, $occupationRole: String!, $occupationEmployer: String!, $occupationEmployerContactPhone: String!, $occupationEmployerContactEmail: String!) {
            updatePatient(userId: $userId, patientId: $patientId, patientInput: { name: $name, dob: $dob, address: $address, contactPhone: $contactPhone, contactEmail: $contactEmail, registrationDate: $registrationDate, referringDoctorName: $referringDoctorName, referringDoctorEmail: $referringDoctorEmail, referringDoctorPhone: $referringDoctorPhone, occupationRole: $occupationRole, occupationEmployer: $occupationEmployer, occupationEmployerContactPhone: $occupationEmployerContactPhone, occupationEmployerContactEmail: $occupationEmployerContactEmail }) {
              _id
              name
              address
              contact{
                email
                phone
              }
              registrationDate
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
        this.fetchPatients();

      })
      .catch(err => {
        console.log(err);
      });
  };

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


  showDetailHandler = patientId => {

    this.setState(prevState => {
      const selectedPatient = prevState.patients.find(e => e._id === patientId);
      this.context.selectedPatient = selectedPatient;
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
        {this.state.isLoading === false &&
          (<PatientDetail
            authUserId={this.context.userId}
            patient={this.state.selectedPatient}
            onEdit={this.startUpdatePatientHandler}
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
