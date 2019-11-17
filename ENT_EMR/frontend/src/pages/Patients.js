import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import PatientList from '../components/Patients/PatientList/PatientList';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Patients.css';

class PatientsPage extends Component {
  state = {
    creating: false,
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
    this.referringDoctorElRef = React.createRef();
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
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });

    const userId = this.context.userId;

    const name = this.nameElRef
    const dob = this.dobElRef.current.value;
    const address = this.addressElRef.current.value;
    const contactPhone = this.contactPhoneElRef.current.value;
    const contactEmail = this.contactEmailElRef.current.value;
    const registrationDate = this.registrationDateElRef.current.value;
    const referringDoctor = this.referringDoctorElRef.current.value;
    const referringDoctorName = this.referringDoctorNameElRef.current.value;
    const referringDoctorEmail = this.referringDoctorEmailElRef.current.value;
    const referringDoctorPhone = this.referringDoctorPhoneElRef.current.value;
    const occupationRole = this.occupationRoleElRef.current.value;
    const occupationEmployer = this.occupationEmployerElRef.current.value;
    const occupationEmployerContactPhone = this.occupationEmployerContactPhoneElRef.current.value;
    const occupationEmployerContactEmail = this.occupationEmployerContactEmailElRef.current.value;

    if (
      name.trim().length === 0 ||
      dob.trim().length === 0 ||
      address.trim().length === 0 ||
      contactPhone.trim().length === 0 ||
      contactEmail.trim().length === 0 ||
      registrationDate.trim().length === 0 ||
      referringDoctor.trim().length === 0 ||
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

    const patient = { name, dob, address, contactPhone, contactEmail, registrationDate, referringDoctor, referringDoctorName, referringDoctorEmail, referringDoctorPhone, occupationRole, occupationEmployer, occupationEmployerContactPhone, occupationEmployerContactEmail };
    console.log("creating patient.. " + JSON.stringify(patient));

    const requestBody = {
      query: `
          mutation CreatePaitient($userId: ID!, $name: String!, $dob: String!, $address: String!, $contactPhone: String!, $contactEmail: String!, $registrationDate: String!, $referringDoctor: String!, $referringDoctorName: String!, $referringDoctorEmail: String!, $referringDoctorPhone: String!, $occupationRole: String!, $occupationEmployer: String!, $occupationEmployerContactPhone: String!, $occupationEmployerContactEmail: String!) {
            createPaitient(userId: $userId, patientInput: { email: $email, name: $name, dob: $dob, address: $address, contactPhone: $contactPhone, contactEmail: $contactEmail, registrationDate: $registrationDate, referringDoctor: $referringDoctor, referringDoctorName: $referringDoctorName, referringDoctorEmail: $referringDoctorEmail, referringDoctorPhone: $referringDoctorPhone, occupationRole: $occupationRole, occupationEmployer: $occupationEmployer, occupationEmployerContactPhone: $occupationEmployerContactPhone, occupationEmployerContactEmail: $occupationEmployerContactEmail}) {
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
          referringDoctor: referringDoctor,
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
          updatedPatients.push({
            _id: resData.data.createPatient._id,
            name: resData.data.createPatient.name,
            dob: resData.data.createPatient.dob,
            address: resData.data.createPatient.address,
            contactPhone: resData.data.createPatient.contactPhone,
            contactEmail: resData.data.createPatient.contactEmail,
            registrationDate: resData.data.createPatient.registrationDate,
            referringDoctor: resData.data.createPatient.referringDoctor,
            referringDoctorName: resData.data.createPatient.referringDoctorName,
            referringDoctorEmail: resData.data.createPatient.referringDoctorEmail,
            referringDoctorPhone: resData.data.createPatient.referringDoctorPhone,
            occupationRole: resData.data.createPatient.occupationRole,
            occupationEmployer: resData.data.createPatient.occupationEmployer,
            occupationEmployerContactPhone: resData.data.createPatient.occupationEmployerContactPhone,
            occupationEmployerContactEmail: resData.data.createPatient.occupationEmployerContactEmail
          });

          return { patients: updatedPatients };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedPatient: null });
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
      this.context.selectedPatientId = selectedPatient;
      console.log("here:  ", selectedPatient);
      return { selectedPatient: selectedPatient };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating ) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="New Patient"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm">
            <form>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="text" id="title" ref={this.emailElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.isLoading === false &&
          (<PatientDetail
            authUserId={this.context.userId}
            patient={this.context.selectedPatientId}
        />)}
        {this.context.token &&
          (<div className="users-control">
            <p>Add New Patient</p>
            <button className="btn" onClick={this.startCreateUserHandler}>
              Submit
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
