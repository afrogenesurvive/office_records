import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import UserAttendanceList from './UserList/UserAttendanceList';
import UserLeaveList from './UserList/UserLeaveList';
import UserAttachmentList from './UserList/UserAttachmentList';
import AuthContext from '../../context/auth-context';

import './UserDetail.css';

const UserDetail = (props) => {

  const {...user} = props.user;
  const authUserId = props.authUserId;
  const userAttendance = user.attendance;
  const userLeave = user.leave;
  const userAttachment = user.attachments;
  const authSelectedUser = JSON.stringify(props.AuthContext.selectedUser);
  const userEmploymentDate = new Date(user.employmentDate*1000).toUTCString();
  const userTerminationDate = new Date(user.terminationDate*1000).toUTCString();

  // console.log("user attendance:  ", userAttendance, authSelectedUser.slice(0,5) === '{"_id' , authSelectedUser.slice(0,5));
  console.log("UserDetail.props.authUserId:  ",authUserId, "  UserDetail.props.user:  ", {...user});

  return (
    <div className={"UserDetailBox1"}>

    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="tab">
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
      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Attendance" title="Attendance">
      <UserAttendanceList
          userAttendance={userAttendance}
          authUserId={props.AuthContext.userId}
        />
      </Tab>
      <Tab eventKey="Leave" title="Leave">
      <UserLeaveList
          userLeave={userLeave}
          authUserId={props.AuthContext.userId}
        />
      </Tab>
      <Tab eventKey="Attachments" title="Attachments">
      <UserAttachmentList
          userAttachment={userAttachment}
          authUserId={props.AuthContext.userId}
        />
      </Tab>
    </Tabs>

    </div>

  );
}

export default UserDetail;
