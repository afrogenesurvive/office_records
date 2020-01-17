import S3 from 'react-aws-s3';
// import S3FileUpload from 'react-s3';
import React, { Component } from 'react';
import UpdateUserForm from '../components/Forms/UpdateUserForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import SidebarPage from './Sidebar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';



import Nav from 'react-bootstrap/Nav';

import AlertBox from '../components/AlertBox';
import AttachmentViewer from '../components/AttachmentViewer';
import PdfCreator from '../components/PdfCreator';

import UpdateUserFieldForm from '../components/Forms/UpdateUserFieldForm';
import UpdateUserAttendanceForm from '../components/Forms/UpdateUserAttendanceForm';
import UpdateUserAttachmentForm from '../components/Forms/UpdateUserAttachmentForm';
import UpdateUserLeaveForm from '../components/Forms/UpdateUserLeaveForm';

import ThisUserProfile from '../components/Users/thisUserProfile';

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
    overlay: false,
    overlayStatus: "test",
    canDelete: null,
    showAttachment: false,
    createPdf: false,
    pdfData: null,
    showThisAttachmentFile: null,
    showThisAttachmentType: null,
  };
  isActive = true;

  static contextType = AuthContext;

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.getThisUser();
    this.getCreds();
    if (this.context.user.name === "Lord-of-the-Manor"){
      this.setState({canDelete: true})
    }
    // if (this.context.user.name === 'admin579'){
    //   this.setState({canDelete: true})
    // }
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
    if (event.target.formGridEmploymentDateTodayCheckbox.checked === true) {
      employmentDate = new Date().toISOString().slice(0,10);
    }

    let terminationDate = event.target.formGridTerminationDate.value;
    if (event.target.formGridTerminationDateTodayCheckbox.checked === true) {
      terminationDate = new Date().toISOString().slice(0,10);
    }

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
        mutation {updateUser(userId:"${userId}",selectedUserId:"${userId}",userInput: {email:"${email}",password:"${password}",name:"${name}",dob:"${dob}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}", addressPostOffice:"${addressPostOffice}",phone:"${phone}",role:"${role}",employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"})
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
        this.state.users.push(updatedUser);
        this.context.users = this.state.users;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, user: updatedUser})
        this.getThisUser();
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
            mutation{updateUserField(userId:"${userId}",selectedUserId:"${userId}",field:"${field}",query:"${query}")
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
            this.getThisUser();
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
    console.log("UpdateUserAttendanceFormData:  ", event.target.formGridAttendanceStatus.value, );

    console.log(`
      dates & raisins...
      this.context.fancyDate: ${new Date(AuthContext._currentValue.fancyDate).toISOString().slice(0,10)},
      event.target.formGridAttendanceDateTodayCheckbox.checked: ${event.target.formGridAttendanceDateTodayCheckbox.checked},
      `);
    this.setState({ updating: false , userUpdateField: null });

    let attendanceDate = event.target.formGridAttendanceDate.value;
    // let attendanceDate = null;

    if (event.target.formGridAttendanceDateTodayCheckbox.checked === true) {
      console.log("1");
      attendanceDate = new Date().toISOString().slice(0,10);
    }

    // if (
    //   AuthContext._currentValue.fancyDate !== null &&
    //   event.target.formGridAttendanceDateTodayCheckbox.checked !== true
    // ) {
    //   console.log("2");
    //   attendanceDate = new Date(AuthContext._currentValue.fancyDate).toISOString().slice(0,10);
    // }

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
          this.getThisUser();

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
    if (event.target.formGridLeaveStartDateTodayCheckbox.checked === true) {
      leaveStartDate = new Date().toISOString().slice(0,10);
    }

    let leaveEndDate = event.target.formGridLeaveEndDate.value;
    if (event.target.formGridLeaveEndDateTodayCheckbox.checked === true) {
      leaveEndDate = new Date().toISOString().slice(0,10);
    }

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
          this.getThisUser();

        })
        .catch(err => {
          console.log(err);
          this.setState({userAlert: err});
        });
  };


  updateUserAttachmentHandler = (event) => {

  const token = this.context.token;
  const userId = this.context.userId;
  // let selectedUserId = this.context.selectedUser._id;
  // if(userId !== selectedUserId && this.context.user.role !== 'admin') {
  //   console.log("Not the creator or Admin! No edit permission!!");
  //   selectedUserId = null;
  // }
  // if (userId !== selectedUserId && this.context.user.role !== "admin" ) {
  //   console.log("Not the creator or Admin! No edit permission!!");
  //   this.setState({userAlert: "Not the creator or Admin! No edit permission!!"})
  //     selectedUserId = null;
  // }

  console.log("UpdateUserAttachmentFormData:  ");

  this.setState({ updating: false , userUpdateField: null });

  // let attachmentName = event.target.formGridAttachmentName.value;
  let attachmentFormat = event.target.formGridAttachmentFormat.value;
  let attachmentPath = "uploads/staff/"+userId+"/attachments";
  // let attachmentPath = event.target.formGridAttachmentPath.value;
  let file = AuthContext._currentValue.file;

  console.log(`
    uploading to s3...
    file.name: ${file.name},
    AuthContext._currentValue.file: ${AuthContext._currentValue.file},
    `);
    const config = {
      bucketName: this.context.creds.s3.bucketName,
      dirName: attachmentPath,
      region: this.context.creds.s3.region,
      accessKeyId: this.context.creds.s3.accessKeyId,
      secretAccessKey: this.context.creds.s3.secretAccessKey,
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
    adding user attendance item...
    userId: ${userId},
    selectedUserId: ${userId}
    attachmentName: ${attachmentName},
    attachmentFormat: ${attachmentFormat},
    attachmentPath: ${attachmentPath}
    `);
    this.setState({userAlert: "adding user attachment item..."})

    const requestBody = {
      query:`
        mutation{updateUserAttachment(userId:"${userId}",selectedUserId:"${userId}",userInput:{attachmentName:"${attachmentName}",attachmentFormat:"${attachmentFormat}",attachmentPath:"${attachmentPath}"})
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
        this.getThisUser();
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

  getCreds() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query {getCreds
        {atlas{user,pw,db},s3{bucketName,region,accessKeyId,secretAccessKey},jwt{encode},gdrive{clientId,developerKey}}}
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
        // console.log("resdata..." + JSON.stringify(resData));
        const creds = resData.data.getCreds;
        if (this.isActive) {

          this.setState({ isLoading: false });

          this.context.creds = creds;
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
    let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);

    console.log(`
      delete user Attendance item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      selectedUserId: ${userId},
      attandance date: ${date},
      `);

      const requestBody = {
        query:`
         mutation{deleteUserAttendance(userId:"${userId}",selectedUserId:"${userId}",attendanceDate:"${date}")
         {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}
        }
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
              // let deletedUser = resData.data.deleteUserAttendance;
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
              this.getThisUser();

            })
            .catch(err => {
              console.log(err);
              this.setState({userAlert: err});
            });
  }

  deleteUserLeaveItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;

    console.log(`
      delete user Leave item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      selectedUserId: ${userId},
      `);

      const requestBody = {
        query:`
         mutation{deleteUserLeave(userId:"${userId}",selectedUserId:"${userId}",leaveTitle:"${props.title}")
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
              // let deletedUser = resData.data.deleteUserLeave;
              // console.log(deletedUser);

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
              // this.getThisUser();


            })
            .catch(err => {
              console.log(err);
              this.setState({userAlert: err});
            });
  }

  deleteUserAttachmentItem = (props) => {

    let token = this.context.token;
    let userId = this.context.userId;

    console.log(`
      delete user Attachment item:
      props: ${JSON.stringify(props)},
      token: ${token},
      userId: ${userId},
      selectedUserId: ${userId},
      `);

      // console.log(`
      //   deleting from s3...
      //   file.name: ${props.name},
      //   `);
      //
      //   const config = {
      //     bucketName: this.context.creds.s3.bucketName,
      //     dirName: props.path,
      //     region: this.context.creds.s3.region,
      //     accessKeyId: this.context.creds.s3.accessKeyId,
      //     secretAccessKey: this.context.creds.s3.secretAccessKey,
      //   }
      // const ReactS3Client = new S3(config);
      // const filename = props.name;
      // // const attachmentName = newFileName;
      // //
      // S3FileUpload
      // .deleteFile(filename, config)
      // .then(response => console.log(response))
      // .catch(err => console.error(err))


      const requestBody = {
        query:`
         mutation{deleteUserAttachment(userId:"${userId}",selectedUserId:"${userId}",attachmentName:"${props.name}")
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
              // let deletedUser = resData.data.deleteUserAttachment;
              // console.log(deletedUser);

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
              this.getThisUser();

            })
            .catch(err => {
              console.log(err);
            });
  }


  updateUserSpecialProfile (event) {
    console.log("special field to update:  ", event.target.value);
    const field = event.target.value;
    this.setState({ userUpdateField: field});
  }

  onViewAttachment = (attachment) => {
    console.log(`
      setting up attachment viewer...
      attachment: ${JSON.stringify(attachment)}
      `);

      const file = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+attachment.path+"/"+attachment.name+"."+attachment.format;
      const type = attachment.format;
      this.setState({showThisAttachmentFile: file, showThisAttachmentType: type})

      this.setState({showAttachment: true})
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
        user: ${JSON.stringify(user)}g
      `);

      const pdfData = {
          title: "This pdf is supplied with your profile data...",
          user: {
            _id: user._id,
            email: user.email,
            password: user.password,
            name: user.name,
            dob: user.dob,
            address:{
              number: user.address.number,
              street: user.address.street,
              town: user.address.town,
              parish: user.address.parish,
              postOffice: user.address.postOffice,
            },
            phone: user.phone,
            role: user.role,
            employmentDate: user.employmentDate,
            terminationDate: user.terminationDate,
            attachments: user.attachments,
            attendance: user.atttendance,
            leave: user.leave
          }
      };

    this.setState({createPdf: true, pdfData: pdfData})
  }

  closePdfCreator = () => {
    console.log(`
      closing pdf creator...
      `);
      this.setState({createPdf: false, pdfData: null})
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

      <Row>
      <Col md={3} className="MasterCol1">
      <AlertBox
        authUserId={this.context.userId}
        alert={this.state.userAlert}
      />

      {this.state.overlay === true && (
        <LoadingOverlay
          status={this.state.overlayStatus}
        />
      )}

      <SidebarPage
        you={this.state.user}
      />
      </Col>

      <Col md={9} className="MasterCol2">
        <Container className="containerProfile">

        <Tab.Container id="left-tabs-example" defaultActiveKey="Detail">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="Detail">You</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>Edit:</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Demographics">Demographics</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userEditField">Single Field</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>Add:</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Attandance">Attendance</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Attachment">Attachment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Leave">Leave</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="Detail">
                  {this.state.user !== null && (
                      <ThisUserProfile
                        user={this.state.user}
                        authUserId={this.context.userId}
                        canDelete={this.state.canDelete}
                        attendanceDelete={this.deleteUserAttendanceItem}
                        leaveDelete={this.deleteUserLeaveItem}
                        attachmentDelete={this.deleteUserAttachmentItem}
                        onViewAttachment={this.onViewAttachment}
                        onCreatePdf={this.createPdf}
                      />
                    )}
                </Tab.Pane>

                <Tab.Pane eventKey="Demographics">
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Demographics</Button>
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
                </Tab.Pane>

                <Tab.Pane eventKey="userEditField">
                  {this.state.selectedUser === null && (
                    <Button variant="outline-warning" size="lg" className="confirmEditButton">
                      Select a Staff member from the Master List
                    </Button>
                  )}
                  {this.state.selectedUser !== null && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit a Single Field</Button>
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

                <Tab.Pane eventKey="Attandance">
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attendance' onClick={this.updateUserSpecialProfile.bind(this)}>Add Attendance</Button>
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
                </Tab.Pane>

                <Tab.Pane eventKey="Attachment">
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attachments' onClick={this.updateUserSpecialProfile.bind(this)}>Add Attachment</Button>
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
                </Tab.Pane>

                <Tab.Pane eventKey="Leave">
                  <Button variant="outline-primary" size="lg" className="confirmEditButton" value='leave' onClick={this.updateUserSpecialProfile.bind(this)}>Add Leave</Button>
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
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>



        </Container>
      </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default ThisUserPage;
