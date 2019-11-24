import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import UserList from '../components/Users/UserList/UserList';
import SearchUserList from '../components/Users/UserList/SearchUserList';
import UserDetail from '../components/Users/UserDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

import CreateUserForm from '../components/Forms/CreateUserForm';
import UpdateUserForm from '../components/Forms/UpdateUserForm';
import SearchUserForm from '../components/Forms/SearchUserForm';
import './Users.css';

class UsersPage extends Component {
  state = {
    creating: false,
    updating: false,
    deleting: false,
    searching: false,
    users: [],
    searchUsers: [],
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
    console.log("CreateUserForm...");
  };
  startUpdateUserHandler = () => {
    this.setState({ updating: true });
    console.log("UpdateUserForm...");
  };
  // startUpdateUserHandler = () => {
  //   this.setState({ deleting: true });
  //   console.log("UpdateUserForm...");
  //
  // };

  startSearchUserHandler = () => {
    this.setState({ searching: true });
    console.log("SearchUserForm...");
  };

  modalConfirmHandler = (event) => {

    console.log("CreateUserFormData:  ", event.target.formGridEmail.value);

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
      console.log("blank fields detected!!!...Please try again...");
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
        this.context.users = this.state.users;
      })
      .catch(err => {
        console.log(err);
      });
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
      email  = this.context.selectedUser.email;
      // return;
    }
    if (password.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      password = this.context.selectedUser.password;
    }
    if (name.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      name  = this.context.selectedUser.name;
    }
    if (role.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      role  = this.context.selectedUser.role;
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
          selectedUserId: selectedUserId,
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
        const updatedUser = this.state.users.find(e => e._id === updatedUserId);
        const updatedUserPos = this.state.users.indexOf(updatedUser);
        const slicedArray = this.state.users.splice(updatedUserPos, 1);
        console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

        this.state.users.push(
          {
              _id: resData.data.updateUser._id,
              email: resData.data.updateUser.email,
              name: resData.data.updateUser.name,
              role: resData.data.updateUser.role
            }
        );
        this.context.users = this.state.users;
        this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };


  modalConfirmSearchHandler = (event) => {
    console.log("SearchUserForm:  ");


    let userId = this.context.userId;

      console.log("SearchUserFormData:  ", event.target.formBasicField.value);
      this.setState({ searching: false });

      let field = event.target.formBasicField.value;
      let query = event.target.formBasicQuery.value;

      if (
        field.trim().length === 0 ||
        query.trim().length === 0
      ) {
        console.log("blank fields detected!!!...Please try again...");
        return;
      }

      const search = { field, query }
      console.log("Searching for User:  ", JSON.stringify(search));

      const requestBody = {
        query: `
          query getUserField($userId: ID!, $field: String!, $query: String!)
          {getUserField(userId: $userId, field: $field, query: $query ){
            _id
            name
            email
            role
          }
        }
        `,
        variables: {
          userId: userId,
          field: field,
          query: query
        }
      }

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

          const searchUsers = resData.data.getUserField;

          this.setState({ searchUsers: searchUsers})
          console.log("state.searchUsers:  ", this.state.searchUsers);
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
        });
  }


  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, deleting: false, searching: false, selectedUser: null });
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

