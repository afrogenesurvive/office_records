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
    console.log("CreateUserFormData:  ", event.target.formGridEmail.value);

    this.setState({ creating: false });
    const email = event.target.formGridEmail.value;
    const password = event.target.formGridPassword.value;
    const name = event.target.formGridName.value;
    const role = event.target.formGridRole.value;
    let dob = event.target.formGridDob.value;
    let phone = event.target.formGridPhone.value;
    let addressNumber = event.target.formGridAddressNumber.value;
    let addressStreet = event.target.formGridAddressStreet.value;
    let addressTown = event.target.formGridAddressTown.value;
    let addressParish = event.target.formGridAddressParish.value;
    let addressPostOffice = event.target.formGridAddressPostOffice.value;
    let employmentDate = event.target.formGridEmploymentDate.value;
    let terminationDate = event.target.formGridTerminationDate.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      role.trim().length === 0 ||
      dob.trim().length === 0 ||
      phone.trim().length === 0 ||
      addressNumber.trim().length === 0 ||
      addressStreet.trim().length === 0 ||
      addressTown.trim().length === 0 ||
      addressParish.trim().length === 0 ||
      addressPostOffice.trim().length === 0 ||
      employmentDate.trim().length === 0 ||
      terminationDate.trim().length === 0
    ) {
      console.log("blank fields detected!!!...Please try again...");
      return;
    }

    const token = this.context.token;
    const userId = this.context.userId;
    const user = { email, password, name, role, dob, phone, addressNumber, addressStreet, addressTown, addressParish, addressPostOffice, employmentDate, terminationDate };

    console.log(`
      creating user...
      userId: ${userId}
      email: ${email},
      password: ${password},
      name: ${name},
      role: ${role},
      dob: ${dob},
      phone: ${phone},
      addressNumber: ${addressNumber},
      addressStreet: ${addressStreet},
      addressTown: ${addressTown},
      addressParish: ${addressParish},
      addressPostOffice: ${addressPostOffice},
      employmentDate: ${employmentDate},
      terminationDate: ${terminationDate},
      `);

    const requestBody = {
      query: `
          mutation {
            createUser(userInput: {email:"${email}",password:"${password}",name:"${name}",role:"${role}",

            employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"})
            {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}
          }
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
