import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import ThisUserProfile from '../components/Users/thisUserProfile';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Users.css';

class UsersPage extends Component {
  state = {
    user: null,
    isLoading: false
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElRef = React.createRef();
    this.passwordElRef = React.createRef();
    this.nameElRef = React.createRef();
    this.roleElRef = React.createRef();
    this.user = null;
  }

  componentDidMount() {
    this.getThisUser();
  }


  startCreateUserHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const email = this.emailElRef.current.value;
    const password = this.passwordElRef.current.value;
    const name = this.nameElRef.current.value;
    const role = this.roleElRef.current.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      role.trim().length === 0
    ) {
      return;
    }

    const user = { email, password, name, role };
    console.log("updating user... " + JSON.stringify(user));

    const requestBody = {
      query: `
          mutation UpdateUser($email: String!, $password: String!, $name: String!, $role: String!) {
            updateUser(userInput: {email: $email, password: $password, name: $name, role: $role}) {
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

      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  getThisUser() {

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            getThisUser {
              _id
              email
              password
              name
              role
            }
          }
        `
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
        // console.log("resdata..." + JSON.stringify(resData));
        const thisUser = resData.data.getThisUser;
        if (this.isActive) {

          this.setState({ user: thisUser, isLoading: false });

          this.context.user = thisUser;
          console.log("thisUser context, user object.name ..." + this.context.user.name);
          console.log("thisUser context, user object.role ..." + this.context.user.role);

          sessionStorage.setItem('thisUser', JSON.stringify(thisUser));

        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedUser) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Update Profile"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
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

        {this.context.token && (
          <div className="users-control">
            <p>Update Your Profile!</p>
            <button className="btn" onClick={this.startCreateUserHandler}>
              Update
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ThisUserProfile
            user={this.state.user}
            authUserId={this.context.userId}
          />
        )}
      </React.Fragment>
    );
  }
}

export default UsersPage;
