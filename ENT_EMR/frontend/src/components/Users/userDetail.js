import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './thisUserProfile.css';

const userDetail = (props) => {
  const {...user} = props.user;
  const authUserId = props.authUserId;
  console.log("props.authUserId:  ",authUserId, "props.user:  ", {...user});
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{user.username}</Card.Title>
      <p>ID: {user._id}</p>
      <Card.Text>
        Bio: {user.description}
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  );
}

export default userDetail;
