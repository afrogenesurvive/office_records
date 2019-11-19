import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import UserList from '../components/Users/UserList/UserList';
import UserDetail from '../components/Users/UserDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

import CreateUserForm from '../components/Forms/CreateUserForm';
import UpdateUserForm from '../components/Forms/UpdateUserForm';
import './Users.css';

class UsersPage extends Component {
  state = {
    creating: false,
    updating: false,
    users: [],
    isLoading: false,
    selectedUser: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElRef = React.createRef();
    this.passwordElRef = React.createRef();
    this.nameElRef = React.createRef();
    this.roleElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchUsers();
  }


  startCreateUserHandler = () => {
    this.setState({ creating: true });
  };
  startUpdateUserHandler = () => {
    this.setState({ updating: true });
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
        this.setState(prevState => {
          const updatedUsers = [...prevState.users];
          updatedUsers.push({
            _id: resData.data.createUser._id,
            email: resData.data.createUser.email,
            name: resData.data.createUser.name,
            role: resData.data.createUser.role
          });

          return { users: updatedUsers };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  modalConfirmUpdateHandler = () => {
    this.setState({ updating: false });
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
    console.log("updating user.. " + JSON.stringify(user));

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


        const updatedUserId = resData.data.updateUser._id;
        const updatedUser = this.prevState.users.find(e => e._id === updatedUserId);

        // delete updated user from state users array!!!!!!!!!!
          // return position of element: const updateUserPos = this.state.users.indexOf(updatedUser)
          // then splice at that position: myArray.splice(updatedUserPos, 1)

        this.setState(prevState => {
          const updatedUsers = [...prevState.users];
          updatedUsers.push({
            _id: resData.data.updateUser._id,
            email: resData.data.updateUser.email,
            name: resData.data.updateUser.name,
            role: resData.data.updateUser.role
          });

          return { users: updatedUsers };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, selectedUser: null });
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
      this.context.selectedUser = selectedUser;
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
        {this.state.creating && (
          <CreateUserForm
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          />
        )}
        {this.state.updating && (
          <UpdateUserForm
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmUpdateHandler}
            confirmText="Confirm"
            user={this.context.selectedUser}
          />
        )}
        {this.state.isLoading === false &&
          (<UserDetail
            authUserId={this.context.userId}
            user={this.context.selectedUser}
        />)}

        {this.context.token &&
          (<div className="users-control">
            <p>Add New User</p>
            <button className="btn" onClick={this.startCreateUserHandler}>
              +
            </button>
            <p>Update Existing User</p>
            <button className="btn" onClick={this.startUpdateUserHandler}>
              + +
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
