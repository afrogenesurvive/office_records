import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import AppointmentList from '../components/Appointments/AppointmentList/AppointmentList';
import AppointmentDetail from '../components/Appointments/AppointmentDetail';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import SearchAppointmentList from '../components/Appointments/AppointmentList/SearchAppointmentList';
import SearchAppointmentForm from '../components/Forms/SearchAppointmentForm';

import CreateAppointmentForm from '../components/Forms/CreateAppointmentForm';
import UpdateAppointmentForm from '../components/Forms/UpdateAppointmentForm';
import './Users.css';

class AppointmentsPage extends Component {
  state = {
    creating: false,
    updating: false,
    deleting: false,
    searching: false,
    searchAppointments: [],
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
    this.attendedELRef = React.createRef();
    this.importantELRef = React.createRef();
    this.notesELRef = React.createRef();
  }

  componentDidMount() {
    this.fetchAppointments();
  }


  startCreateAppointmentHandler = () => {
    this.setState({ creating: true });
    console.log("CreateAppointmentForm...");
  };
  startUpdateAppointmentHandler = () => {
    this.setState({ updating: true });
    console.log("UpdateAppointmentForm...");
  };
  startSearchAppointmentHandler = () => {
    this.setState({ searching: true });
    console.log("SearchAppointmentForm...");
  };

