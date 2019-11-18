import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './UserDetail.css';

const UserDetail = (props) => {
  const {...user} = props.user;
  const authUserId = props.authUserId;
  console.log("props.authUserId:  ",authUserId, "props.user:  ", {...user});
  return (
    <div className={"UserDetailBox"}>
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Details</Card.Title>
      <p>1. {user._id}</p>
      <Card.Text>
        2. {user.role}
      </Card.Text>
      <Button variant="primary">Edit</Button>
    </Card.Body>
  </Card>
    </div>

  );
}

export default UserDetail;
