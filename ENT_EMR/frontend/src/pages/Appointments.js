import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SidebarPage from './Sidebar';

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
    selectedAppointment: null,
    appointmentUpdateField: null,
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
    console.log("CreateAppointmentForm...", this.context.selectedPatient);
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
    const time = event.target.formGridTime.value;
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
      time.trim().length === 0 ||
      location.trim().length === 0 ||
      description.trim().length === 0 ||
      inProgress.trim().length === 0 ||
      attended.trim().length === 0 ||
      important.trim().length === 0 ||
      notes.trim().length === 0
    ) {
      console.log("blank fields detected!!!...Please try again...");
      // return;
    }

    const appointment = { title, type, date, time, location, description, inProgress, attended, important, notes };
    console.log(`creating appointment...
        title: ${title},
        type: ${type},
        date: ${date},
        time: ${time},
        location: ${location},
        description: ${description},
        inProgress: ${inProgress},
        attended: ${attended},
        important: ${important},
        notes: ${notes},
      `);

    const requestBody = {
      query: `
          mutation {
            createAppointment(userId:\"${userId}\", patientId:\"${patientId}\", appointmentInput: {title:\"${title}\",type:\"${type}\",date:\"${date}\",time:\"${time}\",location:\"${location}\",description:\"${description}\",inProgress:${inProgress},attended:${attended},important:${important},notes:\"${notes}\"})
            {_id,title,date,time,type,patient{name,dob,address},inProgress,attended,important,notes}}
        `,
    };

    const token = this.context.token;

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
        console.log("response data... " + JSON.stringify(resData));

        this.setState(prevState => {
          const updatedAppointments = [...prevState.appointments];
          updatedAppointments.push(
            {
            _id: resData.data.createAppointment._id,
            title: resData.data.createAppointment.title,
            type: resData.data.createAppointment.type,
            date: resData.data.createAppointment.date,
            time: resData.data.createAppointment.time,
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

        this.fetchAppointments();

      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, searching: false, selectedAppointment: null });
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
        appointmentd: ${appointmentId},
      `);

    // console.log("UpdateUserFormData:  ", event);
    console.log("UpdateAppointmentFormData:  ", event.target.formGridTitle.value);


    this.setState({ updating: false });
    let title = event.target.formGridTitle.value;
    let type = event.target.formGridType.value;
    let date = event.target.formGridDate.value;
    let time = event.target.formGridTime.value;
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
    if (time.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      time  = this.context.selectedAppointment.time;
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
    console.log(`
        updating appointment...
        title: ${title}
        type: ${type}
        date: ${date}
        time: ${time}
        location: ${location}
        description: ${description}
        inProgress: ${inProgress}
        attended: ${attended}
        important: ${important}
        notes: ${notes}
      `);

    const requestBody = {
      query: `
          mutation {updateAppointment(userId:\"${userId}\", appointmentId:\"${appointmentId}\", appointmentInput: {title:\"${title}\",type:\"${type}\",date:\"${date}\",time:\"${time}\",location:\"${location}\",description:\"${description}\"})
          {_id,title,date,time,type,patient{name,dob,address},inProgress,attended,important,notes}}
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
          time: resData.data.updateAppointment.time,
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


  updateAppointmentPatientHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedAppointmentId = this.context.selectedAppointment._id;
    let selectedPatientId = this.context.selectedPatient._id;
    if(
      this.context.user.role !== 'admin'
    ) {
      console.log("No edit permission!!");
      return;
    }

    this.setState({ updating: false , patientUpdateField: null });

    console.log(`
      updating appointment patient...
      userId: ${userId},
      appointmentId: ${selectedAppointmentId},
      patientId: ${selectedPatientId},
      `);

      const requestBody = {
        query:`
        mutation {updateAppointmentPatient(userId:\"${userId}\",appointmentId:\"${selectedAppointmentId}\",patientId:\"${selectedPatientId}\")
        {_id,title,date,time,patient{_id,name,address,contact{phone,email},registrationDate,referralDate,expirationDate,insurance{company,number,expiry}},notes,inProgress,attended,important}}
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
          console.log("response data... " + JSON.stringify(resData));

          const updatedAppointmentId = resData.data.updateAppointmentPatient._id;
          const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
          const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
          const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
          console.log("updatedAppointment:  ", JSON.stringify(updatedAppointment),"  updatedPatientPos:  ", updatedAppointmentPos, "  slicedArray:  ", slicedArray);

          this.state.appointments.push(updatedAppointment);
          this.fetchAppointments();

        })
        .catch(err => {
          console.log(err);
        });


  }


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
          {getAppointmentField(userId: $userId, field: $field, query: $query )
            {
            _id
            title
            type
            date
            time
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
            appointments(userId: $userId)
            {
              _id
              title
              type
              date
              time
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

        this.context.appointments = this.state.appointments;
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
              time
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

  updateAppointmentSpecial (event) {

    console.log("special field to update:  ", event.target.value);
    const field = event.target.value;
    this.setState({ appointmentUpdateField: field});

  }


  showDetailHandler = appointmentId => {

    this.setState(prevState => {
      const selectedAppointment = prevState.appointments.find(e => e._id === appointmentId);
      this.setState({selectedAppointment: selectedAppointment});
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
      <SidebarPage />

      <Accordion>

      <Container className="containerUserDetail">

      <Row className="createUserRowAdd">
      <Col md={4} className="createUserColAdd">
      <p>Appointment Detail</p>
      </Col>
      <Col md={6} className="createUserColAdd">
      <Accordion.Toggle as={Button} variant="link" eventKey="10" className="btn">
      Details
      </Accordion.Toggle>
      </Col>
      </Row>

      <Accordion.Collapse eventKey="10">
      <Row className="createUserRowForm">
      <Col md={11} className="createUserColForm">
      {
        this.state.isLoading === false &&
        this.state.selectedAppointment !== null
        &&
        (
          <AppointmentDetail
          authUserId={this.context.userId}
          appointment={this.state.selectedAppointment}
          onEdit={this.startUpdateAppointmentHandler}
          onDelete={this.modalDeleteHandler}
      />
    )
    }
      </Col>
      </Row>
      </Accordion.Collapse>

      </Container>

      <Container className="containerCreateuser">
      <Row className="createUserRowAdd">
      <Col md={2} className="createUserColAdd">
        <p>Add New Appointment</p>
      </Col>
      <Col md={4}>
        {this.context.token && (
          <Accordion.Toggle as={Button} variant="link" eventKey="11" className="btn" onClick={this.startCreateAppointmentHandler}>
          Add
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

      <Accordion.Collapse eventKey="11">
      <Row className="createUserRowForm">
      <Col md={12} className="createUserColForm">
      {
        this.state.creating && this.context.selectedPatient._id
        && (
          <CreateAppointmentForm
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
      <p>Edit Selected Appointment</p>
      </Col>
      <Col md={4} className="updateUserCol">
      {this.context.token && (
        <Accordion.Toggle as={Button} variant="link" eventKey="12" className="btn" onClick={this.startUpdateAppointmentHandler}>
        Basic Info & Demographics
        </Accordion.Toggle>
      )}
      </Col>
      <Col md={2}>
        <p>Appointment</p>
      </Col>
      <Col md={4}>
        {this.context.selectedAppointment && (
          <p>{this.context.selectedAppointment.title}</p>
        )}
      </Col>
      </Row>

      <Row className="createUserRowAdd">
      <Col md={3} className="updateUserCol2">
      <p>Edit Selected Appointment</p>
      </Col>
      <Col md={9} className="updateUserCol2">
      {this.context.token && (
        <Accordion.Toggle as={Button} variant="link" eventKey="13" className="btn" value='patient' onClick={this.updateAppointmentSpecial.bind(this)}>
        Patient
        </Accordion.Toggle>
      )}
      </Col>
      </Row>

      <Accordion.Collapse eventKey="12">
      <Row className="updateUserRowForm">
      <Col md={10} className="updateUserColForm">
      {this.state.updating &&
        this.state.selectedAppointment !== null
        && (
        <UpdateAppointmentForm
        authUserId={this.context.userId}
        canCancel
          canConfirm
          onCancel={this.modalCancelHandler}
          onConfirm={this.modalConfirmUpdateHandler}
          confirmText="Confirm"
          appointment={this.state.selectedAppointment}
        />
      )}
      </Col>
      </Row>
      </Accordion.Collapse>

      <Accordion.Collapse eventKey="13">
      <Row className="updateUserRowForm">
      <Col md={10} className="updateUserColForm">
      {
      //   this.state.appointmentUpdateField === 'patient' &&
      // this.state.selectedAppointment !== null
      // && (
      //   <UpdateAppointmentPatientForm
      //   authUserId={this.context.userId}
      //   canCancel
      //     canConfirm
      //     onCancel={this.modalCancelHandler}
      //     onConfirm={this.updateAppointmentPatientHandler}
      //     confirmText="Confirm"
      //     appointment={this.state.selectedAppointment}
      //   />
      // )
    }
      {this.state.appointmentUpdateField === 'patient' &&
      this.state.selectedAppointment !== null &&
      this.context.selectedPatient !== null && (
        <Row>
        <Col md={8} className="updateUserColAdd">
        <p>Add Patient: {this.context.selectedPatient.name}</p>
        <p> To Appointment: {this.state.selectedAppointment.title} ??</p>
        <Accordion.Toggle as={Button} variant="link" eventKey="13" className="btn" onClick={this.updateAppointmentPatientHandler}>
        Yes
        </Accordion.Toggle>
        </Col>
        </Row>
      )}
      </Col>
      </Row>
      </Accordion.Collapse>

      </Container>



      <Container className="containerSearchuser">
    <Row className="createUserRowAdd">
    <Col md={4} className="createUserColAdd">
      <p>Search for a Appointment</p>
    </Col>
    <Col md={8}>
      {this.context.token && (
        <Accordion.Toggle as={Button} variant="link" eventKey="14" className="btn" onClick={this.startSearchAppointmentHandler}>
        Search
        </Accordion.Toggle>
      )}

    </Col>
    </Row>

    <Accordion.Collapse eventKey="14">
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
    </Accordion.Collapse>
    </Container>

  <Accordion.Collapse eventKey="14">
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
    </Accordion.Collapse>


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
  </Accordion>

        {
        //   this.state.isLoading === false &&
        //   (<PatientDetail
        //     authUserId={this.context.userId}
        //     patient={this.context.selectedPatient}
        //     className="PatientDetailBox2"
        // />)
      }
      </React.Fragment>
    );
  }
}

export default AppointmentsPage;
