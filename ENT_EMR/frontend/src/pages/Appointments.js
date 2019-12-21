import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SidebarPage from './Sidebar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import AlertBox from '../components/AlertBox';

import AppointmentList from '../components/Appointments/AppointmentList/AppointmentList';
import AppointmentDetail from '../components/Appointments/AppointmentDetail';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
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
    appointmentUpdateField: null,
    appointmentSearchField: null,
    appointmentSearchQuery: null,
    canDelete: null,
    userAlert: null,
  };
  isActive = true;

  static contextType = AuthContext;

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.fetchAppointments();
    this.fetchAppointmentToday();
    this.fetchAppointmentInProgress();
    if (this.context.user.name === 'admin579'){
      this.setState({canDelete: true})
    }
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
    const selectedPatientId = this.context.selectedPatient._id;
    console.log(`
        userId: ${userId}
        patientId: ${selectedPatientId}
      `);

      if (selectedPatientId === undefined) {
        console.log(`
          select a Patient before creating an Appointment!!
          `);
          this.setState({userAlert: "select a Patient before creating an Appointment!!..."});
          return
      }
    const title = event.target.formGridTitle.value;
    const type = event.target.formGridType.value;
    const date = event.target.formGridDate.value;
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
      console.log("blank fields detected!!!...Please try again...");
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
      return
    }

    const appointment = { title, type, date, time, seenTime, checkinTime, location, description, inProgress, attended, important };
    console.log(`
        creating appointment...
        title: ${title},
        type: ${type},
        date: ${date},
        time: ${time},
        seenTime: ${seenTime},
        checkinTime: ${checkinTime},
        location: ${location},
        description: ${description},
        inProgress: ${inProgress},
        attended: ${attended},
        important: ${important},
      `);
      this.setState({userAlert: "creating appointment..."});

    const requestBody = {
      query: `
          mutation {createAppointment(userId:\"${userId}\",patientId:\"${selectedPatientId}\",appointmentInput:{title:\"${title}\",type:\"${type}\",date:\"${date}\",time:\"${time}\",seenTime:\"${seenTime}\",checkinTime:\"${checkinTime}\",location:\"${location}\",description:\"${description}\",inProgress:${inProgress},attended:${attended},important:${important},})
          {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title}},inProgress,attended,important}}
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
        console.log("response data... " + JSON.stringify(resData.data.createAppointment));
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        this.setState(prevState => {
          const updatedAppointments = [...prevState.appointments];
          updatedAppointments.push(resData.data.createAppointment);

          return { appointments: updatedAppointments };
        });
        this.context.appointments = this.state.appointments;
        // this.fetchAppointments();

      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, searching: false, selectedAppointment: null });
  };


  modalConfirmUpdateHandler = (event) => {

    if(this.context.user.role !== 'admin') {
      console.log("Not the Admin! No edit permission!!");
      this.setState({userAlert: "Not the Admin! No edit permission!!"});
    }

    const userId = this.context.userId;
    const appointmentId = this.context.selectedAppointment._id;
    const selectedPatientId = this.context.selectedPatientId;
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
    let seenTime = event.target.formGridSeenTime.value;
    let checkinTime = event.target.formGridCheckinTime.value;
    let location = event.target.formGridLocation.value;
    let description = event.target.formGridDescription.value;
    let inProgress = event.target.formGridInProgress.value;
    let attended = event.target.formGridAttended.value;
    let important = event.target.formGridImportant.value;

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
    if (seenTime.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      seenTime  = this.context.selectedAppointment.seenTime;
    }
    if (checkinTime.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      checkinTime  = this.context.selectedAppointment.checkinTime;
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

    const appointment = { title, type, date, time, seenTime, checkinTime, location, description, inProgress, attended, important, };
    console.log(`
        updating appointment...
        title: ${title},
        type: ${type},
        date: ${date},
        time: ${time},
        seenTime: ${seenTime},
        checkinTime: ${checkinTime},
        location: ${location},
        description: ${description},
        inProgress: ${inProgress},
        attended: ${attended},
        important: ${important},
      `);
      this.setState({userAlert: "updating appointment..."});

    const requestBody = {
      query: `
      mutation {updateAppointment(userId:\"${userId}\",appointmentId:\"${appointmentId}\",appointmentInput:{title:\"${title}\",type:\"${type}\",date:\"${date}\",time:\"${time}\",seenTime:\"${seenTime}\",checkinTime:\"${checkinTime}\",location:\"${location}\",description:\"${description}\",inProgress:${inProgress},attended:${attended},important:${important},})
      {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title}},inProgress,attended,important,notes}}
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
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        const updatedAppointmentId = resData.data.updateAppointment._id;
        const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
        const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
        const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
        console.log("updatedAppointment:  ", JSON.stringify(updatedAppointment),"  updatedPatientPos:  ", updatedAppointmentPos, "  slicedArray:  ", slicedArray);

        this.state.appointments.push(resData.data.updateAppointment);
        this.fetchAppointments();

      })
      .catch(err => {
        console.log(err);
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
      console.log("No edit permission!!");
      this.setState({userAlert: "No edit permission!!"});
      return;
    }

    if (selectedPatientId === undefined) {
      console.log(`
        select a Patient before creating an Appointment!!
        `);
        this.setState({userAlert: "select a Patient before creating an Appointment!!..."});
        return
    }

    this.setState({ updating: false , patientUpdateField: null });

    console.log(`
      updating appointment patient...
      userId: ${userId},
      appointmentId: ${selectedAppointmentId},
      patientId: ${selectedPatientId},
      `);
      this.setState({userAlert: "updating appointment patient..."});

      const requestBody = {
        query:`
        mutation {updateAppointmentPatient(userId:\"${userId}\",appointmentId:\"${selectedAppointmentId}\",patientId:\"${selectedPatientId}\")
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
          console.log("response data... " + JSON.stringify(resData));
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const updatedAppointmentId = resData.data.updateAppointmentPatient._id;
          const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
          const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
          const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
          console.log("updatedAppointment:  ", JSON.stringify(updatedAppointment),"  updatedPatientPos:  ", updatedAppointmentPos, "  slicedArray:  ", slicedArray);

          this.state.appointments.push(resData.data.updateAppointmentPatient);
          this.fetchAppointments();

        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });


  }


  modalConfirmUpdateFieldHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedAppointmentId = this.context.selectedAppointment._id;
    if( this.context.user.role !== 'admin') {
      console.log("Not the creator or Admin! No edit permission!!");
      selectedAppointmentId = null;
    }

      console.log("UpdateAppointmentFieldFormData:  ", event.target.formGridField.value);
      this.setState({ updating: false });

      let field = null;
      let query = event.target.formGridQuery.value;
      if (event.target.formGridFieldSelect.value === "select") {
        field = event.target.formGridField.value;
      } else {
        field = event.target.formGridFieldSelect.value;
      }

      const requestBody = {
        query:`
        mutation {updateAppointmentField(userId:\"${userId}\",appointmentId:\"${selectedAppointmentId}\",field:\"${field}\",query:\"${query}\")
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
          console.log("response data... " + JSON.stringify(resData.data.updateAppointmentField));
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const updatedAppointmentId = resData.data.updateAppointmentField._id;
          const updatedAppointment = this.state.appointments.find(e => e._id === updatedAppointmentId);
          const updatedAppointmentPos = this.state.appointments.indexOf(updatedAppointment);
          const slicedArray = this.state.appointments.splice(updatedAppointmentPos, 1);
          console.log("updatedAppointment:  ", JSON.stringify(updatedAppointment),"  updatedAppointmentPos:  ", updatedAppointmentPos, "  slicedArray:  ", slicedArray);

          this.state.appointments.push(resData.data.updateAppointmentField);
          this.context.appointments = this.state.appointments;
          // this.fetchAppointments();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }


  modalConfirmSearchHandler = (event) => {
    console.log("SearchAppointmentForm:  ");


    let userId = this.context.userId;

      console.log("SearchAppointmentFormData:  ", event.target.formBasicField.value);
      this.setState({ searching: false });

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
        console.log("blank fields detected!!!...Please try again...");
        this.setState({userAlert: "blank fields detected!!!...Please try again..."});
        return;
      }

      const search = { field, query }
      console.log("Searching for Appointment:  ", JSON.stringify(search));

      const requestBody = {
        query: `
          query {getAppointmentField(userId:"${userId}", field:"${field}", query:"${query}")
          {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,appointments{_id,date,title},consultant{reference{_id,name,role}}},inProgress,attended,important}}
        `}

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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const searchAppointments = resData.data.getAppointmentField;

          this.setState({ searchAppointments: searchAppointments})
          console.log("state.searchAppointments:  ", this.state.searchAppointments);
          // this.fetchAppointments();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
  }

  modalConfirmSearchIdHandler = (event) => {
    console.log(`
      SearchAppointmentIdFormData
      `);

      let userId = this.context.userId;
      this.setState({ searching: false });
      let selectedAppointmentId = event.target.formBasicId.value;

      const requestBody = {
        query: `
          query {getAppointmentId(userId:"${userId}", appointmentId:"${selectedAppointmentId}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
        `}

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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const searchAppointments = resData.data.getAppointmentId;

          this.setState({ searchAppointments: [searchAppointments]})
          console.log("state.searchAppointments:  ", this.state.searchAppointments);
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
  }

  modalConfirmSearchPatientHandler = (event) => {
    console.log(`
      SearchAppointmentPatientFormData
      `);

      let userId = this.context.userId;
      this.setState({ searching: false });
      let selectedPatientId = event.target.formBasicPatientId.value;

      const requestBody = {
        query: `
          query {getAppointmentPatient(userId:"${userId}", patientId:"${selectedPatientId}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
        `}

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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          // const responseAlert = JSON.stringify(resData.errors).slice(2,15);
          this.setState({userAlert: responseAlert});

          const searchAppointments = resData.data.getAppointmentPatient;

          this.setState({ searchAppointments: searchAppointments })
          // this.state.searchApointments.push(searchAppointments)
          console.log("state.searchApointments:  ", this.state.searchApointments);
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }
  modalConfirmSearchDateHandler = (event) => {
    console.log(`
      SearchAppointmentDateFormData
      `);

      let userId = this.context.userId;
      this.setState({ searching: false });
      let appointmentDate = event.target.formBasicDate.value;

      const requestBody = {
        query: `
          query {getAppointmentDate(userId:"${userId}",date:"${appointmentDate}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
        `}

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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const searchAppointments = resData.data.getAppointmentDate;

          this.setState({ searchAppointments: searchAppointments})
          console.log("state.searchAppointments:  ", this.state.searchAppointments);
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }
  modalConfirmSearchDateRangeHandler = (event) => {
    console.log(`
      SearchAppointmentDateRangeFormData
      `);

      let userId = this.context.userId;
      this.setState({ searching: false });
      let appointmentStartDate = event.target.formBasicStartDate.value;
      let appointmentEndDate = event.target.formBasicEndDate.value;

      const requestBody = {
        query: `
          query {getAppointmentDateRange(userId:"${userId}",startDate:"${appointmentStartDate}",endDate:"${appointmentEndDate}")
          {_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
        `}

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
          const responseAlert = JSON.stringify(resData.data).slice(2,15);
          this.setState({userAlert: responseAlert});

          const searchApointments = resData.data.getApointmentId;

          this.setState({ searchApointments: searchApointments})
          console.log("state.searchApointments:  ", this.state.searchApointments);
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
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
            query {appointments(userId:"${userId}")
            {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,consultant{reference{_id,name,role}}},inProgress,attended,important,notes}}
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
        const appointments = resData.data.appointments;
        console.log(appointments);
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        this.context.appointments = this.state.appointments;
        if (this.isActive) {
          this.setState({ appointments: appointments, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  fetchAppointmentsAsc = () => {
    console.log("'fetch appointments function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
            query {appointmentsDateAsc(userId:"${userId}")
            {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,consultant{reference{_id,name,role}}},inProgress,attended,important,notes}}
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
        const appointments = resData.data.appointmentsDateAsc;
        console.log(appointments);
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        this.context.appointments = appointments;
        this.setState({appointments: appointments})
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
  fetchAppointmentsDesc = () => {
    console.log("'fetch appointments function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
            query {appointmentsDateDesc(userId:"${userId}")
            {_id,title,type,date,time,seenTime,checkinTime,location,description,patient{_id,name,consultant{reference{_id,name,role}}},inProgress,attended,important,notes}}
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
        const appointments = resData.data.appointmentsDateDesc;
        console.log(appointments);
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

        this.context.appointments = appointments;
        this.setState({appointments: appointments})
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
    console.log("deleting appointment...selectedAppointment:  ", this.context.selectedAppointment);

    const userId = this.context.userId;
    const selectedAppointmentId = this.context.selectedAppointment._id;

    if(this.context.user.role !== 'admin') {
      console.log("Not the Admin! No edit permission!!");
      this.setState({userAlert: "Not the Admin! No edit permission!!"});
    }

    this.setState({deleting: true});


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
        console.log("resData:  ", resData);
        // console.log("resData.data.deleteAppointment:  ", resData.data.deleteAppointment);
        let deletedAppointment = resData.data.deleteAppointment;
        console.log(deletedAppointment);
        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});

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
        this.setState({userAlert: err});
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


  fetchAppointmentToday() {
    console.log("fetching todays appts function:  ");

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
        console.log("context today's appts:  ", JSON.stringify(this.context.appointmentsToday));

        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });


  }


  fetchAppointmentInProgress() {
    console.log("fetching inProgress appts function:  ");

    const token = this.context.token;
    const userId = this.context.userId;

    const requestBody = {
      query: `
          query {getAppointmentField(userId:\"${userId}\",field:\"inProgress\",query:\"true\"){_id,title,type,date,time,patient{_id,name},location,description,inProgress,important,attended}}
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
        console.log("context in progress appts:  ", JSON.stringify(this.context.appointmentsInProgress));

        const responseAlert = JSON.stringify(resData.data).slice(2,15);
        this.setState({userAlert: responseAlert});
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });


  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>

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
            <Tabs defaultActiveKey="appointmentDetail" id="uncontrolled-tab-example">
            <Tab eventKey="Edit" title="Edit:" disabled>
            </Tab>
              <Tab eventKey="appointmentDetail" title="Details">
                  {this.state.selectedAppointment === null && (
                    <Button variant="outline-warning" size="lg">
                      Select an Appointment from the Master List below
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
                  />
                )}
              </Tab>

              <Tab eventKey="appointmentCreate" title="New">
              <Button variant="outline-primary" onClick={this.startCreateAppointmentHandler} >Create</Button>
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
              </Tab>

              <Tab eventKey="appointmentEditBasic" title="Basic">
              {this.state.selectedAppointment === null && (
                <Button variant="outline-warning" size="lg">
                  Select an Appointment from the Master List below
                </Button>
              )}
              {this.state.selectedAppointment !== null && (
                <Button variant="outline-primary" onClick={this.startUpdateAppointmentHandler}>Edit Basic</Button>
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
              </Tab>

              <Tab eventKey="appointmentEditField" title="Single Field">
              {this.state.selectedAppointment === null && (
                <Button variant="outline-warning" size="lg">
                  Select a Patient from the Master List below
                </Button>
              )}
              {this.state.selectedAppointment !== null && (
                <Button variant="outline-primary" onClick={this.startUpdateAppointmentHandler}>Edit Field</Button>
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
              </Tab>

              <Tab eventKey="appointmentEditPatient" title="Patient">
              {this.state.selectedAppointment === null && (
                <Button variant="outline-warning" size="lg">
                  Select an Appointment from the Master List below
                </Button>
              )}
              {this.state.selectedAppointment !== null && (
                <Button variant="outline-primary" value='patient' onClick={this.updateAppointmentSpecial.bind(this)}>Change Patient:</Button>
              )}
              {this.state.selectedAppointment !== null &&
              this.context.selectedPatient !== null && (
                <Row>
                <Col md={8} className="updateUserColAdd">
                <p>Add Patient: {this.context.selectedPatient.name}</p>
                <p> To Appointment: {this.state.selectedAppointment.title} ??</p>
                <Button variant="success" onClick={this.updateAppointmentPatientHandler}>
                  Yes
                </Button>
                </Col>
                </Row>
              )}
              </Tab>

              <Tab eventKey="MasterList" title="Master List">
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
              </Tab>

              <Tab eventKey="SearchInput" title="Search">
              <Container className="containerSearchUserInput">
              <Row className="searchUserRowAdd">
              <Button variant="primary" onClick={this.startSearchAppointmentHandler}>Search</Button>
              </Row>

              <Row className="searchUserRowForm">
              <Col md={10} className="searchUserColForm">
              <Tabs defaultActiveKey="Field" id="uncontrolled-tab-example">
              <Tab eventKey="Search" title="Search:" disabled>
              </Tab>
              <Tab eventKey="Field" title="Field:">
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
              <Tab eventKey="Id" title="Id:">
                Search by ID
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
              <Tab eventKey="Patient" title="Patient:">
                Search by Patient
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
              <Tab eventKey="Date" title="Date:">
                Search by Date
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
              <Tab eventKey="Date Range" title="Date Range:">
                Search by Date Range
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
              </Tab>

              <Tab eventKey="SearchResult" title="Search Results">
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
              </Tab>

            </Tabs>
          </Container>

      </Col>
    </Row>

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
