import React, { Component } from 'react';
import UpdateUserForm from '../components/Forms/UpdateUserForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import ThisUserProfile from '../components/Users/thisUserProfile';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Users.css';

class ThisUserPage extends Component {
  state = {
    user: null,
    users: [],
    updating: false,
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

  startUpdateUserHandler = () => {
    this.setState({ updating: true });
    console.log("UpdateUserForm...");
  };


  modalConfirmUpdateHandler = (event) => {

    let userId = this.context.userId;
    let selectedUserId = this.context.selectedUser._id;
    if(userId !== selectedUserId && this.context.user.role !== 'admin') {

      console.log("Not the creator or Admin! No edit permission!!");
      selectedUserId = null;
    }

    console.log("UpdateUserFormData:  ", event.target.formGridEmail.value);

    this.setState({ updating: false });
    let email = event.target.formGridEmail.value;
    let password = event.target.formGridPassword.value;
    let name = event.target.formGridName.value;
    let role = event.target.formGridRole.value;

    if (email.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      email  = this.state.user.email;
      // return;
    }
    if (password.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      password = this.state.user.password;
    }
    if (name.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      name  = this.state.user.name;
    }
    if (role.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      role  = this.state.user.role;
    }


    const user = { email, password, name, role };
    console.log("updating user.. " + JSON.stringify(user));

    const requestBody = {
      query: `
          mutation UpdateUser($userId: ID!, $selectedUserId: ID!, $email: String!, $password: String!, $name: String!, $role: String!) {
            updateUser(userId: $userId, selectedUserId: $selectedUserId, userInput: {email: $email, password: $password, name: $name, role: $role}) {
              _id
              email
              password
              name
              role
            }
          }
        `,
        variables: {
          userId: userId,
          selectedUserId: userId,
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

        const updatedUser = resData.data.updateUser;
        console.log("updatedUser:  ", JSON.stringify(updatedUser));

        this.setState({user: updatedUser})
        this.state.users.push(
          {
              _id: resData.data.updateUser._id,
              email: resData.data.updateUser.email,
              name: resData.data.updateUser.name,
              role: resData.data.updateUser.role
            }
        );
        this.context.users = this.state.users;
        // this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
      });
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


  modalCancelHandler = () => {
    this.setState({ updating: false  });
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
        this.context.users = this.state.users;
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


{this.state.updating === true && (

  <Container className="containerCreateuser">
<Row className="createUserRowForm">
<Col md={12} className="createUserColForm">
  <UpdateUserForm
  canCancelProfile
    canConfirm
    onCancel={this.modalCancelHandler}
    onConfirm={this.modalConfirmUpdateHandler}
    confirmText="Confirm"
    user={this.state.user}
  />
  </Col>
  </Row>
  </Container>

)}



        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ThisUserProfile
            user={this.state.user}
            authUserId={this.context.userId}
            onEdit={this.startUpdateUserHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ThisUserPage;
