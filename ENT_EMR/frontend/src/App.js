import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import HelpPage from './pages/Help';
import SignupPage from './pages/Signup';
import UsersPage from './pages/Users';
import PatientsPage from './pages/Patients';
import AppointmentsPage from './pages/Appointments';
import ThisUserPage from './pages/thisUser';
import SidebarPage from './pages/Sidebar';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    context: this.context,
    sessionCookiePresent: false,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.sessionStorageAuth = null;
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({
       token: null,
       userId: null,
       sessionCookiePresent: null
      });
    sessionStorage.clear();
    this.context = {
      token: null,
      userId: null,
      user: {},
      users:[],
      selectedUser: {},
      selectedPatient: {},
      selectedAppointment: {},
      patient: {},
      appointment: {},
      appointmentPatientId: null,
      userUpdateField: null,
      patientUpdateField: null,
      appointmentUpdateField: null,
      appointmentsToday: null,
      appointmentsWeekImportant: null,
      appointmentsInProgress: null,
      userAlert: "",
      visit: null,
      file: null,
      fancyDate: null,
      fancyDate2: null,
      fancyDate3: null,
      fancyDate4: null,
      login: this.login,
      logout: this.logout,
      creds: null,
    }
  };


  componentDidMount() {

    if (sessionStorage.getItem('login info')) {

      let seshStore = sessionStorage.getItem('login info');
      this.context.token = seshStore.token;
      this.context.userId = seshStore.userId;
      this.setState({
        sessionCookiePresent: true,
        userId: seshStore.userId,
        token: seshStore.token,
        });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              user: {},
              users:[],
              selectedUser: {},
              selectedPatient: {},
              selectedAppointment: {},
              patient: {},
              appointment: {},
              appointmentPatientId: null,
              userUpdateField: null,
              patientUpdateField: null,
              appointmentUpdateField: null,
              appointmentsToday: null,
              appointmentsWeekImportant: null,
              appointmentsInProgress: null,
              userAlert: "",
              visit: null,
              file: null,
              fancyDate: null,
              fancyDate2: null,
              fancyDate3: null,
              fancyDate4: null,
              login: this.login,
              logout: this.logout,
              creds: null,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>

                { // logged in -> pages
                this.state.token && <Redirect from="/" to="/users" exact />}
                {this.state.token && (<Route path="/help" component={HelpPage} />)}
                {this.state.token && (<Route path="/users" component={UsersPage} />)}
                {this.state.token && (<Route path="/patients" component={PatientsPage} />)}
                {this.state.token && (<Route path="/appointments" component={AppointmentsPage} />)}
                {this.state.token && (<Route path="/profile" component={ThisUserPage} />)}
                {this.state.token && (<Redirect from="/auth" to="/profile" exact />)}

                { //if not logged in -> go to login page
                !this.state.token && (<Route path="/auth" component={AuthPage} />)}
                {!this.state.token && (<Route path="/signup" component={SignupPage} />)}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>

          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
