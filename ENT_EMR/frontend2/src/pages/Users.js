import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import UserList from '../components/Users/UserList/UserList';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Users.css';

class UsersPage extends Component {
  state = {
    creating: false,
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
    this.usernameElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.avatarElRef = React.createRef();
    this.dobElRef = React.createRef();
    this.phoneElRef = React.createRef();
    this.addressElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchUsers();
  }


  createAction(creatorId,type,body) {

    console.log("'create actions function' context object... " + JSON.stringify(this.context));
    console.log("args.creatorId..." + creatorId, "action type..." + type, "action body..." + body);
    const userId = creatorId;
    const token = this.context.token;

    const requestBody = {
      query: `
          mutation createAction($userId: ID!, $type: String!, $body: String!) {
            createAction(userId: $userId, actionInput: {type: $type, body: $body}) {
              _id
              creator
              {_id,username}
              body
            }
          }
        `,
        variables: {
          userId: userId,
          type: type,
          body: body
        }
    };

    fetch('http://localhost:5000/graphql', {
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
        this.context.action1 = null;

          })
      .catch(err => {
        console.log(err);
      });

  }

  startCreateUserHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const email = this.emailElRef.current.value;
    const password = this.passwordElRef.current.value;
    const name = this.nameElRef.current.value;
    const username = this.usernameElRef.current.value;
    const description = this.descriptionElRef.current.value;
    const avatar = this.avatarElRef.current.value;
    const dob = this.dobElRef.current.value;
    const phone = this.phoneElRef.current.value;
    const address = this.addressElRef.current.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      username.trim().length === 0 ||
      description.trim().length === 0 ||
      avatar.trim().length === 0 ||
      dob.trim().length === 0 ||
      phone.trim().length === 0 ||
      address.trim().length === 0
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

    fetch('http://localhost:5000/graphql', {
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

          // createAction(this.context.id,"mutation",requestBody);

          return { users: updatedUsers };
        });
        this.context.action1 = JSON.stringify(requestBody);
        console.log("this context object..." + JSON.stringify(this.context));
        console.log("this context action1..." + this.context.action1);

        this.createAction(this.context.id,"mutation",this.context.action1);
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
              username
              dob
              description
              avatar
              phone
              address
            }
          }
        `,
        variables: {
          userId: userId
        }
    };

    fetch('http://localhost:5000/graphql', {
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

        this.context.action1 = JSON.stringify(requestBody);
        console.log("this context object..." + JSON.stringify(this.context));
        console.log("this context action1..." + this.context.action1);
        this.createAction(userId,"query",this.context.action1);

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
      return { selectedUser: selectedUser };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedUser) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Create Profile"
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
                <label htmlFor="username">Username</label>
                <input type="text" id="username" ref={this.usernameElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Bio</label>
                <input type="text" id="description" ref={this.descriptionElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Avatar Link</label>
                <input type="text" id="avatar" ref={this.avatarElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" ref={this.addressElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="phone">Phone</label>
                <input type="number" id="phone" ref={this.phoneElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date of Birth</label>
                <input type="datetime-local" id="date" ref={this.dobElRef} />
              </div>

            </form>
          </Modal>
        )}
        {this.state.selectedUser && (
          <Modal
            username={this.state.selectedUser.username}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <h1>{this.state.selectedUser.name}</h1>
            <h2>
              ${this.state.selectedUser.email} -{' dob '}
              {new Date(this.state.selectedUser.dob).toLocaleDateString()}
            </h2>
            <p>{this.state.selectedUser.username}</p>
          </Modal>
        )}
        {this.context.token && (
          <div className="users-control">
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
