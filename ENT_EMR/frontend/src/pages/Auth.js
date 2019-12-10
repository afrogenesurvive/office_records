import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import './Auth.css';
import AuthContext from '../context/auth-context';
// import ThisUserContext from '../context/thisUser-context';

class AuthPage extends Component {
  // state = {
  //   isLogin: true
  // };

  static contextType = AuthContext;
  // static contextType = ThisUserContext;

  // constructor(props) {
  //   super(props);
  // }

  // switchModeHandler = () => {
  //   this.setState(prevState => {
  //     return { isLogin: !prevState.isLogin };
  //   });
  // };


  submitHandler = event => {
    console.log("login function...");
    event.preventDefault();
    const email = event.target.formBasicEmail.value;
    const password = event.target.formBasicPassword.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };


    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log("your data... " + JSON.stringify(resData.data));
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );

          // const sessionStorageLoginInfo = {
          //   token: resData.data.login.token,
          //   userId: resData.data.login.userId,
          //   tokenExpiration: resData.data.login.tokenExpiration
          // };

          // sessionStorage.setItem('login info', sessionStorageLoginInfo);
          // sessionStorage.setItem('login info', JSON.stringify(sessionStorageLoginInfo));

        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form className="auth-form" onSubmit={this.submitHandler}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="outline-success" type="submit" className="loginButton" size="lg">
        Login
      </Button>

      <Button variant="outline-warning" className="loginButton" size="lg">
        <NavLink to="/signup">Signup</NavLink>
      </Button>
    </Form>
    );
  }
}

export default AuthPage;
