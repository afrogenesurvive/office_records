import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import AppointmentNoteList from './AppointmentList/AppointmentNoteList';

import './PatientDetail.css';

const AppointmentDetail = (props) => {
  const {...appointment} = props.appointment;
  const authUserId = props.authUserId;
  const appointmentDate = new Date(appointment.date.substr(0,10)*1000).toLocaleString();
  const appointmentNote = appointment.notes;
  const appointmentPatientConsultant = appointment.patient.consultant;
  console.log("appointmentPatientConsultant:  ", appointmentPatientConsultant);
  console.log("AppointmentDetail.props.appointment:  ", {...appointment}, appointmentNote);
  return (
    <div className="PatientDetailBox">
    <Card className="PatientDetailCard">
    <Card.Body>
      <Card.Title>Appointment Details</Card.Title>
      <Card.Text>
        ID: {appointment._id}
      </Card.Text>
      <Card.Text>
        Date: {appointmentDate}
      </Card.Text>
      <Card.Text>
        Time: {appointment.time}
      </Card.Text>
      <Card.Text>
        Title: {appointment.title}
      </Card.Text>
      <Card.Text>
        Type: {appointment.type}
      </Card.Text>
      <Card.Text>
        Patient Name: {appointment.patient.name}
      </Card.Text>
      <Card.Text>
        Patient Phone: {appointment.patient.phone}
      </Card.Text>
      <Card.Text>
        Patient Email: {appointment.patient.email}
      </Card.Text>
      <Card.Text>
        Description: {appointment.description}
      </Card.Text>
      <Card.Text>
        Location: {appointment.location}
      </Card.Text>
      <Card.Text>
        In-Progress?: {appointment.inProgress}
      </Card.Text>
      {appointment.important === true &&(
        <p>Appointment is In-Progress</p>
      )}
      <Card.Text>
        Attended?: {appointment.attended}
      </Card.Text>
      {appointment.attended === true &&(
        <p>Patient Checked In</p>
      )}
      <Card.Text>
        Important?:
      </Card.Text>
      {appointment.important === true &&(
        <p>High Prioity Apoointment</p>
      )}
      <Card.Text>
      Notes:
      </Card.Text>
      <AppointmentNoteList
        appointmentNote={appointmentNote}
        authUserId={props.authUserId}
        />
    </Card.Body>
  </Card>
    </div>

  );
}

export default AppointmentDetail;