  modalConfirmHandler = (event) => {

    console.log("CreateAppointmentFormData:  ", event.target.formGridTitle.value);

    this.setState({ creating: false });
    const userId = this.context.userId;
    const patientId = this.context.selectedPatient._id;
    console.log(`
        userId: ${userId}
        patientId: ${patientId}
      `);

    const title = event.target.formGridTitle.value;
    const type = event.target.formGridType.value;
    const date = event.target.formGridDate.value;
    const location = event.target.formGridLocation.value;
    const description = event.target.formGridDescription.value;
    const inProgress = event.target.formGridInProgress.value;
    const attended = event.target.formGridAttended.value;
    const important = event.target.formGridImportant.value;
    const notes = event.target.formGridNotes.value;
    if (
      title.trim().length === 0 ||
      type.trim().length === 0 ||
      date.trim().length === 0 ||
      location.trim().length === 0 ||
      description.trim().length === 0 ||
      inProgress.trim().length === 0 ||
      attended.trim().length === 0 ||
      important.trim().length === 0 ||
      notes.trim().length === 0
    ) {
      console.log("blank fields detected!!!...Please try again...");
      return;
    }

    const appointment = { title, type, date, location, description, inProgress, attended, important, notes };
    console.log("creating appointment... " ,JSON.stringify(appointment));

    const requestBody = {
      query: `
          mutation createAppointment($userId: ID!, $patientId: ID!, $title: String!, $type: String!, $date: String!, $location: String!, $description: String!, $inProgress: Boolean!, $attended: Boolean!, $important: Boolean!, $notes: String!) {
            createAppointment(userId: $userId, patientId: $patientId, appointmentInput: { title: $title, type: $type, date: $date, location: $location, description: $description, inProgress: $inProgress, attended: $attended, important: $important, notes: $notes }) {
              _id
              title
              type
              date
              location
              description
              patient
              {
                name
                dob
                address
              }
              inProgress
              attended
              important
              notes
            }
          }
        `,
        variables: {
          userId: userId,
          patientId: patientId,
          title: title,
          type: type,
          date: date,
          location: location,
          description: description,
          inProgress: inProgress,
          attended: attended,
          important: important,
          notes: notes
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
          updatedAppointments.push(
            {
            _id: resData.data.createAppointment._id,
            title: resData.data.createAppointment.title,
            type: resData.data.createAppointment.type,
            date: resData.data.createAppointment.date,
            location: resData.data.createAppointment.location,
            description: resData.data.createAppointment.description,
            patient: resData.data.createAppointment.patient,
            inProgress: resData.data.createAppointment.inProgress,
            attended: resData.data.createAppointment.attended,
            important: resData.data.createAppointment.important,
            notes: resData.data.createAppointment.notes
          }
        );

          return { appointments: updatedAppointments };
        });

      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, selectedAppointment: null });
  };


  modalConfirmUpdateHandler = (event) => {

    if(this.context.user.role !== 'admin') {
      console.log("Not the Admin! No edit permission!!");

    }

    const userId = this.context.userId;
    const appointmentId = this.context.selectedAppointment._id;
    // const patientId = this.context.selectedPatientId;
    console.log(`
        userId: ${userId}
        appointmentd: ${appointmentId}
      `);

    // console.log("UpdateUserFormData:  ", event);
    console.log("UpdateAppointmentFormData:  ", event.target.formGridTitle.value);


    this.setState({ updating: false });
    let title = event.target.formGridTitle.value;
    let type = event.target.formGridType.value;
    let date = event.target.formGridDate.value;
    let location = event.target.formGridLocation.value;
    let description = event.target.formGridDescription.value;
    let inProgress = event.target.formGridInProgress.value;
    let attended = event.target.formGridAttended.value;
    let important = event.target.formGridImportant.value;
    let notes = event.target.formGridNotes.value;

    if (title.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      title  = this.context.selectedAppointment.title;
      // return;
    }
    if (type.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      type  = this.context.selectedAppointment.type;
    }
    if (date.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      date  = this.context.selectedAppointment.date;
    }
    if (location.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      location  = this.context.selectedAppointment.location;
    }
    if (description.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      description  = this.context.selectedAppointment.description;
    }
    if (inProgress.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      inProgress  = this.context.selectedAppointment.inProgress;
    }
    if (attended.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attended  = this.context.selectedAppointment.attended;
    }
    if (important.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      important  = this.context.selectedAppointment.important;
    }
    if (notes.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      notes  = this.context.selectedAppointment.notes;
    }



    const appointment = { title, type, date, location, description, inProgress, attended, important, notes };
    console.log("updating appointment... " + JSON.stringify(appointment));

    const requestBody = {
      query: `
          mutation UpdateAppointment($userId: ID!, $appointmentId: ID, $title: String!, $type: String!, $date: String!, $location: String!, $description: String!, $inProgress: Boolean!, $attended: Boolean!, $important: Boolean!, $notes: String!) {
            updateAppointment(userId: $userId, appointmentId: $appointmentId, appointmentInput: { title: $title, type: $type, date: $date, location: $location, description: $description, inProgress: $inProgress, attended: $attended, important: $important, notes: $notes }) {
              _id
              title
              type
              date
              location
              description
              inProgress
              attended
              important
              notes
            }
          }
        `,
        variables: {
          userId: userId,
          appointmentId: appointmentId,
          title: title,
          type: type,
          date: date,
          location: location,
          description: description,
          inProgress: inProgress,
          attended: attended,
          important: important,
          notes: notes
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

        const updatedAppointmentId = resData.data.updateAppointment._id;
        const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
        const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
        const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
        console.log("updatedAppointment:  ", JSON.stringify(updatedAppointment),"  updatedPatientPos:  ", updatedAppointmentPos, "  slicedArray:  ", slicedArray);

        this.state.appointments.push(
          {
          _id: resData.data.updateAppointment._id,
          title: resData.data.updateAppointment.title,
          type: resData.data.updateAppointment.type,
          date: resData.data.updateAppointment.date,
          location: resData.data.updateAppointment.location,
          description: resData.data.updateAppointment.description,
          patient: resData.data.updateAppointment.patient,
          inProgress: resData.data.updateAppointment.inProgress,
          attended: resData.data.updateAppointment.attended,
          important: resData.data.updateAppointment.important,
          notes: resData.data.updateAppointment.notes
        });
        this.fetchAppointments();

      })
      .catch(err => {
        console.log(err);
      });
  };


  modalConfirmSearchHandler = (event) => {
    console.log("SearchAppointmentForm:  ");


    let userId = this.context.userId;

      console.log("SearchAppointmentFormData:  ", event.target.formBasicField.value);
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
      console.log("Searching for Appointment:  ", JSON.stringify(search));

      const requestBody = {
        query: `
          query GetAppointmentField($userId: ID!, $field: String!, $query: String!)
          {getAppointmentField(userId: $userId, field: $field, query: $query ){
            _id
            title
            type
            date
            location
            description
            patient{
              name
              address
            }
            inProgress
            attended
            important
            notes
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

          const searchAppointments = resData.data.getAppointmentField;

          this.setState({ searchAppointments: searchAppointments})
          console.log("state.searchAppointments:  ", this.state.searchAppointments);
          // this.fetchAppointments();
        })
        .catch(err => {
          console.log(err);
        });
  }



  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, searching: false, selectedAppointment: null });
  };


  fetchAppointments() {
    console.log("'fetch appointments function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query appointments($userId: ID!) {
            appointments(userId: $userId) {
              _id
              title
              type
              date
              location
              description
              patient
              {
                name
                dob
                address
              }
              inProgress
              attended
              important
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

  modalDeleteHandler = () => {
    console.log("deleting appointment...selectedAppointment:  ", this.context.selectedAppointment);

    const selectedAppointmentId = this.context.selectedAppointment._id;

    if(this.context.user.role !== 'admin') {
      console.log("Not the Admin! No edit permission!!");
    }

    this.setState({deleting: true});


    const requestBody = {
      query: `
          mutation DeleteAppointment($userId: ID!, $appointmentId: ID!) {
            deleteAppointment(userId: $userId, appointmentId: $appointmentId) {
              _id
              title
              type
              date
              location
              description
              patient
              {
                name
                dob
                address
              }
              inProgress
              attended
              important
              notes
            }
          }
        `,
        variables: {
          userId: this.context.userId,
          appointmentId: selectedAppointmentId
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
        console.log("resData:  ", resData);
        // console.log("resData.data.deleteAppointment:  ", resData.data.deleteAppointment);
        let deletedAppointment = resData.data.deleteAppointment;
        console.log(deletedAppointment);

        let deletedAppointmentId = deletedAppointment._id;
        deletedAppointment = this.state.appointments.find(e => e._id === deletedAppointmentId);
        const deletedAppointmentPos = this.state.appointments.indexOf(deletedAppointment);
        const slicedArray = this.state.appointments.splice(deletedAppointmentPos, 1);
        console.log("deletedAppointment:  ", JSON.stringify(deletedAppointment),"  deletedUserPos:  ", deletedAppointmentPos, "  slicedArray:  ", slicedArray);

        this.setState({ deleting: false });

        this.fetchAppointments();

      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ deleting: false });
        }
      });


  }


  showDetailHandler = appointmentId => {

    this.setState(prevState => {
      const selectedAppointment = prevState.appointments.find(e => e._id === appointmentId);
      this.context.selectedAppointment = selectedAppointment;
      console.log("selectedAppointment:  ", selectedAppointment);
      return { selecteAppointment: selectedAppointment };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>


      <Container className="containerCreateuser">
      <Row className="createUserRowAdd">
      <Col md={4} className="createUserColAdd">
        <p>Add New Appointment</p>
      </Col>
      <Col md={8}>
        {this.context.token && (
            <Button className="btn" onClick={this.startCreateAppointmentHandler}>
              Add
            </Button>
        )}
      </Col>
      </Row>
      <Row className="createUserRowForm">
      <Col md={12} className="createUserColForm">
      {
        this.state.creating && (
          <CreateAppointmentForm
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            onSubmit={this.modalConfirmHandler}
            confirmText="Confirm"
          />
      )}
    {this.state.updating && (
      <UpdateAppointmentForm
      canCancel
        canConfirm
        onCancel={this.modalCancelHandler}
        onConfirm={this.modalConfirmUpdateHandler}
        confirmText="Confirm"
        appointment={this.context.selectedAppointment}
      />
    )}
      </Col>
      </Row>
      </Container>



      <Container className="containerSearchuser">
    <Row className="createUserRowAdd">
    <Col md={4} className="createUserColAdd">
      <p>Search for an Appointment</p>
    </Col>
    <Col md={8}>
      {this.context.token && (
          <Button className="btn" onClick={this.startSearchAppointmentHandler}>
            Search
          </Button>
      )}
    </Col>
    </Row>
    <Row className="createUserRowForm">
    <Col md={10} className="createUserColForm">
    {
      this.state.searching === true &&
      <SearchAppointmentForm
      authUserId={this.context.userId}
      canCancel
        canConfirm
        onCancel={this.modalCancelHandler}
        onConfirm={this.modalConfirmSearchHandler}
        confirmText="Search"
        appointment={this.context.selectedAppointment}
      />
    }
    </Col>
    <Col md={10}>

    </Col>
    </Row>
    </Container>

    <Container className="containerSearchuser">
    <Row className="searchListRow">
    {
      this.state.searchAppointments !== [] &&
      <SearchAppointmentList
        searchAppointments={this.state.searchAppointments}
        authUserId={this.context.userId}
        onCancel={this.modalCancelHandler}
          onViewDetail={this.showDetailHandler}
      />
    }
    </Row>

    </Container>

    <Container className="containerSearchuser">
  <Row className="searchListRow">

  {this.state.isLoading ? (
    <Spinner />
  ) : (
    <AppointmentList
      appointments={this.state.appointments}
      authUserId={this.context.userId}
      onViewDetail={this.showDetailHandler}
    />
  )}

  </Row>
  </Container>
        {this.state.isLoading === false &&
          (<AppointmentDetail
            canDelete
            authUserId={this.context.userId}
            appointment={this.context.selectedAppointment}
            onEdit={this.startUpdateAppointmentHandler}
            onDelete={this.modalDeleteHandler}
        />)}
        {this.state.isLoading === false &&
          (<PatientDetail
            authUserId={this.context.userId}
            patient={this.context.selectedPatient}
            className="PatientDetailBox2"
        />)}
      </React.Fragment>
    );
  }
}

export default AppointmentsPage;
