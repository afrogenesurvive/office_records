import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './UserDetail.css';

const UserDetail = (props) => {
  const {...user} = props.user;
  const authUserId = props.authUserId;
  console.log("UserDetail.props.authUserId:  ",authUserId, "  UserDetail.props.user:  ", {...user});
  return (
    <div className={"UserDetailBox"}>
    <Card style={{ width: '18rem' }}>
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
      <Button variant="primary" onClick={props.onEdit}>Edit</Button>
    </Card.Body>
  </Card>
    </div>

  );
}

export default UserDetail;
