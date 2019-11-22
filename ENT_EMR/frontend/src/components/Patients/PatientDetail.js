import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './PatientDetail.css';

const PatientDetail = (props) => {
  const {...patient} = props.patient;
  // const authPatientId = props.authUserId;
  console.log("PatientDetail.props.patient:  ", {...patient});
  // console.log("props.authUserId:  ",authUserId, "props.patient:  ", {...patient});
  return (
    <div className={props.className}>
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Patient Details:</Card.Title>
      <Card.Text>
        ID: {patient._id}
      </Card.Text>
      <Card.Text>
        Name: {patient.name}
      </Card.Text>
      <Card.Text>
        Address: {patient.address}
      </Card.Text>
      <Card.Text>
        D.O.B: {patient.dob}
      </Card.Text>
      {props.canEdit && (
        <Button variant="primary" onClick={props.onEdit}>Edit</Button>
      )}
    </Card.Body>
  </Card>
  </div>
  );
}

export default PatientDetail;
