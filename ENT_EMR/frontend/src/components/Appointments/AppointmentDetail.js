import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import './PatientDetail.css';

const AppointmentDetail = (props) => {
  const {...appointment} = props.appointment;
  const authUserId = props.authUserId;
  console.log("AppointmentDetail.props.appointment:  ", {...appointment});
  return (
    <div className="PatientDetailBox">
    <Card className="PatientDetailCard">
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
      <Card.Text>
        Patient Nmae: {appointment.patient.name}
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
