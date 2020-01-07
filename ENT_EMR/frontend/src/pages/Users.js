import S3 from 'react-aws-s3';
import S3FileUpload from 'react-s3';
import React, { Component } from 'react';
// import FileViewer from 'react-file-viewer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import UserList from '../components/Users/UserList/UserList';
import SearchUserList from '../components/Users/UserList/SearchUserList';
import UserDetail from '../components/Users/UserDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

import SidebarPage from './Sidebar';
import AlertBox from '../components/AlertBox';
import AttachmentViewer from '../components/AttachmentViewer';
import PdfCreator from '../components/PdfCreator';

import CreateUserForm from '../components/Forms/CreateUserForm';
import UpdateUserForm from '../components/Forms/UpdateUserForm';
import UpdateUserFieldForm from '../components/Forms/UpdateUserFieldForm';
import UpdateUserAttendanceForm from '../components/Forms/UpdateUserAttendanceForm';
import UpdateUserAttachmentForm from '../components/Forms/UpdateUserAttachmentForm';
import UpdateUserLeaveForm from '../components/Forms/UpdateUserLeaveForm';
import SearchUserForm from '../components/Forms/SearchUserForm';
import SearchUserIdForm from '../components/Forms/SearchUserIdForm';
import SearchUserNameForm from '../components/Forms/SearchUserNameForm';
import SearchUserAttendanceDateForm from '../components/Forms/SearchUserAttendanceDateForm';
import SearchUserLeaveDateRangeForm from '../components/Forms/SearchUserLeaveDateRangeForm';

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
    isSorting: false,
    selectedUser: null,
    userUpdateField: null,
    userSearchField: null,
    userSearchQuery: null,
    canDelete: null,
    userAlert: null,
    file: null,
    showAttachment: false,
    showThisAttachmentFile: null,
    showThisAttachmentType: null,
    createPdf: false,
    pdfData: null,
  };
  isActive = true;

  static contextType = AuthContext;

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.fetchUsers();
    if (this.context.user.name === 'admin579'){
      this.setState({canDelete: true})
    }
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
    console.log(`
      event: ${JSON.stringify(event)},
      `);

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
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
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
            createUser(userInput: {email:"${email}",password:"${password}",name:"${name}",role:"${role}",dob:"${dob}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}",addressPostOffice:"${addressPostOffice}",phone:"${phone}",employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"})
            {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}
          }
        `
    };

    fetch('http://localhost:10000/graphql', {
    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert});

        this.setState(prevState => {
          const updatedUsers = [...prevState.users];
          updatedUsers.push(resData.data.createUser);

          return { users: updatedUsers };
        });
        this.context.users = this.state.users;
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });
  };


  modalConfirmUpdateHandler = (event) => {

    const token = this.context.token;
    const userId = this.context.userId;
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
    let role = this.context.selectedUser.role;
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
      email = this.context.selectedUser.email;
    }
    if (password.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      password = this.context.selectedUser.password;
    }
    if (name.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      name = this.context.selectedUser.name;
    }
    // if (role.trim().length === 0) {
    //   console.log("blank fields detected!!!...filling w/ previous data...");
    //   role = this.state.selectedUser.role;
    // }
    if (dob.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      dob = this.context.selectedUser.dob;
    }
    if (phone.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      phone = this.context.selectedUser.phone;
    }
    if (addressNumber.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressNumber = this.context.selectedUser.address.number;
    }
    if (addressStreet.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressStreet = this.context.selectedUser.address.street;
    }
    if (addressTown.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressTown = this.context.selectedUser.address.town;
    }
    if (addressParish.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressParish = this.context.selectedUser.address.parish;
    }
    if (addressPostOffice.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      addressPostOffice = this.context.selectedUser.address.postOffice;
    }
    if (employmentDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      employmentDate = this.context.selectedUser.employmentDate;
    }
    if (terminationDate.trim().length === 0) {
      console.log("blank fields detected!!!...filling w/ previous data...");
      terminationDate = this.context.selectedUser.terminationDate;
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
      this.setState({userAlert: "updating user profile..."});

    const requestBody = {
      query: `
      mutation {updateUser(userId:\"${userId}\",selectedUserId:\"${selectedUserId}\",userInput: {email:\"${email}\",password:\"${password}\",name:\"${name}\",dob:\"${dob}\",addressNumber:${addressNumber},addressStreet:\"${addressStreet}\",addressTown:\"${addressTown}\",addressParish:\"${addressParish}\", addressPostOffice:\"${addressPostOffice}\",phone:\"${phone}\",role:\"${role}\",employmentDate:\"${employmentDate}\",terminationDate:\"${terminationDate}\"})
      {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

        // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
        this.setState({user: updatedUser})
        this.state.users.push(resData.data.updateUser);
        this.context.users = this.state.users;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, selectedUser: resData.data.updateUser})
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
    // if(userId !== selectedUserId && this.context.user.role !== 'admin') {
    //   console.log("Not the creator or Admin! No edit permission!!");
    //   selectedUserId = null;
    // }


      console.log("UpdateUserFieldFormData:  ", event.target.formGridField.value, event.target.formGridFieldSelect.value);
      this.setState({ updating: false });

      let field = null;
      let query = event.target.formGridQuery.value;
      if (event.target.formGridFieldSelect.value === "select") {
        field = event.target.formGridField.value;
      } else {
        field = event.target.formGridFieldSelect.value;
      }
      console.log(`
          field: ${field},
          query: ${query},
        `);

        this.setState({ userAlert: "updating user field..."})

      const requestBody = {
        query:`
          mutation{updateUserField(userId:"${userId}",selectedUserId:"${selectedUserId}",field:"${field}",query:"${query}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}
        }
        `};

        // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
          this.setState({ userAlert: responseAlert, selectedUser: resData.data.updateUserField})
          this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }

  updateUserAttendanceHandler = (event) => {
    const token = this.context.token;
    const userId = this.context.userId;
    let selectedUserId = this.context.selectedUser._id;
    // if(userId !== selectedUserId && this.context.user.role !== 'admin') {
    //   console.log("Not the creator or Admin! No edit permission!!");
    //   selectedUserId = null;
    // }
    if (userId !== selectedUserId && this.context.user.role !== "admin" ) {
      console.log("Not the creator or Admin! No edit permission!!");
      this.setState({ userAlert: "Not the creator or Admin! No edit permission!!"});
        selectedUserId = null;
    }

    console.log("UpdateUserAttendanceFormData:  ", AuthContext._currentValue.fancyDate);

    this.setState({ updating: false , userUpdateField: null });

    // FIX ME!!!
    let attendanceDate = AuthContext._currentValue.fancyDate;
    let attendanceStatus = event.target.formGridAttendanceStatus.value;
    let attendanceDescription = event.target.formGridAttendanceDescription.value;

    if (
    // attendanceDate.trim().length === 0 ||
    attendanceStatus.trim().length === 0
    ){
      console.log("blank fields detected!!!...filling w/ previous data...");
      return
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

      this.setState({ userAlert: "adding user attendance item..."});

      const requestBody = {
        query:`
          mutation {updateUserAttendance(userId:"${userId}", selectedUserId:"${selectedUserId}",userInput:{attendanceDate:"${attendanceDate}",attendanceStatus:"${attendanceStatus}",attendanceDescription:"${attendanceDescription}"})
          {_id,name,email,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description}}}
        `};

      // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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

          this.state.users.push(resData.data.updateUserAttendance);
          this.context.users = this.state.users;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, selectedUser: resData.data.updateUserAttendance})
          this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });


  }

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

    console.log("UpdateUserAttachmentFormData:  ");

    this.setState({ updating: false , userUpdateField: null });

    // let attachmentName = event.target.formGridAttachmentName.value;
    let attachmentFormat = event.target.formGridAttachmentFormat.value;
    let attachmentPath = event.target.formGridAttachmentPath.value;
    let file = AuthContext._currentValue.file;

    console.log(`
      uploading to s3...
      file.name: ${file.name},
      AuthContext._currentValue.file: ${AuthContext._currentValue.file},
      `);
    const config = {
      bucketName: 'ent-emr-bucket',
      dirName: attachmentPath,
      region: 'us-east-2',
      accessKeyId: "AKIARFTS6Q6DALQKT4QR",
      secretAccessKey: "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",
    }
    const ReactS3Client = new S3(config);
    const newFileName = file.name;
    const attachmentName = newFileName;

    ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => {console.log(data);this.setState({userAlert: "attachment upload success!"});})
        .catch(err => {console.error(err);this.setState({userAlert: "upload error:  "+err});})

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
      adding user attachment item...
      userId: ${userId},
      selectedUserId: ${selectedUserId}
      attachmentName: ${attachmentName},
      attachmentFormat: ${attachmentFormat},
      attachmentPath: ${attachmentPath},
      `);
      this.setState({userAlert: "adding user attatchment item..."})

      const requestBody = {
        query:`
          mutation{updateUserAttachment(userId:\"${userId}\",selectedUserId:\"${selectedUserId}\",userInput:{attachmentName:\"${attachmentName}\",attachmentFormat:\"${attachmentFormat}\",attachmentPath:\"${attachmentPath}\"})
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

        // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
          this.setState({ userAlert: responseAlert, selectedUser: resData.data.updateUserAttachment})
          this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });


  }


  updateUserLeaveHandler = (event) => {

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

    console.log("UpdateUserLeaveFormData:  ", event.target.formGridLeaveType.value);

    this.setState({ updating: false , userUpdateField: null });

    let leaveType = event.target.formGridLeaveType.value;
    let leaveTitle = event.target.formGridLeaveTitle.value;
    let leaveStartDate = event.target.formGridLeaveStartDate.value;
    let leaveEndDate = event.target.formGridLeaveEndDate.value;

    if (
      leaveType.trim().length === 0 ||
      leaveTitle.trim().length === 0 ||
      leaveStartDate.trim().length === 0 ||
      leaveEndDate.trim().length === 0
    ) {
      console.log("blank fields detected!!!...try again");
      this.setState({userAlert: "blank fields detected!!!...try again"});
      return
    }

    const userLeave = { leaveType, leaveTitle, leaveStartDate, leaveEndDate }
    console.log(`
      adding user leave item...
      userId: ${userId},
      selectedUserId: ${selectedUserId}
      leave: {
        type: ${leaveType},
        title: ${leaveTitle},
        startDate: ${leaveStartDate},
        endDate: ${leaveEndDate}
      }
      `);
      this.setState({userAlert: "adding user leave item..."})

      const requestBody = {
        query:`
          mutation{updateUserLeave(userId:\"${userId}\",selectedUserId:\"${selectedUserId}\",userInput:{leaveType:\"${leaveType}\",leaveTitle:\"${leaveTitle}\",leaveStartDate:\"${leaveStartDate}\",leaveEndDate:\"${leaveEndDate}\"})
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

        // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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

          this.state.users.push(resData.data.updateUserLeave);
          this.context.users = this.state.users;
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, selectedUser: resData.data.updateUserLeave})
          this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });

  }


  modalConfirmSearchHandler = (event) => {
    console.log("SearchUserForm:  ");


    let userId = this.context.userId;

      console.log("SearchUserFormData:  ", event.target.formBasicField.value);
      this.setState({ searching: false });

      let field = null;
      let query = event.target.formBasicQuery.value;
      if (event.target.formBasicFieldSelect.value === "select") {
        field = event.target.formBasicField.value;
      } else {
        field = event.target.formBasicFieldSelect.value;
      }

      this.setState({
        userSearchField: field,
        userSearchQuery: query,
      })

      if (
        field.trim().length === 0 ||
        query.trim().length === 0
      ) {
        console.log("blank fields detected!!!...Please try again...");
        this.setState({userAlert: "blank fields detected!!!...Please try again..."})
        return;
      }

      const search = { field, query }
      console.log("Searching for User:  ", JSON.stringify(search));
      this.setState({userAlert: "Searching for User..."})

      const requestBody = {
        query: `
          query {getUserField(userId:"${userId}",field:"${field}",query:"${query}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `}

      const token = this.context.token;

      // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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

          const responseAlert = JSON.stringify(resData.data).slice(0,8);
          this.setState({userAlert: responseAlert});

          const searchUsers = resData.data.getUserField;

          this.setState({ searchUsers: searchUsers})
          console.log("state.searchUsers:  ", this.state.searchUsers);
          // this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
  }

  modalConfirmSearchIdHandler = (event) => {

    let userId = this.context.userId;
    this.setState({ searching: false });

    console.log("SearchUserIdFormData:", event.target.formBasicId.value);
    let selectedUserId = event.target.formBasicId.value;

    const requestBody = {
      query: `
        query {getUserId(userId:"${userId}",selectedUserId:"${selectedUserId}")
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
      `}

    const token = this.context.token;

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({userAlert: responseAlert});

        const searchUsers = resData.data.getUserId;

        this.setState({ searchUsers: [searchUsers] });
        console.log("state.searchUsers:  ", this.state.searchUsers);
        // this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

  }
  modalConfirmSearchAttendanceDateHandler = (event) => {

    let userId = this.context.userId;
    this.setState({ searching: false });

    console.log("SearchUserAttendanceDateFormData:");

    const attendanceDate = event.target.formBasicDate.value;

    const requestBody = {
      query: `
        query {getUserAttendanceDate(userId:"${userId}",attendanceDate:"${attendanceDate}")
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
      `}

    const token = this.context.token;

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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

        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert});

        const searchUsers = resData.data.getUserAttendanceDate;

        this.setState({ searchUsers: searchUsers})
        console.log("state.searchUsers:  ", this.state.searchUsers);
        // this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

  }
  modalConfirmSearchLeaveDateRangeHandler = (event) => {

    let userId = this.context.userId;
    this.setState({ searching: false });

    console.log("SearchUserLeaveDateRangeFormData:");

    const startDate = event.target.formBasicStartDate.value;
    const endDate = event.target.formBasicEndDate.value;

    const requestBody = {
      query: `
        query{getUserLeaveDateRange(userId:"${userId}",startDate:"${startDate}",endDate:"${endDate}")
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
      `}

    const token = this.context.token;

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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

        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert});

        const searchUsers = resData.data.getUserLeaveDateRange;

        this.setState({ searchUsers: searchUsers})
        console.log("state.searchUsers:  ", this.state.searchUsers);
        // this.fetchUsers();
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
      });

  }

  modalConfirmSearchNameHandler = (event) => {
    console.log("SearchUserNameFormData:", event.target.formBasicName.value);

    let userId = this.context.userId;
    this.setState({ searching: false });

    let users = this.state.users;
    const regex = new RegExp(event.target.formBasicName.value,"i");
    console.log(`
      regex: ${regex},
      `);
      let result = users.filter(user => user.name.match(regex))
      console.log(`
        result: ${JSON.stringify(result)}
        `);

        this.setState({ searchUsers: result})

  }


  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, deleting: false, searching: false});
  };

  fetchUsers() {
    console.log("fetch users:");
    // console.log("'fetch users function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {users (userId:"${userId}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
          this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {

        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert});

        const users = resData.data.users;
        console.log("resData:  ", resData);
        console.log(users);

        if (this.isActive) {
          this.setState({ users: users, isLoading: false });
        }
        this.context.users = this.state.users;
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  fetchUsersAsc = () => {
    console.log("'fetch usersAsc function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    // this.setState({ isSorting: true });
    const requestBody = {
      query: `
          query {usersNameAsc (userId:"${userId}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
          this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const users = resData.data.usersNameAsc;
        console.log("resData:  ", resData);
        console.log(users);

        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert});

        this.setState({users: users});
        // if (this.isActive) {
        //   this.setState({ users: users, isLoading: false });
        // }
        this.context.users = this.state.users;
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });
  }
  fetchUsersDesc = () => {
    console.log("'fetch usersDesc function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {usersNameDesc (userId:"${userId}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
          this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const users = resData.data.usersNameDesc;
        console.log("resData:  ", resData);
        console.log(users);

        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert});

        // if (this.isActive) {
        //   this.setState({ users: users, isLoading: false });
        // }
        this.setState({users: users});
        this.context.users = this.state.users;
      })
      .catch(err => {
        console.log(err);
        this.setState({userAlert: err});
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });
  }

modalDeleteHandler = () => {
  console.log("deleting user...selectedUser:  ", this.context.selectedUser);

  const userId = this.context.userId;
  const selectedUserId = this.context.selectedUser._id;

  if(this.context.user.role !== 'admin') {
    console.log("Not the Admin! No edit permission!!");
    this.setState({userAlert: "Not the Admin! No edit permission!!"})
  }

  this.setState({deleting: true, userAlert: "deleting user.."});

  const requestBody = {
    query: `
        mutation {
          deleteUser(userId: ${userId}, selectedUserId: ${selectedUserId})
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}
        }
      `};

  // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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

      const responseAlert = JSON.stringify(resData.data).slice(0,8);
      this.setState({userAlert: responseAlert});

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
      this.setState({userAlert: err});
      if (this.isActive) {
        this.setState({ deleting: false });
      }
    });

}

deleteUserAttendanceItem = (props) => {

  let token = this.context.token;
  let userId = this.context.userId;
  let selectedUserId = this.state.selectedUser._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

  console.log(`
    delete user Attendance item:
    props: ${JSON.stringify(props)},
    token: ${token},
    userId: ${userId},
    selectedUserId: ${selectedUserId},
    attandance date: ${date},
    `);

    const requestBody = {
      query: `
       mutation{deleteUserAttendance(userId:\"${userId}\",selectedUserId:\"${selectedUserId}\",attendanceDate:\"${date}\")
       {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
    `};

        // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
            let deletedUser = resData.data.deleteUserAttendance;
            console.log("resData.data:  ",resData.data.deleteUserAttendance);

            const updatedUserId = resData.data.deleteUserAttendance._id;
            const updatedUser = this.state.users.find(e => e._id === updatedUserId);
            const updatedUserPos = this.state.users.indexOf(updatedUser);
            const slicedArray = this.state.users.splice(updatedUserPos, 1);
            console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

            this.state.users.push(resData.data.deleteUserAttendance);
            this.context.users = this.state.users;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            // this.setState({ userAlert: responseAlert, selectedUser: resData.data.deleteUserAttendance})
            this.fetchUsers();

          })
          .catch(err => {
            console.log(err);
          });
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

    const requestBody = {
      query: `
       mutation{deleteUserLeave(userId:\"${userId}\",selectedUserId:\"${selectedUserId}\",leaveTitle:\"${props.title}\")
       {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
    `};

        // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
            let deletedUser = resData.data.deleteUserLeave;
            console.log(deletedUser);

            const updatedUserId = resData.data.deleteUserLeave._id;
            const updatedUser = this.state.users.find(e => e._id === updatedUserId);
            const updatedUserPos = this.state.users.indexOf(updatedUser);
            const slicedArray = this.state.users.splice(updatedUserPos, 1);
            console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

            this.state.users.push(resData.data.deleteUserLeave);
            this.context.users = this.state.users;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            // this.setState({ userAlert: responseAlert, selectedUser: resData.data.deleteUserLeave})
            this.fetchUsers();

          })
          .catch(err => {
            console.log(err);
          });
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

    console.log(`
      deleting from s3...
      file.name: ${props.name},
      `);

    const config = {
      bucketName: 'ent-emr-bucket',
      dirName: props.path,
      region: 'us-east-2',
      accessKeyId: "AKIARFTS6Q6DALQKT4QR",
      secretAccessKey: "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",
    }
    const ReactS3Client = new S3(config);
    const filename = props.name;
    // const attachmentName = newFileName;
    //
    S3FileUpload
    .deleteFile(filename, config)
    .then(response => console.log(response))
    .catch(err => console.error(err))


    const requestBody = {
      query: `
       mutation{deleteUserAttachment(userId:\"${userId}\",selectedUserId:\"${selectedUserId}\",attachmentName:\"${props.name}\")
       {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
    `};

        // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
            let deletedUser = resData.data.deleteUserAttachment;
            console.log(deletedUser);

            const updatedUserId = resData.data.deleteUserAttachment._id;
            const updatedUser = this.state.users.find(e => e._id === updatedUserId);
            const updatedUserPos = this.state.users.indexOf(updatedUser);
            const slicedArray = this.state.users.splice(updatedUserPos, 1);
            console.log("updatedUser:  ", JSON.stringify(updatedUser),"  updatedUserPos:  ", updatedUserPos, "  slicedArray:  ", slicedArray);

            this.state.users.push(resData.data.deleteUserAttachment);
            this.context.users = this.state.users;
            const responseAlert = JSON.stringify(resData.data).slice(2,25);
            this.setState({ userAlert: responseAlert})
            // this.setState({ userAlert: responseAlert, selectedUser: resData.data.deleteUserAttachment})
            this.fetchUsers();

          })
          .catch(err => {
            console.log(err);
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

  onViewAttachment = (attachment) => {
    console.log(`
      setting up attachment viewer...
      attachment: ${JSON.stringify(attachment)}
      `);
      this.setState({showAttachment: true})

      const file = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+attachment.path+"/"+attachment.name;
      const type = attachment.format;

      this.setState({showThisAttachmentFile: file, showThisAttachmentType: type})
  }

  closeAttachmentView = () => {
    console.log(`
      closing attachment viewer...
      `);
      this.setState({showAttachment: false})
  }

  createPdf = (user) => {
    console.log(`
        creating pdf...
        user: ${JSON.stringify(user)}
      `);

      const pdfData = {
        title: user.name,
        body: user.dob,
      };

    this.setState({createPdf: true, pdfData: pdfData})
  }

  closePdfCreator = () => {
    console.log(`
      closing pdf creator...
      `);
      this.setState({createPdf: false, pdfData: null})
  }

  userSearchClearlHandler () {
    console.log("clearing user search results");
    this.setState({searchUsers: [], userAlert: "clearing user search results"});
  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (

    <React.Fragment>
    {this.state.showAttachment === true && (
      <AttachmentViewer
        onCloseAttachmentView={this.closeAttachmentView}
        attachmentFile={this.state.showThisAttachmentFile}
        attachmentType={this.state.showThisAttachmentType}
      />
    )}

    {this.state.createPdf === true && (
        <PdfCreator
          pdfData={this.state.pdfData}
          onClosePdfCreator={this.closePdfCreator}
        />
    )}

    <Accordion>

    <Row>

    <Col md={3} className="MasterCol1">

    <AlertBox
      authUserId={this.context.userId}
      alert={this.state.userAlert}
    />

    <SidebarPage/>

    </Col>

    <Col md={9} className="MasterCol2">

        <Container className="containerCombinedDetail">

        <Tab.Container id="left-tabs-example" defaultActiveKey="userDetail">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="MasterList">MASTER LIST</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userDetail">Selected</Nav.Link>
                </Nav.Item>
                { this.context.user.role === "admin" && (
                <Nav.Item>
                  <Nav.Link eventKey="userCreate">Create New</Nav.Link>
                </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>Edit:</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userEditDemographics">Demographics</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userEditField">Single Field</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>Add:</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userEditAttendance">Attendance</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userEditLeave">Leave</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userEditAttachment">Attachment</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>Search:</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="SearchInput">Input</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="SearchResult">Results</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="userDetail">
                  {this.state.selectedUser === null && (
                    <Button variant="outline-warning" size="lg" className="confirmEditButton">
                      Select a Staff member from the Master List
                    </Button>
                  )}
                  {this.state.isLoading === false &&
                    this.state.selectedUser !== null
                    && (
                      <UserDetail
                      authUserId={this.context.userId}
                      AuthContext={this.context}
                      user={this.state.selectedUser}
                      onEdit={this.startUpdateUserHandler}
                      canDelete={this.state.canDelete}
                      onDelete={this.modalDeleteHandler}
                      attendanceDelete={this.deleteUserAttendanceItem}
                      leaveDelete={this.deleteUserLeaveItem}
                      attachmentDelete={this.deleteUserAttachmentItem}
                      onViewAttachment={this.onViewAttachment}
                      onCreatePdf={this.createPdf}
                      />
                    )}
                </Tab.Pane>

                { this.context.user.role === "admin" && (
                  <Tab.Pane eventKey="userCreate">
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startCreateUserHandler} >Create a NEW Staff Profile</Button>
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
                  </Tab.Pane>
                )}


                <Tab.Pane eventKey="userEditDemographics">
                  {this.state.selectedUser === null && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Select a Staff member from the Master List
                    </Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.context.user.role === "admin"
                    && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Demographics as Admin</Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id === this.context.user._id
                    && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Demographics</Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id === this.context.user._id && (
                    <Button variant="outline-danger" className="confirmEditButton" size="lg">
                      Your Profile
                    </Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id !== this.context.user._id && (
                    <Button variant="outline-danger" className="confirmEditButton" size="lg">
                      Not my profile
                    </Button>
                  )}
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
                </Tab.Pane>

                <Tab.Pane eventKey="userEditField">
                  {this.state.selectedUser === null && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Select a Staff member from the Master List
                    </Button>
                  )}

                  {this.state.selectedUser !== null &&
                    this.context.user.role === "admin"
                    && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Field as Admin</Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id === this.context.user._id
                    && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit a Single Field</Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id === this.context.user._id && (
                    <Button variant="outline-success" className="confirmEditButton" size="lg">
                      Your Profile
                    </Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id !== this.context.user._id && (
                    <Button variant="outline-danger" className="confirmEditButton" size="lg">
                      Not my profile
                    </Button>
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
                </Tab.Pane>

                <Tab.Pane eventKey="userEditAttendance">
                  {this.state.selectedUser === null && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Select a Staff member from the Master List below
                    </Button>
                  )}

                  {this.state.selectedUser !== null &&
                    this.context.user.role === "admin"
                    && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attendance' onClick={this.updateUserSpecial.bind(this)}>Add Attendance as Admin</Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id === this.context.user._id
                    && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attendance' onClick={this.updateUserSpecial.bind(this)}>Add Attendance</Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id === this.context.user._id && (
                    <Button variant="outline-success" className="confirmEditButton" size="lg">
                      Your Profile
                    </Button>
                  )}
                  {this.state.selectedUser !== null &&
                    this.state.selectedUser._id !== this.context.user._id && (
                    <Button variant="outline-danger" className="confirmEditButton" size="lg">
                      Not my profile
                    </Button>
                  )}

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
                    />
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="userEditLeave">
                {this.state.selectedUser === null && (
                  <Button variant="outline-warning" className="confirmEditButton" size="lg">
                    Select a Staff member from the Master List
                  </Button>
                )}

                {this.state.selectedUser !== null &&
                  this.context.user.role === "admin"
                  && (
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" value='leave' onClick={this.updateUserSpecial.bind(this)}>Add Leave as Admin</Button>
                )}
                {this.state.selectedUser !== null &&
                  this.state.selectedUser._id === this.context.user._id
                  && (
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" value='leave' onClick={this.updateUserSpecial.bind(this)}>Add Leave</Button>
                )}
                {this.state.selectedUser !== null &&
                  this.state.selectedUser._id === this.context.user._id && (
                  <Button variant="outline-success" className="confirmEditButton" size="lg">
                    Your Profile
                  </Button>
                )}
                {this.state.selectedUser !== null &&
                  this.state.selectedUser._id !== this.context.user._id && (
                  <Button variant="outline-danger" className="confirmEditButton" size="lg">
                    Not my profile
                  </Button>
                )}

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
                </Tab.Pane>

                <Tab.Pane eventKey="userEditAttachment">
                {this.state.selectedUser === null && (
                  <Button variant="outline-warning" className="confirmEditButton" size="lg">
                    Select a Staff member from the Master List
                  </Button>
                )}

                {this.state.selectedUser !== null &&
                  this.context.user.role === "admin"
                  && (
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attachments' onClick={this.updateUserSpecial.bind(this)}>Add Attachment as Admin</Button>
                )}
                {this.state.selectedUser !== null &&
                  this.state.selectedUser._id === this.context.user._id
                  && (
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attachments' onClick={this.updateUserSpecial.bind(this)}>Add Attachment</Button>
                )}
                {this.state.selectedUser !== null &&
                  this.state.selectedUser._id === this.context.user._id && (
                  <Button variant="outline-success" className="confirmEditButton" size="lg">
                    Your Profile
                  </Button>
                )}
                {this.state.selectedUser !== null &&
                  this.state.selectedUser._id !== this.context.user._id && (
                  <Button variant="outline-danger" className="confirmEditButton" size="lg">
                    Not my profile
                  </Button>
                )}

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
                </Tab.Pane>

                <Tab.Pane eventKey="MasterList">
                  <Container className="containerUserMasterList">
                  <Row className="searchListRow">
                  <Button variant="primary" size="sm" onClick={this.fetchUsersAsc}>
                     Sort Asc
                   </Button>
                  <Button variant="info" size="sm" onClick={this.fetchUsersDesc}>
                     Sort Desc
                   </Button>
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
                </Tab.Pane>

                <Tab.Pane eventKey="SearchInput">
                  <Container className="containerSearchUserInput">

                  <Row className="searchUserRowAdd">
                  <Button variant="primary" onClick={this.startSearchUserHandler}>Search</Button>
                  </Row>

                  <Row className="searchUserRowForm">
                  <Col md={10} className="searchUserColForm">
                  <Tabs defaultActiveKey="Field" id="uncontrolled-tab-example">
                  <Tab eventKey="Search" title="Search:" disabled>
                  </Tab>
                  <Tab eventKey="Field" title="Search by Field:">
                  {this.state.searching !== true && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Click the 'Search' Button start
                    </Button>
                  )}
                  {this.state.searching === true && (
                    <SearchUserForm
                    authUserId={this.context.userId}
                    canCancel
                      canConfirm
                      onCancel={this.modalCancelHandler}
                      onConfirm={this.modalConfirmSearchHandler}
                      confirmText="Search"
                      user={this.context.selectedUser}
                    />)}
                  </Tab>
                  <Tab eventKey="Id" title="Search by ID:">
                  {this.state.searching !== true && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Click the 'Search' Button start
                    </Button>
                  )}
                  {this.state.searching === true && (
                    <SearchUserIdForm
                    authUserId={this.context.userId}
                    canCancel
                      canConfirm
                      onCancel={this.modalCancelHandler}
                      onConfirm={this.modalConfirmSearchIdHandler}
                      confirmText="Search"
                      user={this.context.selectedUser}
                    />
                    )}
                  </Tab>
                  <Tab eventKey="Attendance" title="Search by Attendance:">
                  {this.state.searching !== true && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Click the 'Search' Button start
                    </Button>
                  )}
                  {this.state.searching === true && (
                    <SearchUserAttendanceDateForm
                    authUserId={this.context.userId}
                    canCancel
                      canConfirm
                      onCancel={this.modalCancelHandler}
                      onConfirm={this.modalConfirmSearchAttendanceDateHandler}
                      confirmText="Search"
                      user={this.context.selectedUser}
                    />
                    )}
                  </Tab>
                  <Tab eventKey="Leave" title="Search by Leave:">
                  {this.state.searching !== true && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Click the 'Search' Button start
                    </Button>
                  )}
                  {this.state.searching === true && (
                    <SearchUserLeaveDateRangeForm
                    authUserId={this.context.userId}
                    canCancel
                      canConfirm
                      onCancel={this.modalCancelHandler}
                      onConfirm={this.modalConfirmSearchLeaveDateRangeHandler}
                      confirmText="Search"
                      user={this.context.selectedUser}
                    />
                    )}
                  </Tab>
                  <Tab eventKey="Name" title="Search by Name:">
                  {this.state.searching !== true && (
                    <Button variant="outline-warning" className="confirmEditButton" size="lg">
                      Click the 'Search' Button start
                    </Button>
                  )}
                  {this.state.searching === true && (
                    <SearchUserNameForm
                    authUserId={this.context.userId}
                    canCancel
                      canConfirm
                      onCancel={this.modalCancelHandler}
                      onConfirm={this.modalConfirmSearchNameHandler}
                      confirmText="Search"
                      user={this.context.selectedUser}
                    />
                  )}
                  </Tab>
                  </Tabs>
                  </Col>
                  <Col md={10}>
                  </Col>
                  </Row>

                  </Container>
                </Tab.Pane>

                <Tab.Pane eventKey="SearchResult">
                  <Container className="containerSearchUserResults">
                  <Row>
                    <Card className="searchCard">
                      <Card.Body className="searchCardBody">
                        <Card.Title>Your Search</Card.Title>
                        <Card.Text>
                          Field: {this.state.userSearchField}
                        </Card.Text>
                        <Card.Text>
                          Query: {this.state.userSearchQuery}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Row>
                  <Row className="searchListRow">

                  {this.state.searchUsers !== [] && (
                    <SearchUserList
                      searchUsers={this.state.searchUsers}
                      authUserId={this.context.userId}
                      onViewDetail={this.showDetailHandler}
                    />
                  )}
                  </Row>
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>



        </Container>

    </Col>

  </Row>

</Accordion>
</React.Fragment>
    );
  }
}

export default UsersPage;
