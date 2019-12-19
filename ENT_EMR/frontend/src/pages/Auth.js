import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


import './Auth.css';
import AuthContext from '../context/auth-context';
import AlertBox from '../components/AlertBox';


class AuthPage extends Component {
  state = {
    userAlert: null,
  };
  static contextType = AuthContext;

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
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `};


    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          // this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        // this.context.userAlert = 'Failed!';
        return res.json();
      })
      .then(resData => {
        const responseAlert = JSON.stringify(resData.data).slice(0,8)
        console.log(`
          resData slice: ${responseAlert},
          resData: ${JSON.stringify(resData.data)},
          `);

          this.setState({userAlert: responseAlert})
        // FIX ME!!!
        // repeat for signup,login,profile,user,patient,app pages
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
        this.setState({userAlert: err});
        // this.context.userAlert = err;
        // console.log(`
        //   err: ${this.context.userAlert}
        //   `);
      });
  };

  render() {
    return (
      <Row>
      <AlertBox
        authUserId={this.context.userId}
        alert={this.state.userAlert}
      />


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

      </Row>


    );
  }
}

export default AuthPage;
