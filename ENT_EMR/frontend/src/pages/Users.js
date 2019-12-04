import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import UserList from '../components/Users/UserList/UserList';
import SearchUserList from '../components/Users/UserList/SearchUserList';
import UserDetail from '../components/Users/UserDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

import SidebarPage from './Sidebar';

import CreateUserForm from '../components/Forms/CreateUserForm';
import UpdateUserForm from '../components/Forms/UpdateUserForm';
import UpdateUserAttendanceForm from '../components/Forms/UpdateUserAttendanceForm';
import UpdateUserAttachmentForm from '../components/Forms/UpdateUserAttachmentForm';
import UpdateUserLeaveForm from '../components/Forms/UpdateUserLeaveForm';
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
    selectedUser: null,
    userUpdateField: null,
    userSearchField: null,
    userSearchQuery: null,
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
    const employmentDate = event.target.formGridEmploymentDate.value;
    const terminationDate = event.target.formGridTerminationDate.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      role.trim().length === 0 ||
      employmentDate.trim().length === 0 ||
      terminationDate.trim().length === 0
    ) {
      console.log("blank fields detected!!!...Please try again...");
      return;
    }

    const token = this.context.token;
    const userId = this.context.userId;
    const user = { email, password, name, role, employmentDate, terminationDate };

    console.log(`
      creating user...
      userId: ${userId}
      email: ${email},
      password: ${password},
      name: ${name},
      role: ${role},
      employmentDate: ${employmentDate},
      terminationDate: ${terminationDate}
      `);

    const requestBody = {
      query: `
          mutation {
            createUser(userInput: {email:"${email}",password:"${password}",name:"${name}",role:"${role}",employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"}) {
              _id
              name
              email
              role
              employmentDate
              terminationDate
              attendance{
                date
                status
                description}
                attachments{
                  name
                  format
                  path}
              leave{
                type
                startDate
                endDate}
            }
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
        console.log("create user response data... " + JSON.stringify(resData.data.createUser));
        this.setState(prevState => {
          const updatedUsers = [...prevState.users];
          updatedUsers.push(resData.data.createUser);

          return { users: updatedUsers };
        });
        this.context.users = this.state.users;
      })
      .catch(err => {
        console.log(err);
      });
  };


  modalConfirmUpdateHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
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
    let employmentDate = event.target.formGridEmploymentDate.value;
    let terminationDate = event.target.formGridTerminationDate.value;

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
    if (employmentDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      employmentDate  = this.context.selectedUser.employmentDate;
    }
    if (terminationDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      terminationDate  = this.context.selectedUser.terminationDate;
    }


    const user = { email, password, name, role, employmentDate, terminationDate };
    console.log(`
      updating user...
      userId: ${userId},
      email: ${email},
      password: ${password},
      name: ${name},
      role: ${role},
      employmentDate: ${employmentDate},
      terminationDate: ${terminationDate}
      `);

    const requestBody = {
      query: `
          mutation { updateUser(userId:"${userId}", selectedUserId:"${selectedUserId}", userInput:{email:"${email}", password:"${password}", name:"${name}", role:"${role}", employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"}) {
            _id
            name
            email
            role
            employmentDate
            terminationDate
            attendance{
              date
              status
              description}
              attachments{
                name
                format
                path}
            leave{
              type
              startDate
              endDate}
            }
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
        console.log("response data... " + JSON.stringify(resData.data.updateUser));

        const updatedUserId = resData.data.updateUser._id;
        const updatedUser = this.state.users.find(e => e._id === updatedUserId);
        const updatedUserPos = this.state.users.indexOf(updatedUser);
        const slicedArray = this.state.users.splice(updatedUserPos, 1);
        console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

        this.state.users.push(updatedUser);
        this.context.users = this.state.users;
        this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };


  updateUserAttendanceHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedUserId = this.context.selectedUser._id;
    if(userId !== selectedUserId && this.context.user.role !== 'admin') {
      console.log("Not the creator or Admin! No edit permission!!");
      selectedUserId = null;
    }

    console.log("UpdateUserAttendanceFormData:  ", event.target.formGridAttendanceDate.value);

    this.setState({ updating: false , userUpdateField: null });

    let attendanceDate = event.target.formGridAttendanceDate.value;
    let attendanceStatus = event.target.formGridAttendanceStatus.value;
    let attendanceDescription = event.target.formGridAttendanceDescription.value;

    if (attendanceDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendanceDate = this.context.selectedUser.attendanceDate;
    }
    if (attendanceStatus.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendanceStatus = this.context.selectedUser.attendanceStatus;
    }
    if (attendanceDescription.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attendanceDescription = this.context.selectedUser.attendanceDescription;
    }

    const userAttendance = { attendanceDate, attendanceStatus, attendanceDescription }
    console.log(`
      adding user attendance item...
      userId: ${userId},
      selectedUserId: ${selectedUserId}
      attendanceDate: ${attendanceDate},
      attendanceStatus: ${attendanceStatus},
      attendanceDescription: ${attendanceDescription}
      `);

      const requestBody = {
        query:`
          mutation {updateUserAttendance(userId:"${userId}", selectedUserId:"${selectedUserId}",userInput:{attendanceDate:"${attendanceDate}",attendanceStatus:"${attendanceStatus}",attendanceDescription:"${attendanceDescription}"}){_id,name,email,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description}}}
        `};

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
          console.log("response data... " + JSON.stringify(resData.data.updateUserAttendance));

          const updatedUserId = resData.data.updateUserAttendance._id;
          const updatedUser = this.state.users.find(e => e._id === updatedUserId);
          const updatedUserPos = this.state.users.indexOf(updatedUser);
          const slicedArray = this.state.users.splice(updatedUserPos, 1);
          console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

          this.state.users.push(updatedUser);
          this.context.users = this.state.users;
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
        });


  }

  updateUserAttachmentHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedUserId = this.context.selectedUser._id;
    if(userId !== selectedUserId && this.context.user.role !== 'admin') {
      console.log("Not the creator or Admin! No edit permission!!");
      selectedUserId = null;
    }

    console.log("UpdateUserAttachmentFormData:  ", event.target.formGridAttachmentName.value);

    this.setState({ updating: false , userUpdateField: null });

    let attachmentName = event.target.formGridAttachmentName.value;
    let attachmentFormat = event.target.formGridAttachmentFormat.value;
    let attachmentPath = event.target.formGridAttachmentPath.value;


    if (attachmentName.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attachmentName = this.context.selectedUser.attachmentName;
    }
    if (attachmentFormat.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attachmentFormat = this.context.selectedUser.attachmentFormat;
    }
    if (attachmentPath.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      attachmentPath = this.context.selectedUser.attachmentPath;
    }

    const userAttachment = { attachmentName, attachmentFormat, attachmentPath }
    console.log(`
      adding user attendance item...
      userId: ${userId},
      selectedUserId: ${selectedUserId}
      attachmentName: ${attachmentName},
      attachmentFormat: ${attachmentFormat},
      attachmentPath: ${attachmentPath}
      `);

      const requestBody = {
        query:`
          mutation {updateUserAttachment(userId:"${userId}", selectedUserId:"${selectedUserId}",userInput:{attachmentName:"${attachmentName}",attachmentFormat:"${attachmentFormat}",attachmentPath:"${attachmentPath}"}){_id,name,email,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description}}}
        `};

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
          console.log("response data... " + JSON.stringify(resData.data.updateUserAttachment));

          const updatedUserId = resData.data.updateUserAttachment._id;
          const updatedUser = this.state.users.find(e => e._id === updatedUserId);
          const updatedUserPos = this.state.users.indexOf(updatedUser);
          const slicedArray = this.state.users.splice(updatedUserPos, 1);
          console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

          this.state.users.push(updatedUser);
          this.context.users = this.state.users;
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
        });


  }


  updateUserLeaveHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
    let selectedUserId = this.context.selectedUser._id;
    if(userId !== selectedUserId && this.context.user.role !== 'admin') {
      console.log("Not the creator or Admin! No edit permission!!");
      selectedUserId = null;
    }

    console.log("UpdateUserLeaveFormData:  ", event.target.formGridLeaveType.value);

    this.setState({ updating: false , userUpdateField: null });

    let leaveType = event.target.formGridLeaveType.value;
    let leaveStartDate = event.target.formGridLeaveStartDate.value;
    let leaveEndDate = event.target.formGridLeaveEndDate.value;

    if (leaveType.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      leaveType = this.context.selectedUser.leaveType;
    }
    if (leaveStartDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      leaveStartDate = this.context.selectedUser.leaveStartDate;
    }
    if (leaveEndDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      leaveEndDate = this.context.selectedUser.leaveEndDate;
    }

    const userLeave = { leaveType, leaveStartDate, leaveEndDate }
    console.log(`
      adding user attendance item...
      userId: ${userId},
      selectedUserId: ${selectedUserId}
      leave: {
        type: ${leaveType},
        startDate: ${leaveStartDate},
        endDate: ${leaveEndDate}
      }
      `);

      const requestBody = {
        query:`
          mutation {updateUserLeave(userId:"${userId}", selectedUserId:"${selectedUserId}",userInput:{leaveType:"${leaveType}",leaveStartDate:"${leaveStartDate}",leaveEndDate:"${leaveEndDate}"}){_id,name,email,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,startDate,endDate}}}
        `};

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
          console.log("response data... " + JSON.stringify(resData.data));

          const updatedUserId = resData.data.updateUserLeave._id;
          const updatedUser = this.state.users.find(e => e._id === updatedUserId);
          const updatedUserPos = this.state.users.indexOf(updatedUser);
          const slicedArray = this.state.users.splice(updatedUserPos, 1);
          console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

          this.state.users.push(updatedUser);
          this.context.users = this.state.users;
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
        });


  }


  modalConfirmSearchHandler = (event) => {
    console.log("SearchUserForm:  ");


    let userId = this.context.userId;

      console.log("SearchUserFormData:  ", event.target.formBasicField.value);
      this.setState({ searching: false });

      let field = event.target.formBasicField.value;
      let query = event.target.formBasicQuery.value;

      this.setState({
        userSearchField: field,
        userSearchQuery: query,
      })

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
            employmentDate
            terminationDate
            attachments{
              name
              format
              path
            }
            attendance{
              date
              status
              description
            }
            leave{
              type
              startDate
              endDate
            }
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
    this.setState({ creating: false, updating: false, deleting: false, searching: false});
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
              name
              email
              role
              employmentDate
              terminationDate
              attachments{
                name
                format
                path
              }
              attendance{
                date
                status
                description
              }
              leave{
                type
                startDate
                endDate
              }
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

      this.setState({ deleting: false, selectedUser: null });
      this.context.selectedUser = null;

      this.fetchUsers();

    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({ deleting: false });
      }
    });


}

