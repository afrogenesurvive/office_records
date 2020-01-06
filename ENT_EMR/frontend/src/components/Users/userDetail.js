import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  const userEmploymentDate = new Date(user.employmentDate.substr(0,10)*1000).toISOString().slice(0,10);
  const userTerminationDate = new Date(user.terminationDate.substr(0,10)*1000).toISOString().slice(0,10);

  // console.log("user attendance:  ", userAttendance, authSelectedUser.slice(0,5) === '{"_id' , authSelectedUser.slice(0,5));
  console.log("UserDetail.props.authUserId:  ",authUserId, "  UserDetail.props.user:  ", {...user});

  return (
    <div className={"UserDetailBox1"}>

    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="tab">

      <Tab eventKey="Demographics" title="Demographics">
      <Card className="UserDetailCard">
      <Card.Body>
        <Card.Title><span className="ul">User Details</span></Card.Title>
        <Row className="detailCardRow">
          <Col className="detailCardCol">
            <Card.Text>
              <span className="bold">ID :</span> {user._id}
            </Card.Text>
            <Card.Text>
              <span className="bold">Name :</span> {user.name}
            </Card.Text>
            <Card.Text>
              <span className="bold">Email :</span> {user.email}
            </Card.Text>
            <Card.Text>
              <span className="bold">Phone :</span> {user.phone}
            </Card.Text>
            <Card.Text>
              <span className="bold">Role :</span> {user.role}
            </Card.Text>
          </Col>

          <Col className="detailCardCol">
            <Card.Text>
              <span className="bold">Start Date:</span> {userEmploymentDate}
            </Card.Text>
            <Card.Text>
              <span className="bold">Start Date:</span> {userTerminationDate}
            </Card.Text>
          </Col>
        </Row>

        <Row className="detailCardRow">
          <Col className="detailCardCol">
            { props.canDelete === true && (
              <Button variant="danger" onClick={props.onDelete}>
                Delete Staff !!??
              </Button>
            )}
          </Col>

          <Col>
            <Button variant="warning" onClick={props.onCreatePdf.bind(this, user)}>
              Create Pdf
            </Button>
          </Col>
        </Row>

      </Card.Body>
      </Card>
      </Tab>
      <Tab eventKey="Attendance" title="Attendance">
      <UserAttendanceList
          userAttendance={userAttendance}
          authUserId={props.AuthContext.userId}
          canDelete={props.canDelete}
          onDelete={props.attendanceDelete}
        />
      </Tab>
      <Tab eventKey="Leave" title="Leave">
      <UserLeaveList
          userLeave={userLeave}
          authUserId={props.AuthContext.userId}
          canDelete={props.canDelete}
          onDelete={props.leaveDelete}
        />
      </Tab>
      <Tab eventKey="Attachments" title="Attachments">
      <UserAttachmentList
          userAttachment={userAttachment}
          authUserId={props.AuthContext.userId}
          canDelete={props.canDelete}
          onDelete={props.attachmentDelete}
          onViewAttachment={props.onViewAttachment}
        />
      </Tab>
    </Tabs>

    </div>

  );
}

export default UserDetail;
