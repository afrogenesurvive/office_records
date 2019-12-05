import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import CreateUserForm from '../components/Forms/CreateUserForm';
import './Auth.css';

class SignupPage extends Component {
  state = {
    success: "Signup!!"
  };

  modalConfirmHandler = (event) => {

    event.preventDefault();
    console.log("signing up...");


    this.setState({ creating: false });
    const email = event.target.formGridEmail.value;
    const password = event.target.formGridPassword.value;
    const name = event.target.formGridName.value;
    const role = event.target.formGridRole.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      role.trim().length === 0
    ) {
      console.log("empty fields present!!!");
      this.setState({success: "Empty fields present!!!" });
      return;
    }

    const user = { email, password, name, role };
    console.log("creating user.. " + JSON.stringify(user));

    const requestBody = {
      query: `
          mutation CreateUser($email: String!, $password: String!, $name: String!, $role: String!) {
            createUser(userInput: {email: $email, password: $password, name: $name, role: $role}) {
              _id
              email
              password
              name
              role
            }
          }
        `,
        variables: {
          email: email,
          password: password,
          name: name,
          role: role
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
        console.log("resData head slice:  ", JSON.stringify(resData).slice(2,7));
        if (JSON.stringify(resData).slice(2,7) === 'error') {
          console.log("signup...failed...");
          this.setState({success: "Something went wrong!!!" });
        } else {
          this.setState({success: "Signup success...Proceed to login" });
          console.log(this.state.success);
        }

      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>

      <Row>
      <Col className="signupRow" md={8}>
        <CreateUserForm
          canConfirm
          onConfirm={this.modalConfirmHandler}
          onSubmit={this.modalConfirmHandler}
          confirmText="Confirm"
          successText={this.state.success}
        />
      </Col>
      </Row>

      </React.Fragment>
    );
  }
}

export default SignupPage;
