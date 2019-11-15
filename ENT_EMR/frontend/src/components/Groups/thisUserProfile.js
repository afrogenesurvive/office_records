import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './thisUserProfile.css';

const thisUserProfile = (props) => {
  const {...user} = props.user;
  console.log("should be user object avatar..." + user.avatar);
  console.log("should be user object id..." + user._id);
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

export default thisUserProfile;
