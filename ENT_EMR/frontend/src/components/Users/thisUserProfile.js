import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserAttendanceList from './UserList/UserAttendanceList';
import UserLeaveList from './UserList/UserLeaveList';
import UserAttachmentList from './UserList/UserAttachmentList';

import './thisUserProfile.css';

const thisUserProfile = (props) => {

  const {...user} = props.user;
  console.log("thisUserProfile.props.user:  " + {...user});

  const authUserId = props.authUserId;
  const userAttendance = user.attendance;
  console.log("Profile: userAttendance", userAttendance);
  const userLeave = user.leave;
  console.log("Profile: userLeave", userLeave);
  const userAttachment = user.attachments;
  console.log("Profile: userAttachment", userAttachment);
  const userEmploymentDate = new Date(user.employmentDate*1000).toUTCString();
  const userTerminationDate = new Date(user.terminationDate*1000).toUTCString();
  // const authSelectedUser = JSON.stringify(props.AuthContext.selectedUser);
  // console.log(props.user.slice(0,5) === '{"_id' , props.user.slice(0,5));

  return (
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
        Role: {user.role}
      </Card.Text>
      <Card.Text>
        Start Date: {userEmploymentDate}
      </Card.Text>
      <Card.Text>
        End Date: {userTerminationDate}
      </Card.Text>
      <Card.Text>
        Attendance:
      </Card.Text>
      <UserAttendanceList
          userAttendance={userAttendance}
          authUserId={props.authUserId}
        />
        <Card.Text>
          Leave:
        </Card.Text>
      <UserLeaveList
          userLeave={userLeave}
          authUserId={props.authUserId}
        />
        <Card.Text>
          Attachments:
        </Card.Text>
      <UserAttachmentList
          userAttachment={userAttachment}
          authUserId={props.authUserId}
        />
    </Card.Body>
  </Card>
  );
}

export default thisUserProfile;
