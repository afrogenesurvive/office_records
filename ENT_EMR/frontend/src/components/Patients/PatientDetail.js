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
    <div className={"PatientDetailBox"}>
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{patient.ame}</Card.Title>
      <p>ID: {patient._id}</p>
      <Card.Text>
        Address: {patient.address}
      </Card.Text>
      <Card.Text>
        D.O.B: {patient.dob}
      </Card.Text>
      <Button variant="primary" onClick={props.onEdit}>Edit</Button>
    </Card.Body>
  </Card>
  </div>
  );
}

export default PatientDetail;
