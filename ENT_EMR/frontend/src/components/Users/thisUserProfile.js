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
        Start Date: {user.employmentDate}
      </Card.Text>
      <Card.Text>
        End Date: {user.terminationDate}
      </Card.Text>
      <Card.Text>
        Attendance:
      </Card.Text>
      <UserAttendanceList
          userAttendance={userAttendance}
          authUserId={props.authUserId}
        />
      <UserLeaveList
          userLeave={userLeave}
          authUserId={props.authUserId}
        />
      <UserAttachmentList
          userAttachment={userAttachment}
          authUserId={props.authUserId}
        />
      {
      //   props.user !== {}
      //    && (<UserAttendanceList
      //        userAttendance={userAttendance}
      //        authUserId={props.authUserId}
      //      />)}
      // {props.user !== {}
      //    && (<UserLeaveList
      //        userLeave={userLeave}
      //        authUserId={props.authUserId}
      //      />)}
      // {props.user !== {}
      //    && (<UserAttachmentList
      //        userAttachment={userAttachment}
      //        authUserId={props.authUserId}
      //      />)
         }
      <Button variant="link" className="btn" onClick={props.onEdit}>
      Edit
      </Button>

      <Button variant="warning" onClick={props.onDelete}>Delete</Button>
    </Card.Body>
  </Card>
  );
}

export default thisUserProfile;
