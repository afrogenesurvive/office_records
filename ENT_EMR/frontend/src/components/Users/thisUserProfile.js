import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import UserAttendanceList from './UserList/UserAttendanceList';
import UserLeaveList from './UserList/UserLeaveList';
import UserAttachmentList from './UserList/UserAttachmentList';

import './thisUserProfile.css';

const thisUserProfile = (props) => {

  const {...user} = props.user;
  console.log("thisUserProfile.props.user:  " + {...user});

  const authUserId = props.authUserId;
  const userAddress = user.address;
  const userAttendance = user.attendance;
  console.log("Profile: userAttendance", userAttendance);
  const userLeave = user.leave;
  console.log("Profile: userLeave", userLeave);
  const userAttachment = user.attachments;
  console.log("Profile: userAttachment", userAttachment);
  const userEmploymentDate = new Date(user.employmentDate.substr(0,10)*1000).toISOString().slice(0,10);
  const userTerminationDate = new Date(user.terminationDate.substr(0,10)*1000).toISOString().slice(0,10);
  // const authSelectedUser = JSON.stringify(props.AuthContext.selectedUser);
  // console.log(props.user.slice(0,5) === '{"_id' , props.user.slice(0,5));

  return (

  <Tabs defaultActiveKey="Demographics" id="uncontrolled-tab-example">
    <Tab eventKey="" title="Details:" disabled>
    </Tab>
    <Tab eventKey="Demographics" title="Demographics">
    <Card className="UserDetailCard">
    <Card.Body>
      <Card.Title>User Details</Card.Title>
      <Card.Text>
        ID: {user._id}
      </Card.Text>
      <Card.Text>
        Name: {user.name}
      </Card.Text>
      <Card.Text>
        Phone: {user.phone}
      </Card.Text>
      <Card.Text>
        Email: {user.email}
      </Card.Text>
      <Card.Text>
        Role: {user.role}
      </Card.Text>
      <Card.Text>
        Start Date: {userEmploymentDate}
      </Card.Text>
      <Card.Text>
        End Date: {userTerminationDate}
      </Card.Text>
      <Card.Text>
        Address:
      </Card.Text>
      <Card.Text>
        Street & Number : {userAddress.number}, {userAddress.street}
      </Card.Text>
      <Card.Text>
        Town : {userAddress.town}
      </Card.Text>
      <Card.Text>
        Parish : {userAddress.parish}
      </Card.Text>
      <Card.Text>
        Post Office : {userAddress.postOffice}
      </Card.Text>
      <Button variant="warning" onClick={props.onCreatePdf.bind(this, user)}>
        Create Pdf
      </Button>
    </Card.Body>
    </Card>
    </Tab>
    <Tab eventKey="Attendance" title="Attendance">
    <Card.Text>
      Attendance:
    </Card.Text>
    <UserAttendanceList
        userAttendance={userAttendance}
        authUserId={authUserId}
        canDelete={props.canDelete}
        onDelete={props.attendanceDelete}
      />
    </Tab>
    <Tab eventKey="Leave" title="Leave">
    <Card.Text>
      Leave:
    </Card.Text>
    <UserLeaveList
        userLeave={userLeave}
        authUserId={authUserId}
        canDelete={props.canDelete}
        onDelete={props.leaveDelete}
      />
    </Tab>
    <Tab eventKey="Attachments" title="Attachments">
    <Card.Text>
      Attachments:
    </Card.Text>
    <UserAttachmentList
        userAttachment={userAttachment}
        authUserId={authUserId}
        canDelete={props.canDelete}
        onDelete={props.attachmentDelete}
        onViewAttachment={props.onViewAttachment}
      />
    </Tab>
  </Tabs>
  );
}

export default thisUserProfile;
