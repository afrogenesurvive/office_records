import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './thisUserProfile.css';

const thisUserProfile = (props) => {
  const {...user} = props.user;
  console.log("should be user object id..." + user._id);
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Your Profile</Card.Title>
      <p>ID: {user._id}</p>
      <Card.Text>
        Nmae: {user.name}
      </Card.Text>
      <Card.Text>
        Email: {user.email}
      </Card.Text>
      <Card.Text>
        Role: {user.role}
      </Card.Text>
    </Card.Body>
  </Card>
  );
}

export default thisUserProfile;
