import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import PatientList from '../components/Patients/PatientList/PatientList';
import PatientDetail from '../components/Patients/PatientDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Patients.css';

class PatientsPage extends Component {
  state = {
    creating: false,
    patients: [],
    isLoading: false,
    selectedPatient: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElRef = React.createRef();
    this.passwordElRef = React.createRef();
    this.nameElRef = React.createRef();
    this.usernameElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.avatarElRef = React.createRef();
    this.dobElRef = React.createRef();
    this.phoneElRef = React.createRef();
    this.addressElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchPatients();
  }


  startCreatePatientHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const email = this.emailElRef.current.value;
    const password = this.passwordElRef.current.value;
    const name = this.nameElRef.current.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      username.trim().length === 0 ||
    ) {
      return;
    }

    const user = { email, password, name, username, description, avatar, dob, phone, address };
    console.log("creating user.. " + JSON.stringify(user));

    const requestBody = {
      query: `
          mutation CreateUser($email: String!, $password: String!, $name: String!, $username: String!, $description: String!, $avatar: String!, $dob: String!, $phone: String!, $address: String!) {
            createUser(userInput: {email: $email, password: $password, name: $name, username: $username, description: $description, avatar: $avatar, dob: $dob, phone: $phone, address: $address}) {
              _id
              email
              password
              name
              username
              description
              avatar
              dob
              phone
              address
            }
          }
        `,
        variables: {
          email: email,
          password: password,
          name: name,
          username: username,
          description: description,
          avatar: avatar,
          dob: dob,
          phone: phone,
          address: address
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
        this.setState(prevState => {
          const updatedUsers = [...prevState.users];
          updatedUsers.push({
            _id: resData.data.createUser._id,
            email: resData.data.createUser.email,
            name: resData.data.createUser.name,
            username: resData.data.createUser.username,
            description: resData.data.createUser.description,
            avatar: resData.data.createUser.avatar,
            dob: resData.data.createUser.dob,
            phone: resData.data.createUser.phone,
            address: resData.data.createUser.address,
          });

          return { users: updatedUsers };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedUser: null });
  };

  fetchUsers() {
    console.log("'fetch users function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query users($userId: ID!) {
            users(userId: $userId) {
              _id
              email
              password
              name
              role
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
        const users = resData.data.users;
        console.log(users);

        if (this.isActive) {
          this.setState({ users: users, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }


  showDetailHandler = userId => {

    this.setState(prevState => {
      const selectedUser = prevState.users.find(e => e._id === userId);
      this.context.selectedUserId = selectedUser;
      console.log("here:  ", selectedUser);
      return { selectedUser: selectedUser };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating ) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Create Profile"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm">
            <form>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="text" id="title" ref={this.emailElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={this.nameElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" ref={this.roleElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.isLoading === false &&
          (<UserDetail
            authUserId={this.context.userId}
            user={this.context.selectedUserId}
        />)}
        {this.context.token &&
          (<div className="users-control">
            <p>Create a Profile!</p>
            <button className="btn" onClick={this.startCreateUserHandler}>
              Sign-Up
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <UserList
            users={this.state.users}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default UsersPage;
