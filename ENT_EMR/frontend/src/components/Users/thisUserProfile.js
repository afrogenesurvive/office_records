import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './thisUserProfile.css';

const thisUserProfile = (props) => {
  const {...user} = props.user;
  console.log("thisUserProfile.props.user:  " + {...user});
  return (
    <Card style={{ width: '18rem' }} className="profileCard">
    <Card.Body>
      <Card.Title>Your Profile</Card.Title>
      <p>ID: {user._id}</p>
      <Card.Text>
        Name: {user.name}
      </Card.Text>
      <Card.Text>
        Email: {user.email}
      </Card.Text>
      <Card.Text>
        Role: {user.role}
      </Card.Text>
      <Button variant="primary" onClick={props.onEdit}>Edit</Button>
    </Card.Body>
  </Card>
  );
}

export default thisUserProfile;
