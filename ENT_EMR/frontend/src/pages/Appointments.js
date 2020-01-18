import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SidebarPage from './Sidebar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import AlertBox from '../components/AlertBox';
import PdfCreator from '../components/PdfCreator';
import LoadingOverlay from '../components/LoadingOverlay';

import AppointmentList from '../components/Appointments/AppointmentList/AppointmentList';
import AppointmentDetail from '../components/Appointments/AppointmentDetail';
import SearchAppointmentList from '../components/Appointments/AppointmentList/SearchAppointmentList';
import SearchAppointmentForm from '../components/Forms/SearchAppointmentForm';
import SearchAppointmentIdForm from '../components/Forms/SearchAppointmentIdForm';
import SearchAppointmentPatientForm from '../components/Forms/SearchAppointmentPatientForm';
import SearchAppointmentDateForm from '../components/Forms/SearchAppointmentDateForm';
import SearchAppointmentDateRangeForm from '../components/Forms/SearchAppointmentDateRangeForm';
import CreateAppointmentForm from '../components/Forms/CreateAppointmentForm';
import UpdateAppointmentForm from '../components/Forms/UpdateAppointmentForm';
import UpdateAppointmentFieldForm from '../components/Forms/UpdateAppointmentFieldForm';

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
    selectedPatient: null,
    appointmentUpdateField: null,
    appointmentSearchField: null,
    appointmentSearchQuery: null,
    canDelete: null,
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
    createPdf: false,
    pdfData: null,
  };
  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    if (this.context.user.name === "Lord-of-the-Manor"){
      this.setState({canDelete: true})
    }
    this.fetchAppointments();
    this.fetchAppointmentToday();
    this.fetchAppointmentInProgress();
  }


  startCreateAppointmentHandler = () => {
    this.setState({ creating: true });
  };
  startUpdateAppointmentHandler = () => {
    this.setState({ updating: true });
  };
  startSearchAppointmentHandler = () => {
    this.setState({ searching: true });
  };

  modalConfirmHandler = (event) => {

    this.setState({ creating: false, userAlert: "creating appointment..." });
    const userId = this.context.userId;
    const selectedPatientId = this.context.selectedPatient._id;
    const token = this.context.token;
      if (selectedPatientId === undefined) {
        this.setState({userAlert: "select a Patient before creating an Appointment!!..."});
        return
      }
    const title = event.target.formGridTitle.value;
    const type = event.target.formGridType.value;
    let date = event.target.formGridDate.value;
    if (event.target.formGridDateTodayCheckbox.checked === true) {
      date = new Date().toISOString().slice(0,10);
    }
    const time = event.target.formGridTime.value;
    const seenTime = event.target.formGridSeenTime.value;
    const checkinTime = event.target.formGridCheckinTime.value;
    const location = event.target.formGridLocation.value;
    const description = event.target.formGridDescription.value;
    const inProgress = event.target.formGridInProgress.value;
    const attended = event.target.formGridAttended.value;
    const important = event.target.formGridImportant.value;

    if (
      title.trim().length === 0 ||
      type.trim().length === 0 ||
      date.trim().length === 0 ||
      time.trim().length === 0 ||
      location.trim().length === 0 ||
      description.trim().length === 0 ||
      inProgress.trim().length === 0 ||
      attended.trim().length === 0 ||
      important.trim().length === 0
    ) {
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
      return
    };

    const requestBody = {
      query: `
          mutation {createAppointment(userId:"${userId}",
          patientId:"${selectedPatientId}",
          appointmentInput:{
            title:"${title}",
            type:"${type}",
            date:"${date}",
            time:"${time}",
            seenTime:"${seenTime}",
            checkinTime:"${checkinTime}",
            location:"${location}",
            description:"${description}",
            inProgress:${inProgress},
            attended:${attended},
            important:${important}})
          {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title}},inProgress,attended,important}}
        `
    };

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        this.state.appointments.push(resData.data.createAppointment);
        this.context.appointments = this.state.appointments;
        this.fetchAppointments();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, searching: false, selectedAppointment: null });
  };


  modalConfirmUpdateHandler = (event) => {

    if(this.context.user.role !== 'admin') {
      this.setState({userAlert: "Not the Admin! No edit permission!!"});
    }

    const token = this.context.token;
    const userId = this.context.userId;
    const appointmentId = this.context.selectedAppointment._id;
    console.log("UpdateAppointmentFormData:  ", event.target.formGridTitle.value);


    this.setState({ updating: false, userAlert: "updating appointment..." });
    let title = event.target.formGridTitle.value;
    let type = event.target.formGridType.value;

    let date = event.target.formGridDate.value;
    if (event.target.formGridDateTodayCheckbox.checked === true) {
      date = new Date().toISOString().slice(0,10);
    }

    let time = event.target.formGridTime.value;
    let seenTime = event.target.formGridSeenTime.value;
    let checkinTime = event.target.formGridCheckinTime.value;
    let location = event.target.formGridLocation.value;
    let description = event.target.formGridDescription.value;
    let inProgress = event.target.formGridInProgress.value;
    let attended = event.target.formGridAttended.value;
    let important = event.target.formGridImportant.value;

    if (title.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      title  = this.context.selectedAppointment.title;
    }
    if (type.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      type  = this.context.selectedAppointment.type;
    }
    if (date.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      date  = this.context.selectedAppointment.date;
    }
    if (time.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      time  = this.context.selectedAppointment.time;
    }
    if (seenTime.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      seenTime  = this.context.selectedAppointment.seenTime;
    }
    if (checkinTime.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      checkinTime  = this.context.selectedAppointment.checkinTime;
    }
    if (location.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      location  = this.context.selectedAppointment.location;
    }
    if (description.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      description  = this.context.selectedAppointment.description;
    }
    if (inProgress.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      inProgress  = this.context.selectedAppointment.inProgress;
    }
    if (attended.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      attended  = this.context.selectedAppointment.attended;
    }
    if (important.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      important  = this.context.selectedAppointment.important;
    }

    const requestBody = {
      query: `
      mutation {updateAppointment(userId:"${userId}",appointmentId:"${appointmentId}",appointmentInput:{title:"${title}",type:"${type}",date:"${date}",time:"${time}",seenTime:"${seenTime}",checkinTime:"${checkinTime}",location:"${location}",description:"${description}",inProgress:${inProgress},attended:${attended},important:${important},})
      {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title}},inProgress,attended,important,notes}}
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
        const updatedAppointmentId = resData.data.updateAppointment._id;
        const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
        const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
        const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
        this.state.appointments.push(resData.data.updateAppointment);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchAppointments();
      })
      .catch(err => {
        this.setState({userAlert: err});
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
      this.setState({userAlert: "No edit permission!!"});
      return;
    }

    if (selectedPatientId === undefined) {
        this.setState({userAlert: "select a Patient before creating an Appointment!!..."});
        return
    }

    this.setState({ updating: false , patientUpdateField: null, userAlert: "updating appointment patient..." });

      const requestBody = {
        query:`
        mutation {updateAppointmentPatient(userId:"${userId}",appointmentId:"${selectedAppointmentId}",patientId:"${selectedPatientId}")
        {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title},consultant{reference{_id,name,role}}},inProgress,attended,important}}
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
        const updatedAppointmentId = resData.data.updateAppointmentPatient._id;
        const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
        const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
        const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
        this.state.appointments.push(resData.data.updateAppointmentPatient);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchAppointments();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  modalConfirmUpdateFieldHandler = (event) => {
    event.preventDefault();

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedAppointmentId = this.context.selectedAppointment._id;
    if( this.context.user.role !== 'admin') {
      this.setState({ userAlert: "Not the creator or Admin! No edit permission!!"});
      selectedAppointmentId = null;
    }
    this.setState({ updating: false, userAlert: "Updating selected Appointment by Field" });

    let field = null;
    let query = event.target.formGridQuery.value;
    if (event.target.formGridFieldSelect.value === "select") {
      field = event.target.formGridField.value;
    } else {
      field = event.target.formGridFieldSelect.value;
    }

    const requestBody = {
      query:`
      mutation {updateAppointmentField(userId:"${userId}",appointmentId:"${selectedAppointmentId}",field:"${field}",query:"${query}")
      {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title}},inProgress,attended,important,notes}}
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
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        const updatedAppointmentId = resData.data.updateAppointmentField._id;
        const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
        const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
        const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
        this.state.appointments.push(resData.data.updateAppointmentField);
        this.context.appointments = this.state.appointments;
        this.fetchAppointments();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  modalConfirmSearchHandler = (event) => {

    let userId = this.context.userId;
    const token = this.context.token;

    this.setState({ searching: false, userAlert: "Searching for Appointment..." });

    let field = null;
    let query = event.target.formBasicQuery.value;
    if (event.target.formBasicFieldSelect.value === "select") {
      field = event.target.formBasicField.value;
    } else {
      field = event.target.formBasicFieldSelect.value;
    }

    if (
      field.trim().length === 0 ||
      query.trim().length === 0
    ) {
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
      return;
    }

    const search = { field, query }
    const requestBody = {
      query: `
        query {getAppointmentField(userId:"${userId}", field:"${field}", query:"${query}")
        {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title},consultant{reference{_id,name,role}}},inProgress,attended,important}}
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({ searchAppointments: resData.data.getAppointmentField, userAlert: responseAlert})
        // this.fetchAppointments();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  modalConfirmSearchIdHandler = (event) => {

      let userId = this.context.userId;
      const token = this.context.token;
      this.setState({ searching: false, userAlert: "Searching for Appointment by Id..." });
      let selectedAppointmentId = event.target.formBasicId.value;
      const requestBody = {
        query: `
          query {getAppointmentId(userId:"${userId}", appointmentId:"${selectedAppointmentId}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({ searchAppointments: [resData.data.getAppointmentId], userAlert: responseAlert})
          // this.fetchUsers();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
  }

  modalConfirmSearchPatientHandler = (event) => {

      let userId = this.context.userId;
      const token = this.context.token;
      this.setState({ searching: false, userAlert: "Searching for Appointment by Patient..." });
      let selectedPatientId = event.target.formBasicPatientId.value;
      const requestBody = {
        query: `
          query {getAppointmentPatient(userId:"${userId}", patientId:"${selectedPatientId}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({ searchAppointments: resData.data.getAppointmentPatient, userAlert: responseAlert })
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }
  modalConfirmSearchDateHandler = (event) => {

      let userId = this.context.userId;
      const token = this.context.token;
      this.setState({ searching: false, userAlert: "Searching for Appointment by Date..." });
      let appointmentDate = event.target.formBasicDate.value;
      if (event.target.formBasicDateTodayCheckbox.checked === true) {
        appointmentDate = new Date().toISOString().slice(0,10);
      }

      const requestBody = {
        query: `
          query {getAppointmentDate(userId:"${userId}",date:"${appointmentDate}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({ searchAppointments: resData.data.getAppointmentDate, userAlert: responseAlert});
        // this.fetchUsers();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });

  }
  modalConfirmSearchDateRangeHandler = (event) => {

      let userId = this.context.userId;
      const token = this.context.token;
      this.setState({ searching: false, userAlert: "Searching for Appointment by Date range..." });
      let appointmentStartDate = event.target.formBasicStartDate.value;
      let appointmentEndDate = event.target.formBasicEndDate.value;

      const requestBody = {
        query: `
          query {getAppointmentDateRange(userId:"${userId}",startDate:"${appointmentStartDate}",endDate:"${appointmentEndDate}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({ searchAppointments: resData.data.getAppointmentDateRange, userAlert: responseAlert});
        // this.fetchUsers();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }



  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, searching: false, selectedAppointment: null });
  };


  fetchAppointments() {

    const userId = this.context.userId;
    const token = this.context.token;
    this.setState({ isLoading: true, userAlert: "Fetching Appointment Master List..." });
    const requestBody = {
      query: `
            query {appointments(userId:"${userId}")
            {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,contact{email,phone},consultant{reference{_id,name,role}}},inProgress,attended,important,notes}}
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        if (this.isActive) {
          this.setState({ appointments: resData.data.appointments, isLoading: false, userAlert: responseAlert });
          this.context.appointments = this.state.appointments;
        }
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  fetchAppointmentsAsc = () => {

    const userId = this.context.userId;
    const token = this.context.token;
    this.setState({ isLoading: true, userAlert: "Fetching Appointment Master List in Ascending order..." });
    const requestBody = {
      query: `
            query {appointmentsDateAsc(userId:"${userId}")
            {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,contact{email,phone},consultant{reference{_id,name,role}}},inProgress,attended,important,notes}}
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({appointments: resData.data.appointmentsDateAsc, userAlert: responseAlert, isLoading: false })
        this.context.appointments = resData.data.appointmentsDateAsc;
      })
      .catch(err => {
        this.setState({userAlert: err, isLoading: false});
      });
  }
  fetchAppointmentsDesc = () => {

    this.setState({ isLoading: true, userAlert: "Fetching Appointment Master List in Ascending order..." });
    const userId = this.context.userId;
    const token = this.context.token;
    const requestBody = {
      query: `
            query {appointmentsDateDesc(userId:"${userId}")
            {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,contact{email,phone},consultant{reference{_id,name,role}}},inProgress,attended,important,notes}}
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
        const appointments = resData.data.appointmentsDateDesc;
        console.log(appointments);
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.context.appointments = appointments;
        this.setState({appointments: appointments, userAlert: responseAlert, isLoading: false})
        // if (this.isActive) {
        //   this.setState({ appointments: appointments, isLoading: false });
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

  modalDeleteHandler = () => {

    const userId = this.context.userId;
    const selectedAppointmentId = this.context.selectedAppointment._id;

    if(this.context.user.role !== 'admin') {
      this.setState({userAlert: "Not the Admin! No edit permission!!"});
    }

    this.setState({deleting: true, userAlert: "Deleting selected Appointment..."});

    const requestBody = {
      query: `
          mutation {deleteAppointment(userId:"${userId}",appointmentId:"${selectedAppointmentId}")
          {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title}},inProgress,attended,important,notes}}
        `};

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
        let deletedAppointment = resData.data.deleteAppointment;
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        let deletedAppointmentId = deletedAppointment._id;
        deletedAppointment = this.state.appointments.find(e => e._id === deletedAppointmentId);
        const deletedAppointmentPos = this.state.appointments.indexOf(deletedAppointment);
        const slicedArray = this.state.appointments.splice(deletedAppointmentPos, 1);
        this.setState({ deleting: false, userAlert: responseAlert });
        this.fetchAppointments();
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ deleting: false });
        }
      });


  }

  updateAppointmentSpecial (event) {

    const field = event.target.value;
    this.setState({ appointmentUpdateField: field});

  }


  showDetailHandler = appointmentId => {

    this.setState(prevState => {
      const selectedAppointment = prevState.appointments.find(e => e._id === appointmentId);
      this.setState({selectedAppointment: selectedAppointment});
      this.context.selectedAppointment = selectedAppointment;
      return { selecteAppointment: selectedAppointment };
    });
  };


  fetchAppointmentToday() {

    this.setState({ userAlert: "Fetching Today's Appointments..."})
    const token = this.context.token;
    const userId = this.context.userId;
    const requestBody = {
      query: `
          query {getAppointmentToday(userId:"${userId}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
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
        this.context.appointmentsToday = resData.data.getAppointmentToday;
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }


  fetchAppointmentInProgress() {

    this.setState({ userAlert: "Fetching Today's Appointments In-Progress..."})
    const token = this.context.token;
    const userId = this.context.userId;
    const requestBody = {
      query: `
          query {getAppointmentField(userId:"${userId}",field:"inProgress",query:"true"){_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
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
        this.context.appointmentsInProgress = resData.data.getAppointmentField;
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});
        if (this.state.selectedPatient === {} || this.context.selectedstate === null) {
          this.setState({userAlert: "No Patient Selected"})
        }
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  createPdf = (appointment) => {

      const pdfData = {
        title: "This pdf is supplied with Appointment data...",
        appointment: {
          _id: appointment._id,
          title: appointment.title,
          type: appointment.type,
          date: appointment.date,
          time: appointment.time,
          seenTime: appointment.seenTime,
          checkinTime: appointment.checkinTime,
          location: appointment.location,
          description: appointment.description,
          patient:{
            _id: appointment.patient._id,
            name: appointment.patient.name,
            contact:
            {
              email: appointment.patient.contact.email,
              phone: appointment.patient.contact.phone
            }},
              inProgress: appointment.inProgress,
              attended: appointment.attended,
              important: appointment.important,
              notes: appointment.notes
            }
        }

    this.setState({createPdf: true, pdfData: pdfData})
  }

  closePdfCreator = () => {

      this.setState({createPdf: false, pdfData: null})
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>

      {this.state.createPdf === true && (
          <PdfCreator
            pdfData={this.state.pdfData}
            onClosePdfCreator={this.closePdfCreator}
          />
      )}

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

          <Tab.Container id="left-tabs-example" defaultActiveKey="appointmentDetail">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="MasterList">MASTER LIST</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="appointmentDetail">Selected</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="appointmentCreate">Create New</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>Edit:</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="appointmentEditBasic">Basic Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="appointmentEditField">Single Field</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="appointmentEditPatient">Patient</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>Search:</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="SearchInput">Input</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="SearchResult">Results</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="appointmentDetail">
                    {this.state.selectedAppointment === null && (
                      <Button variant="outline-warning" size="lg" className="confirmEditButton">
                        Select an Appointment from the Master List
                      </Button>
                    )}
                    {
                      this.state.isLoading === false &&
                      this.state.selectedAppointment !== null
                      &&
                      (
                        <AppointmentDetail
                        authUserId={this.context.userId}
                        appointment={this.state.selectedAppointment}
                        onEdit={this.startUpdateAppointmentHandler}
                        canDelete={this.state.canDelete}
                        onDelete={this.modalDeleteHandler}
                        onCreatePdf={this.createPdf}
                        />
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="appointmentCreate">
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startCreateAppointmentHandler} >Create New</Button>
                    {
                      this.state.creating &&
                      this.context.selectedPatient._id !== null
                      && (
                        <CreateAppointmentForm
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.modalConfirmHandler}
                          onSubmit={this.modalConfirmHandler}
                          confirmText="Confirm"
                          selectedPatient={this.context.selectedPatient}
                        />
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="appointmentEditBasic">
                    {this.state.selectedAppointment === null && (
                      <Button variant="outline-warning" size="lg" className="confirmEditButton">
                        Select an Appointment from the Master List
                      </Button>
                    )}
                    {this.state.selectedAppointment !== null && (
                      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateAppointmentHandler}>Edit Basic Data</Button>
                    )}
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
                  </Tab.Pane>

                  <Tab.Pane eventKey="appointmentEditField">
                    {this.state.selectedAppointment === null && (
                      <Button variant="outline-warning" size="lg" className="confirmEditButton">
                        Select an Appointment from the Master List
                      </Button>
                    )}
                    {this.state.selectedAppointment !== null && (
                      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateAppointmentHandler}>Edit a Single Field</Button>
                    )}
                    {this.state.updating &&
                      this.state.selectedAppointment !== null
                      && (
                        <UpdateAppointmentFieldForm
                          authUserId={this.context.userId}
                          canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.modalConfirmUpdateFieldHandler}
                          confirmText="Confirm"
                          appointment={this.state.selectedAppointment}
                        />
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="appointmentEditPatient">
                    {this.state.selectedAppointment === null && (
                      <Button variant="outline-warning" size="lg" className="confirmEditButton">
                        Select an Appointment from the Master List
                      </Button>
                    )}
                    {this.state.selectedAppointment !== null && (
                      <Button variant="outline-primary" size="lg" className="confirmEditButton" value='patient' onClick={this.updateAppointmentSpecial.bind(this)}>Change Patient:</Button>
                    )}
                    {this.state.selecteAppointment !== null &&
                      this.context.selectedPatient === null &&
                      this.state.appointmentUpdateField === "patient" && (
                        <Button variant="outline-warning" size="lg" className="confirmEditButton">
                          Select someone from the Patients page
                        </Button>
                      )}
                    {this.state.selectedAppointment !== null &&
                      this.context.selectedPatient !== null &&
                      this.state.appointmentUpdateField === "patient" && (
                      <Row>
                      <Col md={8} className="updateUserColAdd">
                      <p><span className="bold">Add Patient :</span> {this.context.selectedPatient.name}</p>
                      <p><span className="bold">To Appointment :</span> {this.state.selectedAppointment.title}  <span className="bold">On :</span> {new Date(this.state.selecteAppointment.date.substr(0,10)*1000).toISOString().slice(0,10)} <span className="bold">At :</span> {this.state.selecteAppointment.time} ??</p>
                      <Button variant="success" onClick={this.updateAppointmentPatientHandler}>
                        Yes
                      </Button>
                      </Col>
                      </Row>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="MasterList">
                    <Container className="containerUserMasterList">
                    <Row className="searchListRow">
                    <Button variant="primary" size="sm" onClick={this.fetchAppointmentsAsc}>
                       Sort Asc
                     </Button>
                    <Button variant="info" size="sm" onClick={this.fetchAppointmentsDesc}>
                       Sort Desc
                     </Button>
                    {this.state.isLoading ? (
                      <Spinner />
                    ) :
                    (
                      <AppointmentList
                        appointments={this.state.appointments}
                        authUserId={this.context.userId}
                        onViewDetail={this.showDetailHandler}
                      />
                    )}
                    </Row>
                    </Container>
                  </Tab.Pane>

                  <Tab.Pane eventKey="SearchInput">
                    <Container className="containerSearchUserInput">
                    <Row className="searchUserRowAdd">
                    <Button variant="primary" onClick={this.startSearchAppointmentHandler}>Search</Button>
                    </Row>

                    <Row className="searchUserRowForm">
                    <Col md={10} className="searchUserColForm">
                    <Tabs defaultActiveKey="Field" id="uncontrolled-tab-example">
                    <Tab eventKey="Search" title="Search:" disabled>
                    </Tab>
                    <Tab eventKey="Field" title="Search by Field:">
                    {this.state.searching !== true && (
                      <Button variant="outline-warning" className="confirmEditButton" size="lg">
                        Click the 'Search' Button start
                      </Button>
                    )}
                    {this.state.searching === true && (
                      <SearchAppointmentForm
                      authUserId={this.context.userId}
                      canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.modalConfirmSearchHandler}
                        confirmText="Search"
                        appointment={this.context.selectedAppointment}
                      />
                    )}
                    </Tab>
                    <Tab eventKey="Id" title="Search by Id:">
                    {this.state.searching !== true && (
                      <Button variant="outline-warning" className="confirmEditButton" size="lg">
                        Click the 'Search' Button start
                      </Button>
                    )}
                      {this.state.searching === true && (
                        <SearchAppointmentIdForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.modalConfirmSearchIdHandler}
                          confirmText="Search"
                          appointment={this.context.selectedAppointment}
                        />
                      )}
                    </Tab>
                    <Tab eventKey="Patient" title="Search by Patient:">
                    {this.state.searching !== true && (
                      <Button variant="outline-warning" className="confirmEditButton" size="lg">
                        Click the 'Search' Button start
                      </Button>
                    )}
                      {this.state.searching === true && (
                        <SearchAppointmentPatientForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.modalConfirmSearchPatientHandler}
                          confirmText="Search"
                          appointment={this.context.selectedAppointment}
                        />
                      )}
                    </Tab>
                    <Tab eventKey="Date" title="Search by Date:">
                    {this.state.searching !== true && (
                      <Button variant="outline-warning" className="confirmEditButton" size="lg">
                        Click the 'Search' Button start
                      </Button>
                    )}
                      {this.state.searching === true && (
                        <SearchAppointmentDateForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.modalConfirmSearchDateHandler}
                          confirmText="Search"
                          appointment={this.context.selectedAppointment}
                        />
                      )}
                    </Tab>
                    <Tab eventKey="Date Range" title="Search by Date Range:">
                    {this.state.searching !== true && (
                      <Button variant="outline-warning" className="confirmEditButton" size="lg">
                        Click the 'Search' Button start
                      </Button>
                    )}
                      {this.state.searching === true && (
                        <SearchAppointmentDateRangeForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.modalConfirmSearchDateRangeHandler}
                          confirmText="Search"
                          appointment={this.context.selectedAppointment}
                        />
                      )}
                    </Tab>
                    </Tabs>
                    </Col>
                    <Col md={10}>
                    </Col>
                    </Row>
                    </Container>
                  </Tab.Pane>

                  <Tab.Pane eventKey="SearchResult">
                    <Container className="containerSearchUserResults">
                    <Row>
                      <Card className="searchCard">
                        <Card.Body className="searchCardBody">
                          <Card.Title>Your Search</Card.Title>
                          <Card.Text>
                            Field: {this.state.appointmentSearchField}
                          </Card.Text>
                          <Card.Text>
                            Query: {this.state.appointmentSearchQuery}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Row>
                    <Row className="searchListRow">
                    {
                      this.state.searchAppointments !== [] && (
                      <SearchAppointmentList
                        searchAppointments={this.state.searchAppointments}
                        authUserId={this.context.userId}
                        onCancel={this.modalCancelHandler}
                          onViewDetail={this.showDetailHandler}
                      />
                    )}
                    </Row>
                    </Container>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>


          </Container>

      </Col>
    </Row>

  </Accordion>
      </React.Fragment>
    );
  }
}

export default AppointmentsPage;
