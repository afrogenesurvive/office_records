import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
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
    sessionStorageAuth: null
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
    this.setState({ token: null, userId: null });
    sessionStorage.clear();
  };


  componentDidMount() {

    // this.state.sessionStorageAuth = sessionStorage.getItem('login info');
    // console.log("  this.state.sessionStorageAuth:  ", {this.state.sessionStorageAuth);

    // const sessionStorageToken = sessionStorage.getItem('sessionStorageToken');
    // this.sessionStorageToken = sessionStorageToken;
    // this.context.token = sessionStorageToken;
    // console.log("sessionStorageToken:  ", JSON.stringify(this.sessionStorageToken), "  ...  ", JSON.stringify(this.context.token));

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
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>

                { // logged in -> pages
                this.state.token && <Redirect from="/" to="/users" exact />}
                {this.state.token && (<Route path="/users" component={UsersPage} />)}
                {this.state.token && (<Route path="/patients" component={PatientsPage} />)}
                {this.state.token && (<Route path="/appointments" component={AppointmentsPage} />)}
                {this.state.token && (<Route path="/profile" component={ThisUserPage} />)}

                { // logged in -> users page from login page
                  this.state.token && (<Redirect from="/auth" to="/profile" exact />)}

                { //if not logged in -> go to login page
                  !this.state.token && (<Route path="/auth" component={AuthPage} />)}
                  {!this.state.token && (<Route path="/signup" component={SignupPage} />)}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
            {this.state.token && (
              <SidebarPage />
            )}

          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
