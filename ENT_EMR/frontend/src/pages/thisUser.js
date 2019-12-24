import React, { Component } from 'react';
import UpdateUserForm from '../components/Forms/UpdateUserForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import SidebarPage from './Sidebar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import AlertBox from '../components/AlertBox';
import UpdateUserFieldForm from '../components/Forms/UpdateUserFieldForm';
import UpdateUserAttendanceForm from '../components/Forms/UpdateUserAttendanceForm';
import UpdateUserAttachmentForm from '../components/Forms/UpdateUserAttachmentForm';
import UpdateUserLeaveForm from '../components/Forms/UpdateUserLeaveForm';

import ThisUserProfile from '../components/Users/thisUserProfile';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Users.css';

class ThisUserPage extends Component {
  state = {
    user: null,
    users: [],
    updating: false,
    isLoading: false,
    userUpdateField: null,
    userAlert: null,
    canDelete: null,
  };
  isActive = true;

  static contextType = AuthContext;

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.getThisUser();
    if (this.context.user.name === 'admin579'){
      this.setState({canDelete: true})
    }
  }

  startUpdateUserHandler = () => {
    this.setState({ updating: true });
    console.log("UpdateUserForm...");
  };


  modalConfirmUpdateHandler = (event) => {
    const token = this.context.token;
    let userId = this.context.userId;
    let selectedUserId = this.context.selectedUser._id;
    if(userId !== selectedUserId && this.context.user.role !== 'admin') {
      console.log("Not the creator or Admin! No edit permission!!");
      this.setState({userAlert: "Not the creator or Admin! No edit permission!!"});
      selectedUserId = null;
    }
    console.log("UpdateUserFormData:  ", event.target.formGridEmail.value);
    this.setState({ updating: false });
    let email = event.target.formGridEmail.value;
    let password = event.target.formGridPassword.value;
    let name = event.target.formGridName.value;
    let role = this.context.user.role;
    let dob = event.target.formGridDob.value;
    let phone = event.target.formGridPhone.value;
    let addressNumber = event.target.formGridAddressNumber.value;
    let addressStreet = event.target.formGridAddressStreet.value;
    let addressTown = event.target.formGridAddressTown.value;
    let addressParish = event.target.formGridAddressParish.value;
    let addressPostOffice = event.target.formGridAddressPostOffice.value;
    let employmentDate = event.target.formGridEmploymentDate.value;
    let terminationDate = event.target.formGridTerminationDate.value;

    if (email.trim().length === 0 ) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      email = this.context.user.email;
    }
    if (password.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      password = this.context.user.password;
    }
    if (name.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      name = this.context.user.name;
    }
    // if (role.trim().length === 0) {
    //   console.log("blank fields detected!!!...filling w/ previous data...");
    //   role = this.state.user.role;
    // }
    if (dob.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      dob = this.context.user.dob;
    }
    if (phone.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      phone = this.context.user.phone;
    }
    if (addressNumber.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressNumber = this.context.user.address.number;
    }
    if (addressStreet.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressStreet = this.context.user.address.street;
    }
    if (addressTown.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressTown = this.context.user.address.town;
    }
    if (addressParish.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressParish = this.context.user.address.parish;
    }
    if (addressPostOffice.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressPostOffice = this.context.user.address.postOffice;
    }
    if (employmentDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      employmentDate = this.context.user.employmentDate;
    }
    if (terminationDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      terminationDate = this.context.user.terminationDate;
    }


    const user = { email, password, name, role, dob, phone, addressNumber, addressStreet, addressTown, addressParish, addressPostOffice, employmentDate, terminationDate };
    console.log(`
      updating user profile...
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
        mutation {updateUser(userId:\"${userId}\",selectedUserId:\"${userId}\",userInput: {email:\"${email}\",password:\"${password}\",name:\"${name}\",dob:\"${dob}\",addressNumber:${addressNumber},addressStreet:\"${addressStreet}\",addressTown:\"${addressTown}\",addressParish:\"${addressParish}\", addressPostOffice:\"${addressPostOffice}\",phone:\"${phone}\",role:\"${role}\",employmentDate:\"${employmentDate}\",terminationDate:\"${terminationDate}\"})
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }})
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
        this.state.users.push(updatedUser);
        this.context.users = this.state.users;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, user: updatedUser})
        this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });
    };

    modalConfirmUpdateFieldHandler = (event) => {

      const token = this.context.token;
      const userId = this.context.userId;
      let selectedUserId = this.context.selectedUser._id;
      if(userId !== selectedUserId && this.context.user.role !== 'admin') {
        console.log("Not the creator or Admin! No edit permission!!");
        this.setState({userAlert: "Not the creator or Admin! No edit permission!!"});
        selectedUserId = null;
      }

        console.log("UpdateUserFieldFormData:  ", event.target.formGridField.value);
        this.setState({ updating: false });

        let field = event.target.formGridField.value;
        let query = event.target.formGridQuery.value;

        const requestBody = {
          query:`
            mutation{updateUserField(userId:\"${userId}\",selectedUserId:\"${userId}\",field:\"${field}\",query:\"${query}\")
            {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
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
            console.log("response data... " + JSON.stringify(resData.data.updateUserField));

            const updatedUserId = resData.data.updateUserField._id;
            const updatedUser = this.state.users.find(e => e._id === updatedUserId);
            const updatedUserPos = this.state.users.indexOf(updatedUser);
            const slicedArray = this.state.users.splice(updatedUserPos, 1);
            console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

            this.state.users.push(resData.data.updateUserField);
            this.context.users = this.state.users;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            this.fetchUsers();
          })
          .catch(err => {
            console.log(err);
            this.setState({userAlert: err});
          });

    }

  updateUserAttendanceHandler = (event) => {
    const token = this.context.token;
    const userId = this.state.user._id;
    // let selectedUserId = this.context.selectedUser._id;
    // if(userId !== selectedUserId && this.context.user.role !== 'admin') {
    //   console.log("Not the creator or Admin! No edit permission!!");
    //   selectedUserId = null;
    // }
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
      attendanceDate: ${attendanceDate},
      attendanceStatus: ${attendanceStatus},
      attendanceDescription: ${attendanceDescription}
      `);

      const requestBody = {
        query:`
          mutation {updateUserAttendance(userId:"${userId}", selectedUserId:"${userId}",userInput:{attendanceDate:"${attendanceDate}",attendanceStatus:"${attendanceStatus}",attendanceDescription:"${attendanceDescription}"})
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

      fetch('http://localhost:10000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }})
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
          this.state.users.push(resData.data.updateUserAttendance);
          this.context.users = this.state.users;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert})
          this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
  };


  updateUserLeaveHandler = (event) => {
    const token = this.context.token;
    const userId = this.context.userId;
    let selectedUserId = this.context.selectedUser._id;
    if(userId !== selectedUserId && this.context.user.role !== 'admin') {
      console.log("Not the creator or Admin! No edit permission!!");
      this.setState({userAlert: "Not the creator or Admin! No edit permission!!"});
      selectedUserId = null;
    }

    console.log("UpdateUserLeaveFormData:  ", event.target.formGridLeaveType.value);

    this.setState({ updating: false , userUpdateField: null });

    let leaveType = event.target.formGridLeaveType.value;
    let leaveTitle = event.target.formGridLeaveTitle.value;
    let leaveStartDate = event.target.formGridLeaveStartDate.value;
    let leaveEndDate = event.target.formGridLeaveEndDate.value;

    if (leaveType.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      leaveType = this.context.selectedUser.leaveType;
    }
    if (leaveTitle.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      leaveTitle = this.context.selectedUser.leaveTitle;
    }
    if (leaveStartDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      leaveStartDate = this.context.selectedUser.leaveStartDate;
    }
    if (leaveEndDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      leaveEndDate = this.context.selectedUser.leaveEndDate;
    }

    const userLeave = { leaveType, leaveTitle, leaveStartDate, leaveEndDate }
    console.log(`
      adding user attendance item...
      userId: ${userId},
      selectedUserId: ${selectedUserId}
      leave: {
        type: ${leaveType},
        title: ${leaveTitle},
        startDate: ${leaveStartDate},
        endDate: ${leaveEndDate}
      }
      `);

      const requestBody = {
        query:`
          mutation {updateUserLeave(userId:"${userId}", selectedUserId:"${userId}",userInput:{leaveType:"${leaveType}",leaveTitle:"${leaveTitle}",leaveStartDate:"${leaveStartDate}",leaveEndDate:"${leaveEndDate}"})
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

      fetch('http://localhost:10000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }})
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

          this.state.users.push(resData.data.updateUserLeave);
          this.context.users = this.state.users;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert})
          this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
  };


  updateUserAttachmentHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  let selectedUserId = this.context.selectedUser._id;
  // if(userId !== selectedUserId && this.context.user.role !== 'admin') {
  //   console.log("Not the creator or Admin! No edit permission!!");
  //   selectedUserId = null;
  // }
  if (userId !== selectedUserId && this.context.user.role !== "admin" ) {
    console.log("Not the creator or Admin! No edit permission!!");
    this.setState({userAlert: "Not the creator or Admin! No edit permission!!"})
      selectedUserId = null;
  }

  console.log("UpdateUserAttachmentFormData:  ", event.target.formGridAttachmentName.value);

  this.setState({ updating: false , userUpdateField: null });

  let attachmentName = event.target.formGridAttachmentName.value;
  let attachmentFormat = event.target.formGridAttachmentFormat.value;
  let attachmentPath = event.target.formGridAttachmentPath.value;


  if (
    attachmentName.trim().length === 0 ||
    attachmentFormat.trim().length === 0 ||
    attachmentPath.trim().length === 0
) {
    console.log("blank fields detected!!! try again");
    return
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
    this.setState({userAlert: "adding user attendance item..."})

    const requestBody = {
      query:`
        mutation{updateUserAttachment(userId:\"${userId}\",selectedUserId:\"${userId}\",userInput:{attachmentName:\"${attachmentName}\",attachmentFormat:\"${attachmentFormat}\",attachmentPath:\"${attachmentPath}\"})
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
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

        this.state.users.push(resData.data.updateUserAttachment);
        this.context.users = this.state.users;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });


}


  getThisUser() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query {getThisUser
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log("resdata..." + JSON.stringify(resData));
        const thisUser = resData.data.getThisUser;
        if (this.isActive) {

          this.setState({ user: thisUser, isLoading: false });

          this.context.user = thisUser;
          console.log("this.context.user:  " + this.context.user.name);

          sessionStorage.setItem('thisUser', JSON.stringify(thisUser));
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }


  modalCancelHandler = () => {
    this.setState({ updating: false  });
  };


  deleteUserAttendanceItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;
    let selectedUserId = this.state.selectedUser._id;

    console.log(`
      delete user Attendance item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      selectedUserId: ${selectedUserId},
      `);
  }
  deleteUserLeaveItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;
    let selectedUserId = this.state.selectedUser._id;

    console.log(`
      delete user Leave item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      selectedUserId: ${selectedUserId},
      `);
  }
  deleteUserAttachmentItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;
    let selectedUserId = this.state.selectedUser._id;

    console.log(`
      delete user Attachment item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      selectedUserId: ${selectedUserId},
      `);
  }


  updateUserSpecialProfile (event) {
    console.log("special field to update:  ", event.target.value);
    const field = event.target.value;
    this.setState({ userUpdateField: field});
  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
      <Row>
      <Col md={3} className="MasterCol1">
      <AlertBox
        authUserId={this.context.userId}
        alert={this.state.userAlert}
      />
      <SidebarPage
        you={this.state.user}
      />
      </Col>

      <Col md={9} className="MasterCol2">
        <Container className="containerProfile">
        <Tabs defaultActiveKey="Detail" id="uncontrolled-tab-example2">
          <Tab eventKey="" title="Edit:" disabled>
          </Tab>
          <Tab eventKey="Detail" title="Detail">
          {this.state.user !== null && (
              <ThisUserProfile
                user={this.state.user}
                authUserId={this.context.userId}
                canDelete={this.state.canDelete}
                attendanceDelete={this.deleteUserAttendanceItem}
                leaveDelete={this.deleteUserLeaveItem}
                attachmentDelete={this.deleteUserAttachmentItem}
              />
            )}
          </Tab>

          <Tab eventKey="Demographics" title="Demographics">
          <Button variant="outline-primary" onClick={this.startUpdateUserHandler}>Demographics</Button>
          {this.state.updating === true && (
            <UpdateUserForm
            canCancelProfile
              canConfirm
              onCancel={this.modalCancelHandler}
              onConfirm={this.modalConfirmUpdateHandler}
              confirmText="Confirm"
              user={this.state.user}
              authUserId={this.context.userId}
            />
          )}
          </Tab>

          <Tab eventKey="userEditField" title="Single Field">
          {this.state.selectedUser === null && (
            <Button variant="outline-warning" size="lg">
              Select a Staff member from the Master List below
            </Button>
          )}
          {this.state.selectedUser !== null && (
            <Button variant="outline-primary" onClick={this.startUpdateUserHandler}>Edit Field</Button>
          )}
          {this.state.updating &&
            this.state.selectedUser !== null
            && (
              <UpdateUserFieldForm
                authUserId={this.context.userId}
                canCancel
                canConfirm
                onCancel={this.modalCancelHandler}
                onConfirm={this.modalConfirmUpdateFieldHandler}
                confirmText="Confirm"
                user={this.state.selectedUser}
              />
          )}
          </Tab>

          <Tab eventKey="Atttendance" title="Atttendance">
            <Button variant="outline-primary" value='attendance' onClick={this.updateUserSpecialProfile.bind(this)}>Attendance</Button>
            {this.state.userUpdateField === 'attendance' && (
              <UpdateUserAttendanceForm
              authUserId={this.context.userId}
              canCancelProfile
                canConfirm
                onCancel={this.modalCancelHandler}
                onConfirm={this.updateUserAttendanceHandler}
                confirmText="Confirm"
                user={this.state.selectedUser}
              />
            )}
          </Tab>

          <Tab eventKey="Leave" title="Leave">
            <Button variant="outline-primary" value='leave' onClick={this.updateUserSpecialProfile.bind(this)}>Leave</Button>
            {this.state.userUpdateField === 'leave' && (
              <UpdateUserLeaveForm
              authUserId={this.context.userId}
              canCancelProfile
                canConfirm
                onCancel={this.modalCancelHandler}
                onConfirm={this.updateUserLeaveHandler}
                confirmText="Confirm"
                user={this.state.selectedUser}
              />
            )}
          </Tab>

          <Tab eventKey="Attachment" title="Attachment">
          <Button variant="outline-primary" value='attachments' onClick={this.updateUserSpecialProfile.bind(this)}>Attachment</Button>
          {this.state.userUpdateField === 'attachments' && (
            <UpdateUserAttachmentForm
            authUserId={this.context.userId}
            canCancelProfile
              canConfirm
              onCancel={this.modalCancelHandler}
              onConfirm={this.updateUserAttachmentHandler}
              confirmText="Confirm"
              user={this.state.selectedUser}
            />
          )}
          </Tab>
        </Tabs>
        </Container>
      </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default ThisUserPage;
