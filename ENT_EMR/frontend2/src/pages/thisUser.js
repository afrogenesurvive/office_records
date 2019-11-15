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
    this.usernameElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.avatarElRef = React.createRef();
    this.dobElRef = React.createRef();
    this.phoneElRef = React.createRef();
    this.addressElRef =  React.createRef();
    this.user = null;
  }

  componentDidMount() {
    this.getThisUser();
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
    console.log("updating user... " + JSON.stringify(user));

    const requestBody = {
      query: `
          mutation UpdateUser($email: String!, $password: String!, $name: String!, $username: String!, $description: String!, $avatar: String!, $dob: String!, $phone: String!, $address: String!) {
            updateUser(userInput: {email: $email, password: $password, name: $name, username: $username, description: $description, avatar: $avatar, dob: $dob, phone: $phone, address: $address}) {
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
              username
              description
              avatar
              dob
              phone
              address
            }
          }
        `
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
        // console.log("resdata..." + JSON.stringify(resData));
        const thisUser = resData.data.getThisUser;
        if (this.isActive) {

          this.setState({ user: thisUser, isLoading: false });

          this.context.user = thisUser;
          console.log("thisUser context, user object.name ..." + this.context.user.name);

          sessionStorage.setItem('thisUser', JSON.stringify(thisUser));

          this.context.action1 = JSON.stringify(requestBody);
          console.log("this context object..." + JSON.stringify(this.context));
          console.log("this context action1..." + this.context.action1);

          this.createAction(this.context.userId,"mutation",this.context.action1);

        }
        // this.user = thisUser;
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
              <label htmlFor="username">Username</label>
              <input type="text" id="username" ref={this.usernameElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Bio</label>
              <input type="text" id="description" ref={this.descriptionElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="avatar">Avatar Link</label>
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
