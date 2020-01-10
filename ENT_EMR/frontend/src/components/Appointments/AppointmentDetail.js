import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import AppointmentNoteList from './AppointmentList/AppointmentNoteList';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './PatientDetail.css';

const AppointmentDetail = (props) => {
  const {...appointment} = props.appointment;
  const authUserId = props.authUserId;
  const appointmentDate = new Date(appointment.date.substr(0,10)*1000).toISOString().slice(0,10);
  const appointmentNote = appointment.notes;
  const appointmentPatientContact = appointment.patient.contact;
  const appointmentPatientConsultant = appointment.patient.consultant;
  console.log("appointmentPatientContact:  ", appointmentPatientContact.phone);
  console.log("AppointmentDetail.props.appointment:  ", {...appointment}, appointmentNote);
  return (
    <div className="PatientDetailBox">
    <Card className="PatientDetailCard">
    <Card.Body>
      <Card.Title><span className="ul">Appointment Details</span></Card.Title>

      <Row className="detailCardRow">
        <Col md={6} className="detailCardCol">
          <Card.Text>
            <span className="bold">ID :</span> {appointment._id}
          </Card.Text>
          <Card.Text>
            <span className="bold">Date :</span> {appointmentDate}
          </Card.Text>
          <Card.Text>
            <span className="bold">Time :</span> {appointment.time}
          </Card.Text>
          <Card.Text>
            <span className="bold">Seen Time :</span> {appointment.seenTime}
          </Card.Text>
          <Card.Text>
            <span className="bold">Check-in Time :</span> {appointment.checkinTime}
          </Card.Text>
          <Card.Text>
            <span className="bold">Title :</span> {appointment.title}
          </Card.Text>
          <Card.Text>
            <span className="bold">Type :</span> {appointment.type}
          </Card.Text>

        </Col>

        <Col md={6} className="detailCardCol">
          <Card.Text>
            <span className="bold">Patient Name :</span> {appointment.patient.name}
          </Card.Text>
          <Card.Text>
            <span className="bold">Patient Phone :</span> {appointmentPatientContact.phone}
          </Card.Text>
          <Card.Text>
            <span className="bold">Patient Email :</span> {appointmentPatientContact.email}
          </Card.Text>
          <Card.Text>
            <span className="bold">Description :</span> {appointment.description}
          </Card.Text>
          <Card.Text>
            <span className="bold">Location :</span> {appointment.location}
          </Card.Text>
          <Card.Text>
            <span className="bold">In-Progress ?</span> {appointment.inProgress}
          </Card.Text>
          {appointment.inProgress === true &&(
            <p>Yes</p>
          )}
          <Card.Text>
            <span className="bold">Attended ?</span> {appointment.attended}
          </Card.Text>
          {appointment.attended === true &&(
            <p>Yes</p>
          )}
          <Card.Text>
            <span className="bold">Important ?</span>
          </Card.Text>
          {appointment.important === true &&(
            <p>Yes</p>
          )}

        </Col>

      </Row>

      <Row className="detailCardRow">
        <Col className="detailCardCol">
        <Card.Text>
        <span className="bold">Notes :</span>
        </Card.Text>
        </Col>
      </Row>

      <Row className="detailCardRow">
        <Col md={6} className="detailCardCol">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete}>
              Delete Appointment !!??
            </Button>
          )}
        </Col>

        <Col md={6} className="detailCardCol">
          <Button variant="warning" onClick={props.onCreatePdf.bind(this, appointment)}>
            Create Pdf
          </Button>
        </Col>
      </Row>

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