modalDeleteHandler = () => {
  console.log("deleting user...selectedUser:  ", this.context.selectedUser);

  const selectedUserId = this.context.selectedUser._id;

  if(this.context.user.role !== 'admin') {
    console.log("Not the Admin! No edit permission!!");
  }

  this.setState({deleting: true});

  const requestBody = {
    query: `
        mutation DeleteUser($userId: ID!, $selectedUserId: ID!) {
          deleteUser(userId: $userId, selectedUserId: $selectedUserId) {
            _id
            email
            password
            name
            role
          }
        }
      `,
      variables: {
        userId: this.context.userId,
        selectedUserId: selectedUserId
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
      let deletedUser = resData.data.deleteUser;
      console.log(deletedUser);

      let deletedUserId = deletedUser._id;
      deletedUser = this.state.users.find(e => e._id === deletedUserId);
      const deletedUserPos = this.state.users.indexOf(deletedUser);
      const slicedArray = this.state.users.splice(deletedUserPos, 1);
      console.log("deletedUser:  ", JSON.stringify(deletedUser),"  deletedUserPos:  ", deletedUserPos, "  slicedArray:  ", slicedArray);

      this.setState({ deleting: false });

      this.fetchUsers();

    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({ deleting: false });
      }
    });


}



  showDetailHandler = userId => {

    this.setState(prevState => {
      const selectedUser = prevState.users.find(e => e._id === userId);
      this.context.selectedUser = selectedUser;
      this.setState({selectedUser: selectedUser});
      console.log("User selected  :  ", selectedUser);
      return { selectedUser: selectedUser };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (


      <React.Fragment>
      <Container className="containerCreateuser">
    <Row className="createUserRowAdd">
    <Col md={4} className="createUserColAdd">
      <p>Add New User</p>
    </Col>
    <Col md={8}>
      {this.context.token && (
          <Button className="btn" onClick={this.startCreateUserHandler}>
            Add
          </Button>
      )}
    </Col>
    </Row>
    <Row className="createUserRowForm">
    <Col md={10} className="createUserColForm">
    {
      this.state.creating && (
      <CreateUserForm
      authUserId={this.context.userId}
      canCancel
        canConfirm
        onCancel={this.modalCancelHandler}
        onConfirm={this.modalConfirmHandler}
        onSubmit={this.modalConfirmHandler}
        confirmText="Confirm"
      />
    )
  }
  {this.state.updating && (
    <UpdateUserForm
    authUserId={this.context.userId}
    canCancel
      canConfirm
      onCancel={this.modalCancelHandler}
      onConfirm={this.modalConfirmUpdateHandler}
      confirmText="Confirm"
      user={this.context.selectedUser}
    />
  )}
    </Col>
    <Col md={10} className="createUserColForm">
    {
      // this.state.searching === true &&
      // <SearchUserForm
      // authUserId={this.context.userId}
      // canCancel
      //   canConfirm
      //   onCancel={this.modalCancelHandler}
      //   onConfirm={this.modalConfirmSearchHandler}
      //   confirmText="Search"
      //   user={this.context.selectedUser}
      // />
    }
    </Col>
    </Row>
    </Container>



    <Container className="containerSearchuser">
  <Row className="createUserRowAdd">
  <Col md={4} className="createUserColAdd">
    <p>Search for a User</p>
  </Col>
  <Col md={8}>
    {this.context.token && (
        <Button className="btn" onClick={this.startSearchUserHandler}>
          Search
        </Button>
    )}
  </Col>
  </Row>
  <Row className="createUserRowForm">
  <Col md={10} className="createUserColForm">
  {
    this.state.searching === true &&
    <SearchUserForm
    authUserId={this.context.userId}
    canCancel
      canConfirm
      onCancel={this.modalCancelHandler}
      onConfirm={this.modalConfirmSearchHandler}
      confirmText="Search"
      user={this.context.selectedUser}
    />
  }
  </Col>
  <Col md={10}>

  </Col>
  </Row>
  </Container>

  <Container className="containerSearchuser">
  <Row className="searchListRow">
  {
    this.state.searchUsers !== [] &&
    <SearchUserList
      searchUsers={this.state.searchUsers}
      authUserId={this.context.userId}
      onCancel={this.modalCancelHandler}
        onViewDetail={this.showDetailHandler}
    />
  }
  </Row>

  </Container>

  <Container className="containerSearchuser">
<Row className="searchListRow">

{this.state.isLoading ? (
  <Spinner />
) : (
  <UserList
    users={this.state.users}
    authUserId={this.context.userId}
    onViewDetail={this.showDetailHandler}
  />
)}

</Row>
</Container>


        {this.state.isLoading === false &&
          (<UserDetail
            authUserId={this.context.userId}
            user={this.state.selectedUser}
            onEdit={this.startUpdateUserHandler}
            onDelete={this.modalDeleteHandler}
        />)}


      </React.Fragment>
    );
  }
}

export default UsersPage;
