import React from 'react';
import { NavLink } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';


const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>ENT EMR 0.1.3</h1>

          </div>
          <nav className="main-navigation__items">

            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">Login</NavLink>
                </li>
              )}
              {!context.token && (
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              )}
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/profile">My Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/users">Staff</NavLink>
                  </li>
                  <li>
                    <NavLink to="/patients">Patients</NavLink>
                  </li>
                  <li>
                    <NavLink to="/appointments">Appointments</NavLink>
                  </li>
                  <li>
                    <NavLink to="/help">Help</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
