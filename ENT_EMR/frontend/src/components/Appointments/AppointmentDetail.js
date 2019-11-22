import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './UserDetail.css';

const AppointmentDetail = (props) => {
  const {...appointment} = props.appointment;
  const authUserId = props.authUserId;
  console.log("AppointmentDetail.props.authUserId:  ",authUserId, "AppointmentDetail.props.appointment:  ", {...appointment});
  return (
    <div className={"UserDetailBox"}>
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Appointment Details</Card.Title>
      <Card.Text>
        ID: {appointment._id}
      </Card.Text>
      <Card.Text>
        Title: {appointment.title}
      </Card.Text>
      <Card.Text>
        Type: {appointment.type}
      </Card.Text>
      <Button variant="primary" onClick={props.onEdit}>Edit</Button>
      {props.canDelete && (
        <Button variant="warning" onClick={props.onDelete}>Delete</Button>
      )}
    </Card.Body>
  </Card>
    </div>

  );
}

export default AppointmentDetail;