updateUserSpecial (event) {

  console.log("special field to update:  ", event.target.value);
  const field = event.target.value;
  this.setState({ userUpdateField: field});

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


  userSearchClearlHandler () {
    console.log("clearing user search results");
    this.setState({searchUsers: []});
  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (

    <React.Fragment>



    <Accordion>

    <Row>

    <Col md={2} className="MasterCol1">

    <SidebarPage/>

    </Col>

    <Col md={7} className="MasterCol2">

        <Container className="containerUserDetail">
        <Row className="createUserRowAdd">
          <Col md={4} className="createUserColAdd">
            <p>Staff Detail</p>
          </Col>
          <Col md={6} className="createUserColAdd">
            <Accordion.Toggle as={Button} variant="link" eventKey="4" className="btn">
              Details
            </Accordion.Toggle>
          </Col>
        </Row>

        <Accordion.Collapse eventKey="4">
          <Row className="createUserRowForm">
            <Col md={11} className="createUserColForm">
              {this.state.isLoading === false &&
                this.state.selectedUser !== null
                && (
                  <UserDetail
                  authUserId={this.context.userId}
                  AuthContext={this.context}
                  user={this.state.selectedUser}
                  onEdit={this.startUpdateUserHandler}
                  onDelete={this.modalDeleteHandler}
                  />
                )}
            </Col>
          </Row>
        </Accordion.Collapse>
        </Container>

        <Container className="containerCreateUpdate">
          <Row className="createUserRowAdd">
            <Col md={4} className="createUserColAdd">
              <p>Add New Staff</p>
            </Col>
            <Col md={4}>
              {this.context.token && (
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="btn" onClick={this.startCreateUserHandler}>
                  Add
                </Accordion.Toggle>
              )}
            </Col>
          </Row>

          <Accordion.Collapse eventKey="0">
            <Row className="createUserRowForm">
              <Col md={11} className="createUserColForm">
                {this.state.creating && (
                  <CreateUserForm
                    authUserId={this.context.userId}
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                    onSubmit={this.modalConfirmHandler}
                    confirmText="Confirm"
                  />
                )}
              </Col>
            </Row>
          </Accordion.Collapse>

        <Row className="updateUserRowAdd">
          <Col md={2} className="updateUserCol">
            <p>Edit Selected Staff</p>
          </Col>
          <Col md={4} className="updateUserCol">
            {this.context.token && (
              <Accordion.Toggle as={Button} variant="link" eventKey="1" className="btn" onClick={this.startUpdateUserHandler}>
                Basic Info & Demographics
              </Accordion.Toggle>
            )}
          </Col>
          <Col md={2}>
            <p>Staff</p>
          </Col>
          <Col md={4}>
            {this.context.selectedUser && (
              <p>{this.context.selectedUser.name}</p>
            )}
          </Col>
        </Row>
        <Row className="createUserRowAdd">
          <Col md={3} className="updateUserCol2">
            <p>Edit Selected Staff</p>
          </Col>
          <Col md={9} className="updateUserCol2">
            {this.context.token && (
              <Accordion.Toggle as={Button} variant="link" eventKey="2" className="btn" value='attendance' onClick={this.updateUserSpecial.bind(this)}>
                Attendance
              </Accordion.Toggle>
            )}
            {this.context.token && (
              <Accordion.Toggle as={Button} variant="link" eventKey="2" className="btn" value='leave' onClick={this.updateUserSpecial.bind(this)}>
                Leave
              </Accordion.Toggle>
            )}
            {this.context.token && (
              <Accordion.Toggle as={Button} variant="link" eventKey="2" className="btn" value='attachments' onClick={this.updateUserSpecial.bind(this)}>
                Attachments
              </Accordion.Toggle>
            )}
          </Col>
        </Row>

        <Accordion.Collapse eventKey="1">
          <Row className="updateUserRowForm">
            <Col md={10} className="updateUserColForm">
            {this.state.updating &&
              this.state.selectedUser !== null
              && (
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
          </Row>
        </Accordion.Collapse>

        <Accordion.Collapse eventKey="2">
        <Row className="updateUserRowForm">
        <Col md={10} className="updateUserColForm">
        {this.state.userUpdateField === 'attendance' &&
        this.state.selectedUser !== null
         && (
           <UpdateUserAttendanceForm
          authUserId={this.context.userId}
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.updateUserAttendanceHandler}
            confirmText="Confirm"
            user={this.state.selectedUser}
          />)}
        {this.state.userUpdateField === 'leave' &&
        this.state.selectedUser !== null
        && (<UpdateUserLeaveForm
          authUserId={this.context.userId}
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.updateUserLeaveHandler}
            confirmText="Confirm"
            user={this.state.selectedUser}
          />)}
        {this.state.userUpdateField === 'attachments' &&
        this.state.selectedUser !== null
        && (<UpdateUserAttachmentForm
          authUserId={this.context.userId}
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.updateUserAttachmentHandler}
            confirmText="Confirm"
            user={this.state.selectedUser}
          />)}
        </Col>
        </Row>
        </Accordion.Collapse>
        </Container>

        <Container className="containerUserMasterList">
        <Row className="searchListRow">

        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <UserList
            users={this.state.users}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />)}

        </Row>
        </Container>
    </Col>


    <Col md={3} className="MasterCol3">

    <Container className="containerSearchuser">
    <Row className="searchUserRowAdd">
    <Col md={4} className="searchUserColAdd">
    <p>Search for a User</p>
    </Col>
    <Col md={8}>
      {this.context.token && (
      <Accordion.Toggle as={Button} variant="link" eventKey="3" className="btn" onClick={this.startSearchUserHandler}>
      Search
      </Accordion.Toggle>)}
    </Col>
    </Row>

    <Accordion.Collapse eventKey="3">
    <Row className="searchUserRowForm">
    <Col md={10} className="searchUserColForm">
    {this.state.searching === true &&
      <SearchUserForm
      authUserId={this.context.userId}
      canCancel
        canConfirm
        onCancel={this.modalCancelHandler}
        onConfirm={this.modalConfirmSearchHandler}
        confirmText="Search"
        user={this.context.selectedUser}
      />}
    </Col>
    <Col md={10}>
    </Col>
    </Row>
    </Accordion.Collapse>
    </Container>


    <Container className="containerSearchuser">
    <Row>
      <h4>Your Search</h4>
      <p>Field: {this.state.userSearchField}</p>
      <p>Query: {this.state.userSearchQuery}</p>
    </Row>
    <Row className="searchListRow">
    {this.state.searchUsers !== [] &&
      <SearchUserList
        searchUsers={this.state.searchUsers}
        authUserId={this.context.userId}
        onViewDetail={this.showDetailHandler}
      />}
    </Row>
    </Container>


  </Col>
  </Row>

</Accordion>
</React.Fragment>
    );
  }
}

export default UsersPage;
