import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AppointmentList from '../components/Appointments/AppointmentList/AppointmentList';
import AppointmentDetail from '../components/Appointments/AppointmentDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import CreateAppointmentForm from '../components/Forms/CreateAppointmentForm';

import './Patients.css';

class AppointmentsPage extends Component {
  state = {
    creating: false,
    appointments: [],
    isLoading: false,
    selectedAppointment: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleELRef = React.createRef();
    this.typeELRef = React.createRef();
    this.dateELRef = React.createRef();
    this.locationELRef = React.createRef();
    this.descriptionELRef = React.createRef();
    this.patientELRef = React.createRef();
    this.inProgressELRef = React.createRef();
    this.noteELRef = React.createRef();
  }

  componentDidMount() {
    this.fetchAppointments();
  }


  startCreateAppointmentHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });

    const userId = this.context.userId;

    const title = this.titleELRef.current.value;
    const type = this.typeELRef.current.value;
    const date = this.dateELRef.current.value;
    const location = this.locationELRef.current.value;
    const description = this.descriptionELRef.current.value;
    const patient = this.patientELRef.current.value;
    const inProgress = this.inProgressELRef.current.value;
    const note = this.noteELRef.current.value;

    if (
      title.trim().length === 0 ||
      type.trim().length === 0 ||
      date.trim().length === 0 ||
      location.trim().length === 0 ||
      description.trim().length === 0 ||
      patient.trim().length === 0 ||
      inProgress.trim().length === 0 ||
      note.trim().length === 0
    ) {
      return;
    }

    const appointment = { title, type, date, location, description, patient, inProgress, note };
    console.log("creating appointment: " + JSON.stringify(appointment));

    const requestBody = {
      query: `
          mutation CreateAppointment($userId: ID!, ) {
            createAppointment(userId: $userId, appointmentInput: { }) {
              _id
              title
              date
              patient{
                name
              }
              location
              description
              inProgress
              notes
            }
          }
        `,
        variables: {
          userId: userId,
          title: title,
          type: type,
          date: date,
          location: location,
          description: description,
          patient: patient,
          inProgress: inProgress,
          note: note
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
          const updatedAppointments = [...prevState.appointments];
          updatedAppointments.push({
            _id: resData.data.createAppointment._id,
            title: resData.data.createAppointment.title,
            type: resData.data.createAppointment.type,
            date: resData.data.createAppointment.date,
            location: resData.data.createAppointment.location,
            description: resData.data.createAppointment.description,
            patient: resData.data.createAppointment.patient,
            inProgress: resData.data.createAppointment.inProgress,
            notes: resData.data.createAppointment.notes
          });

          return { appointments: updatedAppointments };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedAppointment: null });
  };

  fetchPatients() {
    console.log("'fetch appointments function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query appointments($userId: ID!) {
            appointments(userId: $userId) {
              _id
              title
              date
              patient{
                name
              }
              location
              description
              inProgress
              notes
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
        const appointments = resData.data.appointments;
        console.log(appointments);

        if (this.isActive) {
          this.setState({ appointments: appointments, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }


  showDetailHandler = appointmentId => {

    this.setState(prevState => {
      const selectedAppointment = prevState.appointments.find(e => e._id === appointmentId);
      this.context.selectedAppointment = selectedAppointment;
      console.log("here:  ", selectedAppointment);
      return { selectedAppointment: selectedAppointment };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.creating && (
          <CreateAppointmentForm
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          />
        )}
        {this.state.isLoading === false &&
          (<AppointmentDetail
            authUserId={this.context.userId}
            appointment={this.context.selectedAppointment}
        />)}

        {this.context.token &&
          (<div className="appointments-control">
            <p>Add New Appointment</p>
            <button className="btn" onClick={this.startCreateAppointmentHandler}>
              +
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <AppointmentList
            appointments={this.state.appointments}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default AppointmentsPage;
