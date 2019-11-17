import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './thisUserProfile.css';

const PatientDetail = (props) => {
  const {...patient} = props.patient;
  // const authPatientId = props.authUserId;
  console.log("props.patient:  ", {...patient});
  // console.log("props.authUserId:  ",authUserId, "props.patient:  ", {...patient});
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{patient.ame}</Card.Title>
      <p>ID: {patient._id}</p>
      <Card.Text>
        Address: {patient.address}
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  );
}

export default PatientDetail;
